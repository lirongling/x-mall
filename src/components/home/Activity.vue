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
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 25px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .content {
    position: relative;
    box-sizing: border-box;
    width: 25%;
    text-align: center;
    border-left: rgba(0, 0, 0, 0.1) 0.4px solid;
    border-right: rgba(0, 0, 0, 0.1) 0.4px solid;
    .img {
      img {
        width: 100%;
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