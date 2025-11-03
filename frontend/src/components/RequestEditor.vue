<script setup>
import { ref } from 'vue'
import { sendRawRequest } from '@/services/requestService'
import { useToast } from 'vue-toastification'

const toast = useToast()
const emit = defineEmits(['response'])
const rawRequest = ref(`GET / HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: */*`)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const response = await sendRawRequest(rawRequest.value)
    emit('response', { 
      request: rawRequest.value, 
      response 
    })
    toast.success('Request berhasil dikirim!')
  } catch (error) {
    toast.error(`Gagal: ${error.message}`)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="panel flex flex-col h-full">
    <div class="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
      <h2 class="font-bold">HTTP Request</h2>
      <button 
        @click="handleSubmit"
        :disabled="isLoading"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded disabled:opacity-50"
      >
        {{ isLoading ? 'Mengirim...' : 'Kirim Request' }}
      </button>
    </div>
    
    <textarea
      v-model="rawRequest"
      class="flex-1 p-3 font-mono text-sm bg-transparent resize-none focus:outline-none"
      placeholder="Masukkan raw HTTP request (format Burp Suite)"
    ></textarea>
  </div>
</template>