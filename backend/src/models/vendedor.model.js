const db = require('../config/db');
const columns = `id_vendedor, nombre, apellido, correo, telefono, activo, fecha_creacion`;

async function listar() {
  return (await db.query(`SELECT ${columns} FROM vendedor ORDER BY id_vendedor`)).rows;
}
async function obtener(id) {
  return (await db.query(`SELECT ${columns} FROM vendedor WHERE id_vendedor=$1`, [id])).rows[0];
}
async function crear(data) {
  const { nombre, apellido, correo, telefono = null, activo = true } = data;
  return (await db.query(
    `INSERT INTO vendedor (nombre, apellido, correo, telefono, activo)
     VALUES ($1,$2,$3,$4,$5) RETURNING ${columns}`,
    [nombre, apellido, correo, telefono, activo]
  )).rows[0];
}
async function actualizar(id, data) {
  const { nombre, apellido, correo, telefono = null, activo = true } = data;
  return (await db.query(
    `UPDATE vendedor SET nombre=$1, apellido=$2, correo=$3, telefono=$4, activo=$5
     WHERE id_vendedor=$6 RETURNING ${columns}`,
    [nombre, apellido, correo, telefono, activo, id]
  )).rows[0];
}
async function eliminar(id) {
  return (await db.query('DELETE FROM vendedor WHERE id_vendedor=$1 RETURNING id_vendedor', [id])).rows[0];
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
