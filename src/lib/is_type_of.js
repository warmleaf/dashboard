export default function isTypeOf(arg) {
  const type = Object.prototype.toString.call(arg);
  switch (true) {
    case type.indexOf('Array') > 0:
      return 'array';
    case type.indexOf('Number') > 0:
      return 'number';
    case type.indexOf('String') > 0:
      return 'string';
    case type.indexOf('Boolean') > 0:
      return 'boolean';
    case type.indexOf('Undefined') > 0:
      return 'undefined';
    case type.indexOf('Null') > 0:
      return 'null';
    case type.indexOf('Object') > 0:
      return 'object';
    case type.indexOf('Function') > 0:
      return 'function';
    default:
      return 'unknown';
  }
}
