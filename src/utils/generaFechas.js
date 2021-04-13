const dayjs = require('dayjs');

function inicioDeMes(date) {
  if (date === undefined || !Boolean(date)) {
    date = dayjs().startOf('month').format('YYYY-MM-DD');
  } else if (date && dayjs(date).isValid()) {
    date = dayjs(date).format('YYYY-MM-DD');
  }
  return date;
}

function hoy(date) {
  if (date === undefined || !Boolean(date)) {
    date = dayjs().format('YYYY-MM-DD');
  } else if (date && dayjs(date).isValid()) {
    date = dayjs(date).format('YYYY-MM-DD');
  }
  return date;
}

exports.inicioDeMes = inicioDeMes;
exports.hoy = hoy;
