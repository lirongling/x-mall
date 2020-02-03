<template>
  <div>
    <div></div>
    <div class="nav-sub" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <div class="nav-sub-wrapper flex">
        <ul class="nav-list flex">
          <li
            class="nav-item"
            :class="{'home': num === index}"
            v-for="(item,index) in navList"
            @click="changeNav(index)"
            :key="index"
          >{{item}}</li>
        </ul>
        <div id="nav-show" class="nav-aside flex" v-show="isFixed" :class="{'show-nav' : isFixed}">
          <NavAside></NavAside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavAside from "./NavAside";
export default {
  data() {
    return {
      isFixed: false,
      offsetTop: 0,
      navList: [
        "首页",
        "全部",
        "周边品牌",
        "捐赠名单",
        "后台管理系统",
        "XPay支付系统",
        "XBoot开发平台",
        "宣传视频",
        "Github",
        "商用授权"
      ],
      num: 0
    };
  },
  components: {
    NavAside
  },
  props: {},
  methods: {
    initHeight() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //如果被卷曲的高度大于吸顶元素到顶端位置 的距离

      this.isFixed = scrollTop >= this.offsetTop ? true : false;
    },
    changeNav(index) {
      this.num = index;
      if (index === 0) {
        this.$router.push("/");
      } else if (index === 1) {
        this.$router.push("/goods");
      } else if (index === 2) {
        this.$router.push({
          name: "goods",
          query: { _id: "5e26b94b099acc01b089efe" }
        });
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
  },
  //回调中移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    isFixed(val, oldVal) {
      if (val !== oldVal && val) {
        document.getElementById("nav-show").style.transform = "translateY(0px)";
        setInterval(() => {
          // console.log(val);
          document.getElementById("nav-show").style.transform =
            "translateY(55px)";
        }, 300);
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.show-nav {
  // top: 50%;
  // transform: translateY(55px);
}
from {
  transform: translate(-50);
}
to {
  transform: translateY(0);
}

.is_fixed {
  position: fixed !important;
  top: 0;
  z-index: 9 !important;
}
.nav-sub {
  position: relative;
  z-index: 9;
  height: 90px;
  width: 100%;
  background: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  .nav-sub-wrapper {
    padding: 31px 0;
    height: 90px;
    position: relative;
    max-width: 1220px;
    min-width: 1080px;
    margin: 0 auto;
    .nav-list {
      justify-content: flex-start;
      li {
        list-style: initial;
      }
      .home {
        font-weight: 700;
      }
      .nav-item {
        font-size: 14px;
        margin: 0 15px;
        color: #666;
      }
      .nav-item:hover {
        color: #5683ea;
        cursor: pointer;
      }
    }
  }
}
.nav-aside {
  width: 143px;
  position: absolute;
  right: 0;
  top: -20px;
  transition: all 0.5s;

  // transform: translate3d(0, 59px, 0);
  // transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
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
  margin-left: 41px;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png") -155px
    0;
  background-size: 240px 107px;
  transition: none;
}
</style>