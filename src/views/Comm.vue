<template>
  <div class="comm">
    <div>
      <NavTop></NavTop>
      <NavSub></NavSub>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
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
.container {
  max-width: 1220px;
  min-width: 1080px;
  margin: 0 auto;
}
</style>