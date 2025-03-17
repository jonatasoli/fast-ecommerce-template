import type { RequestHandler } from '@sveltejs/kit';

const MERCADO_PAGO_ACCESS_TOKEN = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN; // Substitua pelo seu token

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('🔔 Webhook recebido:', body);

    // Verificar se a ação é 'payment.created' e se há um ID de pagamento
    if (body.action === 'payment.created' && body.data.id) {
      const paymentId = body.data.id;

      // Consultar o status do pagamento na API do Mercado Pago
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

      // Aqui você pode salvar o status no banco de dados ou enviar notificação ao usuário
      switch (paymentData.status) {
        case 'approved':
          console.log('Pagamento aprovado');
          // Salve como aprovado no banco de dados
          break;
        case 'rejected':
          console.log('Pagamento rejeitado');
          // Notifique o usuário sobre a rejeição
          break;
        case 'pending':
          console.log('Pagamento pendente');
          // Alerta ou notifique o usuário sobre o pagamento pendente
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
