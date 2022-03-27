<template>
  <div class="popup" @click.self.prevent="$emit('close')">
    <div class="popup-inner">
      <div class="record">
        {{ record.number }} <button class="close" @click="$emit('close')">X</button>
        <div class="history">
          <record-history v-for="(history, index) in record.history" :history="history" :index="index" :key="history.date"></record-history>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recordHistory from "@/view/recordHistory";

export default {
  props: ['record'],
  data () {
    return {}
  },
  methods: {
  },
  emits: [
      'close'
  ],
  components: {
    recordHistory
  }
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
    min-height: 60%;
    max-height: 90%;
    overflow-y: scroll;
  }
}
</style>
