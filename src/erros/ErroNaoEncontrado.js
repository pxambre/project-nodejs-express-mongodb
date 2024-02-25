import ErroBase from "./ErroBase.js";

class ErroNaoEncontrado extends ErroBase {
  constructor(message = "Página não encontrada") {
    super(message, 404);
  }
}

export default ErroNaoEncontrado;
