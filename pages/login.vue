<template>
  <div class="login">
    <div class="login__container">
      <h1 class="login__title">Авторизация</h1>
      <form class="login__form" @submit.prevent="login">
        <div class="login__input-field">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="login__input-field">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <p v-if="authError" class="login__error">{{ authError }}</p>
        <button class="btn btn--primary login__button" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      authError: ''
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
        if (error.response && error.response.status === 417) {
          this.authError = 'Ошибка авторизации: неправильный логин или пароль.';
        } else {
          this.authError = 'Произошла ошибка. Пожалуйста, попробуйте еще раз позже.';
        }
      }
    }
  },
  middleware: ['auth']
};
</script>

<style scoped lang="scss">

.login {
  padding-top: 20%;

  @include vp-767 {
    padding: 20% 2rem 0;
  }
}

.login__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 5rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: #333333;
  background-color: #F7F7F7;

  @include vp-767 {
    padding: 2rem;
  }
}

.login__title {
  margin-bottom: 3rem;
}

.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.login__input-field {
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
  vertical-align: center;
  margin: 0 auto;

  label {
    font-size: 1.5rem;
    width: 120px;
    text-align: end;
    align-self: center;

    @include vp-767 {
      width: 80px;
    }
  }

  input {
    max-width: 200px;
    font-size: 1rem;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 0.5rem;
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
}

.login__button {
  width: 60%;
  margin: 0 auto;

  @include vp-767 {
    width: 40%;
  }
}

.login__error {
  color: #e74c3c;
}

</style>
