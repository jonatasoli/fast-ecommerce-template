import { loadMercadoPago } from '@mercadopago/sdk-js';

interface CreateCardTokenProps {
	cardNumber: string;
	cardholderName: string;
	cardExpirationMonth: string;
	cardExpirationYear: string;
	securityCode: string;
	identificationType: string;
	identificationNumber: string;
}

interface CardToken {
	id: string;
	last_four_digits: string;
}

interface GetInstallmentsProps {
	amount: string;
	bin: string;
	paymentTypeId: string;
}

interface Installments {
	payer_costs: {
		installments: number;
		recommended_message: string;
	}[];
}

interface MercadoPago {
	createCardToken: (data: CreateCardTokenProps) => Promise<CardToken>;
	getInstallments: (data: GetInstallmentsProps) => Promise<Installments>;
}

interface CustomMercadoPago {
	new (publicKey: string, options: { locale: string }): MercadoPago;
}

type CustomWindow = {
	MercadoPago: CustomMercadoPago;
} & Window &
	typeof globalThis;

export class MercadoPagoService {
	private mercadoPago: MercadoPago | null = null;

	constructor() {
		this.init();
	}

	private async init() {
		if (typeof window === 'undefined') {
			return;
		}

		
		await loadMercadoPago();

		const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;
		if (!publicKey) {
			throw new Error('Mercado Pago Public Key não definida no .env');
		}

	
		this.mercadoPago = new (window as CustomWindow).MercadoPago(publicKey, {
			locale: 'pt-BR'
		});
	}

	
	async createCardToken(data: CreateCardTokenProps): Promise<CardToken> {
		if (!this.mercadoPago) {
			throw new Error('Mercado Pago não inicializado');
		}

		// eslint-disable-next-line no-useless-catch
		try {
			const response = await this.mercadoPago.createCardToken(data);
			return response; 
		} catch (error) {
			throw error; 
		}
	}

	
	async getInstallments(data: GetInstallmentsProps): Promise<Installments> {
		if (!this.mercadoPago) {
			throw new Error('Mercado Pago não inicializado');
		}

		// eslint-disable-next-line no-useless-catch
		try {
			const response = await this.mercadoPago.getInstallments(data);
			return response;
		} catch (error) {
			throw error; 
		}
	}
}


export const mercadoPagoService = new MercadoPagoService();
