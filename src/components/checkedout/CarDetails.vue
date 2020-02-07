<template>
  <div>
    <div class="box-inner">
      <div class="cart-table-title flex">
        <div class="shop-de title-items">商品信息</div>
        <div class="price title-item">单价</div>
        <div class="num title-item">数量</div>
        <div class="subtotal title-item">小计</div>
      </div>
      <div>
        <ul class="cart-group">
          <li class="cart-items flex" v-for="(item,index) in shopList" :key="index">
            <div class="title-items flex" @click="goodsDetails(item.productId)">
              <div class="items-thumb">
                <img :src="item.productImageBig" :alt="item.productName" />
              </div>
              <div class="name ellipsis">{{item.productName}}</div>
            </div>
            <div class="prices title-item">￥ {{item.salePrice}}</div>
            <div class="nums title-item">{{item.count}}</div>
            <div class="subtotals title-item">￥ {{(item.salePrice*item.count).toFixed(2)}}</div>
          </li>
        </ul>
      </div>
      <div class="fix-bottom flex">
        <div class="table-right flex">
          <div class="shipping-box">
            <h4 class="highlight">
              应付总额：
              <span>￥ {{total}}</span>
            </h4>
          </div>
          <div class="buy flex">
            <Button type="primary">现在结算</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: []
    };
  },
  components: {},
  props: {},
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
  beforeMount() {
    this.shopList = JSON.parse(this.$route.query.shopList);
    console.log(this.shopList);
  },
  mounted() {},
  watch: {},
  computed: {
    total() {
      let totalPrice = 0;
      this.shopList.map(item => {
        totalPrice += item.count * item.salePrice;
      });
      return totalPrice.toFixed(2);
    }
  }
};
</script>

<style scoped lang='scss'>
.box-inner {
  .cart-table-title {
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
  }
  .title-items {
    cursor: pointer;
    flex: 1;
    justify-content: flex-start;
  }
  .title-item {
    width: 137px;
    text-align: center;
    color: #838383;
  }
  .cart-group {
    margin-left: 20px;
    .cart-items {
      height: 140px;
      .items-thumb {
        width: 80px;
        height: 80px;
        border-radius: 3px;
        overflow: hidden;
        border: 1px solid #efefef;
        margin-left: 50px;
        img {
          width: 100%;
        }
      }
      .name {
        width: 380px;
        margin-left: 20px;
        color: #323232;

        font-size: 16px;
      }
      .prices,
      .nums {
        color: #666;
        font-size: 14px;
      }
      .subtotals {
        font-weight: 700;
        color: #666;
        font-size: 14px;
      }
    }
  }
  .fix-bottom {
    height: 90px;
    width: 100%;
    z-index: 1;
    background-position: 50%;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd, #f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
    padding: 0 30px;
    justify-content: flex-end;
    .shipping-box {
      padding: 0px 40px;
      .highlight {
        font-weight: 400;
        span {
          font-size: 24px;
          color: #d44d44;
          font-weight: 700;
        }
      }
    }
    .buy {
      width: 120px;
      height: 45px;
      /deep/ .ivu-btn {
        width: 120px;
        height: 45px;
      }
    }
  }
}
</style>