<template>
  <div>
    <div class="buy flex" v-if="this.source==='details'">
      <div class="now-buy" v-if="productImageBig.length>0">
        <Button type="primary" @click="addCart(productId,productImageBig)">加入购物车</Button>
        <div id="add-img" ref="addcart" v-if="showMoveImg">
          <img :src="productImageBig" alt />
        </div>
      </div>
      <Button @click="nowBuy">现在购买</Button>
    </div>
    <div class="bt flex" v-else>
      <div
        class="now-buy"
        v-if="productImageBig.length>0"
        @click.stop.prevent="addCart(productId,productImageBig)"
      >
        <Button type="primary">加入购物车</Button>
        <div id="add-img" ref="addcart" v-if="showMoveImg">
          <img :src="productImageBig" alt />
        </div>
      </div>
      <Button>查看详情</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMoveImg: false
    };
  },
  components: {},
  props: {
    productId: {
      type: Number,
      default: ""
    },

    productImageBig: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      default: ""
    },
    count: {
      type: [Number, String],
      default: 1
    },
    goodDetails: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 商品动画
    moveImg() {
      // 获取节点位置;
      this.$nextTick(() => {
        //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
        let dom = this.$refs.addcart;
        let elLeft =
          document.body.clientWidth -
          dom.getBoundingClientRect().left +
          dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        // console.log(elTop);
        // console.log(elLeft);
        dom.style.zIndex = "999";
        dom.style.transition = "all .8s ease";
        // dom.style.marginTop = "-240px";
        dom.style.transform = `translate(${elLeft - 150}px,${-elTop +
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
    // 查询购物车
    getCarts() {
      this.$api
        .getCarts()
        .then(res => {
          // console.log(res);
          // this.$store.state.carNumber = 0;
          if (res.code === 200) {
            this.$store.state.carList = res.data;
            // res.data.map(item => {
            //   this.$store.state.carNumber += item.count;
            // });
          }
        })
        .catch(err => {});
    },
    // 加入购物车
    addCart(productId, event) {
      this.$api
        .addCart({ productId: productId, count: this.count })
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.showMoveImg = true;
            this.$store.state.carVisible = true;

            // this.editNum(productId, this.count);
            this.getCarts();
            this.$store.state.carNumber += this.count;
            this.moveImg();
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editNum(id, num) {
      let a = { productId: this._id, count: num };
      this.$api
        .editCart(a)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.carList[index].count = num;
          } else {
            // console.log("object");
            // this.Notice("添加失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.productNum = num;
    },
    // 现在购买
    nowBuy() {
      this.goodDetails.count = this.count;
      let checkedouts = [];
      checkedouts.push(this.goodDetails);

      this.$router.push({
        name: "checkedout",
        query: { shopList: JSON.stringify(checkedouts) }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.buy {
  position: relative;
  // border-top: 1px solid #ebebeb;
  // padding: 50px 0 0 10px;
  justify-content: flex-start;

  /deep/ .ivu-btn {
    width: 145px;
    height: 50px;
  }
}
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
.bt {
  margin: 0 auto;

  justify-content: center;
  .bt-de {
    margin-right: 10px;
  }
}
</style>