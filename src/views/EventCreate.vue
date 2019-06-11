<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <!-- using v-model here allows us to listen for the 'input' event that was sent up from BaseSelect’s updateValue method -->
      <!-- additionally, v-model allows us to pass in a value as a prop -->
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        placeholder="Add an event title"
        class="field"
      />
      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Add a description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        placeholder="Add a location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <BaseButton @click="createEvent" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times, //same as times: times
      incrementBy: 0
    }
  },
  computed: {
    //local computed properties
    userName() {
      return this.$store.state.user.name
    },
    userId() {
      return this.$store.state.user.id
    },
    //from store (using spread operator)
    ...mapState({
      userName: state => state.user.name,
      userId: state => state.user.id,
      categories: state => state.categories
    }),
    ...mapGetters({
      catCount: 'catLength',
      getEvent: 'event/getEventById'
    })
  },
  methods: {
    incrementCount() {
      this.$store.dispatch('updateCount', this.incrementBy) //dispatch an action
    },
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start() // <-- Start the progress bar
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          // navigate to newly create event
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          //reset event data
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
          //console.log('There was a problem creating your event.')
        })
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
