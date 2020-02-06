<template>
  <div>
    <div class="container">
      <div class="gray-box">
        <Titles>收货地址</Titles>
        <Address @is-codes="defaultAddress"></Address>
      </div>
      <div class="gray-box">
        <Titles>购物清单</Titles>
        <CarDetails></CarDetails>
      </div>
    </div>
  </div>
</template>

<script>
import Titles from "../../components/home/Title";
import Address from "../../components/checkedout/Address";
import CarDetails from "../../components/checkedout/CarDetails";
export default {
  data() {
    return {
      address: {}
    };
  },
  components: {
    Titles,
    Address,
    CarDetails
  },
  props: {},
  methods: {
    // 子组件事件分发
    defaultAddress(item) {
      this.address = item;
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
  }
}
</style>