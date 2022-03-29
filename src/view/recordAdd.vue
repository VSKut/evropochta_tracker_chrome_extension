<template>
  <div class="popup" @click.self.prevent="$emit('close')">
    <div class="popup-inner">
      <div class="record">
        <span class="number">Добавить трэк номер</span>
        <button class="close" @click="$emit('close')">X</button>
        <div style="clear: both"></div>
        <Form @submit="onSubmit">
          <Field name="number" type="text" v-model="number" :rules="validateNumber" placeholder="Трэк номер" required />
          <ErrorMessage name="number" />
          <Field name="name" type="text" v-model="name" :rules="validateName" placeholder="Название" />
          <ErrorMessage name="name" />
          <button>Добавить</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {mapActions} from "vuex";

export default {
  data () {
    return {
      name: '',
      number: '',
    }
  },
  methods: {
    ...mapActions([
      'addNewRecord',
      'updateRecordStatus',
      'refreshHistoryByNumber'
    ]),
    async onSubmit(values) {
      const newResult = await this.addNewRecord(values)
      if (newResult !== true) {
        alert(newResult)
        return false;
      }

      const result = await this.refreshHistoryByNumber(values.number)
      if (result !== true) {
        this.updateRecordStatus({number: values.number, status: 'invalid',})
      }
      this.$emit('close')
    },
    validateName(value) {
      if (!value) {
        return true;
      }

      if (value.length > 20) {
        return 'Название должно быть не более 20 символов'
      }

      return true;
    },
    validateNumber(value) {
      if (!value) {
        return 'Укажите трэк номер';
      }

      if (!/^BY[\d]{12}$/.test(value)) {
        return 'Трэк номер должен быть в формате: BY000000000000';
      }

      return true;
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: [
      'close'
  ],
}

</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color:  rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    border-top: 3px solid rgba(50, 50, 50, 0.75);
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    padding: 8px;

    margin-top: auto;
    width: 400px;
    height: 80%;
    overflow-y: scroll;

    .record {
      .number {
        font-size: 20px;
        font-weight: 800;
        color: rgba(0, 0, 0, 0.6);
      }
      .close {
        float: right;
        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, 0.35);
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        padding: 5px 10px;
        background-color: rgba(200, 200, 200, 0.25);

        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.75);
          color: rgba(0, 0, 0, 0.75);
          background-color: rgba(200, 200, 200, 0.1);
          font-weight: 600;
        }
      }

      .history {
        margin-top: 20px;
      }

      form {
        margin-top: 20px;
        input {
          width: 75%;
          margin: 0 5px 10px 5px;
          padding: 10px 5px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.75);
          text-align: center;
        }

        span {
          display: inline-block;
          margin: 0 5px 10px 5px;
          width: 75%;
          color: rgba(175, 24, 24, 0.85);
          font-weight: 500;
          font-size: 13px;
        }

        button {
          width: 80%;
          margin: 0 5px 10px 5px;
          padding: 5px 10px;
          background-color: rgba(107, 213, 179, 0.4);
          border: solid 2px #5fbe9f;
          color: #168566;
          font-weight: 800;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: rgba(107, 213, 179, 0.6);
            border: solid 2px rgba(95, 190, 159, 0.74);
            color: #0f5b46;
          }
        }
      }
    }
  }
}
</style>
