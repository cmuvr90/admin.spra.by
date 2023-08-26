export const generateRandom = (min: number = 0, max: number = 100): number => Math.floor(Math.random() * (max - min)) + min;
