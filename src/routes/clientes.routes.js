import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET /clientes
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM cliente ORDER BY idcliente'
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error.message);

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});

// POST /clientes
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({
        mensaje: 'nombre, email y telefono son obligatorios'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO cliente (nombre, email, telefono)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, email, telefono]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear cliente:', error.message);

    if (error.code === '23505') {
      return res.status(409).json({
        mensaje: 'El email ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});
// GET /clientes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM cliente WHERE idcliente = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});
// PUT /clientes/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({
        mensaje: 'nombre, email y telefono son obligatorios'
      });
    }

    const resultado = await pool.query(
      `UPDATE cliente
       SET nombre = $1, email = $2, telefono = $3
       WHERE idcliente = $4
       RETURNING *`,
      [nombre, email, telefono, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar cliente:', error.message);

    if (error.code === '23505') {
      return res.status(409).json({
        mensaje: 'El email ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});
// DELETE /clientes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `DELETE FROM cliente
       WHERE idcliente = $1
       RETURNING *`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Cliente eliminado correctamente',
      cliente: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al eliminar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});
export default router;