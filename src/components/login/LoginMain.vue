<template>
  <section class="login">
    <div class="login__body">
      <div class="login__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="Логотип: синяя лента в виде латинской буквы 'S'"
        >
      </div>
      <h1 class="login__title">Вход</h1>
      <form
        class="login__form"
        action="#"
        @submit.prevent="onSubmit"
      >
        <div class="login__label">Логин</div>
        <login-input v-model:value.trim="formLogin.login"></login-input>
        <span class="login__label">Пароль</span>
        <div class="login__password ">
          <login-input
            v-model:value.trim="formLogin.password"
            v-model:isFocus="isFocus"
            :type="viewPassword ? 'text': 'password'"
          ></login-input>
          <button
            type="button"
            class="btn--none input__icon"
            @click="toggleViewPassword"
          >
            <transition
              name="fade"
              mode="out-in"
            >
              <svg
                v-if="!viewPassword"
                class="icon-eye-close"
                :class="{ 'icon-eye-close--active': isFocus}"
              >
                <use xlink:href="@/assets/img/ui/input/inputSprite.svg#icon-eye-close"></use>
              </svg>
              <svg
                v-else
                class="icon-eye"
                :class="{ 'icon-eye--active': isFocus}"
              >
                <use xlink:href="@/assets/img/ui/input/inputSprite.svg#icon-eye"></use>
              </svg>
            </transition>
          </button>

        </div>
        <div class="login__button">
          <!--  <login-button text="Войти"></login-button> -->
          <button class="btn hover-color"><span class="btn__text">Войти</span></button>
        </div>

      </form>
    </div>
  </section>
</template>
<script>
import LoginInput from "@/components/ui/Input.vue";
//import LoginButton from "@/components/ui/Button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    LoginInput,
  },
  data() {
    return {
      formLogin: {
        login: "",
        password: "",
      },
      isFocus: false,
      viewPassword: false,
    };
  },
  computed: {
    ...mapGetters("user", { isLogin: "isLogin" }),
  },
  methods: {
    ...mapActions("user", {
      login: "login",
    }),
    ...mapActions("alert", {
      addAlert: "add",
    }),

    async onSubmit() {
      if (this.formLogin.login && this.formLogin.password) {
        await this.login(this.formLogin);
        if (this.isLogin) {
          this.$router.push({ name: "main" });
        } else {
          this.addAlert({
            text: "Неверный 'Логин' и/или 'Пароль'",
          });
        }
      } else {
        this.addAlert({
          text: "Не заполнены все поля",
        });
      }
    },
    toggleViewPassword() {
      this.viewPassword = !this.viewPassword;
    },
  },
};
</script>
<style lang="scss">
.login {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin: 24px 9px;
  border-radius: $main-radius;
  border: 1px rgba(39, 39, 39, 0.1) solid;
  @media (min-width: $tabletWidth + "px") {
    background-color: transparent;
    border: none;
  }
  // .login__body

  &__body {
    // flex: 0 0 100%;
    @media (min-width: $tabletWidth + "px") {
      padding: 49px 89px 59px;
      background-color: #ffffff;
      border-radius: $main-radius;
      border: 1px rgba(39, 39, 39, 0.1) solid;
    }
  }

  // .login__logo

  &__logo {
    text-align: center;
    margin: 0 0 40px 0;
    img {
      width: 35px;
      height: 70px;
    }
  }

  // .login__title

  &__title {
    text-align: center;
    font-size: 18px;
    line-height: calc(28 / 18);
    font-weight: 500;
    margin: 0 0 20px 0;
  }

  // .login__form

  &__form {
    display: flex;
    flex-direction: column;
  }

  // .login__label

  &__label {
    color: $c-second;
    font-size: 16px;
    line-height: calc(22 / 16);
  }

  // .login__password

  &__password {
    position: relative;
  }

  &__button {
    text-align: center;
    margin: 40px 0 0 0;
  }
}
</style>