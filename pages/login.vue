<template>
  <div class="login-page">
    <h1>Авторизация</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Логин:</label>
        <input id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        });
        await this.$router.push('/');
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    }
  },
  middleware: ['auth']
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
