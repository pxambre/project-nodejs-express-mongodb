import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findById(id);

      if (autorResultado !== null) {
        res.status(200).json(autorResultado);
      } else {
        next(new ErroNaoEncontrado("Autor(a) não encontrado(a)."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async registarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({
        message: "Autor(a) adicionado(a) com sucesso!",
        autor: novoAutor,
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor(a) atualizado(a)!" });
      } else {
        next(new ErroNaoEncontrado("Autor(a) não encontrado(a)."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async removerAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor(a) removido(a) com sucesso!" });
      } else {
        next(new ErroNaoEncontrado("Autor(a) não encontrado(a)."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
