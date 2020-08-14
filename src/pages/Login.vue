<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">系统登录</span>
      </div>
      <div class="content">
        <p>
          <el-input v-model="user" prefix-icon="el-icon-user-solid" clearable></el-input>
        </p>
        <p>
          <el-input v-model="psw" prefix-icon="el-icon-lock" show-password></el-input>
        </p>
        <p class="error">{{errormsg}}</p>
      </div>
      <el-button type="primary" @click="clikLogin">登录</el-button>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/apis";

export default {
  data() {
    return {
      user: "",
      psw: "",
      errormsg: "",
    };
  },
  methods: {
    clikLogin() {
      login(this.user, this.psw).then((res) => {
        if (res.data.code == 0) {
          //写入token
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.user = this.user; //存入用户名
          localStorage.id =res.data.id; //存入用户名
          this.$router.push("/main/index"); //改变hash地址
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else {
          this.errormsg = "用户名或密码错误!";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2d3a4b;
  .el-card {
    width: 350px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .title {
      font-weight: bold;
    }
  }
  .content {
    position: relative;
    p {
      display: flex;
      position: relative;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      .el-input {
        width: 100%;
      }
    }
    .error {
      color: #f60;
      font-size: 12px;
    }
  }
  .el-button {
    width: 310px;
  }
}
</style>