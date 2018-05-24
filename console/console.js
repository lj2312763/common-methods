window.console.success = function (str) {
  const success = [
    'background: green',
    'color: white',
    'display: block',
    'text-align: center'
  ].join(';');
  console.info('%c %s', success, str);
};
window.console.failure = function (str) {
  const failure = [
    'background: red',
    'color: white',
    'display: block',
    'text-align: center'
  ].join(';');
  console.error('%c %s', failure, str);
};