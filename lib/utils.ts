import adjectives from "./adjectives";
import nouns from "./nouns";


export const generateUsername = (separator: string = '') => {
    const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const nounIndex = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[adjectiveIndex]}${separator}${nouns[nounIndex]}`;
}