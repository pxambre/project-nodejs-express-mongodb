import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js"

class LivroController {
    
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição!`})
        };
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro!`})
        };
    };

    static async registarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message: "Livro adicionado com sucesso!",
                livro: livroCriado
         });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao adicionar livro!`})
        };
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização!`})
        };
    };

    static async apagarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro apagado com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao apagar livro!`})
        };
    };
};

export default LivroController;