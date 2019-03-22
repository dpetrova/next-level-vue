<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!--  v-bind="$attrs" specifies this element will inherit attributes -->
    <input :id="label" :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false, //turn off this automatic inheritance
  props: {
    value: [String, Number],
    label: String
  },
  methods: {
    updateValue(event) {
      // <-- method triggered by input event
      this.$emit('input', event.target.value)
    }
  }
}
</script>
