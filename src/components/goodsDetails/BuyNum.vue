<template>
  <!--数量-->
  <div class="item-cols-num clearfix">
    <div class="select">
      <span class="down" @click.stop.prevent="down()" :class="{'down-disabled':Num<=1}">-</span>
      <span class="num">
        <input type="number" :class="{show:show}" v-model.number="Num" maxlength="2" />
        <ul ref="ul">
          <li v-for="(item,index)  in numList" :key="index">{{item}}</li>
        </ul>
      </span>
      <span class="up" :class="{'up-disabled':Num>=limit}" @click.stop.prevent="up()">+</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: [Number],
      default: 1
    },
    index: {
      type: [Number],
      default: 1
    },
    id: {
      type: [Number, String]
    },
    checked: {
      type: [String, Boolean]
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  computed: {},
  data() {
    return {
      show: true,
      flag: true,
      Num: this.num,
      numList: []
    };
  },
  methods: {
    up() {
      if (this.flag && this.Num < this.limit) {
        this.ani("up");
      }
      return false;
    },
    down() {
      if (this.flag && this.Num > 1) {
        this.ani("down");
      }
      return false;
    },
    ani(opera) {
      this.flag = false;
      let n = this.Num;
      this.numList = [n - 1, n, n + 1];
      let ul = this.$refs.ul;
      let ulStyle = ul.style;
      this.show = false;
      ulStyle.zIndex = "99";
      ulStyle.transition = "all .2s ease-out";
      if (opera === "up") {
        this.Num++;
        ulStyle.transform = "translateY(-54px)";
      } else {
        this.Num--;
        ulStyle.transform = `translateY(-18px)`;
      }
      // 动画结束后触发
      ul.addEventListener("transitionend", () => {
        this.show = true;
        this.domInt(ulStyle);
        this.flag = true;
      });
      ul.addEventListener("webkitAnimationEnd", () => {
        this.show = true;
        this.domInt(ulStyle);
        this.flag = true;
      });
    },
    domInt(domStyle) {
      domStyle.zIndex = "1";
      domStyle.transition = "all 0s";
      domStyle.transform = "translateY(-36px)"; // 回到原位
    }
  },
  watch: {
    Num(val, oldVal) {
      if (Number(val) > 0 && this.Num <= this.limit) {
        this.$emit("edit-num", this.Num, this.index, this.id, this.checked);
      } else {
        this.Num = oldVal;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  input {
    //  去除获取焦点的边框
    outline: none;
    z-index: 6;
    width: 36px;
    height: 18px;
    background-color: #fff;
    border: none;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    padding: 0;
    color: #666;
    visibility: hidden;
    position: relative;
    border: none;
    &.show {
      visibility: visible;
    }
  }
  ul {
    padding: 0;
    line-height: 18px;
    font-size: 14px;
    display: inline-block;
    position: absolute;
    left: 0;
    list-style: none;
    width: 36px;
    font-family: system-ui;
    z-index: 1;
    transform: translateY(-36px);
  }
  .up.up-disabled,
  .up.up-disabled:hover {
    background-position: 0 -240px !important;
    cursor: not-allowed !important;
  }
}

/*数量*/
.item-cols-num {
  display: inline-block;
}

.select {
  height: 40px;
  // padding-top: 4px;
  input {
    width: 100%;
    text-align: center;
  }
  .down {
    background-position: 0 -60px;
  }
  .down.down-disabled:hover {
    background-position: 0 -300px;
    cursor: not-allowed;
  }
  .down,
  .up {
    background: url("../../assets/images/cart-updown_8303731e15@2x.jpg")
      no-repeat;
    overflow: hidden;
    float: left;
    width: 34px;
    height: 37px;
    background-size: 100% auto;
    line-height: 40px;
    text-indent: -9999em;
    cursor: pointer;
    user-select: none;
  }
  .num {
    position: relative;
    overflow: hidden;
    text-align: center;
    float: left;
    width: 36px;
    height: 18px;
    margin: 7px 0 0;
    border: none;
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
  }
  .up {
    margin: 0;
    background-position: 0 0;
    &:hover {
      background-position: 0 -120px;
    }
  }
  .down {
    background-position: 0 -60px;
    &:hover {
      background-position: 0 -180px;
    }
  }
}

.down.down-disabled {
  background-position: 0 -300px;
  cursor: not-allowed;
}
</style>