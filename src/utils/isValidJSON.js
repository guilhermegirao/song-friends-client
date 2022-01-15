const isValidJSON = (str) => {
  try {
    JSON.parse(str);

    return true;
  } catch (e) {
    return false;
  }
};

export default isValidJSON;
