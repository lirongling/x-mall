<template>
  <div>
    <div class="container" v-if="homeList[0]">
      <Wheel :panelContents="homeList[0].panelContents"></Wheel>
      <Activity :activity="homeList[1].panelContents"></Activity>
      <Hot :hotData="homeList[2].panelContents"></Hot>
      <Selection :selectData="homeList[3].panelContents"></Selection>
    </div>
  </div>
</template>

<script>
import Wheel from "../../components/home/Wheel";
import Activity from "../../components/home/Activity";
import Hot from "../../components/home/Hot";
import Selection from "../../components/home/Selection";

export default {
  data() {
    return {
      homeList: []
    };
  },
  components: {
    Wheel,
    Activity,
    Hot,
    Selection
  },
  props: {},
  methods: {
    // 获取首页数据
    getHome() {
      this.$api
        .home()
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.homeList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getHome();
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  max-width: 1220px;
  min-width: 1080px;
  margin: 0 auto;
  position: relative;
}
</style>