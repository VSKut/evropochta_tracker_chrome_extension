<template>
  <div class="main_app">
    <h1>Ваши номера:</h1>
    <button class="add">+</button>
    <div class="records_list">
      <div v-if="records.length === 0" class="empty">Трэк номера отсутствуют.</div>
      <record v-for="(record, index) in records" :record="record" :index="index" :key="record.number"></record>
    </div>
  </div>
</template>

<script>
import record from "@/view/record";
import {mapGetters} from "vuex";

export default {
  data () {
    return {}
  },
  components: {
    record
  },
  computed: {
    ...mapGetters({
      records: 'getList',
    })
  }
}

</script>
<style>
body {
  margin: 0 8px;
}
</style>

<style lang="scss" scoped>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(31, 85, 154);

  width: 400px;
  max-height: 640px;
  overflow-y: scroll;
  position: relative;

  .add {
    position: absolute;
    right: 0;
    top: 0;
    width: 35px;
    height: 35px;
    background-color: rgba(107, 213, 179, 0.4);
    border: solid 2px #5fbe9f;
    border-top: 0;
    color: #168566;
    font-weight: 800;
    border-radius: 0 0 5px 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(107, 213, 179, 0.6);
      border: solid 2px rgba(95, 190, 159, 0.74);
      border-top: 0;
      color: #0f5b46;
    }
  }

  h1 {
    margin: 5px 0 10px 0;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .records_list {
    .empty {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.4);
    }

    &>div {
      padding-bottom: 8px;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
