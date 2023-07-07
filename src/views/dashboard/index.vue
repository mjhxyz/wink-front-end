<template>
  <div class="dashboard-container">
    <div class="dashboard-panel">
      <div class="dashboard-name">
        {{ name }}
      </div>
      {{ role }}, 欢迎登录
    </div>
    <div class="dashboard-text"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-panel {
    width: 100%;
    height: 135px;
    background: #fff;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-name {
    font-size: 30px;
    font-weight: 600;
    margin-right: 10px;
    color: #2d8cf0;
  }

  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
