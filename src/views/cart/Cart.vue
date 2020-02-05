<template>
  <div>
    <div class="gray-box">
      <Titles>购物清单</Titles>

      <div class="ui-cart" v-if="carList.length>0">
        <div class="cart-table-title flex">
          <div class="table-left flex">
            <div class="name title-item">商品信息</div>
          </div>
          <div class="table-right flex">
            <div class="title-item">单价</div>
            <div class="title-item">数量</div>
            <div class="title-item">小计</div>
            <div class="title-item">操作</div>
          </div>
        </div>
        <div>
          <div class="cart-table">
            <div class="cart-items flex" v-for="(item,index) in carList" :key="index">
              <div class="table-left flex">
                <span class="is-check">{{isCheked}}</span>
                <div
                  class="items-choose"
                  :class="{'checkbox-on' : item.isChecked }"
                  @click="checkss(item)"
                ></div>

                <div class="items-thumb">
                  <img :src="item.productImageBig" :alt="item.productName" />
                </div>
                <div class="name ellipsis">{{item.productName}}</div>
              </div>
              <div class="table-right flex">
                <div class="price1 title-item">￥ {{item.salePrice}}</div>
                <div class="item-cols-num title-item">
                  <BuyNum
                    @edit-num="editNum"
                    :num="item.count"
                    :limit="Number(item.limitNum)"
                    :index="index"
                    :id="item._id"
                  ></BuyNum>
                </div>
                <div class="subtotal title-item">¥ {{(item.count*item.salePrice).toFixed(2)}}</div>
                <div class="operation title-item flex">
                  <div class="del-btn del" @click="delOnly(item._id,index)">删除</div>
                </div>
              </div>
            </div>
          </div>
          <div class="fix-bottom flex">
            <div class="table-left flex">
              <div @click="checkedAll" class="flex">
                <div class="items-choose" :class="{'checkbox-on' : checkAll }"></div>
                <span class="choose-all">全选</span>
              </div>
              <div class="delete-choose-goods" @click="deletaAll">删除选中的商品</div>
            </div>
            <div class="table-right flex">
              <div class="shipping flex">
                <div class="shipping-total flex">
                  <div class="highlight">
                    已选择
                    <span>{{allNumber()}}</span> 件商品
                  </div>
                  <div class="all-car">
                    共计
                    <span>{{allNum}}</span> 件商品
                  </div>
                </div>
                <div class="shipping-total flex no-bordel">
                  <div class="highlight">
                    应付总额：
                    <span>
                      <span class="saless">￥</span>
                      {{total().toFixed(2)}}
                    </span>
                  </div>
                  <div class="all-car">应付总额不含运费</div>
                </div>
              </div>
              <div class="buy flex">
                <Button type="primary" :disabled="allNumber()===0" @click="checkedout">现在结算</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex no-car">
        <img src="../../assets/images/cart-empty_@2x.png" alt />
        <p style="text-align: center; padding: 20px; color: rgb(141, 141, 141);">你的购物车空空如也</p>
        <Button @click="junmDoods">现在选购</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Titles from "../../components/home/Title";
import BuyNum from "../../components/goodsDetails/BuyNum";
export default {
  data() {
    return {
      isCheked: false,
      checkAll: false,
      carList: []
    };
  },
  components: {
    Titles,
    BuyNum
  },
  props: {},
  methods: {
    editNum(num, index, id) {
      let a = { productId: id, count: num };
      this.$api
        .editCart(a)
        .then(res => {
          if (res.code === 200) {
            this.carList[index].count = num;
          } else {
            // console.log("object");
            this.Notice("添加失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.productNum = num;
    },
    delOnly(productId, index) {
      this.confirm(productId, index);
    },
    // 删除购物车商品
    delCart(productId, index) {
      this.$api
        .delCart({ productId })
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            if (index) {
              this.carList.splice(index, 1);
            } else {
              this.carList = this.carList.filter(item => {
                return !item.isChecked;
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 单选
    checkss(item) {
      this.isCheked = !this.isCheked;
      item.isChecked = !item.isChecked;
      this.checkAll = this.carList.every(item => {
        return item.isChecked;
      });
      this.allNumber();
    },
    // 全选
    checkedAll() {
      this.checkAll = !this.checkAll;
      console.log(this.carList);
      this.carList.map(item => {
        item.isChecked = this.checkAll;
      });
      this.allNumber();
    },
    // 批量删除
    deletaAll() {
      let delArr = [];
      this.$store.state.carList.map(item => {
        if (item.isChecked) {
          delArr.push(item._id);
        }
      });
      if (delArr.length === 0) {
        this.Notice("还未选择商品");
      } else {
        this.confirm(delArr);
      }
    },
    // 提醒
    Notice(title) {
      this.$Notice.warning({
        title: title,
        duration: 1.5
      });
    },
    // 确认对话框
    confirm(delArr, index) {
      this.$Modal.confirm({
        title: "提醒",
        content: "<p>是否确认删除？</p>",
        onOk: () => {
          this.delCart(delArr, index);
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    total() {
      let totalPrice = 0;
      this.carList.map(item => {
        if (item.isChecked) {
          totalPrice += item.count * item.salePrice;
        }
      });
      return totalPrice;
    },
    allNumber() {
      let num = 0;
      let checkedouts = [];
      this.$store.state.carList.map(item => {
        if (item.isChecked) {
          // console.log(item.isChecked);
          num += item.count;
          checkedouts.push(item);
        }
      });
      this.$store.state.checkedout = checkedouts;
      this.total();
      return num;
    },
    // 选购商品
    junmDoods() {
      this.$router.push("/goods");
    },
    // 跳转到结算页面
    checkedout() {
      this.$router.push("/checkedout");
    }
  },
  mounted() {
    setTimeout(() => {
      this.carList = this.$store.state.carList;
    }, 100);
    this.allNumber();
  },
  watch: {},
  computed: {
    allNum() {
      let totalPrice = 0;
      this.$store.state.carList.map(item => {
        totalPrice += item.count;
      });
      this.$store.state.carNumber = totalPrice;
      return totalPrice;
    }
  }
};
</script>

<style scoped lang='scss'>
.is-check {
  width: 0;
  overflow: hidden;
}
.gray-box {
  margin-top: 40px;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .ui-cart {
    // padding-bottom: 91px;
    .title-item {
      width: 137px;
      text-align: center;
      color: #838383;
    }
    .cart-table-title {
      line-height: 38px;
      height: 38px;
      padding: 0 30px;
      font-size: 12px;
      background: #eee;
      border-bottom: 1px solid #dbdbdb;
      border-bottom-color: rgba(0, 0, 0, 0.08);

      .table-left {
        flex: 1;
        .name {
          text-align: left;
        }
      }
    }
    .table-left {
      flex: 1;
      justify-content: flex-start;
    }
    .table-right {
      min-width: 548px;
      justify-content: flex-start;
    }
    .cart-table {
      align-items: flex-start;
      .cart-items {
        height: 140px;
        padding: 0 30px;

        .items-thumb:hover,
        .name:hover {
          cursor: pointer;
        }
        .items-thumb {
          margin-left: 20px;
          overflow: hidden;
          width: 80px;
          height: 80px;
          img {
            width: 100%;
          }
        }
        .name {
          width: 380px;
          margin-left: 20px;
          color: #323232;
        }
        .price1 {
          width: 137px;
          text-align: center;
          color: #666;
          line-height: 140px;
        }
        .item-cols-num {
          margin-top: 8px;
        }
        .subtotal {
          color: #666;
          font-weight: 700;
          font-size: 14px;
        }
        .operation {
          justify-content: center;
        }
        .del-btn {
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
    .items-choose {
      width: 20px;
      height: 20px;
      background: url("../../assets/images/checkbox-new_631a56a4f6.png")
        no-repeat 0 -20px;
      cursor: pointer;
    }
    .checkbox-on {
      background-position: 0 0;
    }
    .fix-bottom {
      height: 90px;
      width: 100%;
      z-index: 1;
      background-position: 50%;
      background: #fdfdfd;
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
      padding: 0 30px;
      .choose-all {
        font-size: 12px;
        margin: 0 25px 0 15px;
      }
      .delete-choose-goods {
        // margin-left: 21px;
        color: #bbb;
        font-size: 12px;
        cursor: pointer;
      }
      .shipping {
        padding-left: 30px;
        .saless {
          font-size: 14px !important;
          margin: 0 !important;
        }

        .shipping-total {
          border-right: 1px solid #e1e1e1;
          padding: 0 20px;
          flex-direction: column;
          .highlight {
            color: #323232;
            font-weight: 400;
            font-size: 14px;
            min-width: 150px;
            text-align: right;
            span {
              color: #d44d44;
              font-size: 18px;
              font-weight: 700;
              margin: 0 5px;
            }
          }
          .all-car {
            color: #959595;
            font-weight: 400;
            width: 150px;
            text-align: right;
            font-size: 14px;
            span {
              font-weight: 700;
              margin: 0 5px;
            }
          }
        }
        .no-bordel {
          border-right: 0px solid #e1e1e1;
        }
      }
      .buy {
        width: 120px;
        height: 45px;
        /deep/ .ivu-btn {
          width: 120px;
          height: 45px;
        }
      }
    }
  }
  .no-car {
    flex-direction: column;
    padding: 50px;
    img {
      width: 275px;
    }
    /deep/ .ivu-btn {
      width: 150px;
      height: 40px;
    }
  }
}
</style>