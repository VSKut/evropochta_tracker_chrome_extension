<template>
  <div>
    <div class="record" @click="showFull = true" @mouseover="show" @mouseleave="hide">
      <button style="float: left" @click.stop="refreshHistory(record.number)">Обновить</button>
      <div class="title">
        <span class="status">{{ statusFormatted }}</span> <span class="number">{{ record.number }}</span>
      </div>
      <div style="clear: both"></div>
      <div class="info" v-if="record.history.length">
        <div class="updated">Обновлён: <span class="date">{{ record.history[0].date }}</span></div>
        <div style="clear: both"></div>
        <hr>
        <div class="main">{{ lastHistory }}</div>
        <template v-if="descriptionFull">
          <hr>
          <div class="additional">{{ record.history[0].info.additional }}</div>
          <div style="clear: both"></div>
        </template>
      </div>
    </div>
    <record-full @close="showFull = false" v-if="showFull" :record="record" />
  </div>
</template>

<script>
import _ from 'lodash'
import {mapActions} from "vuex";
import recordFull from "@/view/recordFull";

export default {
  props: ['record'],
  data () {
    return {
      descriptionFull: false,
      hovering: false,
      showFull: false
    }
  },
  methods: {
    ...mapActions([
      'refreshHistoryByNumber'
    ]),
    refreshHistory: _.throttle(function (number) {
      this.refreshHistoryByNumber(number)
    }, 1000),
    show() {
      this.hovering = true;
      setTimeout(() => this.descriptionFull = this.hovering, 300);
    },
    hide() {
      setTimeout(()=> {
        this.descriptionFull = false
        this.hovering = false;
      }, 500);
    },
  },
  computed: {
    lastHistory() {
      const lastHistory = this.record.history[0].info.main;
      return this.descriptionFull || lastHistory.length < 150 ? lastHistory : lastHistory.slice(0, 150).trim() + '...'
    },
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
          return 'Неправильный трек-номер';
        default:
          return this.record.status;
      }
    }
  },
  components: {
    recordFull
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

  .info {
    .updated {
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

    .main {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.65);
    }

    .additional {
      font-size: 11px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      text-align: right;
      max-width: 70%;
      float: right;
    }

    hr {
      border-top: rgba(0, 0, 0, 0.45);
      margin: 5px 10%;
    }
  }
}
</style>
