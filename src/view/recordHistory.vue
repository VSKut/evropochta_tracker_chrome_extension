<template>
  <div class="history">
    <div class="date">{{ history.date }}</div>
    <div style="clear: both"></div>
    {{ history.info.main }}
    <hr>
    <div class="additional">{{ history.info.additional }}</div>
    <div style="clear: both"></div>
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
  border: 1px solid rgba(220, 220, 220, 0.25);
  background-color: rgba(220, 220, 220, 0.15);
  border-radius: 5px;
  padding: 5px 5px;
  margin-top: 5px;

  &:hover {
    border: 1px solid rgba(220, 220, 220, 0.45);
    background-color: rgba(220, 220, 220, 0.35);
  }

  &:nth-child(odd) {
    border: 1px solid rgba(220, 220, 220, 0.75);
    background-color: rgba(220, 220, 220, 0.5);

    &:hover {
      border: 1px solid rgba(220, 220, 220, 0.95);
      background-color: rgba(220, 220, 220, 0.7);
    }

    hr {
      border-top: 1px solid rgba(220, 220, 220, 1);
    }

    .date {
      background-color: #fff;
    }
  }

  .date {
    font-weight: 600;
    font-size: 12px;
    float: right;
    color: #919191;
    border-radius: 5px;
    padding: 2px 5px;
    margin-bottom: 10px;
    border: 1px solid rgba(220, 220, 220, 0.75);
    background-color: #fff;
  }

  hr {
    width: 75%;
    margin-top: 3px;
    margin-bottom: 8px;
    border-top: 1px solid rgba(220, 220, 220, 0.75);
  }

  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);

  .additional {
    font-size: 11px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    text-align: right;
    max-width: 80%;
    float: right;
  }
}
</style>