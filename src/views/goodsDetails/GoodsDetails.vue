<template>
  <div>
    <div class="container">
      <div class="gray-box">
        <GrayBox :goodDetails="goodDetails"></GrayBox>
      </div>
      <div class="gray-box details">
        <div class="title">产品信息</div>
        <div v-html="goodDetails.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GrayBox from "../../components/goodsDetails/GrayBox";
export default {
  data() {
    return {
      goodDetails: {}
    };
  },
  components: {
    GrayBox
  },
  props: {},

  methods: {
    goodsDetails() {
      this.$api
        .goodsDetails(this.$route.query.productId)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.goodDetails = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.goodsDetails();
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  .gray-box {
    padding: 60px;
    margin: 20px 0;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    .title {
      padding-left: 30px;
      position: relative;
      z-index: 4;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 8px 8px 0 0;
      box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
      background: #f3f3f3;
      background: linear-gradient(#fbfbfb, #ececec);
      line-height: 60px;
      font-size: 18px;
      color: #333;

      display: flex;

      justify-content: space-between;

      align-items: center;
    }
  }
  .details {
    padding: 0;
  }
}
</style>