<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <h3>Choose a category</h3>
      <!-- using v-model here allows us to listen for the 'input' event that was sent up from BaseSelect’s updateValue method -->
      <!-- additionally, v-model allows us to pass in a value as a prop -->
      <!-- @blur="$v.event.category.$touch()" triggers dirty status -->
      <!-- :class="{ error: $v.event.category.$error}" add class when $error is true -->
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <!-- displays when error is true -->
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        v-model.trim="event.title"
        label="Title"
        type="text"
        placeholder="Add an event title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>
      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        v-model.trim="event.location"
        label="Location"
        type="text"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <!-- triggering $touch on opened -->
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model.trim="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>
      <!-- disable button when error(s) -->
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
      />
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
    <!-- check adding dynamic event listeners  -->
    <BaseButton @click="checkListeners">Check listeners</BaseButton>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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
      this.$v.$touch() // "touching" all fields to turn them "dirty"
      if (!this.$v.$invalid) {
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
    checkListeners() {
      alert('Listeners working :)')
    }
  },
  components: {
    Datepicker
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.errorMessage {
  color: red;
}
.error {
  border-color: red;
}
</style>
