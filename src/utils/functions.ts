export function addUppercaseToFirstCharacter(phrase: string) {
    const words = phrase.split(' ')
    const addUppercase = words.map(word => word.replace(word[0], word[0].toUpperCase()))
    return addUppercase.join(' ')
}