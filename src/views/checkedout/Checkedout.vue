<template>
  <div>
    <div class="container">
      <div class="gray-box">
        <Titles>收货地址</Titles>
        <div class="address">
          <ul class="address-item-list flex">
            <li class="add-address-item flex" @click="addAddress">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxMTQ3ODk4MzAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxNS4yIDc5LjJjLTI0My4yIDAtNDQwIDE5Ni44LTQ0MCA0MzkuMnMxOTYuOCA0MzkuMiA0MzkuMiA0MzkuMmMyNDIuNCAwIDQzOS4yLTE5Ni44IDQzOS4yLTQzOS4yUzc1Ny42IDc5LjIgNTE1LjIgNzkuMnogbTI0MS42IDQ2MEg1MzZ2MjIxLjZoLTQxLjZWNTM5LjJIMjcyLjh2LTQxLjZoMjIxLjZWMjc2LjhINTM2djIyMS42aDIyMS42djQwLjh6IiBwLWlkPSIxMDg2IiBmaWxsPSIjNjI2MjYyIj48L3BhdGg+PC9zdmc+"
                alt
              />
              <p>使用新地址</p>
            </li>
          </ul>
        </div>
      </div>
      <AddAddress ref="addAddress"></AddAddress>
    </div>
  </div>
</template>

<script>
import Titles from "../../components/home/Title";
import AddAddress from "../../components/checkedout/AddAddress";
export default {
  data() {
    return {};
  },
  components: {
    Titles,
    AddAddress
  },
  props: {},
  methods: {
    // 增加地址
    addAddress() {
      this.$refs.addAddress.modal = true;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  margin: 40px 0;
  .gray-box {
    margin-bottom: 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    .address {
      .address-item-list {
        justify-content: flex-start;
        padding: 40px 5px;
        .add-address-item:hover {
          background: #f2f2f2 !important;
          cursor: pointer;
        }
        .add-address-item {
          width: 276px;
          height: 158px;
          margin: 0 30px;
          border: 1px solid #e5e5e5;
          border-radius: 3px;
          background: #fafafa;
          line-height: 14px;

          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          img {
            width: 24px;
          }
          p {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>