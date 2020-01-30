<template>
  <div>
    <div class="box flex">
      <div v-for="(item,index) in activity" :key="index" class="content">
        <div class="img">
          <img :src="item.productImageBig" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {
    activity: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  z-index: 0;
  margin-bottom: 30px;
  margin-top: 25px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .content {
    width: 25%;

    // border-left: rgba(0, 0, 0, 0.1) 0.4px solid;
    border: rgba(0, 0, 0, 0.1) 0.4px solid;
    .img {
      width: 100%;
      max-height: 199.4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content:hover {
    z-index: 99;
    cursor: pointer;
    box-shadow: 0 3px 8px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
  }
}
</style>