const { format, isValid, parseISO, startOfMonth } = require('date-fns');

function inicioDeMes(fecha) {
  if (fecha === undefined || !Boolean(fecha)) {
    fecha = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  } else if (fecha && isValid(new Date(fecha))) {
    fecha = format(parseISO(fecha), 'yyyy-MM-dd');
  }
  return fecha;
}

function diaDeHoy(fecha) {
  if (fecha === undefined || !Boolean(fecha)) {
    fecha = format(new Date(), 'yyyy-MM-dd');
  } else if (fecha && isValid(new Date(fecha))) {
    fecha = format(parseISO(fecha), 'yyyy-MM-dd');
  }
  return fecha;
}

exports.inicioDeMes = inicioDeMes;
exports.diaDeHoy = diaDeHoy;
