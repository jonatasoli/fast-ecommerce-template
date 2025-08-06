
import { writable, type Writable } from 'svelte/store';
import type { User, Address } from '$lib/types';

const initialUserData: User = {
	user_id: null,
	name: '',
	password: '',
	document: '',
	phone: '',
	role_id: null,
	email: '',
	full_name: null,
	disabled: null,
	addresses: []
};

const createUserStore = (): Writable<User> & {
	setUser: (userData: User) => void;
	updateUser: (data: Partial<User>) => void;
	setAddresses: (addresses: Address[]) => void;
	resetUser: () => void;
} => {
	const store = writable<User>(initialUserData);
	const { subscribe, set, update } = store;

	return {
		subscribe,
		set,
		update,
		setUser: (userData: User) => set(userData),
		updateUser: (data: Partial<User>) => update((user) => ({ ...user, ...data })),
		setAddresses: (addresses: Address[]) => update((user) => ({ ...user, addresses })),
		resetUser: () => set(initialUserData)
	};
};

export const userStore = createUserStore();
