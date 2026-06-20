import { createPayPalOrder, capturePayPalOrder, getPayPalOrder } from '../services/paypalService.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

/**
 * Crea una orden de PayPal
 * POST /api/paypal/create-order
 */
export const createOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'orderId es requerido'
      });
    }

    // Obtener la orden de nuestra base de datos
    const order = await Order.findById(orderId).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    // Verificar que el usuario sea el dueño de la orden
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No estás autorizado para acceder a esta orden'
      });
    }

    // Verificar que la orden esté en estado "Pendiente"
    if (order.status !== 'Pendiente') {
      return res.status(400).json({
        success: false,
        message: `La orden ya fue procesada. Estado actual: ${order.status}`
      });
    }

    // Crear la orden en PayPal
    const paypalOrder = await createPayPalOrder({
      amount: order.total,
      currency: 'MXN',
      description: `Compra de ${order.items.length} curso(s)`,
      orderId: order._id.toString(),
    });

    // Guardar el ID de PayPal en la orden (opcional, puedes crear un campo para esto)
    // order.paypalOrderId = paypalOrder.paypalOrderId;
    // await order.save();

    res.status(200).json({
      success: true,
      data: {
        paypalOrderId: paypalOrder.paypalOrderId,
        approvalUrl: paypalOrder.approvalUrl,
        status: paypalOrder.status,
      },
    });
  } catch (error) {
    console.error('❌ [PayPalController] Error al crear orden de PayPal:', error);
    next(error);
  }
};

/**
 * Captura un pago de PayPal y actualiza la orden
 * POST /api/paypal/capture-order
 */
export const captureOrder = async (req, res, next) => {
  try {
    const { paypalOrderId, orderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({
        success: false,
        message: 'paypalOrderId es requerido'
      });
    }

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'orderId es requerido'
      });
    }

    // Obtener la orden de nuestra base de datos
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    // Verificar que el usuario sea el dueño de la orden
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No estás autorizado para acceder a esta orden'
      });
    }

    // Capturar el pago en PayPal
    const capture = await capturePayPalOrder(paypalOrderId);

    if (capture.status === 'COMPLETED') {
      // Actualizar el estado de la orden a "Completado"
      order.status = 'Completado';
      await order.save();

      console.log('✅ [PayPalController] Pago capturado y orden actualizada:', {
        orderId: order._id,
        paypalOrderId: capture.paypalOrderId,
        status: order.status,
      });

      // Populate para devolver datos completos
      const populatedOrder = await Order.findById(order._id)
        .populate('items.product', 'title instructor image price');

      res.status(200).json({
        success: true,
        message: 'Pago capturado exitosamente',
        data: {
          order: populatedOrder,
          paypalCapture: capture,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: `El pago no se completó. Estado: ${capture.status}`,
        data: capture,
      });
    }
  } catch (error) {
    console.error('❌ [PayPalController] Error al capturar orden de PayPal:', error);
    next(error);
  }
};

/**
 * Obtiene los detalles de una orden de PayPal
 * GET /api/paypal/order/:paypalOrderId
 */
export const getOrder = async (req, res, next) => {
  try {
    const { paypalOrderId } = req.params;

    const paypalOrder = await getPayPalOrder(paypalOrderId);

    res.status(200).json({
      success: true,
      data: paypalOrder.order,
    });
  } catch (error) {
    console.error('❌ [PayPalController] Error al obtener orden de PayPal:', error);
    next(error);
  }
};





