<template>
    <div class="animations-box">
        <div class="specify-row"
            v-for="(item, key) in inputData"
            :key="key"
        >
            <div class="specify-row__item">
                <label
                    class="label"
                >
                <input
                    @click="changeAnimationData"
                    :class="item.name"
                    :id="item.id + (counter + 1)"
                    :name="'animation' + (counter + 1) "
                    type="radio"
                >
                <span class="checkmark"/>
                {{ textRenderer(item) }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'customCheckbox',
  props: [
    'counter'
  ],
  data() {
      return {
          inputData: [
                {
                    id: 'ltr',
                    name: 'ltr',
                    value: false
                },
                {
                    id: 'rtl',
                    name: 'rtl',
                    value: false
                },
                {
                    id: 'addPause',
                    name: 'addPause',
                    value: false
                }
            ]
      }
  },
  computed: {
      customId() {
          return Date.now().toString().slice(-4)
      }
  },
  methods: {
    textRenderer(item) {
        if (item.id === 'ltr') {
            return 'From left to right'
        }
        if (item.id === 'rtl') {
            return 'From right to left'
        }
        if (item.id === 'addPause') {
            return 'Add pause in the middle'
        }
    },
    changeAnimationData (e) {
        let target = e.target.id
        let className = e.target.className

        this.$emit('target', target, className)
    }
  }
}
</script>
