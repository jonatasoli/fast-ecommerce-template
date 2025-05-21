import { writable } from 'svelte/store';

export const paymentMethod = writable<'credit-card' | 'pix'>('credit-card');
