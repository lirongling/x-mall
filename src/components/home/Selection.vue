<template>
  <div>
    <div class="content">
      <Titles>{{name}}</Titles>
      <div class="select flex">
        <div
          v-for="(item,index) in selectData"
          :key="index"
          class="select-item"
          @click="goodsDetails(item.productId)"
        >
          <div v-if="index===0">
            <img :src="item.productImageBig" :alt="item.subTitle" />
          </div>
          <div v-else class="good-item">
            <ShopDe :ShopDe="item"></ShopDe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Titles from "../home/Title";
import ShopDe from "./ShopDe";
export default {
  data() {
    return {};
  },
  components: {
    Titles,
    ShopDe
  },
  props: {
    selectData: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 跳转到详情页
    goodsDetails(productId) {
      const { href } = this.$router.resolve({
        name: "goodsDetails",
        query: { productId: productId }
      });
      window.open(href, "_blank");
      // window.open(`/goodsDetails?productId=${productId}`, "_blank");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// .good-item {
//   padding: 25px 0;
// }
.content {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  // border: 1px solid #dcdcdc;
  // border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);

  .select {
    justify-content: flex-start;
    flex-wrap: wrap;
    .select-item {
      width: 25%;

      img {
        width: 100%;
      }
    }
    .select-item:nth-child(1) {
      width: 50% !important;
    }
  }
}
</style>