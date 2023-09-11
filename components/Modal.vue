<template>
  <transition name="modal-fade">
  <div v-if="project" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="btn btn--secondary modal__close" @click="closeModal">Закрыть</button>
      <div class="modal__edit-name">
        <h2 class="modal__project-title" v-if="!isEditing">{{ project.name }}</h2>
        <input class="modal__input" v-if="isEditing" v-model="editedName" @keyup.enter="saveChanges" />
        <button class="btn btn--secondary" @click="toggleEdit">{{ isEditing ? 'Отменить' : 'Редактировать название проекта' }}</button>
        <button class="btn btn--primary" v-if="isEditing" @click="saveChanges">Сохранить</button>
      </div>
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
  position: relative;
  background: #fff;
  min-width: 30%;
  text-align: center;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 5rem;
}

.modal__close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
}

.modal__edit-name {
  height: 100%;
}

.modal__project-title {
  margin-bottom: 2rem;
}

.modal__input {
  max-width: 200px;
  font-size: 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  align-self: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #B0B0B0;
  }

  &:focus {
    border-color: #666666;
    outline: none;
    box-shadow: 0 0 3px rgba(102,102,102,0.5);
  }
}
</style>
