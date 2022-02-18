<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="modal-shadow"
      @click.self="closeModal"
    >
      <div class="modal">
        <slot name="title">
          <h3 class="modal-title">Заголовок</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">Дефолтный контент модального окна</div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button
              class="modal-footer__button"
              @click="closeModal"
            >Ок</button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: this.show,
    };
  },
  methods: {
    closeModal() {
      this.isShow = false;
      document.querySelector("body").classList.remove("lock");
    },
  },
};
</script>
<style  lang="scss">
.modal-shadow {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 20px 10px;
  max-width: 480px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (min-width: $tabletWidth + "px") {
    padding: 35px 40px;
  }

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #2a4cc7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  &-title {
    color: #0971c7;
  }

  &-content {
    margin-bottom: 20px;
  }
}

//*========================
</style>