import type { RequestHandler } from '@sveltejs/kit';

const MERCADO_PAGO_ACCESS_TOKEN = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN; 

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('🔔 Webhook recebido:', body);

    
    if (body.action === 'payment.created' && body.data.id) {
      const paymentId = body.data.id;

    
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao consultar pagamento');
      }

      const paymentData = await response.json();
      console.log('💰 Status do pagamento:', paymentData.status);

    
      switch (paymentData.status) {
        case 'approved':
          console.log('Pagamento aprovado');
    
          break;
        case 'rejected':
          console.log('Pagamento rejeitado');
    
          break;
        case 'pending':
          console.log('Pagamento pendente');
    
          break;
        default:
          console.log('Status desconhecido:', paymentData.status);
          break;
      }

      return new Response('OK', { status: 200 });
    }

    return new Response('Webhook ignorado', { status: 200 });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response('Erro no servidor', { status: 500 });
  }
};
