export const generateRandomNumber = () => {
  const min = 501;
  const max = Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
