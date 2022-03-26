<template>
  <div>
    <div class="record">
      <div class="title">
        {{ record.number }}
      </div>
      <div style="clear: both;"></div>
      <div class="created">Добавлен: <span class="date">{{ createdAtFormatted }}</span></div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['record'],
  data () {
    return {}
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
  font-weight: 800;
  font-size: 16px;
  float: right;
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
