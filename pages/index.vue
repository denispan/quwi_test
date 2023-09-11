<template>
  <div class="content">
    <div class="header">
      <p class="header__user-email">{{email}}</p>
      <button class="btn btn--secondary" @click="logout">Выйти</button>
    </div>
    <div class="main">
      <h1 class="main__title">Список проектов</h1>
      <ProjectsList :projects="projects" @openModal="showModalWithProject" />
    </div>
    <Modal :project="selectedProject" @close="selectedProject = null" @update-name="updateProjectName" />
  </div>
</template>

<script>
import Project from '~/components/Project.vue'
import ProjectsList from '~/components/ProjectsList.vue';
import Modal from '~/components/Modal.vue';
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  components: {
    Project,
    ProjectsList,
    Modal
  },
  data() {
    return {
      email: '',
      projects: [],
      selectedProject: null,
    };
  },
  async asyncData({$axios}) {
    try {
      const data = await $axios.$get('projects-manage/index', {
        params: {
          'filters[is_active]': 1,
          'sort': 'dta_create'
        }
      });
      return {
        projects: data.projects
      };
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  },
  mounted() {
    if (this.$auth.user.email) {
      this.email = this.$auth.user.email;
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push('/login');
    },
    showModalWithProject(project) {
      this.selectedProject = project;
    },
    updateProjectName(projectId, newName) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.name = newName;
      }
    },
  }
}
</script>

<style scoped lang="scss">

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  align-items: center;
  min-height: 80px;
  padding: 1rem;
  background-color: #F7F9FC;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &__user-email {
    font-size: 1.2rem;
  }
}

.main {
  flex-grow: 1;
  overflow: auto;
  padding: 6rem 3rem 2rem;
  display: flex;
  flex-direction: column;
}

.main__title {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 auto 5rem;
}
</style>
