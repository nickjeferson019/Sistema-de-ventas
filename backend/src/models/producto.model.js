const db = require('../config/db');

const columns = `id_producto, nombre, descripcion, precio, stock, activo, fecha_creacion`;

async function listar() {
  return (await db.query(`SELECT ${columns} FROM productos ORDER BY id_producto`)).rows;
}
async function obtener(id) {
  return (await db.query(`SELECT ${columns} FROM productos WHERE id_producto = $1`, [id])).rows[0];
}
async function crear(data) {
  const { nombre, descripcion = null, precio, stock = 0, activo = true } = data;
  const result = await db.query(
    `INSERT INTO productos (nombre, descripcion, precio, stock, activo)
     VALUES ($1, $2, $3, $4, $5) RETURNING ${columns}`,
    [nombre, descripcion, precio, stock, activo]
  );
  return result.rows[0];
}
async function actualizar(id, data) {
  const { nombre, descripcion = null, precio, stock = 0, activo = true } = data;
  const result = await db.query(
    `UPDATE productos SET nombre=$1, descripcion=$2, precio=$3, stock=$4, activo=$5
     WHERE id_producto=$6 RETURNING ${columns}`,
    [nombre, descripcion, precio, stock, activo, id]
  );
  return result.rows[0];
}
async function eliminar(id) {
  return (await db.query('DELETE FROM productos WHERE id_producto=$1 RETURNING id_producto', [id])).rows[0];
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
