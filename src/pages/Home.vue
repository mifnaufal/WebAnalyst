<script setup lang="ts">
import Header from '../components/Header.vue'
import RequestEditor from '../components/RequestEditor.vue'
import ResponseViewer from '../components/ResponseViewer.vue'
import RecommendationBox from '../components/RecommendationBox.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-900">
    <Header />
    
    <div class="flex flex-grow overflow-hidden">
      <div class="w-1/2 border-r border-gray-700">
        <RequestEditor />
      </div>
      
      <div class="w-1/2">
        <ResponseViewer />
      </div>
    </div>

    <div class="h-1/4 max-h-[300px] min-h-[150px] border-t border-gray-700">
      <RecommendationBox />
    </div>
  </div>
</template>

<style scoped>
/* Optional: Tambahkan styling khusus jika diperlukan, tapi Tailwind sudah cukup untuk ini */
</style>