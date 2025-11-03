<template>
  <div class="p-4 flex flex-col h-full bg-gray-800">
    <h2 class="text-lg font-semibold mb-3 text-white">✅ Server Response</h2>
    <div class="flex-grow p-2 font-mono text-sm bg-gray-900 text-green-400 overflow-auto border border-gray-700">
      <p class="mb-2">Status: 200 OK</p>
      <p class="mb-2">Headers:</p>
      <pre class="whitespace-pre-wrap text-white">Content-Type: application/json
Content-Length: 120</pre>
      <p class="mt-4 mb-2">Body:</p>
      <pre class="whitespace-pre-wrap text-white">{ "message": "Response body here..." }</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
// ...
</script>