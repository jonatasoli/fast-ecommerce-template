import { writable } from 'svelte/store';

interface IConfig {
	onSuccess(): void;
	onError(): void;
	onTimeout(): void;
}

const PAYMENT_STATUS = {
	ERROR: 'REJECTED',
	SUCCESS: 'APPROVED',
	PENDING: 'PENDING',
	WAITING: null
} as const;

const STATUS_CHECK_INTERVAL = 1000; 
const STATUS_CHECK_TIMEOUT = 1000 * 60 * 5; 

type Status = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export function usePaymentStatus({ onError, onSuccess, onTimeout }: IConfig) {
	const status = writable<Status>(PAYMENT_STATUS.WAITING);
	const timeLeft = writable(STATUS_CHECK_TIMEOUT / 1000); 

	let checkingInterval: NodeJS.Timeout;
	let checkingTimeout: NodeJS.Timeout;
	let timeUpdateInterval: NodeJS.Timeout;
	let timeoutStart = Date.now();

	const mapStatus = (status?: string | null): Status => {
		return status ? (status.toUpperCase() as Status) : PAYMENT_STATUS.WAITING;
	};

	async function getPaymentStatus(paymentId: string): Promise<Status> {
		try {
			const response = await fetch('/api/cart/payment/status', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ paymentId })
			});

			if (!response.ok) throw new Error('Erro ao buscar status do pagamento');

			const { data } = await response.json();
			return mapStatus(data.status);
		} catch {
			return PAYMENT_STATUS.ERROR;
		}
	}

	function stopChecking() {
		clearInterval(checkingInterval);
		clearTimeout(checkingTimeout);
		clearInterval(timeUpdateInterval);
	}

	function startChecking(paymentId: string) {
		timeoutStart = Date.now();
		timeLeft.set(STATUS_CHECK_TIMEOUT / 1000); 

		
		timeUpdateInterval = setInterval(() => {
			const elapsed = Date.now() - timeoutStart;
			const remaining = Math.max(Math.ceil((STATUS_CHECK_TIMEOUT - elapsed) / 1000), 0);
			timeLeft.set(remaining);

			if (remaining <= 0) {
				clearInterval(timeUpdateInterval);
			}
		}, 1000);

		
		checkingInterval = setInterval(async () => {
			const newStatus = await getPaymentStatus(paymentId);
			console.log('Novo status recebido:', newStatus);
			status.set(newStatus);

			if (newStatus === PAYMENT_STATUS.SUCCESS) {
				onSuccess();
				stopChecking();
			} else if (newStatus === PAYMENT_STATUS.ERROR) {
				onError();
				stopChecking();
			}
		}, STATUS_CHECK_INTERVAL);


		checkingTimeout = setTimeout(() => {
			stopChecking();
			onTimeout();
		}, STATUS_CHECK_TIMEOUT);
	}

	return {
		status,
		start: startChecking,
		stop: stopChecking,
		timeLeft
	};
}
