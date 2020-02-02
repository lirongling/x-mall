<template>
  <div>
    <div class="nav flex">
      <a
        v-for="(item,index) in navList"
        :key="index"
        :class="{'active': num === index}"
        @click="changeSore(index)"
      >{{item}}</a>
      <div class="price-interval">
        <input type="number" placeholder="价格" class="input" />
        <span style="margin: 0px 5px;">-</span>
        <input type="number" placeholder="价格" class="input" />
        <Button type="primary">确定</Button>
      </div>
    </div>
    <div class="goods-box flex">
      <div
        v-for="(item,index) in allGood"
        :key="index"
        class="good-item"
        @click="goodsDetails(item.productId)"
      >
        <ShopDe :ShopDe="item"></ShopDe>
      </div>
    </div>
    <Page :total="40" size="small" show-elevator show-sizer />
  </div>
</template>

<script>
import ShopDe from "../../components/home/ShopDe";
export default {
  data() {
    return {
      navList: ["综合排序", "价格从低到高", "价格从高到低"],
      num: 0,
      page: 1,
      size: 20,
      sort: "",
      priceGt: 0,
      priceLte: Infinity,
      allGood: []
    };
  },
  components: {
    ShopDe
  },
  props: {},
  methods: {
    changeSore(index) {
      this.num = index;
    },
    allGoods() {
      this.$api
        .allGoods(this.page, this.size, this.sort, this.priceGt, this.priceLte)
        .then(res => {
          if (res.code === 200) {
            this.allGood = res.data;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
  beforeMount() {
    this.allGoods();
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.nav {
  height: 60px;
  line-height: 60px;
  justify-content: flex-start;
  a {
    padding: 0 15px;
    height: 100%;
    font-size: 12px;
    color: #999;
  }
  .active {
    color: #5683ea;
  }
  .price-interval {
    padding: 0 15px;
    .input {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
    input {
      //  去除获取焦点的边框
      outline: none;
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      font-size: 12px;
    }
    /deep/ .ivu-btn {
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      margin-left: 10px;
    }
  }
}
.goods-box {
  justify-content: flex-start;
  .good-item {
    background: #fff;
    width: 25%;
    transition: all 0.5s;
    border: 1px solid #efefef;
    // height: 445px;
    // overflow: hidden;
  }
}
</style>