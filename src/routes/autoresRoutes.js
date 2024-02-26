import express from "express";
import AutorController from "../controllers/autorController.js";
import paginacao from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores, paginacao);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.registarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.removerAutor);

export default routes;
