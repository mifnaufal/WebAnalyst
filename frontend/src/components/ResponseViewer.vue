<script setup>
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  response: {
    type: Object,
    default: () => ({ status_code: 0, headers: {}, body: '' })
  }
})

const { copy, isSupported } = useClipboard()
const activeTab = ref('body')

const formattedHeaders = computed(() => 
  Object.entries(props.response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')
)
</script>

<template>
  <div class="panel flex flex-col h-full">
    <div class="p-3 border-b border-[var(--border-color)]">
      <h2 class="font-bold">Response ({{ response.status_code }})</h2>
    </div>
    
    <div class="flex border-b border-[var(--border-color)]">
      <button 
        @click="activeTab = 'headers'"
        class="px-4 py-2" 
        :class="{'bg-blue-500 text-white': activeTab === 'headers'}"
      >
        Headers
      </button>
      <button 
        @click="activeTab = 'body'"
        class="px-4 py-2" 
        :class="{'bg-blue-500 text-white': activeTab === 'body'}"
      >
        Body
      </button>
    </div>
    
    <div class="flex-1 p-3 overflow-auto font-mono text-sm">
      <pre v-if="activeTab === 'headers'">{{ formattedHeaders }}</pre>
      <pre v-else>{{ response.body }}</pre>
    </div>
    
    <div v-if="isSupported" class="p-3 border-t border-[var(--border-color)]">
      <button 
        @click="copy(activeTab === 'headers' ? formattedHeaders : response.body)"
        class="text-blue-600 hover:underline"
      >
        Salin ke clipboard
      </button>
    </div>
  </div>
</template>