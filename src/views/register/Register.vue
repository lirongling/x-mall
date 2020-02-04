<template>
  <div>
    <div class="content flex">
      <h4>注册 XMall 账号</h4>
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
          <FormItem prop="passwdCheck">
            <Input
              prefix="md-lock"
              type="password"
              v-model="formCustom.passwdCheck"
              password
              placeholder="重复密码"
            />
          </FormItem>
          <FormItem>
            <Code @is-codes="isCodes" ref="mychild" v-if="hackReset"></Code>
          </FormItem>
          <FormItem prop="single">
            <div class="pr flex">
              <div class="auto-login">
                <Checkbox v-model="formCustom.single">
                  我已阅读并同意遵守
                  <a>法律声明</a>和
                  <a>隐私条款</a>
                </Checkbox>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <div class="btn">
              <Button
                type="primary"
                long
                @click="handleSubmit('formCustom')"
                :disabled="!(userCode&&passCode&&passsCode&&singleCode)"
              >注册</Button>
              <br />
            </div>
          </FormItem>
        </Form>
        <div class="login">
          如果您已拥有 XMall 账号，则可在此
          <a @click="login">登陆</a>
        </div>
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
        callback();
        this.userCode = true;
      }
    };
    const validatePass = (rule, value, callback) => {
      this.passCode = false;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        this.passCode = true;
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      this.passsCode = false;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.passsCode = true;
        callback();
      }
    };
    const validateSingle = (rule, value, callback) => {
      this.singleCode = false;
      if (value) {
        this.singleCode = true;
        callback();
      }
    };
    return {
      hackReset: true,
      labelWith: 0,
      userCode: false,
      passCode: false,
      passsCode: false,
      singleCode: false,
      isCode: false,
      formCustom: {
        username: "",
        password: "",
        passwdCheck: "",
        single: false
      },
      ruleCustom: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        single: [{ validator: validateSingle, trigger: "change" }]
      }
    };
  },
  components: {
    Code,
    ThirdParty
  },
  props: {},
  methods: {
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
    // 登录按钮
    login() {
      this.$router.push("/login");
    },
    // 确认注册
    handleSubmit(name, num) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 接口验证
    register() {
      if (!this.isCode) {
        this.$Message.warning("请完成验证");
      } else {
        let userMsg = {
          username: this.formCustom.username,
          password: this.formCustom.password
        };
        this.$api
          .register(userMsg)
          .then(res => {
            if (res.code === 200) {
              this.$router.push("/login");
              this.$Message.success("恭喜你，注册成功！");
            } else if (res.code === 500) {
              this.$Message.warning(res.msg);
              this.refresh();
            } else {
              this.$Message.error("注册失败");
              this.refresh();
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
/deep/ .ivu-form {
  border-bottom: 1px solid #dcdcdc;
}
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
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
  .input {
    width: 100%;
    padding: 40px 40px 22px;
    height: auto;
    border-bottom: 1px solid #dcdcdc;
    a {
      margin-right: 5px;
    }
    .login {
      text-align: center;
      line-height: 48px;
      margin-bottom: 0px;
      font-size: 12px;
      color: rgb(153, 153, 153);
    }
  }
}
</style>