<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { ChevronLeft, ChevronRight } from 'svelte-heros-v2'; // Ou de outro pacote de ícones
  
    export let currentPage: number = 1;
    export let totalPages: number = 1;
    export let onPageChange: (page: number) => void;
  
    const dispatch = createEventDispatcher();
  
    // Funções para navegação
    function goToPreviousPage() {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    }
  
    function goToNextPage() {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    }
  
    function goToPage(page: number) {
      onPageChange(page);
    }
  </script>
  
  <div class="flex space-x-4 justify-end p-4">
    <!-- Botão Anterior -->
    <button
      class="flex items-center px-4 py-2 bg-white text-gray-300 disabled:text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border:bg-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
      on:click={goToPreviousPage}
      disabled={currentPage === 1}
    >
      <ChevronLeft size="20" class="text-black" />
    </button>
  
    <!-- Exibir a Página Atual -->
    {#each { length: totalPages } as _, index}
      <button
        class="flex items-center px-4 py-2 bg-white text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border-gray-300 disabled:text-black disabled:border-gray-300 disabled:cursor-not-allowed"
        on:click={() => goToPage(index + 1)}
        disabled={currentPage === index + 1}
      >
        {index + 1}
      </button>
    {/each}
  
    <!-- Botão Próximo -->
    <button
      class="flex items-center px-4 py-2 bg-white text-gray-300 disabled:text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border-gray-300 disabled:cursor-not-allowed"
      on:click={goToNextPage}
      disabled={currentPage === totalPages}
    >
      <ChevronRight size="20" class="text-black" />
    </button>
  </div>
  
  