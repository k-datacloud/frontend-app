// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600&display=swap'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          fontFamily: 'Noto Sans JP',
        },
      },
    },
  }
)
