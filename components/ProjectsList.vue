<template>
  <ul class="projects-list">
    <li v-for="project in projects" :key="project.id">
      <Project :project="project" @openModal="openModal" />
    </li>
  </ul>
</template>

<script>
import Project from '~/components/Project';

export default {
  name: 'ProjectsList',
  props: ['projects'],
  components: {
    Project
  },
  methods: {
    openModal(project) {
      this.$emit('openModal', project);
    }
  }
}
</script>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
