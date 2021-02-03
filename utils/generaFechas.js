const moment = require('moment');

function inicioDeMes(fecha) {
  if (fecha === undefined || !Boolean(fecha)) {
    fecha = moment().startOf('month').format('YYYY-MM-DD');
  } else if (fecha && moment(fecha).isValid()) {
    fecha = moment(fecha).format('YYYY-MM-DD');
  }
  return fecha;
}

function diaDeHoy(fecha) {
  if (fecha === undefined || !Boolean(fecha)) {
    fecha = moment().format('YYYY-MM-DD');
  } else if (fecha && moment(fecha).isValid()) {
    fecha = moment(fecha).format('YYYY-MM-DD');
  }
  return fecha;
}

exports.inicioDeMes = inicioDeMes;
exports.diaDeHoy = diaDeHoy;
