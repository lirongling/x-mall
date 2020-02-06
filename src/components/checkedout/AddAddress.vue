<template>
  <div class="wrap">
    <Modal v-model="modal" draggable scrollable :title="title" @on-ok="sure" :loading="isLoading">
      <div class="content">
        <div class="name">
          收货人：
          <Input v-model="siteAddress.username" placeholder="收货人" style="width: 300px" />
        </div>
        <div class="phone">
          手机号：
          <Input v-model="siteAddress.phone" type="number" placeholder="手机号" style="width: 300px" />
        </div>
        <div class="ddress" style="width: 360px">
          <SelectCity @address="address"></SelectCity>
        </div>
        <div class="details">
          详细地址：
          <Input v-model="siteAddress.details" type="text" placeholder="街道楼层" style="width: 286px" />
        </div>
        <div class="default">
          <span>设为默认地址:</span>

          <Checkbox v-model="siteAddress.isDefault"></Checkbox>
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
      isLoading: true,

      title: "添加收货地址",
      siteAddress: {
        username: "",
        phone: null,
        details: "",
        address: "",
        isDefault: false
      },
      provinces: "",
      citys: "",
      countys: "",
      towns: "",
      isPhone: false
    };
  },
  components: {
    SelectCity
  },
  props: {},
  methods: {
    // 子组件事件分发
    address(provinces, citys, county, towns) {
      this.provinces = provinces;
      this.citys = citys;
      this.countys = county;
      this.towns = towns;
    },
    // 收货人验证
    checkName() {
      if (this.siteAddress.username.length === 0) {
        this.Notice("收货人不能为空");
      }
    },
    // 手机号验证
    checkPhone() {
      this.isPhone = false;
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (this.siteAddress.phone === null) {
        this.Notice("手机号不能为空");
      } else if (!a.test(this.siteAddress.phone)) {
        this.Notice("手机号不合法");
      } else {
        this.isPhone = true;
      }
    },

    // 警告通知
    Notice(val) {
      this.$Notice.warning({
        title: val
      });
      setTimeout(() => {
        this.isLoading = false;
        this.$nextTick(() => {
          this.isLoading = true;
        });
      }, 200);
    },
    // 保存按钮
    sure() {
      if (this.siteAddress.username.length === 0) {
        this.Notice("收货人不能为空");
        return;
      }
      this.checkPhone();
      if (!this.isPhone) {
        return;
      }
      if (
        this.provinces.length === 0 ||
        this.citys.length === 0 ||
        this.countys.length === 0 ||
        this.towns.length === 0
      ) {
        this.Notice("未选择省市区");
        return;
      }
      if (this.siteAddress.details.length === 0) {
        this.Notice("未填写详细地址");
        return;
      } else {
        this.siteAddress.address = `${this.provinces},${this.citys},${this.countys},${this.towns},${this.siteAddress.details}`;
        this.addAddress();
      }
    },
    editAddress(a) {
      this.$api
        .editAddress(a)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.modal = false;
            this.$Notice.success({
              title: "修改成功"
            });
            this.$parent.getAddress();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAddress() {
      console.log(this.$store.state.editAddress._id);
      let a = {
        username: this.siteAddress.username,
        phone: this.siteAddress.phone,
        address: this.siteAddress.address,
        isDefault: this.siteAddress.isDefault,
        addressId: this.$store.state.editAddress._id
      };
      if (this.$store.state.editAddress._id) {
        this.editAddress(a);
      } else {
        this.$api
          .addAddress(a)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.modal = false;
              this.$Notice.success({
                title: "添加成功"
              });
              this.$store.state.newAddress = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {},
  watch: {
    "$store.state.editAddress"(val) {
      // console.log(val);

      this.siteAddress.username = val.username;
      this.siteAddress.phone = Number(val.phone);
      this.siteAddress.isDefault = val.isDefault;
      if (val.address) {
        this.title = "修改地址";
        this.siteAddress.details = val.address.split(",")[4];
        this.provinces = val.address.split(",")[0];
        this.citys = val.address.split(",")[1];
        this.countys = val.address.split(",")[2];
        this.towns = val.address.split(",")[3];
      } else {
        this.siteAddress.details = "";
      }
    }
  },
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
  .default {
    span {
      margin-right: 10px;
    }
  }
}
</style>