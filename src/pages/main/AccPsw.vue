<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <div class="content">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="原密码">
          <el-input v-model="formLabelAlign.oldPwd" @blur="input"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.affirmPwd"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
// import LoginVue from '../Login.vue';
import { checkoldpwd } from "@/api/apis";
import { editpwd } from "@/api/apis";
export default {
  data() {
    return {
      labelPosition: "right",
      flag: false,//旧密码标杆
      align: true,//两次密码检查标杆
      formLabelAlign: {
        oldPwd: "",
        newPwd: "",
        affirmPwd: "",
      },
    };
  },
  methods: {
    input() {
      checkoldpwd(this.formLabelAlign.oldPwd, localStorage.id).then((res) => {
        if (res.data.code != 0) {
          this.$message.error("旧密码错误!");
        } else {
          this.$message.success("旧密码正确!");
          this.flag = true;
        }
      });
    },
    submitForm() {
      if(this.formLabelAlign.newPwd !== this.formLabelAlign.affirmPwd) {
        this.$message.error("两次密码输入不一致!");
        this.align=false;
        return false;
      }
      if (this.flag &&this.align) {//旧密码正确并且新密码和确认密码相等
        checkoldpwd(this.formLabelAlign.oldPwd, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            //旧密码正确
            //修改密码
            editpwd(this.formLabelAlign.newPwd, localStorage.id).then((res) => {
              if (res.data.code == 0) {
                this.$message.success("密码修改成功!");
              } else {
                this.$message.error("密码修改失败,请重新验证!");
              }
            });
          } else {
            //原密码错误
            this.$message.error("原密码错误,请重新输入!");
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 30%;
}
.title {
  margin-left: 5px;
  color: #f60;
  font-size: 12px;
}
</style>