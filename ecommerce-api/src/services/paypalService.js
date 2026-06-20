import { Client, Environment, OrdersController } from '@paypal/paypal-server-sdk';

/**
 * Crea un cliente de PayPal
 */
function getPayPalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'; // 'sandbox' o 'live'

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not found. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env');
  }

  const client = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
    environment: environment === 'live' ? Environment.Production : Environment.Sandbox,
  });

  return client;
}

/**
 * Crea una orden de PayPal
 * @param {Object} orderData - Datos de la orden
 * @param {Number} orderData.amount - Monto total
 * @param {String} orderData.currency - Moneda (ej: 'USD', 'MXN')
 * @param {String} orderData.description - Descripción de la orden
 * @param {String} orderData.orderId - ID de la orden en nuestra base de datos
 * @returns {Promise<Object>} Respuesta de PayPal con el orderId y approvalUrl
 */
export async function createPayPalOrder(orderData) {
  try {
    const { amount, currency = 'MXN', description, orderId } = orderData;
    const client = getPayPalClient();

    // Crear el request body para la orden
    const requestBody = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId, // ID de nuestra orden
          description: description || 'Compra de cursos online',
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Tienda de Cursos',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:4200'}/checkout/success?orderId=${orderId}`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:4200'}/checkout/cancel?orderId=${orderId}`,
      },
    };

    // Instanciar OrdersController con el client
    const ordersController = new OrdersController(client);
    
    // Crear la orden usando el método createOrder
    const response = await ordersController.createOrder({
      body: requestBody,
      prefer: 'return=representation'
    });

    const order = response.result || response;
    
    console.log('✅ [PayPalService] Orden de PayPal creada:', {
      paypalOrderId: order.id,
      status: order.status,
      approvalUrl: order.links?.find(link => link.rel === 'approve')?.href
    });

    return {
      success: true,
      paypalOrderId: order.id,
      status: order.status,
      approvalUrl: order.links?.find(link => link.rel === 'approve')?.href,
      order: order,
    };
  } catch (error) {
    console.error('❌ [PayPalService] Error al crear orden de PayPal:', error);
    // El nuevo SDK puede lanzar errores con estructura diferente
    if (error.response) {
      console.error('Detalles del error:', {
        status: error.response.statusCode,
        body: error.response.body,
        headers: error.response.headers,
      });
    }
    throw error;
  }
}

/**
 * Captura un pago de PayPal
 * @param {String} paypalOrderId - ID de la orden de PayPal
 * @returns {Promise<Object>} Información del pago capturado
 */
export async function capturePayPalOrder(paypalOrderId) {
  try {
    const client = getPayPalClient();
    const ordersController = new OrdersController(client);

    // Capturar la orden usando el método captureOrder
    const response = await ordersController.captureOrder({
      id: paypalOrderId,
      body: {} // Body vacío para capture
    });

    const capture = response.result || response;

    console.log('✅ [PayPalService] Pago de PayPal capturado:', {
      paypalOrderId: capture.id,
      status: capture.status,
      payerEmail: capture.payer?.email_address,
      amount: capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value
    });

    return {
      success: true,
      paypalOrderId: capture.id,
      status: capture.status,
      payer: capture.payer,
      purchaseUnits: capture.purchase_units,
      capture: capture.purchase_units?.[0]?.payments?.captures?.[0],
    };
  } catch (error) {
    console.error('❌ [PayPalService] Error al capturar pago de PayPal:', error);
    if (error.response) {
      console.error('Detalles del error:', {
        status: error.response.statusCode,
        body: error.response.body,
        headers: error.response.headers,
      });
    }
    throw error;
  }
}

/**
 * Obtiene los detalles de una orden de PayPal
 * @param {String} paypalOrderId - ID de la orden de PayPal
 * @returns {Promise<Object>} Detalles de la orden
 */
export async function getPayPalOrder(paypalOrderId) {
  try {
    const client = getPayPalClient();
    const ordersController = new OrdersController(client);

    const response = await ordersController.getOrder({
      id: paypalOrderId
    });

    return {
      success: true,
      order: response.result || response,
    };
  } catch (error) {
    console.error('❌ [PayPalService] Error al obtener orden de PayPal:', error);
    if (error.response) {
      console.error('Detalles del error:', {
        status: error.response.statusCode,
        body: error.response.body,
      });
    }
    throw error;
  }
}





