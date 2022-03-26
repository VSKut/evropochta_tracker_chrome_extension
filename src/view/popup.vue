<template>
  <div class="main_app">
    <h1>Ваши номера:</h1>
    <div class="records_list">
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

<style lang="scss" scoped>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(31, 85, 154);

  width: 400px;
  max-height: 500px;
  overflow-y: scroll;

  h1 {
    margin: 5px 0 10px 0;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .records_list {
    &>div {
      padding-bottom: 8px;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
