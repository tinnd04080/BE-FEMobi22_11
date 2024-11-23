const randomNumber = (length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
  return randomNumber;
};

export default randomNumber;
