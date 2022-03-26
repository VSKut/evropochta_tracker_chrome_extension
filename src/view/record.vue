<template>
  <div>
    <div class="record">
      <div class="title">
        <span class="status">{{ statusFormatted }}</span> <span class="number">{{ record.number }}</span>
      </div>
      <div style="clear: both;"></div>
      <div class="created">Добавлен: <span class="date">{{ createdAtFormatted }}</span></div>
      <div style="clear: both;"></div>

      <button @click="refreshHistoryByNumber(record.number)">refresh</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['record'],
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'refreshHistoryByNumber'
    ])
  },
  computed: {
    createdAtFormatted() {
      let day = this.record.createdAt.getDay()
      let month = this.record.createdAt.getMonth()+1
      const year = this.record.createdAt.getFullYear()
      let hour = this.record.createdAt.getHours()
      let minute = this.record.createdAt.getMinutes()

      day = day < 10 ? `0${day}` : day
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute

      return `${day}.${month}.${year} ${hour}:${minute}`
    },
    statusFormatted() {
      switch (this.record.status) {
        case 'new':
          return 'Новый';
        case 'onTheWay':
          return 'В пути';
        case 'readyToPickUp':
          return 'Готов к выдаче';
        case 'delivered':
          return 'Выдан';
        case 'invalid':
          return 'Нет информации';
        default:
          return this.record.status;
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.record {
  padding: 3px;
  cursor: pointer;
  border: 1px solid rgba(220, 220, 220, 0.5);
  background-color: rgba(220, 220, 220, 0.2);
  border-radius: 5px;

  &:hover {
    border: 1px solid rgba(220, 220, 220, 0.8);
    background-color: rgba(220, 220, 220, 0.4);
  }
}
.title {
  float: right;

  .status {
    font-size: 10px;
    font-weight: 600;
    color: rgba(103, 103, 103, 0.6);
    text-transform: uppercase;
  }

  .number {
    font-weight: 800;
    font-size: 16px;
  }

}

.created {
  font-weight: 600;
  font-size: 13px;
  color: rgba(97, 97, 97, 0.8);
  float: right;

  .date {
    font-size: 12px;
    font-weight: 400;
    color: rgba(103, 103, 103, 0.8);
  }
}
</style>
