<template>
  <div class="p-4 flex flex-col h-full bg-gray-900">
    <h2 class="text-lg font-semibold mb-3 text-white">✍️ Request HTTP (Raw)</h2>
    <textarea 
      class="flex-grow p-2 font-mono text-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
      placeholder="GET / HTTP/1.1&#10;Host: example.com&#10;..."></textarea>
    <button class="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">
      ⚡ Kirim Request
    </button>
  </div>
</template>
<script setup lang="ts">
// ...
</script>