/* eslint-disable curly */
function generateIndent(length) {
  return Array.from({length}, (_, i) => i)
    .map(v => ' ')
    .join('');
}

function generateString(str) {
  return `\x1b[90m"${str}"\x1b[37m`;
}
function generateNumber(num) {
  return `\x1b[33m${num}\x1b[37m`;
}
function generateUndefinedOrNull(uon) {
  return `\x1b[33m\x1b[2m${uon}\x1b[0m`;
}

function generateObjKey(key) {
  return `\x1b[36m${key}\x1b[37m: `;
}
function generateBoolean(bool) {
  return bool ? '\x1b[32mtrue\x1b[0m' : '\x1b[31mfalse\x1b[0m';
}

function stringifyArray(arr = [], indent = 2) {
  let items = arr.map(item => {
    if (typeof item === 'string')
      return generateIndent(indent) + generateString(item) + ',';
    else if (typeof item === 'number')
      return generateIndent(indent) + generateNumber(item) + ',';
    else if (typeof item === 'boolean')
      return generateIndent(indent) + generateBoolean(item) + ',';
    else if (Array.isArray(item))
      return generateIndent(indent) + stringifyArray(item, indent + 2) + ',';
    else if (typeof item === 'object')
      return generateIndent(indent) + stringifyObject(item, indent + 2) + ',';
    else if (typeof item === 'undefined')
      return generateIndent(indent) + generateUndefinedOrNull(item) + ',';
    else return JSON.stringify(item);
  });
  items.unshift('\x1b[35m[\x1b[37m');
  items.push(generateIndent(indent - 2) + '\x1b[35m]\x1b[37m');
  return items.join('\n');
}
function stringifyObject(obj, indent = 2) {
  if (obj === null) return generateUndefinedOrNull(obj);
  let entries = Object.entries(obj).map(([key, value]) => {
    if (value === null || value === undefined)
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        generateUndefinedOrNull(value) +
        ','
      );
    else if (typeof value === 'string')
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        generateString(value) +
        ','
      );
    else if (typeof value === 'number')
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        generateNumber(value) +
        ','
      );
    else if (typeof value === 'boolean')
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        generateBoolean(value) +
        ','
      );
    else if (Array.isArray(value))
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        stringifyArray(value, indent + 2) +
        ','
      );
    else if (typeof value === 'object')
      return (
        generateIndent(indent) +
        generateObjKey(key) +
        stringifyObject(value, indent + 2) +
        ','
      );
  });
  entries.unshift('\x1b[35m{\x1b[37m');
  entries.push(generateIndent(indent - 2) + '\x1b[35m}\x1b[37m');
  return entries.join('\n');
}
function prettylog(name, ...args) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof name !== 'string') {
      console.log(
        '\x1b[37m\x1b[41m\x1b[1mLOG ERROR:\x1b[0m First argument must be string which is used for displaying log name',
      );
      return;
    }
    let aargs = args?.map(arg => {
      if (arg === null || arg === undefined)
        return generateUndefinedOrNull(arg);
      else if (typeof arg === 'string') return generateString(arg);
      else if (typeof arg === 'number') return generateNumber(arg);
      else if (typeof arg === 'boolean') return generateBoolean(arg);
      if (Array.isArray(arg)) return stringifyArray(arg);
      if (typeof arg === 'object') return stringifyObject(arg);
      return arg;
    });
    console.log(
      `\x1b[7m\x1b[1m\x1b[5m ${name?.toUpperCase()} \x1b[0m\n`,
      aargs.join(
        '\n---------------------------------------------------------\n',
      ),
    );
  }
}

export default prettylog;
