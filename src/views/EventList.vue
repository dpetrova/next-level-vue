<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >|
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1)
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage
      next()
    })
    .catch(error => {
      if (error.response && error.response.status == 404) {
        next({
          name: '404',
          params: { resource: 'event' }
        })
      } else {
        next({ name: 'network-issue' })
      }
    })
}

export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // Before we enter the route (navigate to List view)
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // Before we update the route (when paginate next/prev)
    getPageEvents(routeTo, next)
  },
  // created() {
  //   //this.$store.dispatch('fetchEvents')
  //   this.perPage = 3
  //   this.$store.dispatch('event/fetchEvents', {
  //     perPage: this.perPage, // <-- How many items to display per page
  //     page: this.page // <-- What page we're on
  //   })
  // },
  //computed: mapState(['events'])
  computed: {
    // page() {
    //   return parseInt(this.$route.query.page) || 1
    // },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    //use event. when we accessed parts of the state
    ...mapState(['event', 'user']) //this is mapping to our modules event and user
  },
  components: {
    EventCard
  }
}
</script>
