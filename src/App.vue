<template>
  <div id="app">
    <router-view />
    <BackTop :height="100" :bottom="200">
      <div class="top__">返回顶端</div>
    </BackTop>
    <div class="message___">
      <i class="iconfont icon-xiaoxi img"></i>
      <!-- <img src="./assets/images/massage.gif" alt /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  beforeMount() {
    this.$store.state.userInfo = JSON.parse(localStorage.getItem("loginMsg"));
    this.$store.state.city = JSON.parse(localStorage.getItem("city"));
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style lang="scss">
#app {
  height: 100vh;
  font-size: 16px;
}
li {
  list-style: none;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.top__ {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.message___ {
  z-index: 10;
  position: fixed;
  cursor: pointer;
  bottom: 100px;
  right: 30px;
  font-size: 30px;
  color: #f4364c;
  // box-shadow: 1px 1px 20px #999;

  .img {
    // fons
    font-size: 45px;
  }
}
</style>

