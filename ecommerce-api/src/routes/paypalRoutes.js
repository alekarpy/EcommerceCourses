import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createOrder,
  captureOrder,
  getOrder
} from '../controllers/paypalController.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Crear orden de PayPal
router.post('/create-order', createOrder);

// Capturar pago de PayPal
router.post('/capture-order', captureOrder);

// Obtener detalles de orden de PayPal
router.get('/order/:paypalOrderId', getOrder);

export default router;





