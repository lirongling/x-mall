<template>
  <div>
    <div class="nav-aside flex">
      <div class="user pr"></div>
      <Poptip trigger="hover" placement="bottom-end" width="360">
        <div class="shop flex">
          <div class="cart-img"></div>
          <div class="cart-num">0</div>
        </div>
        <div class="api slot-content flex" slot="content">
          <div class="cart-con flex">
            <img src="../../assets/images/cart-empty-new.png" alt />
            <p>您的购物车竟然是空的!</p>
          </div>
        </div>
      </Poptip>
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
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-poptip-popper {
  margin-top: 10px;
  transition: opacity 0.15s ease-out;
  // box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.slot-content {
  height: 360px;
  justify-content: center;
  .cart-con {
    height: 313px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    img {
      width: 76px;
      margin-bottom: 30px;
    }
  }
}
.cart-num {
  position: absolute;
  left: 30px;
  background: #969696;
  background-image: linear-gradient(#a4a4a4, #909090);
  box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  color: rgb(53, 52, 52);
  font-size: 12px;
}
.nav-aside:hover {
  color: #6b95ea;
  // background: #635f5f;
  cursor: pointer;
}
.shop {
  position: relative;
  margin-left: 21px;
  width: 61px;
  z-index: 99;
  height: 19px;
}
.cart-img {
  width: 30px;
  height: 100%;
  background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png")
    0 -22px;
  background-size: 240px 107px;
  background-position: -150px -22px;
}
.user {
  margin-left: 41px;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png") -155px
    0;
  background-size: 240px 107px;
  transition: none;
}
</style>