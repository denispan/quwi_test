<template>
  <div v-if="project" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>{{ project.name }}</h2>
      <p v-if="project.is_active === 1">Active</p>
      <button @click="closeModal">Закрыть</button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
