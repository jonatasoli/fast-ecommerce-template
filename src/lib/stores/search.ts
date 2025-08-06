import { get } from 'svelte/store';

import { persisted } from 'svelte-persisted-store';


export const searchQuery = persisted<string>('searchQuery', '');

export function setSearchQuery(value: string) {
	searchQuery.set(value);
}

export function getSearchQuery() {
	return get(searchQuery); 
}
