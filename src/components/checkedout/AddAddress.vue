<template>
  <div class="wrap">
    <Modal v-model="modal" draggable scrollable title="添加收货地址">
      <div class="content">
        <div class="name">
          收货人：
          <Input v-model="siteAddress.username" placeholder="收货人" style="width: 300px" />
        </div>
        <div class="phone">
          手机号：
          <Input v-model="siteAddress.phone" type="number" phone="手机号" style="width: 300px" />
        </div>
        <div class="ddress">
          <SelectCity @address="address"></SelectCity>
        </div>
        <!-- <Input v-model="siteAddress.username" placeholder="收货人" style="width: 300px" /> -->
      </div>
    </Modal>
  </div>
</template>

<script>
import SelectCity from "../common/SelectCity";
export default {
  data() {
    return {
      modal: false,
      siteAddress: {
        username: "",
        phone: null,
        address: "",
        isDefault: false
      },
      provinces: "",
      citys: "",
      county: "",
      towns: ""
    };
  },
  components: {
    SelectCity
  },
  props: {},
  methods: {
    address(provinces, citys, county, towns) {
      this.provinces = provinces;
      this.citys = citys;
      this.county = county;
      this.towns = towns;
      console.log(provinces, citys, county, towns);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-modal-content {
  width: 400px !important;
}
.content {
  div {
    padding: 5px 0;
  }
}
</style>