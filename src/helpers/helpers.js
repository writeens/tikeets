const range = (start, stop, step = 1) => {
  let i = start;
  const data = [];
  while (i <= stop) {
    data.push(i);
    i += step;
  }
  return data;
};

const getURL = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'http://localhost:8000';
  }
  return 'https://tikeets.herokuapp.com';
};

export { getURL, range as default };
