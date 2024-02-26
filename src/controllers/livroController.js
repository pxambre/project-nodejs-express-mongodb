import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autor as AutorModel, livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = livro.find({}).populate("autor");
      req.resultado = listaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = livro
        .findById(id)
        .populate("autor");

      req.resultado = livroResultado;

      if (livroResultado !== null) {
        res.status(200).json(livroResultado);
      } else {
        next(new ErroNaoEncontrado("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async registarLivro(req, res, next) {
    const novoLivro = new livro(req.body);
    try {
      const livroResultado = await novoLivro.save();
      res.status(201).json({
        message: "Livro adicionado com sucesso!",
        livro: livroResultado,
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);

      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro atualizado!" });
      } else {
        next(new ErroNaoEncontrado("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async removerLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro removido com sucesso!" });
      } else {
        next(new ErroNaoEncontrado("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = await livro
          .find(busca)
          .populate("autor");
        res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const {editora, titulo, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (nomeAutor) {
    const autor = await AutorModel.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;
