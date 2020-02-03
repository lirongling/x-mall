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
          </li>
        </ul>
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
  methods: {},
  beforeMount() {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.full {
  border-radius: 8px;
  overflow: hidden;
  max-height: 500px !important;
  width: 320px;
  .nav-cart-items {
    max-height: 520px !important;
    overflow: scroll;
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
        // width: 205px;
        // height: 80px;
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
    }
  }
}
</style>