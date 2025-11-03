<script setup>
import { ref } from 'vue'
import RequestEditor from '@/components/RequestEditor.vue'
import ResponseViewer from '@/components/ResponseViewer.vue'
import RecommendationBox from '@/components/RecommendationBox.vue'

const currentResponse = ref(null)
const requestData = ref(null)

const handleResponse = (data) => {
  currentResponse.value = data.response
  requestData.value = {
    request: data.request,
    response: data.response
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-[calc(100vh-4rem)]">
    <!-- Panel Kiri: Request Editor -->
    <div class="lg:col-span-1 h-full">
      <RequestEditor @response="handleResponse" />
    </div>
    
    <!-- Panel Kanan: Response Viewer -->
    <div class="lg:col-span-1 h-full">
      <ResponseViewer :response="currentResponse || {}" />
    </div>
    
    <!-- Panel Bawah: AI Recommendations -->
    <div class="lg:col-span-1 h-full">
      <RecommendationBox :requestData="requestData" />
    </div>
  </div>
</template>