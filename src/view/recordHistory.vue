<template>
  <div class="history">
    {{ history.date }} - {{ history.info.main }}
  </div>
</template>

<script>
export default {
  props: ['history'],
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.history {
  border-radius: 5px;
  padding: 5px 0;
  margin-top: 5px;
  &:nth-child(odd) {
    background-color: rgba(220, 220, 220, 0.5);
  }
}
</style>