import { writable } from 'svelte/store';

export const paymentMethod = writable<'credit_card' | 'pix'>('credit_card');
