module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.code === '23505') {
    return res.status(409).json({ mensaje: 'Ya existe un registro con ese dato único.' });
  }
  if (err.code === '23503') {
    return res.status(409).json({ mensaje: 'No se puede realizar la operación porque hay registros relacionados.' });
  }
  if (err.code === '23514' || err.code === '22P02' || err.code === '22003') {
    return res.status(400).json({ mensaje: 'Los datos enviados no son válidos.' });
  }

  res.status(err.status || 500).json({
    mensaje: err.status ? err.message : 'Error interno del servidor',
  });
};
