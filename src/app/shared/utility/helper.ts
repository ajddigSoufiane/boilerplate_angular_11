export const convertToCSV = (objArray: any): any => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = '';

  objArray[0].forEach(index => {
    // Now convert each value to string and comma-separated
    row += index + ';';
  });
  row = row.slice(0, -1);
  // append Label row with line break
  str += row + '\r\n';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    array[i].forEach(index => {
      if (line !== '') {
        line += ';';
      }
      line += array[i][index];
    });
    str += line + '\r\n';
  }
  return str;
};
