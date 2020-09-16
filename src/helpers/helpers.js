const range = (start, stop, step = 1) => {
  let i = start;
  const data = [];
  while (i <= stop) {
    data.push(i);
    i += step;
  }
  return data;
};

export {
  range,
};
