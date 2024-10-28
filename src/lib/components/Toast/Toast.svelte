<script>
	export let message = '';
	export let type = 'success'; // pode ser 'success' ou 'error'
	let show = false;

	// Mostrar o toast por um tempo determinado
	export const triggerToast = (msg, toastType = 'success', duration = 3000) => {
		message = msg;
		type = toastType;
		show = true;
		setTimeout(() => {
			show = false;
		}, duration);
	};
</script>

<div
	class={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out 
      ${show ? 'opacity-100' : 'opacity-0'} 
      ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
>
	{message}
</div>

<style>
	/* Adicione qualquer estilo adicional aqui */
</style>
