<template>
  <div>
    <div class="container" v-if="homeList[0]">
      <Wheel :panelContents="homeList[0].panelContents"></Wheel>
      <Activity :activity="homeList[1].panelContents"></Activity>
      <Hot :name="homeList[2].name" :hotData="homeList[2].panelContents"></Hot>
      <Selection :name="homeList[3].name" :selectData="homeList[3].panelContents"></Selection>
      <Selection :name="homeList[4].name" :selectData="homeList[4].panelContents"></Selection>
      <Selection :name="homeList[5].name" :selectData="homeList[5].panelContents"></Selection>
      <Activity :activity="homeList[6].panelContents"></Activity>
      <!-- <Rim :rimData="homeList[4].panelContents"></Rim> -->
    </div>
  </div>
</template>

<script>
import Wheel from "../../components/home/Wheel";
import Activity from "../../components/home/Activity";
import Hot from "../../components/home/Hot";
import Selection from "../../components/home/Selection";
import Rim from "../../components/home/Rim";

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
    Selection,
    Rim
  },
  props: {},
  methods: {
    // 获取首页数据
    getHome() {
      this.$api
        .home()
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.homeList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询购物车
    getCarts() {
      this.$api
        .getCarts()
        .then(res => {
          console.log(res);
          this.$store.state.carNumber = 0;
          if (res.code === 200) {
            this.$store.state.carList = res.data;
            res.data.map(item => {
              item.isChecked = false;
              this.$store.state.carNumber += item.count;
            });
          }
        })
        .catch(err => {});
    }
  },
  beforeMount() {
    this.getHome();
    this.getCarts();
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
  .hot {
    border-radius: 8px;
  }
}
</style>