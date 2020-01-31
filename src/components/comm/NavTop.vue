<template>
  <div>
    <div class="container">
      <div class="content flex">
        <div class="nav-logo"></div>
        <div class="right-box flex">
          <div class="nav-list flex">
            <Input suffix="ios-search" placeholder="请输入商品信息" style="width: 305px " />
            <div class="list-item">全部商品</div>
            <div class="list-item">捐赠</div>
          </div>
          <div>
            <Divider type="vertical" />
          </div>

          <div class="nav-aside flex">
            <NavAside></NavAside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavAside from "./NavAside";
export default {
  data() {
    return {};
  },
  components: {
    NavAside
  },
  props: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-divider {
  background: #635f5f;
}
.container {
  z-index: 30;
  background: #040404;
}
.content {
  max-width: 1220px;
  min-width: 1080px;
  margin: 0 auto;
  height: 100px;
  .nav-logo {
    background: url("../../assets/images/global-logo-red@2x.png") no-repeat 50%;
    background-size: cover;
    width: 50px;
    height: 40px;
    text-indent: -9999px;
    background-position: 0 0;
    cursor: pointer;
    .right-box {
      justify-content: flex-start;
      .nav-list {
        align-items: center;
        margin-right: 22px;
      }
      .nav-aside {
        transform: translate3d(0, 59px, 0);
        transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
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

.list-item {
  width: 110px;
  color: #c8c8c8;
  font-size: 14px;
  padding: 0 25px;
  cursor: pointer;
  transition: all 0.15s ease-out;
}
</style>