export function addUppercaseToFirstCharacter(phrase: string): string {
    const words = phrase.split(' ')
    const addUppercase = words.map(word => word.replace(word[0], word[0].toUpperCase()))
    return addUppercase.join(' ')
}

export function formatSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}