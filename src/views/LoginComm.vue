<template>
  <div>
    <div class="wrappers flex">
      <div class="dialog">
        <router-view></router-view>
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
.wrappers {
  justify-content: center;

  min-height: 100vh;
  background: url("http://xmall.exrick.cn/static/images/bg_9b9dcb65ff.png");
  .dialog {
    margin: 40px 0;
    background: #fff;
    height: auto;
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
  }
}
</style>