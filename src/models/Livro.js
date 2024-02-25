import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "Título do livro é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "Editora é obrigatória."],
    },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
      type: mongoose.Schema.ObjectId,
      ref: "autores",
      required: [true, "Dados de autor(a) obrigatórios."],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
