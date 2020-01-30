<template>
  <div>
    <div class="gray-box">
      <Titles>品牌周边</Titles>
    </div>
  </div>
</template>

<script>
import Titles from "../home/Title";
export default {
  data() {
    return {};
  },
  components: {
    Titles
  },
  props: {
    hotData: {
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
.gray-box {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
</style>