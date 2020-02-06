<template>
  <div>
    <div class="full">
      <div class="nav-cart-items">
        <ul>
          <li class="cart-item flex" v-for="(item,index) in $store.state.carList" :key="index">
            <div class="item-thumb">
              <img :src="item.productImageBig" :alt="item.productName" />
            </div>
            <div class="item-desc flex">
              <div class="cart-cell">
                <h4 class="ellipsis">
                  <a>{{item.productName}}</a>
                </h4>
                <h6>
                  <span class="price-icon">¥</span>
                  <span class="price-num">{{item.salePrice}}</span>
                  <span class="item-num">x {{item.count}}</span>
                </h6>
              </div>
            </div>
            <div class="del-btn del" @click="delCart(item._id,index)">删除</div>
          </li>
        </ul>
      </div>
      <div class="nav-cart-total">
        <p>
          共
          <span>{{$store.state.carNumber}}</span>
          件商品
        </p>
        <h5>
          合计：
          <span class="price-icon">¥</span>
          <span class="price-num">{{total}}</span>
        </h5>
        <div class="bt-right">
          <Button type="primary" @click="jumpCar">去购物车</Button>
        </div>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {
    // 删除购物车商品
    delCart(productId, index) {
      this.$api
        .delCart({ productId })
        .then(res => {
          if (res.code === 200) {
            this.$store.state.carList.splice(index, 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到购物车
    jumpCar() {
      this.$router.push("/cart");
    }
  },
  beforeMount() {},
  mounted() {},
  watch: {},
  computed: {
    total() {
      let totalPrice = 0;
      this.$store.state.carList.map(item => {
        totalPrice += item.count * item.salePrice;
      });
      return totalPrice;
    }
  }
};
</script>

<style scoped lang='scss'>
//谷歌适用
::-webkit-scrollbar {
  display: none;
}
.full {
  border-radius: 8px;
  overflow: hidden;
  // max-height: 500px !important;
  width: 360px;
  // width: 360px;
  .nav-cart-items {
    max-height: 480px !important;
    overflow: scroll;
    .cart-item:hover {
      background: #fcfcfc;
    }
    .cart-item {
      // background: #000;
      height: 120px;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
      padding: 20px;
      // position: relative;
      // display: flex !important;

      .item-thumb {
        width: 80px;
        height: 80px;
        border-radius: 3px;
        overflow: hidden;
        border: 1px solid #efefef;
        img {
          width: 100%;
        }
      }
      .item-desc {
        margin-left: 18px;

        .cart-cell {
          h4 {
            color: #000;
            width: 160px;
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 10px;
            font-weight: 400;
          }
          h6 {
            color: #cacaca;
            font-size: 12px;
            line-height: 14px;
            margin-top: 20px;
            font-weight: 400;
            span {
              font-weight: 700;
              color: #cacaca;
            }
            .price-icon {
              color: #d44d44;
            }
            .price-num {
              margin-left: 5px;
              font-size: 14px;
              color: #d44d44;
            }
            .item-num {
              margin-left: 10px;
            }
          }
        }
      }
      .del-btn {
        display: block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png") -50px -60px
          no-repeat;
        background-size: 240px 107px;
        text-indent: -9999em;
      }
      .del-btn:hover {
        background-position: -75px -60px;
      }
    }
  }
  .nav-cart-total {
    box-sizing: content-box;
    position: relative;
    padding: 20px;
    height: 40px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    border-radius: 0 0 8px 8px;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
      0 -3px 8px rgba(0, 0, 0, 0.04);
    background: linear-gradient(#fafafa, #f5f5f5);
    p {
      margin-bottom: 4px;
      line-height: 16px;
      font-size: 12px;
      color: #c1c1c1;
      span {
        margin: 0 5px;
      }
    }
    h5 {
      line-height: 20px;
      font-size: 14px;
      color: #6f6f6f;
      span {
        color: #de4037;
        font-weight: 700;
      }
      .price-icon {
        font-size: 12px;
        margin-right: 5px;
      }
      .price-num {
        font-size: 18px;
      }
    }
    .bt-right {
      position: absolute;
      right: 20px;
      top: 30px;
      width: 108px;
    }
  }
}
</style>