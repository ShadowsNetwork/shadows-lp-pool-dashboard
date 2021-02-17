export const shorter = (str, length = 6) => {
  return `${str.slice(0, length)}...${str.slice(str.length - 4, str.length)}`;
}