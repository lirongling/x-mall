<template>
  <div>
    <div class="container">
      <Carousel
        autoplay
        v-model="start"
        loop
        :autoplay-speed="autoplay"
        :radius-dot="true"
        class="bg"
        @on-click="goodsDetails"
      >
        <CarouselItem v-for="(item) in panelContents" :key="item.id">
          <div class="img">
            <img :src="item.picUrl" :alt="item.productName" />
            <img
              :src="item.picUrl2"
              :alt="item.productName"
              class="img2 a"
              v-if="item.picUrl2.length>1"
            />
            <img
              :src="item.picUrl3"
              :alt="item.productName"
              class="img3 a"
              v-if="item.picUrl3.length>1"
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: 0,
      autoplay: 3000
    };
  },
  components: {},
  props: {
    panelContents: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 跳转到详情页
    goodsDetails(index) {
      const { href } = this.$router.resolve({
        name: "goodsDetails",
        query: { productId: this.panelContents[index].productId }
      });
      window.open(href, "_blank");
      // window.open(`/goodsDetails?productId=${productId}`, "_blank");
    }
  },
  mounted() {
    console.log(this.panelContents);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px !important;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  max-width: 1220px;
  min-width: 1080px;
  overflow: hidden;
  cursor: pointer;
  perspective: 3000px;
  position: relative;
  .bg {
    border-radius: 10px !important;
    overflow: hidden;
    position: relative;
    margin: 20px auto;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateY(0deg) rotateX(0deg);
  }
  .img {
    position: relative;
    max-height: 500px;
    border-radius: 10px !important;
    min-height: 490px;
  }

  img {
    position: absolute;
    width: 101%;
    max-width: 1220px;
    min-width: 1080px;
    border-radius: 10px;
    min-height: 490px;
    z-index: 999;
  }
}
.img2 {
  z-index: 20px !important;
  position: absolute;
  // bottom: 5px;
  background-size: 95% 100%;
}
.a {
  z-index: 20px !important;
  transform: translateZ(40px);
}
</style>