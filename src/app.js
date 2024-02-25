import chalk from "chalk";
import express from "express";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import dbConn from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await dbConn();

conexao.on("error", (erro) => {
  console.error(chalk.bgRedBright.bold(("Erro de conexão!", erro)));
});

conexao.once("open", () => {
  console.log(chalk.bgCyanBright.bold("Conectado!"));
});

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
