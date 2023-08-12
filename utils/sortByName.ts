export const sortByName = (a: string, b: string) => {
  const stringA = a.toUpperCase();
  const stringB = b.toUpperCase();
  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
    return 1;
  }
  return 0;
};
