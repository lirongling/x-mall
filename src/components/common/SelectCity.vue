<template>
  <div>
    <div class="choose-by-province flex">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
        class="flex"
      >
        <FormItem prop="province" label="按省份选择:">
          <Select v-model="formValidate.province" placeholder="省份" filterable @on-select="change">
            >
            <Option v-for="(item, index) in provinceArr" :key="index" v-model="item.pk">{{ item.pv}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="city" :label-width="20">
          <Select
            v-model="formValidate.city"
            placeholder="城市"
            :disabled="cities.length===0"
            @on-select="selectCity"
            filterable
          >
            >
            <Option v-for="(item,index) in cities" :key="index" v-model="item.ck">{{ item.cv}}</Option>
          </Select>
        </FormItem>
        <div class="county">
          <FormItem prop="county" :label-width="20">
            <Select
              v-model="formValidate.county"
              placeholder="区县"
              :disabled="county.length===0"
              @on-select="selectCounty"
              filterable
            >
              >
              <Option v-for="(item,index) in county" :key="index" v-model="item.cyk">{{ item.cyv}}</Option>
            </Select>
          </FormItem>
        </div>
        <FormItem prop="town" :label-width="20">
          <Select
            v-model="formValidate.town"
            placeholder="乡镇"
            :disabled="town.length===0"
            @on-select="selectTown"
            filterable
          >
            >
            <Option v-for="(item,index) in town" :key="index" v-model="item.tk">{{ item.tv}}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import address from "../../assets/js/province";
import city from "../../assets/js/area";
export default {
  data() {
    return {
      isMunicipality: false,
      provinceArr: window.proData_,
      municipality: ["北京", "上海", "天津", "重庆"],
      cities: [],
      county: [],
      town: [],
      formValidate: {
        province: 1,
        city: "",
        county: "",
        town: ""
      },
      ruleValidate: null,
      disabled: true,
      pk: 1,
      provinces: "",
      citys: "",
      countys: "",
      towns: ""
    };
  },
  components: {},
  props: {},
  methods: {
    change(val) {
      this.pk = val.value;
      this.disabled = false;
      if (val.value < 5) {
        this.isMunicipality = true;
        this.cities = [
          { ck: val.value, cv: window.proData_[val.value - 1].pv }
        ];
      } else {
        this.isMunicipality = false;
        this.cities = window.cityData_.filter(item => {
          return item.pk === val.value;
        });
      }
      this.provinces = val.label;
      this.formValidate.city = val.label[0].ck;
    },
    selectCity(val) {
      if (this.pk < 5) {
        this.county = [];
        window.cityData_.map(item => {
          if (item.pk === this.pk) {
            this.county.push({ pk: this.pk, cyk: item.ck, cyv: item.cv });
          }
        });
      } else {
        this.county = window.countryData_.filter(item => {
          return item.ck === val.value;
        });
      }
      this.citys = val.label;
    },
    selectCounty(val) {
      if (this.pk < 5) {
        this.town = [];
        window.countryData_.map(item => {
          if (item.ck === val.value) {
            this.town.push({ tk: val.value, tk: item.cyk, tv: item.cyv });
          }
        });
      } else {
        this.town = window.townData_.filter(item => {
          return item.cyk === val.value;
        });
      }
      this.countys = val.label;

      // this.$emit("edit-num", this.Num, this.index, this.id, this.checked);
    },
    selectTown(val) {
      this.towns = val.label;
      this.$emit(
        "address",
        this.provinces,
        this.citys,
        this.countys,
        this.towns
      );
    }
  },
  mounted() {},
  watch: {
    "$store.state.editAddress"(val) {
      // console.log(val);
      if (val.phone) {
        let a = val.address.split(",")[0];
        let b = val.address.split(",")[1];
        let c = val.address.split(",")[2];
        let d = val.address.split(",")[3];
        window.proData_.map(item => {
          if (item.pv === a) {
            this.pk = item.pk;
          }
        });
        this.formValidate.province = this.pk;
        this.change({ value: this.pk, label: a });
        let b1 = 0;
        this.cities.map(item => {
          if (item.cv === b) {
            b1 = item.ck;
          }
        });
        this.formValidate.city = b1;
        setTimeout(() => {
          this.selectCity({ value: b1, label: b });
        }, 200);
        setTimeout(() => {
          let c1 = 0;
          this.county.map(item => {
            if (item.cyv === c) {
              c1 = item.cyk;
            }
          });
          this.formValidate.county = c1;
          this.selectCounty({ value: c1, label: c });
          let d1 = 0;
          this.town.map(item => {
            if (item.tv === d) {
              d1 = item.tk;
            }
          });
          this.formValidate.town = d1;
        }, 300);
      } else {
        this.formValidate.province = "";
        this.formValidate.city = "";
        this.formValidate.county = "";
        this.formValidate.town = "";
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/.ivu-select-selection {
  width: 110px;
}
.county {
  margin-left: 91px;
}

.choose-by-province {
  justify-content: flex-start;
  align-items: flex-start;
}
.l-attr {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-top: 5px;
  display: inline-block;
}
.search {
  margin-left: 40px;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>