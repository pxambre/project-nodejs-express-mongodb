import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findById(id).populate("autor").exec();

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

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
