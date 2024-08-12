function isEmpty(obj = {}) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

export default function queryGenerator(queryObj) {
  if (isEmpty(queryObj)) return '';

  return Object.entries(queryObj)
    .filter(([_, value]) => {
      if (value === null || value === undefined || value === '') return false;
      return true;
    })
    .reduce((acc, [key, value]) => {
      return acc === '?' ? `${acc}${key}=${value}` : `${acc}&${key}=${value}`;
    }, '?');
}
