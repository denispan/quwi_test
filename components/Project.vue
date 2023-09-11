<template>
  <div class="project" @click="handleClick">
    <div class="project__content">
      <img class="project__logo" :src="project.logo_url !== null ? project.logo_url : require('~/assets/images/no-logo.png')" alt="Logo">
      <h2>{{ project.name }}</h2>
      <p v-if="project.is_active === 1">Active</p>
    </div>
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

.project__content {
  display: grid;
  gap: 3rem;
  grid-template-columns: min-content 2fr 1fr 1fr;
  align-items: center;
}

.project__logo {
  width: 100px;
  height: 100%;
}
</style>
