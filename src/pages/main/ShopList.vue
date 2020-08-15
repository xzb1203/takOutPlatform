<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price}}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" alt class="shop-pic" />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{props.row.rating}}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template scope="props">
          <img :src="props.row.imgUrl" width="80" height="80" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 弹窗 -->
    <el-dialog title="商品列表" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option v-for="item in data" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <!-- ------------ -->
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <!-- 图片上传接口地址 -->
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <i v-show="!form.imgUrl" class="el-icon-plus"></i>
            <!-- 服务器图片地址 -->
            <img
              style="width:100px"
              v-show="form.imgUrl"
              :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+form.imgUrl"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="form.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { list } from "@/api/apis";
import { dels } from "@/api/apis";
import { goodsEdit } from "@/api/apis";
import { categories } from "@/api/apis";
import { getChinatime } from "@/utils/utils"; //时间格式渲染
export default {
  data() {
    return {
      //加载中
      loading: true,
      data: [],
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: 100,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 弹框属性
      form: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.imgUrl = res.imgUrl;
      }
    },
    //商品列表
    getProduct() {
      categories().then((res) => {
        for (let i = 0; i < res.data.categories.length; i++) {
          this.data.push(res.data.categories[i].cateName);
        }
      });
    },
    //编辑
    handleEdit(row) {
      console.log(this.form.imgUrl);
      this.form.name = row.name;
      this.form.category = row.category;
      this.form.price = row.price;
      this.form.imgUrl = row.imgUrl;
      this.form.imgUrl = row.imgUrl.replace(
        "http://127.0.0.1:5000/upload/imgs/goods_img/",
        ""
      );

      this.form.goodsDesc = row.goodsDesc;
      this.form.id = row.id;
      this.dialogFormVisible = true;
      // console.log(row);
    },
    //确认
    confirm() {
      //修改商品接口
      goodsEdit(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then((res) => {
        if (res.data.code == 0) {
          //接收成功,重新渲染
          this.getList();
          this.$message.success("修改成功!");
        } else {
          this.$message.error("修改失败!");
        }
      });
      this.dialogFormVisible = false;
    },

    //每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //删除商品
    handleDelete(uid) {
      this.$confirm("确定删除该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dels(uid).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("删除成功!");
              //重新渲染列表
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message.error("已取消删除!");
        });
    },
    //数据渲染
    getList() {
      list(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        for (let item of this.tableData) {
          item.imgUrl =
            "http://127.0.0.1:5000/upload/imgs/goods_img/" + item.imgUrl;
          item.ctime = getChinatime(item.ctime);
        }
      });
    },
  },
  created() {
      (this.loading = true),
        //获取商品列表
        this.getProduct();
      //数据渲染
      this.getList();
      this.loading = false;

  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.page {
  margin: 10px 0;
}
.el-select {
  width: 100%;
}
.shop-pic {
  width: 100px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>