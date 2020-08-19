<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>店铺管理</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="form.bulletin" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <div class="demo-image__placeholder">
          <div class="block">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessHead"
            >
              <img v-if="form.avatar" :src="SHOP_PIC+form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="店铺图片">
        <div class="demo-image__placeholder">
          <div class="block">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
      </el-form-item>

      <!-- 店铺名称 -->
      <el-form-item label="配送费">
        <el-input v-model="form.deliveryPrice"></el-input>
      </el-form-item>
      <!-- 配送时间 -->
      <el-form-item label="配送时间">
        <el-input v-model="form.deliveryTime"></el-input>
      </el-form-item>
      <!-- 配送描述 -->
      <el-form-item label="配送描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <!-- 店铺评分 -->
      <el-form-item label="店铺评分">
        <!-- <el-input v-model="form.score"></el-input> -->
        <el-rate
          v-model="form.score"
          :colors="colors">
        </el-rate>
      </el-form-item>
      <!-- 销量 -->
      <el-form-item label="销量">
        <el-input v-model="form.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8择抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          arrow-control
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
        <br />
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { shopInfo } from "@/api/apis";
import { SHOP_PIC } from "@/api/apis";
import { STORE_PIC } from "@/api/apis";
import { getChinatime } from "@/utils/utils"; //时间格式渲染
import { shopEdit } from "@/api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: null,
        sellCount: "",
        supports: "",
        pics: [],
        minPrice: "",
        date: [new Date('2016, 9, 10, 8, 40'), new Date('2016, 9, 10, 9, 40')],
        headPicUrl: "",
      },
       colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      //店铺图片回填数据
      fileList: [],
      // 店铺图片上传接口
      STORE_PIC: "",
      //店铺头像服务器地址
      SHOP_PIC: "",
      //   选择图片的
      dialogImageUrl: "",
      dialogVisible: false,
      //时间
    };
  },
  methods: {
    //店铺头像上传成功
    handleAvatarSuccessHead(res) {
      this.form.avatar = res.imgUrl;
    },
    //上传成功
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.pics.push(res.imgUrl);
      }
    },
    //图片移出
    handleRemove(res) {
      this.form.pics.splice(this.form.pics.indexOf(res.name), 1);
    },
    //数据渲染
    getShopList() {
      shopInfo().then((res) => {
        this.form = { ...res.data.data };
        this.fileList = this.form.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: SHOP_PIC + imgstr,
          };
        });
      });
    },
    //提交修改
    submit() {
      let file = JSON.parse(JSON.stringify(this.form));
      // //转换日期格式
      file.date = JSON.stringify(
        getChinatime(file.date[0]),
        getChinatime(file.date[1])
      );
      console.log(file);
      // 转换活动内容格式
      file.supports = JSON.stringify(file.supports);
      // 转换图片格式
      file.pics = JSON.stringify(file.pics);
      console.log(file.pics);
      shopEdit(file).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("店铺信息成功!");
        } else {
          this.$message.error("店铺信息修改失败!");
        }
      });
      //没有接口,无法实现更新店铺头像自动刷新主页的头像
      //  this.$bus.$emit("shopLogo");

    },
  },
  created() {
    this.getShopList();
    this.STORE_PIC = STORE_PIC;
    this.SHOP_PIC = SHOP_PIC;
  },
};
</script>

<style lang="less" scoped>
.el-image {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  margin-right: 10px;
}
.el-input {
  width: 40%;
}
.el-textarea {
  width: 40%;
}
.avatar {
  width: 150px;
}
.el-rate{
  padding-top:10px ;
}
</style>