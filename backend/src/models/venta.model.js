const db = require('../config/db');

const select = `
  SELECT v.id_venta, v.id_producto, p.nombre AS producto,
         v.id_vendedor, ve.nombre || ' ' || ve.apellido AS vendedor,
         v.cantidad, v.precio_unitario, v.total, v.fecha_venta
  FROM ventas v
  JOIN productos p ON p.id_producto = v.id_producto
  JOIN vendedor ve ON ve.id_vendedor = v.id_vendedor`;

async function listar() {
  return (await db.query(`${select} ORDER BY v.id_venta DESC`)).rows;
}
async function obtener(id) {
  return (await db.query(`${select} WHERE v.id_venta=$1`, [id])).rows[0];
}
async function crear(data) {
  const { id_producto, id_vendedor, cantidad, precio_unitario, fecha_venta } = data;
  return (await db.query(
    `INSERT INTO ventas (id_producto, id_vendedor, cantidad, precio_unitario, fecha_venta)
     VALUES ($1,$2,$3,$4,COALESCE($5::timestamp, CURRENT_TIMESTAMP))
     RETURNING id_venta, id_producto, id_vendedor, cantidad, precio_unitario, total, fecha_venta`,
    [id_producto, id_vendedor, cantidad, precio_unitario, fecha_venta || null]
  )).rows[0];
}
async function actualizar(id, data) {
  const { id_producto, id_vendedor, cantidad, precio_unitario, fecha_venta } = data;
  return (await db.query(
    `UPDATE ventas SET id_producto=$1, id_vendedor=$2, cantidad=$3,
       precio_unitario=$4, fecha_venta=COALESCE($5::timestamp, fecha_venta)
     WHERE id_venta=$6
     RETURNING id_venta, id_producto, id_vendedor, cantidad, precio_unitario, total, fecha_venta`,
    [id_producto, id_vendedor, cantidad, precio_unitario, fecha_venta || null, id]
  )).rows[0];
}
async function eliminar(id) {
  return (await db.query('DELETE FROM ventas WHERE id_venta=$1 RETURNING id_venta', [id])).rows[0];
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
