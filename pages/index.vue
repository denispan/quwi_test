<template>
  <div>
    <h1>Список проектов</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <Project :project="project" @openModal="showModalWithProject" />
      </li>
    </ul>

    <button @click="logout">Выйти</button>
    <Modal :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>

<script>
import Project from '~/components/project'
import Modal from '~/components/modal.vue';
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  components: {
    Project,
    Modal
  },
  data() {
    return {
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
      console.log(data);
      return {
        projects: data.projects
      };
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
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
  }
}
</script>
