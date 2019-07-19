<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!--  v-bind="$attrs" specifies this element will inherit attributes -->
    <!-- add v-on="$listeners" to inheriting event listeners here -->
    <input
      :id="label"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin' // import mixin

export default {
  //we import inheritAttrs, props, methods from mixin
  //inheritAttrs: false, //turn off this automatic inheritance
  // props: {
  //   value: [String, Number],
  //   label: String
  // },
  computed: {
    //resolving conflict with @input="updateValue" and :value="event.title", @input="(value) => { event.title = value }" which is v-model=event.title
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  // methods: {
  //   updateValue(event) {
  //     // <-- method triggered by input event
  //     this.$emit('input', event.target.value)
  //   }
  // },
  mixins: [formFieldMixin] // register mixin
}
</script>
