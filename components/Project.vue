<template>
  <div class="project" @click="handleClick">
    <h2>{{ project.name }}</h2>
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

<style scoped lang="scss">
.project {
  width: 100%;
  padding: 2rem;
  border: 1px solid #333333;
  border-radius: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
}
</style>
