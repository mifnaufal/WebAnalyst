<template>
  <div class="p-4 bg-gray-700 border-t border-gray-600">
    <h2 class="text-lg font-semibold mb-2 text-white">🤖 Rekomendasi AI</h2>
    <div class="p-3 bg-gray-800 text-white text-sm min-h-[50px] overflow-auto">
      <p>AI sedang menganalisis request dan respons...</p>
      <p class="text-yellow-400 mt-2">Potensi Kerentanan Teridentifikasi: **SQL Injection**</p>
      <ul class="list-disc list-inside ml-2 mt-1">
        <li>Coba ganti nilai parameter 'id' dengan `' OR '1'='1' --`</li>
        <li>Cek apakah ada *error message* database di response.</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
// ...
</script>