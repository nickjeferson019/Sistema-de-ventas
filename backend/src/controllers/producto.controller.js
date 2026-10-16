const model = require('../models/producto.model');
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
    if (req.body.precio === undefined || req.body.precio === null || req.body.precio === '') return res.status(400).json({ mensaje: 'El campo precio es obligatorio.' });
  const item = await model.crear(req.body);
  res.status(201).json(item);
});

exports.actualizar = asyncHandler(async (req, res) => {
    if (req.body.nombre === undefined || req.body.nombre === null || req.body.nombre === '') return res.status(400).json({ mensaje: 'El campo nombre es obligatorio.' });
    if (req.body.precio === undefined || req.body.precio === null || req.body.precio === '') return res.status(400).json({ mensaje: 'El campo precio es obligatorio.' });
  const item = await model.actualizar(req.params.id, req.body);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json(item);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const item = await model.eliminar(req.params.id);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json({ mensaje: 'Registro eliminado correctamente.' });
});
