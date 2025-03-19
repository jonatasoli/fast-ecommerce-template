import { get } from 'svelte/store';

import { persisted } from 'svelte-persisted-store';

// Store persistente para a busca
export const searchQuery = persisted<string>('searchQuery', '');

export function setSearchQuery(value: string) {
	searchQuery.set(value);
}

export function getSearchQuery() {
	return get(searchQuery); // Obtém o valor atual da store
}
