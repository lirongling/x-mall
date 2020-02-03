<template>
  <div>
    <div class="nav-aside flex">
      <div class="user pr" @click="login" v-if="$store.state.userInfo===null"></div>
      <div v-else class="users">
        <Poptip trigger="hover" placement="bottom" width="168">
          <div class="user pr"></div>
          <div class="api slot-contents flex" slot="content">
            <div class="nav-user-wrapper flex">
              <div class="nav-user-avatar flex">
                <div class="img">
                  <img src="http://xmall.exrick.cn/static/images/smartisan_4ada7fecea.png" alt />
                </div>
                <p class="name">{{$store.state.userInfo.username}}</p>
              </div>
              <ul class="flex nav-user-list">
                <li>
                  <a href="/user/orderList" class>我的订单</a>
                </li>
                <li>
                  <a href="/user/information" class>账号资料</a>
                </li>
                <li>
                  <a href="/user/addressList" class>收货地址</a>
                </li>
                <li>
                  <a href="/user/support" class>售后服务</a>
                </li>
                <li>
                  <a href="/user/coupon" class>我的优惠</a>
                </li>
                <li>
                  <a @click="excit">退出</a>
                </li>
              </ul>
            </div>
          </div>
        </Poptip>
      </div>
      <Poptip trigger="hover" placement="bottom-end" width="360" v-model="$store.state.carVisible">
        <div class="shop flex">
          <div class="cart-img"></div>
          <div
            ref="cartnum"
            class="cart-num"
            :class="{'cart-nums': $store.state.carNumber>0}"
          >{{this.$store.state.carNumber}}</div>
        </div>
        <div class="api slot-content flex" slot="content">
          <div v-if="$store.state.carNumber>0">
            <CarList></CarList>
          </div>
          <div class="cart-con flex" v-else>
            <img src="../../assets/images/cart-empty-new.png" alt />
            <p>您的购物车竟然是空的!</p>
          </div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import CarList from "./CarList";
export default {
  data() {
    return {
      carVisible: false
    };
  },
  components: {
    CarList
  },
  props: {},
  methods: {
    // 登录按钮
    login() {
      this.$router.push("/login");
    },
    //退出登录
    excit() {
      localStorage.removeItem("loginMsg");
      this.$store.state.userInfo = null;
    },
    // 购物车数量动画
    numberScale() {
      let dom = this.$refs.cartnum;
      dom.style.transition = "all .5s ease";
      // dom.style.marginTop = "-240px";
      dom.style.transform = `scale(1.3)`;
      // 动画结束后触发
      dom.addEventListener("transitionend", () => {
        dom.style.transform = `scale(1)`;
      });
      dom.addEventListener("webkitAnimationEnd", () => {
        dom.style.transform = `scale(1)`;
      });
    }
  },
  beforeMount() {},
  mounted() {},
  watch: {
    "$store.state.carNumber"(val) {
      if (val > 0) {
        setTimeout(() => {
          this.numberScale();
        }, 500);
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-poptip {
  display: flex;
  align-items: center;
}
/deep/ .ivu-poptip-popper {
  margin-top: 10px;
  transition: opacity 0.15s ease-out;
  // box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.users {
  /deep/ .ivu-poptip-popper {
    margin-left: 38px;
    transition: opacity 0.15s ease-out;
    // box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  /deep/ .ivu-poptip-body {
    padding: 8px 0;
  }
  .nav-user-wrapper {
    width: 168px;
    position: relative;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .nav-user-avatar {
      width: 100%;
      flex-direction: column;
      border-bottom: 1px solid #f5f5f5;
      // padding-top: 18px;
      .img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
        // background-image: url()
      }
      .name {
        margin-bottom: 16px;
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
        color: #757575;
      }
    }
    .nav-user-list {
      width: 168px;
      flex-direction: column;
      li {
        width: 100%;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        line-height: 44px;
        height: 44px;
        color: #616161;
        font-size: 12px;
        a {
          color: #616161;
        }
      }
      li:hover {
        background: #fafafa;
      }
    }
  }
}
.slot-content {
  background: #fff;
  // height: 360px;
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
.cart-nums {
  background: #eb746b !important;
  background-image: linear-gradient(#eb746b, #e25147);
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
  z-index: 9;
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
  // margin-top: -42px;
  margin-left: 41px;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png") -155px
    0;
  background-size: 240px 107px;
  transition: none;
}
</style>