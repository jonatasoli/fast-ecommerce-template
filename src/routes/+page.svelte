<script>
	const products = [
		{
			product_id: 88,
			name: 'novo produto outubro teste',
			uri: 'novo-produto-outubro-teste',
			price: '2321',
			active: false,
			direct_sales: false,
			description: {
				content: 'Description',
				composition: 'Description',
				how_to_use: 'Description'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/peixe.jpg',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 6,
			showcase: false,
			show_discount: false,
			height: 10,
			width: 0,
			weight: 110,
			length: 10,
			diameter: null,
			quantity: 0,
			sku: 'asdojfa32K'
		},
		{
			product_id: 87,
			name: 'Novo produto outubro',
			uri: 'novo-produto-outubro',
			price: '324',
			active: false,
			direct_sales: false,
			description: {
				content: '<p>asdfasdfa</p>',
				composition: '<p>asdfasd</p>',
				how_to_use: '<p>asdfasdf</p>'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/craft.jpg',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 12,
			showcase: false,
			show_discount: false,
			height: 10,
			width: 0,
			weight: 110,
			length: 10,
			diameter: null,
			quantity: 0,
			sku: 'eradsf'
		},
		{
			product_id: 86,
			name: 'SHOWER - SHAMPOO PRO BASIC - 1000ML',
			uri: 'shower-shampoo-pro-basic-1000ml',
			price: '69.1',
			active: true,
			direct_sales: false,
			description: {
				content: 'Description',
				composition: 'Description',
				how_to_use: 'Description'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/03 - LEAVE-IN 2,5L.jpg',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 6,
			showcase: false,
			show_discount: false,
			height: 9,
			width: 0,
			weight: 0,
			length: 0,
			diameter: 9,
			quantity: 2,
			sku: 'SHOWERSHAMPOO1L'
		},
		{
			product_id: 85,
			name: 'SHOWER - LEAVE IN PRO BASIC - 2,5LT',
			uri: 'shower-leave-in-pro-basic-25lt',
			price: '189',
			active: true,
			direct_sales: false,
			description: {
				content: 'Description',
				composition: 'Composition',
				how_to_use: 'Use'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/03 - LEAVE-IN 2,5L.png',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 6,
			showcase: false,
			show_discount: false,
			height: 9,
			width: 0,
			weight: 1727,
			length: 0,
			diameter: 9,
			quantity: 0,
			sku: 'SHOWERLEAVEIN'
		},
		{
			product_id: 84,
			name: 'novo produto com imagem grande 4K',
			uri: 'novo-produto-com-imagem-grande-4k',
			price: '2342',
			active: false,
			direct_sales: false,
			description: {
				content: 'Novo produto com imagem',
				composition: 'Composition',
				how_to_use: 'Use'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/roda-fev.png',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 5,
			showcase: false,
			show_discount: false,
			height: 1110,
			width: 10,
			weight: 1110,
			length: 0,
			diameter: 9,
			quantity: 6,
			sku: 'asdfasdf123asdfa'
		},
		{
			product_id: 83,
			name: 'novo produto com descrição longa',
			uri: 'novo-produto-com-descricao-longa',
			price: '2342',
			active: false,
			direct_sales: false,
			description: {
				content: 'Content',
				composition: 'Composition',
				how_to_use: 'Use'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/cogmind.png',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 3,
			showcase: false,
			show_discount: false,
			height: 120,
			width: 10,
			weight: 9,
			length: 0,
			diameter: null,
			quantity: 0,
			sku: 'asdfsadfasg23894shadfdsf'
		},
		{
			product_id: 82,
			name: 'teste32',
			uri: 'teste32',
			price: '432',
			active: false,
			direct_sales: false,
			description: {
				content: '<p>234324</p>',
				composition: '<p>2423</p>',
				how_to_use: '<p>234234</p>'
			},
			image_path: null,
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 3,
			showcase: false,
			show_discount: false,
			height: 2340,
			width: 19,
			weight: 2,
			length: 2,
			diameter: null,
			quantity: 0,
			sku: '23423'
		},
		{
			product_id: 81,
			name: 'Teste 02',
			uri: 'teste-02',
			price: '245.04',
			active: false,
			direct_sales: false,
			description: {
				content: '<h2>Teste</h2>',
				how_to_use: '<h1>Modo de uso</h1><ol><li>passo 1</li></ol>'
			},
			image_path: 'https://cdn.gattorosa.com.br/staging/teste.jpg',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 4,
			showcase: false,
			show_discount: false,
			height: 9,
			width: 0,
			weight: 9,
			length: 0,
			diameter: 9,
			quantity: 0,
			sku: 'DFSD2020'
		},
		{
			product_id: 80,
			name: 'AdminGPON',
			uri: 'admingpon',
			price: '1',
			active: false,
			direct_sales: false,
			description: {
				content: '<h2>Teste 021</h2>'
			},
			image_path: '',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 3,
			showcase: false,
			show_discount: false,
			height: 9,
			width: 0,
			weight: 0,
			length: 0,
			diameter: 9,
			quantity: 0,
			sku: 'DFSD2020'
		},
		{
			product_id: 79,
			name: 'Teste 02',
			uri: 'teste-02',
			price: '245.04',
			active: false,
			direct_sales: false,
			description: {
				content: '<h2>Teste 2</h2>'
			},
			image_path: '',
			installments_config: 1,
			installments_list: null,
			discount: null,
			category_id: 4,
			showcase: false,
			show_discount: false,
			height: 0,
			width: 0,
			weight: 0,
			length: 0,
			diameter: null,
			quantity: 0,
			sku: 'DFSD2020'
		}
	];
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-primary text-2xl lg:text-5xl font-light my-8 mt-8 mb-4 text-center uppercase">
		COMBOS
	</h1>
	<p class="text-gray-400 text-base font-medium leading-5 mb-8 text-center">22 Produtos</p>
</div>

<div class="flex justify-center items-center min-h-screen">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
		{#each products as product}
			<div
				class=" flex flex-col rounded-3xl border border-primary overflow-hidden shadow-lg lg:w-64"
			>
				<div class="relative w-full h-0 pb-[76.03%] overflow-hidden">
					<img
						class="absolute top-0 left-0 w-full h-full object-cover"
						src={product.image_path}
						alt={product.name}
					/>
				</div>
				<div class="product-item__content p-3 pb-4 flex-1">
					<div class="name font-medium text-base leading-5 min-h-[2.5rem] mb-1">{product.name}</div>
					<a
						href={product.uri}
						class="uppercase text-black block text-sm overflow-hidden line-clamp-2 transition-all hover:text-primary"
					>
						{product.description.content}
					</a>
					<div class="container-price flex flex-col gap-2 mt-6">
						<p class="price text-primary font-semibold text-xl m-0">R$ {product.price}</p>
					</div>
				</div>
				<button
					class="product-item__buy w-full inline-flex justify-center items-center text-white bg-primary cursor-pointer text-xl py-4 transition-all duration-300 hover:bg-opacity-80"
				>
					Comprar
				</button>
			</div>
		{/each}
	</div>
</div>
