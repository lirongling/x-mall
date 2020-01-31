<template>
  <div>
    <!-- 点击式按钮建议高度介于36px与46px  -->
    <!-- 嵌入式仅需设置宽度，高度根据宽度自适应，最小宽度为200px -->
    <div id="5e3405df76cb1970819ea980" ref="vaptcha" style="width: 300pxheight: 36px">
      <div class="vaptcha-init-main">
        <div class="vaptcha-init-loading">
          <a href="https: //www.vaptcha.com/" target="_blank">
            <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
          </a>
          <span class="vaptcha-text">VAPTCHA启动中...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const extend = function(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
};
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {
    loadV2Script() {
      if (typeof window.vaptcha === "function") {
        //如果已经加载就直接放回
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          var script = document.createElement("script");
          script.src = "https://cdn.vaptcha.com/v2.js";
          script.async = true;
          script.onload = script.onreadystatechange = function() {
            if (
              !this.readyState ||
              this.readyState == "loaded" ||
              this.readyState == "complete"
            ) {
              resolve();
              script.onload = script.onreadystatechange = null;
            }
          };
          document.getElementsByTagName("head")[0].appendChild(script);
        });
      }
    }
  },
  mounted() {
    var config = extend(
      {
        vid: "5e3405df76cb1970819ea980",
        container: this.$refs.vaptcha,
        style: this.vpStyle
      },
      this.$props
    );
    this.loadV2Script().then(() => {
      window.vaptcha().then(obj => {
        this.$emit("input", obj);
        obj.render();
      });
    });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
​ .vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
​ .vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: none;
}
​ .vaptcha-init-loading > a img {
  vertical-align: middle;
}
​ .vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
}
</style>