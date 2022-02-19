<template>
  <header class="header">
    <div class="content-width">
      <div class="header__body">
        <div class="header__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="Логотип: синяя лента в виде латинской буквы 'S'"
          >
        </div>
        <nav class="header__nav nav">
          <ul class="nav__menu">
            <li>
              <router-link
                class="nav__link hover-color"
                :to="{ name: 'main' }"
              >Поиск</router-link>
            </li>
            <li>
              <router-link
                class="nav__link hover-color"
                :to="{ name: 'fav' }"
              >Избранное</router-link>
            </li>
          </ul>
          <ul class="nav__ui">
            <button
              class="nav__button hover-color"
              type="button"
              @click="onLogout"
            >Выйти</button>
          </ul>
        </nav>
      </div>
    </div>

  </header>
</template>
<script>
import logout from "@/mixins/logout.js";
export default {
  mixins: [logout],
  methods: {
    onLogout() {
      this.$router.push({ name: "login" });
      this.logout();
    },
  },
};
</script>
<style lang="scss">
.header {
  padding: 20px 0 21px;
  font-size: 14px;
  line-height: calc(28 / 14);
  background-color: #ffffff;
  border-bottom: 1px solid #f1f1f1;

  @media (min-width: $tabletWidth + "px") {
    font-size: 18px;
    line-height: calc(28 / 18);
  }
  // .header__logo
  &__body {
    display: flex;
    align-items: center;
    gap: 0 25px;
    @media (min-width: $tabletWidth + "px") {
      gap: 0 50px;
    }
  }

  // .header__nav
  &__nav {
    flex: 1 1 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.login {
  // .login__logo
  &__logo {
    img {
      height: 20px;
      width: 40px;
    }
  }
}
.nav {
  // .nav__menu

  &__menu {
    display: flex;
    flex-wrap: wrap;
    gap: 0 20px;
    @media (min-width: $tabletWidth + "px") {
      gap: 0 40px;
    }
  }

  // .nav__link
  &__link {
    position: relative;
    padding: 5px 5px 33px;
    @media (min-width: $tabletWidth + "px") {
      padding: 5px 5px 30px;
    }
  }
  &__link.router-link-exact-active {
    color: $c-Light;
    &::before {
      content: "";
      background-color: $c-Light;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
    }
  }

  // .nav__ui
  &__button {
    background-color: transparent;
    color: $c-Light;
    font-size: 14px;
    @media (min-width: $tabletWidth + "px") {
      font-size: 18px;
      line-height: calc(28 / 18);
    }
  }
}
</style>