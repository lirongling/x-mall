<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo flex">
        <div class="siteinfo-left flex">
          <div class="siteinfo-item" v-for="(item,index) in footList" :key="index">
            <h3 class="siteinfo-title">{{item.title}}</h3>
            <ul>
              <li v-for="(items,index) in item.details" :key="index" class="siteinfo-de">{{items}}</li>
            </ul>
          </div>
        </div>
        <div class="siteinfo-right">
          <div data-v-5be35fd1 class="tel">
            <a
              data-v-5be35fd1
              href="http://wpa.qq.com/msgrd?v=3&amp;uin=1012139570&amp;site=qq&amp;menu=yes"
              target="_blank"
              class="c5"
            >1012139570</a>
          </div>
          <div data-v-5be35fd1 class="time">周一至周日 10:00-23:00（限Starrer或捐赠人联系）</div>
          <div data-v-5be35fd1 class="online">
            <Button>在线帮助</Button>
          </div>
        </div>
      </div>
      <div class="copyright flex">
        <h4
          class="content-c2"
        >Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容大部分属锤子科技</h4>
        <ul data-v-5be35fd1 class="privacy">
          <li data-v-5be35fd1 class="content-c1">
            <a data-v-5be35fd1 class="content-c0">法律声明</a>
          </li>
          <li data-v-5be35fd1 class="content-c1">
            <a data-v-5be35fd1 class="content-c0">隐私条款</a>
          </li>
          <li data-v-5be35fd1 class="content-c1">
            <a
              data-v-5be35fd1
              target="_blank"
              href="https://github.com/Exrick"
              class="content-c0"
            >开发者中心</a>
          </li>
        </ul>
      </div>
      <div data-v-5be35fd1 class="cop">
        <a data-v-5be35fd1 href="http://www.miibeian.gov.cn/" target="_blank" class="content-c3">
          <span data-v-5be35fd1 class="content-c3">蜀ICP备16030308号-1</span>
          <span data-v-5be35fd1 class="content-c3">蜀ICP证16030308号</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footList: [
        {
          title: "订单服务",
          details: ["购买指南", "支付方式", "送货政策"]
        },
        {
          title: "服务支持",
          details: ["官方开源", "项目前端", "项目后端"]
        },
        {
          title: "自助服务",
          details: ["自助服务", "个人简介", "个人视频"]
        },
        {
          title: "其他项目",
          details: ["XPay支付系统", "数据共享", "待开发..."]
        },
        {
          title: "友情链接",
          details: ["宇cccc", "Smartisan", "Vue"]
        },
        {
          title: "关注我吧",
          details: ["腾讯 QQ ", "新浪微博", "官方邮箱"]
        }
      ]
    };
  },
  components: {},
  props: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.footer {
  padding: 50px 0 20px;
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
  margin-top: 60px;
  height: 350px;
  display: -ms-flexbox;
  .container {
    max-width: 1220px;
    min-width: 1080px;
    margin: 0 auto;
    .siteinfo {
      height: 100px;
      padding: 50px 0 130px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      .siteinfo-left {
        .siteinfo-item {
          width: 150px;
          .siteinfo-title {
            color: #646464;
            font-size: 12px;
            padding: 0 0 14px;
          }
          .siteinfo-de {
            color: #969696;
            font-size: 12px;
            padding: 6px 0;
          }
          .siteinfo-de:hover {
            cursor: pointer;
            color: rgb(103, 107, 107);
          }
        }
      }
      .siteinfo-right {
        width: 245px;
        .tel {
          font-size: 30px;
          line-height: 1;
          color: #646464;
          top: -2px;
          position: relative;
          .c5[data-v-5be35fd1] {
            color: #646464;
            right: -70px;
            position: relative;
          }
        }
        .online,
        .time {
          clear: both;
          width: 241px;
          font-size: 12px;
          line-height: 18px;
          color: #c3c3c3;
          text-align: right;
        }
      }
    }
    .copyright {
      color: #434d55;
      font-size: 12px;
      padding: 40px 0 0;
      justify-content: flex-start;
      .content-c2 {
        height: 15px;
        line-height: 15px;
        color: #757575;
        font-size: 100%;
        font-weight: 400;
      }
      .privacy {
        float: left;
        margin: 0 0 0 12px;
        .content-c1 {
          float: left;
          line-height: 12px;
          padding: 1px 10px 0;
          border-left: 1px solid #ccc;
          .content-c0 {
            color: #5079d9;
            cursor: pointer;
            text-decoration: none;
          }
        }
      }
    }
    .cop {
      clear: both;
      padding: 10px 0 0;
      height: 15px;
      .content-c3 {
        margin-right: 20px;
        color: #bdbdbd;
        font-size: 12px;
        height: 12px;
        line-height: 1;
      }
    }
  }
}
</style>