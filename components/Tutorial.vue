<!-- Please remove this file from your project -->
<template>
  <div>
    <h1>hello word </h1>

    <button @click="logout">Выйти</button>
  </div>

</template>

<script>
export default {
  name: 'NuxtTutorial',
  methods: {
    // Метод для выхода из системы
    logout() {
      this.$auth.logout();
    }
  }
}
</script>
