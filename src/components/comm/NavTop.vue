<template>
  <div>
    <div class="container">
      <div class="content flex">
        <a href="/">
          <div class="nav-logo"></div>
        </a>

        <div class="right-box flex">
          <div class="nav-list flex">
            <div class="searchsss">
              <div>
                <Input
                  suffix="ios-search"
                  placeholder="请输入商品信息"
                  v-model="searchText"
                  @on-focus="searchFocus(2)"
                  @on-blur="searchFocus(-2)"
                />
              </div>

              <div
                class="searchs"
                :class="{'suggest-show' :count>0}"
                @mouseenter="searchFocus(1)"
                @mouseleave="searchFocus(-1)"
              >
                <div v-if="searchResult.length>0">
                  <div class="search-result">
                    <div
                      v-for="item in searchResult"
                      :key="item.productId"
                      class="search-item"
                      @click=" goodsDetails(item.productId)"
                    >{{item.productName}}</div>
                  </div>
                </div>
                <div v-if="searchText.length===0&&searchResult.length===0">
                  <div class="search-history">
                    <div class="flex history-text">
                      <div>最近搜索</div>
                      <div class="del-history" @click="delHistory">删除搜索历史</div>
                    </div>

                    <div class="history flex" v-if="searchHistorys.length>0">
                      <div v-for="(item,index) in searchHistorys" :key="index">
                        <div
                          class="history-item flex"
                          v-if="index<10"
                          @click="addSearch(item)"
                        >{{item}}</div>
                      </div>
                    </div>
                    <div class="no-history" v-else>暂无搜索历史</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <a href="/goods">全部商品</a>
            </div>
            <div class="list-item">捐赠</div>
            <div class="split">
              <Divider type="vertical" />
            </div>
          </div>

          <div class="nav-aside flex">
            <!-- <NavAside></NavAside> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../assets/js/util";
import NavAside from "./NavAside";
export default {
  data() {
    return {
      searchText: "",
      searchResult: [],
      searchHistorys: [],
      count: 0
    };
  },
  components: {
    NavAside
  },
  props: {},
  methods: {
    // 跳转到所有商品页面
    jumpGoods() {
      this.$router.push("/goods");
    },
    // 输入款获取失去焦点   搜索框鼠标移入移出事件
    searchFocus(num) {
      this.count += num;
    },
    // 跳转到详情页
    goodsDetails(productId) {
      this.count = 0;
      const { href } = this.$router.resolve({
        name: "goodsDetails",
        query: { productId: productId }
      });
      window.open(href, "_blank");
      // window.open(`/goodsDetails?productId=${productId}`, "_blank");
    },
    // 搜索
    search() {
      this.$api
        .search(this.searchText)
        .then(res => {
          if (res.code === 200) {
            this.searchResult = res.data;
            console.log(res);
            if (res.data.length > 0) {
              this.history();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 存历史浏览
    history() {
      let searchHistory = [];
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        if (localStorage.getItem(`${loginMsg.username}_search`)) {
          searchHistory = JSON.parse(
            localStorage.getItem(`${loginMsg.username}_search`)
          );
          if (!searchHistory.includes(this.searchText)) {
            searchHistory.unshift(this.searchText);
            localStorage.setItem(
              `${loginMsg.username}_search`,
              JSON.stringify(searchHistory)
            );
          }
        } else {
          searchHistory.unshift(this.searchText);
          localStorage.setItem(
            `${loginMsg.username}_search`,
            JSON.stringify(searchHistory)
          );
        }
      } else {
        if (JSON.parse(localStorage.getItem("tourists"))) {
          let tourists = JSON.parse(localStorage.getItem("tourists"));
          if (!tourists.includes(this.searchText)) {
            tourists.unshift(this.searchText);
            this.searchHistorys.unshift(this.searchText);
            localStorage.setItem("tourists", JSON.stringify(tourists));
          }
        } else {
          let tourists = [];
          tourists.push(this.searchText);
          localStorage.setItem("tourists", JSON.stringify(tourists));
        }
      }
    },
    // 获取搜索历史
    searchHistory() {
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        if (localStorage.getItem(`${loginMsg.username}_search`)) {
          this.searchHistorys = JSON.parse(
            localStorage.getItem(`${loginMsg.username}_search`)
          );
        }
      } else {
        if (JSON.parse(localStorage.getItem("tourists"))) {
          this.searchHistorys = JSON.parse(localStorage.getItem("tourists"));
        }
      }
      // console.log(this.searchHistorys);
    },
    // 删除搜索历史
    delHistory() {
      this.searchHistorys = [];
      if (JSON.parse(localStorage.getItem("loginMsg"))) {
        let loginMsg = JSON.parse(localStorage.getItem("loginMsg"));
        localStorage.setItem(
          `${loginMsg.username}_search`,
          JSON.stringify(this.searchHistorys)
        );
      } else {
        localStorage.setItem("tourists", JSON.stringify(this.searchHistorys));
      }
    },
    // 添加搜索
    addSearch(item) {
      this.searchText = item;
      setTimeout(() => {
        this.count = 1;
      }, 500);
    }
  },
  beforeMount() {
    this.searchHistory();
  },
  mounted() {
    this.$watch(
      "searchText",
      util.throttle(() => {
        if (this.searchText.trim() === "") {
          this.searchResult = [];
        } else {
          this.search();
        }
      }, 450)
    );
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-input-wrapper {
  width: 305px;
}
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
  }
  .right-box {
    justify-content: flex-start;
    .nav-list {
      align-items: center;
      margin-right: 22px;
    }
    .nav-aside {
      width: 102px;
      // transform: translate3d(0, 59px, 0);
      // transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
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
.split {
  position: relative;
  right: 20px;
  // padding-left: -160px;
}
.list-item {
  width: 110px;
  color: #c8c8c8;
  font-size: 14px;
  padding: 0 25px;
  cursor: pointer;
  transition: all 0.15s ease-out;
  a {
    color: #c8c8c8;
  }
}
.suggest-show {
  display: block !important;
}
.searchs {
  display: none;
  position: absolute;
  // bottom: 0;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #e5e5e5;
  background: #fff;
  z-index: 19;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0 0 4px 4px;
  color: #999;
  font-size: 12px;
  top: 40px;
}
.del-history:hover {
  cursor: pointer;
}
.history {
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
  color: rgb(80, 79, 79);
}
.no-history {
  margin-left: 10px;
  color: rgb(80, 79, 79);
}
.history-item {
  padding: 0 5px;
}
.history-item:hover {
  color: rgb(236, 141, 17);
  cursor: pointer;
}
.searchsss {
  position: relative;

  .search-result {
    .search-item {
      padding-left: 5px;
      width: 100%;
      height: 26px;
      line-height: 26px;
      color: #999;
      padding: 0 10px;
    }
    .search-item:hover {
      color: rgb(236, 141, 17);
      background: rgb(226, 219, 219);
      cursor: pointer;
    }
  }
}
</style>