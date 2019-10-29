exports.clipByCharacter = (data, char = '') => {
  if (
    data.length <= 0 ||
    typeof data !== 'string' ||
    typeof char !== 'string'
  ) {
    return [];
  }
  let newData = data.replace(/["]/gi, '');
  newData = newData.split(char);
  return newData;
};
