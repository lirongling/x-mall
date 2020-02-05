<template>
  <div>
    <div class="content flex">
      <div class="title">
        <h4>使用 XMall 账号 登录官网</h4>
      </div>
      <div class="input">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="labelWith">
          <FormItem prop="username">
            <Input prefix="ios-contact" v-model="formCustom.username" placeholder="账号" />
          </FormItem>
          <FormItem prop="password">
            <Input
              prefix="ios-key"
              v-model="formCustom.password"
              type="password"
              password
              placeholder="密码"
            />
          </FormItem>
          <FormItem>
            <Code @is-codes="isCodes" ref="mychild" v-if="hackReset"></Code>
          </FormItem>
          <FormItem prop="single">
            <div class="pr flex">
              <div class="auto-login">
                <Checkbox v-model="formCustom.single">记住密码</Checkbox>
              </div>
              <div class="bts">
                <a
                  data-v-fb659bfe
                  href="javascript:;"
                  class="register"
                  @click="register"
                  style="padding: 1px 10px 0px 10px;"
                >注册 XMall 账号</a>
                <Divider type="vertical" />
                <a data-v-fb659bfe style="padding: 1px 0px 0px 10px;">忘记密码 ?</a>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <div class="btn">
              <Button
                type="primary"
                long
                :disabled="!(userCode&&passCode)"
                @click="handleSubmit('formCustom')"
              >登录</Button>
              <br />
              <br />
              <Button long @click="back">返回</Button>
            </div>
          </FormItem>
          <FormItem>
            <ThirdParty></ThirdParty>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Code from "../../components/login/Code";
import ThirdParty from "../../components/login/ThirdParty";
export default {
  data() {
    const validateUser = (rule, value, callback) => {
      this.userCode = false;
      let a = /^[\u4e00-\u9fa5]{0,}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (a.test(value)) {
        callback(new Error("用户名不能为中文"));
      } else {
        this.userCode = true;
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      this.passCode = false;
      let a = /^[\u4e00-\u9fa5]{0,}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3) {
        callback(new Error("密码长度不能小于三位"));
      } else if (a.test(value)) {
        callback(new Error("密码不能为中文"));
      } else {
        this.passCode = true;
        callback();
      }
    };

    return {
      hackReset: true,
      labelWith: 0,
      userCode: false,
      passCode: false,
      passsCode: false,
      isCode: false,
      formCustom: {
        username: "",
        password: "",
        single: false
      },
      ruleCustom: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
        // phone: [{ validator: validatePhone, trigger: "blur" }],
        // code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  components: {
    Code,
    ThirdParty
  },
  props: {},
  methods: {
    register() {
      this.$router.push("/register");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 事件分发
    isCodes(flage) {
      // console.log(flage);
      this.isCode = flage;
    },
    //需要重新渲染时调用aaa
    refresh() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    // 请求接口验证
    login() {
      if (!this.isCode) {
        this.$Message.warning("请完成验证");
      } else {
        let userMsg = {
          username: this.formCustom.username,
          password: this.formCustom.password
        };
        this.$api
          .login(userMsg)
          .then(res => {
            this.$store.state.refresh = 0;
            if (res.code === 200) {
              this.$router.push("/");
              this.$Message.success("恭喜你，登录成功！");
              localStorage.setItem("loginMsg", JSON.stringify(userMsg));
              localStorage.setItem("lastTime", new Date().getTime());
              this.$store.state.userInfo = userMsg;
            } else if (res.code === 500) {
              this.refresh();
              this.$Message.warning(res.msg);

              // this.$refs.mychild.refresh();
            } else {
              this.refresh();
              this.$Message.error("未知错误");
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 返回按钮
    back() {
      this.$router.go(-1);
    }
  },
  created() {},
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      localStorage.setItem("login", "1");
    });
  },
  beforeRouteLeave: (to, from, next) => {
    localStorage.removeItem("login");
    next();
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-btn {
  height: 45px;
}
/deep/ .ivu-input {
  height: 45px;
}
/deep/ .ivu-icon {
  margin-top: 6px;
}
.content {
  justify-content: center;
  flex-direction: column;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    position: relative;
    background-image: url("http://xmall.exrick.cn/static/images/smartisan_4ada7fecea.png");
    background-size: 140px;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 122px;
    margin: 15px 0 40px;
    padding: 170px 0 0;
    box-shadow: none;
    h4 {
      font-size: 20px;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .input {
    width: 100%;
    padding: 0 40px 22px;
    height: auto;
    .pr {
      color: #999;
      .auto-login {
      }
    }
  }
}
</style>