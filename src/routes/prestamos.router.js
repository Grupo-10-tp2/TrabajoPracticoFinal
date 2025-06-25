import { Router } from "express";
import { prestamosController } from "../controllers/prestamos.controller.js";

const prestamosRouter = Router();

prestamosRouter.post("/", prestamosController.crearPrestamoController);
/**
 * @swagger
 * /prestamos:
 *   get:
 *     summary: Obtener todos los préstamos.
 *     tags: [Préstamos]
 *     responses:
 *       200:
 *         description: Lista de préstamos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del préstamo.
 *                   juegoId:
 *                     type: string
 *                     description: ID del juego prestado.
 *                   prestatarioId:
 *                     type: string
 *                     description: ID del usuario que prestó el juego.
 *                   prestatarioNombre:
 *                     type: string
 *                     description: Nombre del usuario que prestó el juego.
 *                   prestatarioEmail:
 *                     type: string
 *                     format: email
 *                     description: Email del usuario que prestó el juego.
 *                   receptorId:
 *                     type: string
 *                     description: ID del usuario que recibió el juego.
 *                   receptorNombre:
 *                     type: string
 *                     description: Nombre del usuario que recibió el juego.
 *                   receptorEmail:
 *                     type: string
 *                     format: email
 *                     description: Email del usuario que recibió el juego.
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     description: Fecha en que se inició el préstamo.
 *                   fechaDevolucion:
 *                     type: string
 *                     format: date
 *                     description: Fecha en que se devolvió el préstamo (puede ser null).
 *                   estado:
 *                     type: string
 *                     enum: [activo, devuelto]
 *                     description: Estado actual del préstamo.
 */
prestamosRouter.get(
	"/",
	prestamosController.obtenerTodosLosPrestamosController,
);
prestamosRouter.put(
	"/devolver/:id",
	prestamosController.registrarDevolucionController,
);
/**
 * @swagger
 * /prestamos/{id}:
 *   get:
 *     summary: Obtener un préstamo por su ID.
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del préstamo.
 *     responses:
 *       200:
 *         description: Préstamo obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del préstamo.
 *                 juegoId:
 *                   type: string
 *                   description: ID del juego prestado.
 *                 prestatarioId:
 *                   type: string
 *                   description: ID del usuario que prestó el juego.
 *                 prestatarioNombre:
 *                   type: string
 *                   description: Nombre del usuario que prestó el juego.
 *                 prestatarioEmail:
 *                   type: string
 *                   format: email
 *                   description: Email del usuario que prestó el juego.
 *                 receptorId:
 *                   type: string
 *                   description: ID del usuario que recibió el juego.
 *                 receptorNombre:
 *                   type: string
 *                   description: Nombre del usuario que recibió el juego.
 *                 receptorEmail:
 *                   type: string
 *                   format: email
 *                   description: Email del usuario que recibió el juego.
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   description: Fecha en que se inició el préstamo.
 *                 fechaDevolucion:
 *                   type: string
 *                   format: date
 *                   description: Fecha en que se devolvió el préstamo (puede ser null).
 *                 estado:
 *                   type: string
 *                   enum: [activo, devuelto]
 *                   description: Estado actual del préstamo.
 *       404:
 *         description: Préstamo no encontrado. 
 */
prestamosRouter.get("/:id", prestamosController.obtenerPrestamoPorId);
prestamosRouter.get("/dados/:usuarioId", prestamosController.obtenerPrestamosPorUsuarioDados);
prestamosRouter.get("/recibidos/:usuarioId", prestamosController.obtenerPrestamosPorUsuarioRecibidos);
/**
 * @swagger
 * /prestamos/eliminar-logico/{id}:
 *   patch:
 *     summary: Realizar una eliminación lógica de un préstamo.
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del préstamo a eliminar lógicamente.
 *     responses:
 *       200:
 *         description: Préstamo eliminado lógicamente exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string 
 *                   example: Préstamo eliminado lógicamente.
 *                 id: 
 *                   type: string 
 *                   description: ID del préstamo actualizado. 
 *                 estado:
 *                   type: string
 *                   example: inactivo 
 *       404:
 *         description: Préstamo no encontrado. 
 */
prestamosRouter.patch("/eliminar-logico/:id", prestamosController.eliminarPrestamoLogico);
/**
 * @swagger
 * /prestamos/restaurar-prestamo/{id}:
 *   patch:
 *     summary: Restaurar un préstamo eliminado lógicamente.
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del préstamo a restaurar.
 *     responses:
 *       200:
 *         description: Préstamo restaurado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string 
 *                   example: Préstamo restaurado y activo.
 *                 id: 
 *                   type: string 
 *                   description: ID del préstamo actualizado. 
 *                 estado:
 *                   type: string
 *                   example: inactivo 
 *       404:
 *         description: Préstamo no encontrado. 
 */
prestamosRouter.patch("/restaurar-prestamo/:id", prestamosController.recuperarPrestamo);

export { prestamosRouter };
