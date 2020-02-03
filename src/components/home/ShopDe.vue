<template>
  <div>
    <div class="good-item">
      <div class="good-img flex">
        <img :src="ShopDe.productImageBig" :alt="ShopDe.productName" />
      </div>
      <div class="good-title ellipsis">{{ShopDe.productName}}</div>
      <div class="sub-title ellipsis">{{ShopDe.subTitle}}</div>
      <div class="good-price">
        <div class="bt flex">
          <AddCar
            :productId="this.ShopDe.productId"
            :productImageBig="this.ShopDe.productImageBig"
            :source="''"
          ></AddCar>
        </div>
        <div class="price-number">
          <span class="price-">￥</span>
          <span>{{Number(ShopDe.salePrice).toFixed(2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCar from "../../components/common/AddCar";
export default {
  data() {
    return {};
  },
  components: {
    AddCar
  },
  props: {
    ShopDe: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.good-item:hover {
  transform: translateY(-3px);
  box-shadow: 1px 1px 20px #999;
  cursor: pointer;
}
.good-item:hover > .good-price > .bt {
  display: block;
}
.good-item:hover > .good-price > .price-number {
  display: none;
}
.good-item {
  background: #fff;
  transition: all 0.5s;
  padding: 25px 0;
  margin: 0 auto;
  // height: 445px;
  .good-img {
    img {
      margin: 50px auto 10px;
      max-width: 206px;
    }
  }
  .good-title {
    width: 100%;
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
    text-align: center;
    overflow: hidden;
  }
  .sub-title {
    text-align: center;
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 10px;
  }
  .good-price:hover > .bt {
    display: block;
  }
  .good-price:hover > .price-number {
    display: none;
  }
  .good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #d44d44;
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
    .bt {
      display: none;
      margin: 0 auto;
      .bt-de {
        margin-right: 10px;
      }
    }
    .price- {
      font-size: 14px;
    }
  }
}
</style>