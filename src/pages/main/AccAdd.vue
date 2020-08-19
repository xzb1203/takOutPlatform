<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账号</span>
    </div>
    <!-- 内容 -->
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.psw" show-password></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="form.region">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { accAdd } from "@/api/apis";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        psw: "",
        type: "",
      },
      form: {
        region: "",
      },
    };
  },
  methods: {
    //注册
    submitForm(){
          accAdd(this.formLabelAlign.name,this.formLabelAlign.psw,this.form.region).then((res)=>{
            if(res.data.code==0){
              this.$message({
              message: "用户注册成功!",
              type: "success",
              });
            }else{
              this.$message.error('用户注册失败!');
            }
    })
    },
    //重置
    reset(){
      this.formLabelAlign=''
    }
  },
  created(){

  }
};
</script>

<style lang="less" scoped>
.el-input,
.el-select {
  width: 30%;
}
</style>