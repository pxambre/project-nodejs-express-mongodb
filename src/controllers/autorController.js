import { autor } from "../models/Autor.js";

class AutorController {
    
    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição!`})
        };
    };

    static async listarAutorPorId (req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do autor!`})
        };
    };

    static async registarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: "Autor adicionado com sucesso!",
                autor: novoAutor
         });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao adicionar autor!`})
        };
    };

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização!`})
        };
    };

    static async apagarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor apagado com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao apagar autor!`})
        };
    };
};

export default AutorController;