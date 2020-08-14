<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <!-- <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button> -->
      <el-button type="primary" @click="addClass">添加分类</el-button>
    </div>
    <!-- 添加分类弹窗 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="className" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="btnvalue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 内容 -->
    <el-table :data="tableData">
      <el-table-column label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-show="!(scope.row.isedit)">{{ scope.row.cateName }}</el-tag>
              <el-input v-show="scope.row.isedit" v-model="scope.row.cateName"></el-input>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" :disabled="!scope.row.isedit"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >{{scope.row.isedit==true ?'完成' :'编辑'}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 6, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
//分类列表
import { catelist } from "@/api/apis";
import { addcate } from "@/api/apis";
import { delcate } from "@/api/apis";
import { editcate } from "@/api/apis";
export default {
  data() {
    return {
      // 分页数据
      currentPage: 1,
      pageSize: 5,
      total: 100,
      className: "", //分类名称
      dialogTableVisible: false,
      dialogFormVisible: false,
      btnvalue: true,
      //确认按钮
      tableData: [], //数据
    };
  },
  methods: {
    //编辑功能
    handleEdit(row) {
      if (row.isedit) {
        row.isedit = false;
        editcate(row.id, row.cateName, row.state).then(res => {
          if (res.data.code == 0) {
            this.$message.success("修改成功!");
          }
        });
      } else {
        row.isedit = true;
      }
    },
    //删除分类
    handleDelete(row) {
      this.$confirm("确认删除该分类吗", {
        confirmButtonText: "取消",
        cancelButtonText: "删除",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("删除成功!");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //当前的页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //添加分类的方法
    addClass() {
      this.dialogFormVisible = true;
    },
    //确定
    confim() {
      // 调用接口
      addcate(this.className, this.btnvalue).then((res) => {
        if (res.data.code == 0) {
          this.getList();
          this.$message.success("商品分类添加成功!");
        } else {
          this.$message.error("商品分类添加失败!");
        }
      });
      this.dialogFormVisible = false;
    },
    //数据渲染
    getList() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.state = obj.state == 1 ? true : false;
          obj.isedit = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 10px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
</style>