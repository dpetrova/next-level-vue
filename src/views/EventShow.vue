<template>
  <div>
    <div>
      <div class="event-header">
        <span class="eyebrow"
          >@{{ event.time }} on {{ event.date | date }}</span
        >
        <h1 class="title">{{ event.title }}</h1>
        <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>
      <BaseIcon name="map">
        <h2>Location</h2>
      </BaseIcon>
      <address>{{ event.location }}</address>
      <h2>Event details</h2>
      <p>{{ event.description }}</p>
      <h2>
        Attendees
        <span class="badge -fill-gradient">
          {{ event.attendees ? event.attendees.length : 0 }}
        </span>
      </h2>
      <ul class="list-group">
        <li
          v-for="(attendee, index) in event.attendees"
          :key="index"
          class="list-item"
        >
          <b>{{ attendee.name }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from 'vuex'
//import NProgress from 'nprogress'
//import store from '@/store/store'

export default {
  //props: ['id'],
  props: {
    event: {
      type: Object,
      required: true
    }
  }
  /* Solution #2 to show progress bar: In-Component Route Guards */
  //this guard is called before the component is created (doesn’t have access to this)
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   NProgress.start() // Start the progress bar
  //   store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
  //     NProgress.done() // When the action is done complete progress bar
  //     next() // Only once this is called does the navigation continue
  //   })
  // },
  // computed: mapState({
  //   event: state => state.event.event
  // })
  // created() {
  //   this.fetchEvent(this.id)
  // },
  //first argument to mapActions here is the namespace,
  //and the second is an array of methods we want our component to have an alias to
  //methods: mapActions('event', ['fetchEvent'])
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
