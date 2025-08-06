import { writable } from 'svelte/store';
import type { CartAddress } from '$lib/types';

const initialAddress: CartAddress = {
	shipping_is_payment: false,
	user_address_id: null,
	shipping_address_id: null,
	user_address: {
		active: true,
		address_complement: '',
		address_id: null,
		city: '',
		country: '',
		neighborhood: '',
		state: '',
		street: '',
		street_number: '',
		user_id: null,
		zipcode: ''
	},
	shipping_address: {
		active: true,
		address_complement: '',
		address_id: null,
		city: '',
		country: '',
		neighborhood: '',
		state: '',
		street: '',
		street_number: '',
		user_id: null,
		zipcode: ''
	},
	token: null
};

export const address = writable<CartAddress>(initialAddress);

export async function getAddressByZipcode(
	zipcode: string,
	typeAddress: 'user_address' | 'shipping_address'
) {
	try {
		const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);

		if (!response.ok) {
			throw new Error('Erro ao buscar endereço');
		}

		const responseData = await response.json();

		address.update((addr) => ({
			...addr,
			[typeAddress]: {
				...addr[typeAddress],
				country: 'Brasil', // TODO: i18n
				state: responseData.uf,
				city: responseData.localidade,
				neighborhood: responseData.bairro,
				street: responseData.logradouro,
				street_number: '',
				address_complement: '',
				zipcode: responseData.cep
			}
		}));

		return responseData;
	} catch (error) {
		console.error('Erro ao buscar endereço:', error);
		throw error;
	}
}
