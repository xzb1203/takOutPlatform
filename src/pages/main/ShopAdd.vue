<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品添加</span>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select  v-model="form.category">
            <el-option v-for="item in data" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMer">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { categories } from "@/api/apis";
import { add } from "@/api/apis";
export default {
  data() {
    return {
      // 表单的数据
      data: [],
      form: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
      },
      labelPosition: "right",
      //商品价格
      num: 1,
      //商品图片的数据
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },

  methods: {
    //商品列表
    getProduct() {
      categories().then((res) => {
        for (let i = 0; i < res.data.categories.length; i++) {
          this.data.push(res.data.categories[i].cateName);
          this.form.category = res.data.categories[0].cateName
        }
      });
    },
    //接收服务器返回的图片名字
    handleAvatarSuccess(res) {
      this.form.imgUrl=res.imgUrl
    },
    //添加商品
    addMer() {
      add(this.form.name,this.form.category,this.form.price,this.form.imgUrl,this.form.goodsDesc).then(res => {
             if (res.data.code == 0) {
              window.location.hash = '/main/ShopList'
              this.$message.success("商品添加成功!");
             }
      });
    },

  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 35%;
}
.el-textarea {
  width: 35%;
}
</style>