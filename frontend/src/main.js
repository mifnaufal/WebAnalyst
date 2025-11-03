import { createApp } from 'vue'
import { createToastInterface } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/main.css'
import App from './App.vue'
import Home from './pages/Home.vue'

const app = createApp(App)
app.component('Home', Home)

// Setup Toast
const toastOptions = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
}
app.use(createToastInterface(toastOptions))

app.mount('#app')``