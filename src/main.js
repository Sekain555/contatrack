import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            background: '#F3F4F6',
            primary: '#374151',
            buttonprimary: '#2563EB',
            buttonerror: '#FF0000',
            card: '#FAFAFA',
            sidebar: '#1E3A8A',
            white: '#FFFFFF',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        style: 'font-family: "Inter", sans-serif;'
      },
      VCard: {
        color: 'white',
      },
      VCardActions: {
        style: 'font-family: "Inter", sans-serif;'
      },
      VCardTitle: {
        style: 'font-family: "Space Grotesk", sans-serif; font-weight: bold;'
      },
      VCardSubtitle: {
        style: 'font-family: "Inter", sans-serif;'
      },
      VListItem: {
        density: 'compact',
        style: 'font-family: "Inter", sans-serif;'
      },
      VListItemTitle: {
        style: 'font-family: "Inter", sans-serif;'
      },
      VListSubheader: {
        class: 'text-body-1',
        color: 'white',
        style: 'font-family: "Space Grotesk", sans-serif; font-weight: bold;'
      },
      VTextField: {
        style: 'font-family: "Inter", sans-serif;'
      },
      VToolbarTitle: {
        style: 'font-family: "Space Grotesk", sans-serif; font-weight: bold;'
      }
    }
  })
  
  createApp(App).use(router).use(vuetify).mount('#app')
