<template>
  <div>
    <div class="container flex" v-if="goodDetails.productId">
      <div class="gallery-wrapper flex">
        <div class="thumbnail">
          <ul>
            <li
              v-for="(item,index) in goodDetails.productImageSmall"
              :key="index"
              :class="{'li': num === index}"
              @click="changeImg(index)"
            >
              <img :src="item" :alt="goodDetails.productName" />
            </li>
          </ul>
        </div>
        <div class="thumb">
          <img :src="goodDetails.productImageSmall[this.num]" :alt="goodDetails.productName" />
        </div>
      </div>
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{goodDetails.productName}}</h4>
          <div class="introduce flex">
            <div>{{goodDetails.subTitle}}</div>
            <div class="price">
              <span>¥</span>
              <span class="prices">{{Number(goodDetails.salePrice).toFixed(2)}}</span>
            </div>
          </div>
        </div>
        <div class="num flex">
          <span class="params-name">数量</span>
          <BuyNum @edit-num="editNum" :limit="Number(goodDetails.limitNum)"></BuyNum>
        </div>
        <div class="buy flex">
          <AddCar
            :productId="this.goodDetails.productId"
            :productImageBig="this.goodDetails.productImageBig"
            :source="'details'"
            :count="productNum"
            :goodDetails="goodDetails"
          ></AddCar>
          <!-- <div class="now-buy">
            <Button
              type="primary"
              @click="addCart(goodDetails.productId,goodDetails.productImageBig)"
            >加入购物车</Button>
            <div id="add-img" ref="addcart" v-if="showMoveImg">
              <img :src="goodDetails.productImageBig" alt />
            </div>
          </div>
          <Button>现在购买</Button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuyNum from "./BuyNum";
import AddCar from "../../components/common/AddCar";
export default {
  data() {
    return {
      num: 0,
      productNum: 1,
      showMoveImg: false
    };
  },
  components: {
    BuyNum,
    AddCar
  },
  props: {
    goodDetails: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    changeImg(index) {
      this.num = index;
    },
    editNum(num) {
      this.productNum = num;
    },
    // 商品动画
    moveImg() {
      // 获取节点位置;
      this.$nextTick(() => {
        //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
        let dom = this.$refs.addcart;
        let elLeft = dom.getBoundingClientRect().left / 2 + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        console.log(elTop);
        console.log(elLeft);
        dom.style.zIndex = "999";
        dom.style.transition = "all .6s ease-out";
        // dom.style.marginTop = "-240px";
        dom.style.transform = `translate(${elLeft + 20}px,${-elTop +
          40}px) scale(0.1)`;
        // 动画结束后触发
        dom.addEventListener("transitionend", () => {
          this.showMoveImg = false;
          // this.domInt(ulStyle);
          // this.flag = true;
        });
        dom.addEventListener("webkitAnimationEnd", () => {
          this.showMoveImg = false;
          // this.domInt(ulStyle);
          // this.flag = true;
        });
        // dom.style.transform = "scale(0.1)";

        // dom.style.transform = `translateX(${-elLeft}px)`;
      });
    },
    // 加入购物车
    addCart(productId, event) {
      this.$api
        .addCart({ productId })
        .then(res => {
          if (res.code === 200) {
            this.showMoveImg = true;
            this.moveImg();
            // 加入购物车动画
            // var dom = event.target;
            // // console.log(event);
            // // 获取点击的坐标
            // let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
            // let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  justify-content: flex-start;
  align-items: flex-start;
  .gallery-wrapper {
    width: 540px;
    .thumbnail {
      .li {
        padding: 10px;
        border: 3px solid rgba(0, 0, 0, 0.2);
      }
      li {
        width: 80px;
        height: 80px;
        margin-top: 10px;
        padding: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
    .thumb {
      margin-left: 20px;
      img {
        width: 440px;
        height: 440px;
      }
    }
  }
  .banner {
    width: 450px;
    margin-left: 10px;
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
        font-weight: 400;
      }
      .introduce {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        .price {
          color: #d44d44;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          .prices {
            padding-left: 2px;
            font-size: 24px;
          }
        }
      }
    }
    .num {
      justify-content: flex-start;
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      align-items: center;
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .item-cols-num {
        height: 40px;
        padding-top: 4px;
        .down {
          background: url("../../assets//images/cart-updown_8303731e15@2x.jpg")
            no-repeat;
          overflow: hidden;
          background-position: 0 -60px;
          float: left;
          width: 34px;
          height: 37px;
          background-size: 100% auto;
          line-height: 40px;
          text-indent: -9999em;
          cursor: pointer;
          user-select: none;
        }
        .down:hover {
          background-position: 0 -180px;
        }
        ul {
        }
      }
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 50px 0 0 10px;
      justify-content: flex-start;
      .now-buy {
        margin-right: 30px;
        position: relative;
        #add-img {
          // transition: all 0.5s ease-out;
          position: absolute;
          z-index: 999;
          top: 0;
          right: 0;
          img {
            width: 40px;
          }
        }
      }
      /deep/ .ivu-btn {
        width: 145px;
        height: 50px;
      }
    }
  }
}
</style>