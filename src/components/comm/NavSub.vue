<template>
  <div>
    <div class="nav-sub">
      <div class="nav-sub-wrapper flex">
        <ul class="nav-list flex">
          <li class="nav-item home">首页</li>
          <li class="nav-item">全部</li>
          <li class="nav-item">周边品牌</li>
          <li class="nav-item">捐赠名单</li>
          <li class="nav-item">后台管理系统</li>
          <li class="nav-item">XPay支付系统</li>
          <li class="nav-item">XBoot开发平台</li>
          <li class="nav-item">宣传视频</li>
          <li class="nav-item">Github</li>
          <li class="nav-item">商用授权</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.nav-sub {
  position: relative;
  z-index: 20;
  height: 90px;
  background: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  .nav-sub-wrapper {
    padding: 31px 0;
    height: 90px;
    position: relative;
    max-width: 1220px;
    min-width: 1080px;
    margin: 0 auto;
    .nav-list {
      justify-content: flex-start;
      li {
        list-style: initial;
      }
      .home {
        font-weight: 700;
      }
      .nav-item {
        font-size: 14px;
        margin: 0 15px;
        color: #666;
      }
      .nav-item:hover {
        color: #5683ea;
        cursor: pointer;
      }
    }
  }
}
</style>