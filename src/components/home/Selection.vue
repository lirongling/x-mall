<template>
  <div>
    <div class="content">
      <Titles>官方精选</Titles>
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
    selectData: {
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
.content {
  margin-top: 30px;
  background: white;
}
</style>