<script setup lang="ts">
import { ref } from 'vue';
import Header from '../components/Header.vue';
import RequestEditor from '../components/RequestEditor.vue';
import ResponseViewer from '../components/ResponseViewer.vue';
import RecommendationBox from '../components/RecommendationBox.vue';
import { sendRequestToBackend } from '../services/requestClient';
import type { ParsedRequest } from '../utils/requestParser';

// --- State Aplikasi ---
const currentResponse = ref<any | null>(null);
const aiRecommendation = ref<string>('Menunggu request pertama...');
const isLoading = ref(false); // Untuk indikator loading

/**
 * Handler utama saat RequestEditor mengirim event 'send-request'
 */
async function handleRequest(request: ParsedRequest) {
    isLoading.value = true;
    currentResponse.value = null; // Reset tampilan
    aiRecommendation.value = 'Mengirim request ke target dan menganalisis AI... 🤖';

    // Panggil service yang call backend
    const result = await sendRequestToBackend(request);

    // Update state dengan data dari backend
    currentResponse.value = result.response;
    aiRecommendation.value = result.recommendation;
    isLoading.value = false;
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-900">
    <Header />
    
    <div class="flex flex-grow overflow-hidden">
      <div class="w-1/2 border-r border-gray-700">
        <RequestEditor @send-request="handleRequest" />
      </div>
      
      <div class="w-1/2">
        <ResponseViewer :response="currentResponse" :loading="isLoading" />
      </div>
    </div>

    <div class="h-1/4 max-h-[300px] min-h-[150px] border-t border-gray-700">
      <RecommendationBox :recommendation="aiRecommendation" :loading="isLoading" />
    </div>
  </div>
</template>