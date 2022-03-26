<template>
  <div>
    <div class="history">

    </div>
  </div>
</template>

<script>
export default {
  props: ['history'],
  data () {
    return {}
  },
  methods: {
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
  }
}

</script>

<style lang="scss" scoped>
.history {

}
</style>
