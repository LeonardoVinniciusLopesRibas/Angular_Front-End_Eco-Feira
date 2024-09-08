export class validaCNPJ {

  static validarCNPJ(cnpjRecebido: string): boolean {
    const cnpjSemCaracter = cnpjRecebido.replace(/[^\d]+/g, '');
    if (cnpjSemCaracter.length !== 14) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpjSemCaracter)) return false;

    // Validação do CNPJ
    let tamanho = cnpjSemCaracter.length - 2;
    let numeros = cnpjSemCaracter.substring(0, tamanho);
    const digitos = cnpjSemCaracter.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho++;
    numeros = cnpjSemCaracter.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(digitos.charAt(1));
  }
}
