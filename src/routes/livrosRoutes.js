import express from "express";
import LivroController from "../controllers/livroController.js";
import paginacao from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginacao);
routes.get("/livros/busca", LivroController.listarLivroPorFiltro, paginacao);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.registarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.removerLivro);

export default routes;
