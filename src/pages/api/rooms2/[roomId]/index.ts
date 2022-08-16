import getHandler from '@/pages/api/getHandler'
import pool from '@/pages/api/pool'

const handler = getHandler()

handler.get(async (req, res) => {
  const { roomId } = req.query
  if (roomId === '') return res.json([])
  const query =
    'SELECT master.tbl_clientes.nombre AS nombre_cliente, master.tbl_clientes.apellido AS apellido_cliente, master.tbl_habitaciones.id, master.tbl_reservas_detalle.check_in_fecha, master.tbl_reservas_detalle.check_out_fecha, master.tbl_reservas_detalle.deleted_at, master.tbl_habitaciones.piso, master.tbl_habitaciones.numero, master.tbl_habitaciones.personas_minimo, master.tbl_habitaciones.personas_maximo, master.tbl_habitaciones_tipo.nombre as tipo_habitacion, master.tbl_reservas_detalle.id_reservas_grupo, master.tbl_reservas_grupo.id_reservas_estado, master.tbl_reservas_grupo.id_reservas, master.tbl_reservas_detalle.id_habitacion_tipo from master.tbl_reservas_detalle INNER JOIN master.tbl_habitaciones on master.tbl_reservas_detalle.id_habitacion = master.tbl_habitaciones.id INNER JOIN master.tbl_habitaciones_tipo on master.tbl_habitaciones.id_habitacion_tipo = master.tbl_habitaciones_tipo.id INNER JOIN master.tbl_reservas_grupo on master.tbl_reservas_detalle.id_reservas_grupo = master.tbl_reservas_grupo.id INNER JOIN master.tbl_reservas on master.tbl_reservas_grupo.id_reservas = master.tbl_reservas.id INNER JOIN master.tbl_clientes on master.tbl_reservas.id_cliente = master.tbl_clientes.id WHERE master.tbl_habitaciones.deleted_at is null and master.tbl_reservas_detalle.deleted_at is null and master.tbl_reservas_detalle.deleted_at is null and master.tbl_habitaciones.numero = $1 and (DATE(master.tbl_reservas_detalle.check_in_fecha) <= CURRENT_DATE and CURRENT_DATE <= DATE(master.tbl_reservas_detalle.check_out_fecha)) GROUP BY master.tbl_clientes.id, master.tbl_clientes.nombre, master.tbl_clientes.apellido, master.tbl_habitaciones.id, master.tbl_reservas_detalle.check_in_fecha, master.tbl_reservas_detalle.check_out_fecha, master.tbl_reservas_detalle.deleted_at, master.tbl_habitaciones.piso, master.tbl_habitaciones.numero, master.tbl_habitaciones.personas_minimo, master.tbl_habitaciones.personas_maximo, master.tbl_habitaciones_tipo.nombre, master.tbl_reservas_detalle.id_reservas_grupo, master.tbl_reservas_grupo.id_reservas_estado, master.tbl_reservas_grupo.id_reservas, master.tbl_reservas_detalle.id_habitacion_tipo ORDER BY DATE(master.tbl_reservas_detalle.check_in_fecha) ASC, DATE(master.tbl_reservas_detalle.check_out_fecha) DESC LIMIT 1'
  const response = await pool.query(query, [roomId])
  res.json(response.rows)
})

export default handler
