export const generateRandID = (): string => {
  return (
    'id-' +
    Math.random().toString(36).substr(2, 9) +
    '-' +
    Date.now().toString(36)
  );
};
