<template>
  <popap
    ref="popap"
    class="modal-save"
  >
    <template v-slot:title>
      <h3 class="modal-save__title">Сохранить запрос</h3>
    </template>
    <template v-slot:body>
      <form
        @submit.prevent
        action="#"
        class="modal-save__form save-form"
      >
        <div class="save-form__column">
          <label class="save-form__label">Запрос</label>
          <input
            type="text"
            v-model="form.request"
            class="save-form__input input"
            :disabled="disabledReq"
          >
        </div>
        <div class="save-form__column">
          <label class="save-form__label"><span class="save-form__required">*</span>Название</label>
          <input
            type="text"
            class="save-form__input input"
            v-model="form.name"
            placeholder="Укажите название"
          >
        </div>
        <div class="save-form__column">
          <label class="save-form__label">Сортировать по</label>
          <select
            v-model="form.order"
            class="save-form__input input"
          >
            <option value="relevance">Без сортировки</option>
            <option
              v-for="item in order"
              :key="item.value"
              :value="item.value"
            >{{item.name}}
            </option>
          </select>
        </div>
        <div class="save-form__range range-block">
          <label class="save-form__label">Максимальное количество</label>
          <div class="save-form__row">
            <input
              type="range"
              class="range-block__ui"
              v-model="form.range"
              :min="range.min"
              :max="range.max"
              step="1"
            >
            <input
              v-model="form.range"
              type="text"
              class="range-block__label"
              @change="validateRange"
            />
          </div>
        </div>
        <div class="save-form__buttons">
          <button
            class="modal-footer__button btn btn--light hover-color"
            @click="cancel"
          >
            Не сохранять
          </button>
          <button
            class="modal-footer__button btn hover-color"
            @click="save"
          >Сохранить</button>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <template>
      </template>
    </template>
  </popap>
</template>
<script>
import Popap from "@/components/ui/Popap.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      range: { min: 0, max: 50 },
      order: [
        { name: "По дате", value: "date" },
        {
          name: "По алфавиту",
          value: "title",
        },
        { name: "По количеству просмотров", value: "viewCount" },
        { name: "По рейтингу", value: "rating" },
      ],
      form: { request: "", name: "", order: "", range: 0 },
      key: null,
      op: "save",
    };
  },
  components: {
    Popap,
  },
  computed: {
    ...mapGetters("content", { search: "currentSearch" }),
    disabledReq() {
      return this.op === "save";
    },
    canSave() {
      return this.form.name?.trim() && this.form.request?.trim();
    },
  },
  methods: {
    ...mapActions("user", {
      saveRequest: "saveRequest",
      change: "changeRequest",
    }),
    ...mapActions("alert", {
      addAlert: "add",
    }),

    save() {
      if (this.canSave) {
        if (this.op === "change") {
          this.change({ form: { ...this.form }, key: this.key });
        } else {
          this.saveRequest({ ...this.form });
          this.$emit("save");
        }
        this.close();
      } else {
        this.addAlert({
          text: "Обязательные поля должны быть заполнены!",
        });
      }
    },
    cancel() {
      this.close();
    },
    open(config) {
      if (config) {
        this.form = config.form;
        this.op = config.op;
        this.key = config.key;
      } else {
        this.form = {
          request: this.search,
          name: "",
          order: "relevance",
          range: 25,
        };
        this.op = "save";
        this.key = null;
      }
      this.$refs.popap.isShow = true;
      document.querySelector("body").classList.add("lock");
    },
    close() {
      this.$refs.popap.isShow = false;
      document.querySelector("body").classList.remove("lock");
      this.clearForm();
    },
    clearForm() {
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
      this.form.range = this.range.max / 2;
      this.form.request = this.search;
    },
    validateRange(e) {
      let value = e.target.value.replace(/[^0-9]/g, "");
      value = Math.min(this.range.max, Math.max(0, e.target.value));
      this.form.range = value;
    },
  },
  beforeUnmount() {
    this.clearForm();
  },
};
</script>
<style lang="scss">
.modal-save {
  // .modal-save__title

  &__title {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    margin: 20px 0 30px 0;
  }

  // .modal-save__form

  &__form {
    display: flex;
    flex-direction: column;
    gap: 25px 0;
  }
}
.save-form {
  // .save-form__label

  &__label {
    font-size: 16px;
    line-height: calc(22 / 16);
  }
  &__required {
    color: #ff0000;
    margin-right: 3px;
  }

  // .save-form__input

  &__input {
    &:focus {
      background-color: transparent;
    }
    &::placeholder {
      font-size: 20px;
      color: $c-second;
    }
  }

  // .save-form__row
  &__row {
    display: flex;
    gap: 0 15px;
  }
  // .save-form__column
  &__column {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  // .save-form__buttons
  &__buttons {
    display: flex;
    justify-content: center;
  }
}
.range-block {
  // .range-block__ui
  margin: 0 0 30px 0;

  &__ui {
    flex: 1 1 auto;
  }

  // .range-block__label
  &__label {
    border: 1px $c-second solid;
    border-radius: $main-radius;
    font-size: 20px;
    padding: 12px 30px;
    width: 35%;
    text-align: center;
  }
}
.modal-footer {
  // .modal-footer__button
  &__button {
    white-space: nowrap;
    flex: 0 0 50%;
    font-size: 18px;
    //  min-width: 140px;
    &:not(:last-child) {
      margin: 0 5px 0 0;
    }
  }
}
</style>