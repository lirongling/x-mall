<template>
  <div class="comm">
    <div class="header-box">
      <NavTop></NavTop>
      <NavSub></NavSub>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import NavTop from "../components/comm/NavTop";
import NavSub from "../components/comm/NavSub";
import Footer from "../components/comm/Footer";
export default {
  data() {
    return {};
  },
  components: {
    NavTop,
    NavSub,
    Footer
  },
  props: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.comm {
  background: #ededed;
}
</style>