// Função para gerar letras aleatórias
function generateRandomLetters(length: number): string {
    return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
}

// Função para gerar números aleatórios com um número específico de dígitos
function generateRandomNumbers(length: number): string {
    const max = Math.pow(10, length) - 1; // Calcula o máximo com base no comprimento
    const min = Math.pow(10, length - 1); // Calcula o mínimo para garantir o comprimento correto
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

// Função para gerar uma placa de licença (combinando letras e números)
function generateLicensePlate(): string {
    const letters = generateRandomLetters(4);
    const numbers = generateRandomNumbers(4);
    return `${letters}${numbers}`;
}

// Exportando as funções para uso em outros arquivos
export { generateRandomLetters, generateRandomNumbers, generateLicensePlate };
