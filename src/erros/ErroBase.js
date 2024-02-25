class ErroBase extends Error {
  constructor(message = "Erro interno do servidor.", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.message,
      estado: this.status,
    });
  }
}

export default ErroBase;
