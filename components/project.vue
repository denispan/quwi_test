<template>
  <div>
    <h2 @click="handleClick">{{ project.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Project',
  data() {
    return {
      showModal: false
    };
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('openModal', this.project);
    }
  },
}
</script>

<style scoped>
</style>
