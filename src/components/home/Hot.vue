<template>
  <div>
    <div class="gray-box">
      <Titles>{{name}}</Titles>
      <div class="hots flex">
        <div class="good-item" v-for="(item,index) in hotData" :key="index">
          <ShopDe :ShopDe="item"></ShopDe>
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
    return {
      showBt: false
    };
  },
  components: {
    Titles,
    ShopDe
  },
  props: {
    hotData: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ""
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bt-de {
  margin-right: 10px;
}
.gray-box {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .hots {
    border-radius: 0 0 8px 8px;
    // overflow: hidden;
    .good-item {
      background: #fff;
      width: 50%;
      transition: all 0.5s;
      .good-img {
        width: 100%;
        img {
          margin: 50px auto 10px;
          width: 100%;
        }
      }
      .good-title {
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
          width: 34%;
        }
        .price- {
          font-size: 14px;
        }
      }
    }
  }
}
</style>