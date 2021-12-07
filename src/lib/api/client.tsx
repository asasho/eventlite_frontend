import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true
}

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://eventlite-rails-app.herokuapp.com'
  }),
  options
)
