const model = require('../models/venta.model');
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
    if (req.body.id_producto === undefined || req.body.id_producto === null || req.body.id_producto === '') return res.status(400).json({ mensaje: 'El campo id_producto es obligatorio.' });
    if (req.body.id_vendedor === undefined || req.body.id_vendedor === null || req.body.id_vendedor === '') return res.status(400).json({ mensaje: 'El campo id_vendedor es obligatorio.' });
    if (req.body.cantidad === undefined || req.body.cantidad === null || req.body.cantidad === '') return res.status(400).json({ mensaje: 'El campo cantidad es obligatorio.' });
    if (req.body.precio_unitario === undefined || req.body.precio_unitario === null || req.body.precio_unitario === '') return res.status(400).json({ mensaje: 'El campo precio_unitario es obligatorio.' });
  const item = await model.crear(req.body);
  res.status(201).json(item);
});

exports.actualizar = asyncHandler(async (req, res) => {
    if (req.body.id_producto === undefined || req.body.id_producto === null || req.body.id_producto === '') return res.status(400).json({ mensaje: 'El campo id_producto es obligatorio.' });
    if (req.body.id_vendedor === undefined || req.body.id_vendedor === null || req.body.id_vendedor === '') return res.status(400).json({ mensaje: 'El campo id_vendedor es obligatorio.' });
    if (req.body.cantidad === undefined || req.body.cantidad === null || req.body.cantidad === '') return res.status(400).json({ mensaje: 'El campo cantidad es obligatorio.' });
    if (req.body.precio_unitario === undefined || req.body.precio_unitario === null || req.body.precio_unitario === '') return res.status(400).json({ mensaje: 'El campo precio_unitario es obligatorio.' });
  const item = await model.actualizar(req.params.id, req.body);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json(item);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const item = await model.eliminar(req.params.id);
  if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado.' });
  res.json({ mensaje: 'Registro eliminado correctamente.' });
});
