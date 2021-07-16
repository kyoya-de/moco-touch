<template>
  <div class="login">
    <form class="login-form" @submit.prevent="doLogin">
      <input
              type="email"
              v-model="email"
              class="login-input login-input--email"
              :class="{'input-error': !!errorMessage}"
              placeholder="E-Mail"
              required>
      <input
              type="password"
              v-model="password"
              class="login-input login-input--password"
              :class="{'input-error': !!errorMessage}"
              placeholder="Passwort"
              required>
      <label class="login-input login--remember-me">
        <input class="login-input--remember-me" type="checkbox" v-model="rememberMe">
        <span class="login-label--remember-me">Remember me</span>
      </label>
      <button class="login-input login-input--login-button" type="submit">Login</button>
    </form>
    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import MocoApi from "../MocoApi";

export default {
  name: "login",
  methods: {
    doLogin:  async function() {
      this.errorMessage = '';
      try {
        await MocoApi.login(this.email, this.password, this.rememberMe);
        this.password = '';
        this.$router.push({path: "/"});
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  data () {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
    }
  }
};
</script>

<style scoped lang="stylus">
  @import "../styles/Login.styl"
</style>
