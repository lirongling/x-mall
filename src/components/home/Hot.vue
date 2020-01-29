<template>
  <div>
    <div class="content">
      <Titles>热门活动</Titles>
      <div class="hot flex">
        <div class="good-item" v-for="(item,index) in hotData" :key="index">
          <div class="good-img flex">
            <img :src="item.productImageBig" :alt="item.productName" />
          </div>
          <div class="good-title">{{item.productName}}</div>
          <div class="sub-title ellipsis">{{item.subTitle}}</div>
          <div class="good-price">
            <div class="bt flex">
              <Button class="bt-de">查看详情</Button>
              <Button type="info">加入购物车</Button>
            </div>
            <div class="price-number">
              <span class="price-">￥</span>
              <span>{{Number(item.salePrice).toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Titles from "../home/Title";
export default {
  data() {
    return {
      showBt: false
    };
  },
  components: {
    Titles
  },
  props: {
    hotData: {
      type: Array,
      default: () => []
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
.content {
  margin-top: 30px;
  background: white;
  .hot {
    .good-item:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      cursor: pointer;
    }
    .good-item {
      background: #fff;
      width: 50%;
      transition: all 0.5s;
      .good-img {
        img {
          margin: 50px auto 10px;
          width: 35%;
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