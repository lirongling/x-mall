<template>
  <div>
    <div class="address">
      <ul class="address-item-list flex">
        <li
          class="add-address-item address flex"
          v-for="(item,index) in addressList"
          :key="index"
          :class="{ 'checked' : isChecked===index}"
          @click="changeAddress(item,index)"
        >
          <div class="address">
            <p>
              收货人: {{item.username}}
              <span v-if="item.isDefault">(默认地址)</span>
            </p>
            <p>收货人:{{item.address}}</p>
            <p>手机号码:{{item.phone}}</p>
          </div>
          <div class="operation-section flex">
            <div class="update-btn" @click.stop="editAddress(item)">修改</div>
            <div class="delete-btn" @click.stop="deleteAddress(item._id,index)">删除</div>
          </div>
          <div class="pa" v-show="isChecked===index">
            <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
              <path
                d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                fill="#6A8FE5"
                p-id="1025"
              />
            </svg>
          </div>
        </li>
        <li class="add-address-item flex" @click="addAddress">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxMTQ3ODk4MzAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxNS4yIDc5LjJjLTI0My4yIDAtNDQwIDE5Ni44LTQ0MCA0MzkuMnMxOTYuOCA0MzkuMiA0MzkuMiA0MzkuMmMyNDIuNCAwIDQzOS4yLTE5Ni44IDQzOS4yLTQzOS4yUzc1Ny42IDc5LjIgNTE1LjIgNzkuMnogbTI0MS42IDQ2MEg1MzZ2MjIxLjZoLTQxLjZWNTM5LjJIMjcyLjh2LTQxLjZoMjIxLjZWMjc2LjhINTM2djIyMS42aDIyMS42djQwLjh6IiBwLWlkPSIxMDg2IiBmaWxsPSIjNjI2MjYyIj48L3BhdGg+PC9zdmc+"
            alt
          />
          <p>使用新地址</p>
        </li>
      </ul>
    </div>
    <AddAddress ref="addAddress"></AddAddress>
  </div>
</template>

<script>
import AddAddress from "./AddAddress";
export default {
  data() {
    return {
      addressList: [],
      isChecked: 0
    };
  },
  components: {
    AddAddress
  },
  props: {},
  methods: {
    // 增加地址
    addAddress() {
      this.$store.state.editAddress = [];
      this.$refs.addAddress.modal = true;
    },
    // 获取所有地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            let a = res.data.slice(1);
            a.reverse();
            a.unshift(res.data[0]);
            this.addressList = a;
            this.$emit("is-codes", res.data[0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除地址
    deleteAddress(addressId, index) {
      this.$Modal.confirm({
        title: "提醒",
        content: "<p>是否确认删除？</p>",
        onOk: () => {
          this.$api
            .deleteAddress({ addressId: addressId })
            .then(res => {
              if (res.code === 200) {
                this.addressList.splice(index, 1);
              }
              this.$Notice.success({
                title: res.msg
              });
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 修改地址
    editAddress(item) {
      this.$store.state.editAddress = item;
      this.$refs.addAddress.modal = true;
    },
    // 切换地址
    changeAddress(item, index) {
      this.isChecked = index;
      this.$emit("is-codes", item);
    }
  },
  beforeMount() {
    this.getAddress();
  },
  mounted() {},
  watch: {
    "$store.state.newAddress"(val) {
      if (val.phone) {
        this.addressList.splice(1, val);
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.address {
  .address-item-list {
    justify-content: flex-start;
    padding: 10px 5px;
    .add-address-item:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
    .add-address-item:hover .operation-section {
      visibility: visible;
      transform: translate(0);
    }
    .add-address-item {
      width: 276px;
      height: 158px;
      margin: 20px 10px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      background: #fafafa;
      line-height: 14px;
      font-size: 14px;
      position: relative;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      overflow: hidden;
      img {
        width: 24px;
      }
      p {
        margin-top: 5px;
      }

      .address {
        height: 158px;
        padding: 10px 14px 0 14px;
        p {
          padding: 5px 0;
          line-height: 20px;
        }
      }
      .operation-section {
        visibility: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        // background: #e1e1e1;
        transition: all 0.2s ease;
        transform: translateY(28px);
        border-top: 1px solid #e1e1e1;
        z-index: 11;
        font-size: 12px;
        border-radius: 3px;
        overflow: hidden;
        div {
          flex: 1;
          background: #fff;
          text-align: center;
          line-height: 28px;
          height: 28px;
          // border: 1px solid #e1e1e1;
        }
        .delete-btn:hover,
        .update-btn:hover {
          background: #fafafa;
        }
        .delete-btn {
          border-left: 1px solid #e1e1e1;
        }
      }
      .pa {
        position: absolute;
        right: 15px;
        top: 18px;
      }
    }
    .checked {
      border-color: #6a8fe5 !important;
      background: #fff !important;
    }
  }
}
</style>