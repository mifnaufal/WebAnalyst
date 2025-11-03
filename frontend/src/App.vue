<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow py-3 px-6 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">
        Security Request Analyzer
      </h1>
      <button @click="toggleDark()" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-3.364-1.864L7.046 17.5M4.5 12H2.25m1.864-6.364L7.046 6.5M12 5.25V3m3.364 1.864L16.954 6.5M19.5 12h2.25m-1.864 6.364L18.21 17.5m-3.364-1.864L13.254 17.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </header>
    
    <!-- Konten Utama -->
    <main>
      <Home />
    </main>
    
    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>