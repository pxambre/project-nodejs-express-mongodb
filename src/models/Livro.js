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
    preco: {
      type: Number,
      validate: {
        validator: valor => valor > 0 && valor < 1000,
        message: "O preço deve entre 0 e 1000 euros. Valor introduzido: {VALUE}"
      }
    },
    paginas: {
      type: Number,
      validate: {
        validator: valor => valor >= 10 && valor <= 5000,
        message: "O número de páginas deve estar entre 10 e 5000. Valor introduzido: {VALUE}"
      }
    },
    autor: {
      type: mongoose.Schema.ObjectId,
      ref: "autores",
      required: [true, "Dados de autor obrigatórios."],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
