import axios from 'axios'
import NProgress from 'nprogress'

//instantiating axios with some configuration and storing that in a constant
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  //if our browser waits longer than 15 seconds for the API request to return, it’ll automatically throw an error that will lead to our NetworkIssue component
  timeout: 15000
})

/* Solution #1 to show progress bar: Axios interceptors */
//use interceptors to show progress bar while requesting data from server
// apiClient.interceptors.request.use(config => {
//   // Called on request
//   NProgress.start()
//   return config
// })
// apiClient.interceptors.response.use(response => {
//   // Called on response
//   NProgress.done()
//   return response
// })

export default {
  // getEvents() {
  //   return apiClient.get('/events')
  // },
  getEvents(perPage, page) {
    //implement pagination
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
