<template>
  <div>
    <el-card class="box-card">
      <!-- 表头 -->
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <!-- 内容 -->
      <div class="table-content">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="账号">
            <template slot-scope="scope">{{ scope.row.account }}</template>
          </el-table-column>
          <el-table-column prop="userGroup" label="用户组"></el-table-column>
          <el-table-column
            prop
            label="创建时间"
            show-overflow-tooltip
          >{{$moment(ctime).format('YYYY-MM-DD HH:mm:ss')}}</el-table-column>
          <!-- 编辑 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div style="margin-top: 20px">
          <el-button type="danger" @click="deleteAll(tableChecked)">批量删除</el-button>
          <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.userGroup" placeholder="请选择账户权限">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pages } from "@/api/apis";
import { delAcc } from "@/api/apis";
import { batchdel } from "@/api/apis";
import { edit } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 1,
      total: 0,
      tableChecked: [],
      ids: [],
      ctime: "",
      data: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        account: "",
        userGroup: "",
        delivery: false,

      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //数据渲染
      pages(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.ctime = res.data.data.ctime;
      });
    },
    //编辑
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form.account = row.account;
      this.form.userGroup = row.userGroup;
      this.form.id = row.id;
      this.data = row;
    },
    //确定
    confirm() {
      edit(this.form.id, this.form.account, this.form.userGroup).then((res) => {
        if (res.data.code == 0) {
          pages(this.currentPage, this.pageSize).then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.ctime = res.data.data.ctime;
          });
          this.$message.success("修改成功!");
        } else {
          this.$message.error("修改失败!");
        }
      });
      this.dialogFormVisible = false;
    },
    //取消
    cancel() {
      this.dialogFormVisible = false;
    },

    //批量删除功能
    async deleteAll() {
      //先询问是否删除
      let result = await this.$confirm(
        "此操作将永久删除该账户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result == "confirm") {
        batchdel(JSON.stringify(this.ids)).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("删除成功!");
            this.getList();
          } else {
            this.$message.error("删除失败!");
          }
        });
      } else {
        this.$message.error("已取消删除!");
      }
    },
    //选中函数
    handleSelectionChange(val) {
      // console.log(val);
      let arr=[]
      for (let key of val) {
        arr.push(key.id);
      }
      this.ids = arr;
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      //页码发生改变发送请求
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //页码发生改变发送请求
      this.getList();
    },
    //表单
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //删除账户功能
    async handleDelete(uid) {
      console.log(uid);
      //阻止用户删除当前登录的账户
      if(uid==localStorage.id){
        console.log('这是当前账户');
        this.$message.error("不允许删除当前账户噢!");
        return false
      }
      let result = await this.$confirm(
        "此操作将永久删除该账户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result == "confirm") {
        delAcc(uid).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("删除成功!");
            this.getList();
          }
        });
      } else {
        this.$message.error("已取消删除!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  margin: 10px 0;
}
.el-select {
  width: 100%;
}
</style>
