const model = require('../models/vendedor.model');
const asyncHandler = require('../middlewares/asyncHandler');

exports.listar = asyncHandler(async (req, res) => {
  res.json(await model.listar());
});

exports.obtener = asyncHandler(async (req, res) => {
  const item = await model.obtener(req.params.id);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json(item);
});

exports.crear = asyncHandler(async (req, res) => {
    if (req.body.nombre === undefined || req.body.nombre === null || req.body.nombre === '') return res.status(400).json({ mensaje: 'El campo nombre es obligatorio.' });
    if (req.body.apellido === undefined || req.body.apellido === null || req.body.apellido === '') return res.status(400).json({ mensaje: 'El campo apellido es obligatorio.' });
    if (req.body.correo === undefined || req.body.correo === null || req.body.correo === '') return res.status(400).json({ mensaje: 'El campo correo es obligatorio.' });
  const item = await model.crear(req.body);
  res.status(201).json(item);
});

exports.actualizar = asyncHandler(async (req, res) => {
    if (req.body.nombre === undefined || req.body.nombre === null || req.body.nombre === '') return res.status(400).json({ mensaje: 'El campo nombre es obligatorio.' });
    if (req.body.apellido === undefined || req.body.apellido === null || req.body.apellido === '') return res.status(400).json({ mensaje: 'El campo apellido es obligatorio.' });
    if (req.body.correo === undefined || req.body.correo === null || req.body.correo === '') return res.status(400).json({ mensaje: 'El campo correo es obligatorio.' });
  const item = await model.actualizar(req.params.id, req.body);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json(item);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const item = await model.eliminar(req.params.id);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json({ mensaje: 'Registro eliminado correctamente.' });
});
