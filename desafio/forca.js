class Forca {

  constructor(palavraInput) {
    this.palavraSecreta = palavraInput; // Resposta do jogo
    this.palavra = '_'.repeat(palavraInput.length); // Resposta atual
    this.arrayChutesValidos = []; // Armazena os todos os chutes validos
    this.vidas = 6; // Total de vidas    
    this.letrasPermitidas = /^[a-zA-Z]$/; // REGEX para filtrar apenas entradas com uma letra   
    this.indices = []; // Indice usado em validarChuteCerto
  }

   // Classifica o chute e chama a funcao para cada caso
  chutar(letra) {
    var chute = letra.toLowerCase();
    
    if (chute.match(this.letrasPermitidas) &&
      this.palavraSecreta.includes(chute) &&
      !this.arrayChutesValidos.includes(chute)) {
      this.validarChuteCerto(chute)

    } else if (chute.match(this.letrasPermitidas) &&
      !this.arrayChutesValidos.includes(chute)) {
      this.validarChuteErrado(chute)

    } else {
      this.invalidarChute()
    }
  }

  buscarEstado() {
    var estado;
    if (this.vidas == 0) {
      estado = "perdeu";
    } else if (this.palavraSecreta === this.palavra) {
      estado = "ganhou";
    } else {
      estado = "aguardando chute";
    }
    return estado;
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.arrayChutesValidos, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: Array.from(this.palavra) // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    }
  }

  //Caso seja um acerto novo e valido
  validarChuteCerto(chute) {
    var idx = this.palavraSecreta.indexOf(chute);
    while (idx != -1) {
      this.indices.push(idx);
      idx = this.palavraSecreta.indexOf(chute, idx + 1);
    } //Criando indices das letras acertadas
    
    this.arrayChutesValidos.push(chute);
    this.palavra = this.palavraSecreta;

    for (var j = 0; j < this.palavraSecreta.length; j++) {
      if (!this.indices.includes(j)) {
        var palavra = this.palavra.split('');
        palavra[j] = '_';
        this.palavra = palavra.join('');
      }
    } //Substitui as letras que não foram descobertas por _ para representar o estado do jogo para o jogador
  }

  //Caso seja um erro novo e valido
  validarChuteErrado(chute) {
    this.vidas = this.vidas - 1;
    console.log("Perdeu uma vida");
    this.arrayChutesValidos.push(chute);
  }

  //Caso seja jogada repitida ou nao seja uma letra
  invalidarChute() {
    console.log('JOGADA INVALIDA\nRepita a jogada');
  }
}

module.exports = Forca;