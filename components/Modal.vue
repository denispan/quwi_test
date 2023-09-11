<template>
  <transition name="modal-fade">
  <div v-if="project" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="project-name">
        <h2 v-if="!isEditing">{{ project.name }}</h2>
        <input v-if="isEditing" v-model="editedName" @keyup.enter="saveChanges" />
        <button @click="toggleEdit">{{ isEditing ? 'Отменить' : 'Редактировать' }}</button>
        <button v-if="isEditing" @click="saveChanges">Сохранить</button>
      </div>
      <p v-if="project.is_active === 1">Active</p>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      editedName: '',
      isEditing: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;

      if (this.isEditing) {
        this.editedName = this.project.name;
      }
    },
    async saveChanges() {
      if (this.editedName) {
        try {
          await this.$axios.$post(`projects-manage/update?id=${this.project.id}`, {
            'name': this.editedName
          });
        } catch (error) {
          console.error("Ошибка при редактировании имени проекта:", error);
        }

        this.project.name = this.editedName;
        this.$emit('update-name', this.project.id, this.editedName);
        this.isEditing = false;
      }
    }
  },
}
</script>

<style scoped>

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

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
