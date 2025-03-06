// src/stores/loading.js
import { writable } from 'svelte/store';

export const isOpenModal = writable(false);

export function showPixModal() {
	isOpenModal.set(true);
}

export function hidePixModal() {
	isOpenModal.set(false);
}
