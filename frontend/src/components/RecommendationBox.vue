<script setup>
import { ref, watch } from 'vue'
import { getRecommendations } from '@/services/aiService'
import { useToast } from 'vue-toastification'

const props = defineProps({
  requestData: {
    type: Object,
    default: null
  }
})

const toast = useToast()
const recommendations = ref([])
const isLoading = ref(false)

watch(() => props.requestData, async (newVal) => {
  if (!newVal) return
  
  isLoading.value = true
  recommendations.value = []
  
  try {
    const data = await getRecommendations(newVal)
    recommendations.value = data
  } catch (error) {
    toast.error('Gagal mendapatkan rekomendasi AI')
  } finally {
    isLoading.value = false
  }
}, { immediate: true })
</script>

<template>
  <div class="panel flex flex-col h-full">
    <div class="p-3 border-b border-[var(--border-color)]">
      <h2 class="font-bold flex items-center">
        AI Recommendations
        <span v-if="isLoading" class="ml-2 loading loading-spinner loading-sm"></span>
      </h2>
    </div>
    
    <div class="flex-1 p-4 overflow-auto">
      <div v-if="recommendations.length === 0" class="text-gray-500 text-center h-full flex flex-col justify-center">
        <p>Kirim request untuk mendapatkan rekomendasi</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="(rec, index) in recommendations" 
          :key="index"
          class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <span class="font-mono text-blue-800 dark:text-blue-300">⚡</span> 
          {{ rec }}
        </div>
      </div>
    </div>
  </div>
</template>