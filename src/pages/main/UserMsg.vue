<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <strong>管理员信息</strong>
        </span>
        <el-divider></el-divider>
        <span>管理员ID:&emsp;{{id}}</span>
        <el-divider></el-divider>
        <span>账号:&emsp;{{msg.account}}</span>
        <el-divider></el-divider>
        <span>用户组:&emsp;{{msg.userGroup}}</span>
        <el-divider></el-divider>
        <span>创建时间:&emsp;{{$moment(msg.ctime).format('YYYY/MM/DD')}}</span>
        <el-divider></el-divider>
        <span>
          管理员头像:
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploaddata"
            >
            
            <img v-if="msg.imgUrl" :src="msg.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>
<script>
import { accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      uploaddata: {},
      id: localStorage.id,
      msg: {
        ctime: "",
        account: "",
        userGroup: "",
        imgUrl: "",
      },
    };
  },
  created() {
    this.getMsg();
    this.uploaddata = { id: localStorage.id };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$bus.$emit("imguploadfinish");
        this.getMsg();
      }
    },
    getMsg() {
      accountinfo(localStorage.id).then((res) => {
        this.msg.ctime = res.data.accountInfo.ctime;
        this.msg.account = res.data.accountInfo.account;
        this.msg.userGroup = res.data.accountInfo.userGroup;
        this.msg.imgUrl = res.data.accountInfo.imgUrl;
      });
    },

  },
};
</script>

<style lang="less" scoped>
.clearfix {
  color: #5e6d82;
  img {
    width: 100px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>