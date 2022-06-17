export const deepClone = <T>(value: T) => {
  return JSON.parse(JSON.stringify(value)) as T;
};
