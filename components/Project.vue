<template>
  <div class="project" @click="handleClick">
    <div class="project__content">
      <img class="project__logo" :src="project.logo_url !== null ? project.logo_url : require('~/assets/images/no-logo.png')" alt="Logo">
      <h2 class="project__title">{{ project.name }}</h2>
      <p class="project__status" v-if="project.is_active === 1">Active</p>
      <div class="project__time">
        <p>
          Время в проекте
        </p>
        <p>
          {{ formatTime(project.spent_sec_all_time) }}
        </p>
      </div>
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
    },
    formatTime(seconds) {
      let days = Math.floor(seconds / (24 * 60 * 60));
      seconds -= days * (24 * 60 * 60);

      let hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * (60 * 60);

      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      return days.toString().padStart(2, '0') + ':' +
        hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0');
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

  @include vp-767 {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
}

.project__logo {
  width: 100px;
  height: 100%;

  @include vp-767 {
    margin: 0 auto;
  }
}

.project__status {
  font-size: 1.5rem;
  color: green;
}

.project__time {
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1.5rem;

  @include vp-767 {
    margin: 0 auto;
  }
}
</style>
