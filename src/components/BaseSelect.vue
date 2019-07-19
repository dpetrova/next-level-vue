<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!--  v-bind="$attrs" specifies this element will inherit attributes -->
    <!-- add v-on="$listeners" to inheriting event listeners here -->
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- option === value - perform conditional check -->
      <option
        v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option"
        >{{ option }}</option
      >
    </select>
  </div>
</template>
<script>
export default {
  inheritAttrs: false, //turn off this automatic inheritance
  props: {
    value: [String, Number],
    label: String,
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      // <-- method triggered by input event
      this.$emit('input', event.target.value)
    }
  }
}
</script>
