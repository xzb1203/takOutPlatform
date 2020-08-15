<template>
  <div id="main">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.num" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.user" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.region" placeholder="订单状态" clearable>
            <el-option v-for="item in option" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 时间选择组件 -->
      <div class="echarts-top">
        <div class="setTime">选择时间</div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" @click="clickSearch">查询</el-button>
      </div>
      <!-- 表单 -->
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="200px"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180px"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="200px"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleSet(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页statr -->
      <div class="page">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >></el-pagination>
        </div>
      </div>
      <!-- 分页end -->
      <!-- 查看弹窗star -->
      <el-dialog title="订单详情" width="40%">
        <el-form :model="view">
          <el-form-item label="订单ID" :label-width="formLabelWidth">
            <span>{{view.id}}</span>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <span>{{view.orderNo}}</span>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <span>{{view.orderTime}}</span>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <span>{{view.phone}}</span>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <span>{{view.consignee}}</span>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <span>{{view.deliverAddress}}</span>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <span>{{view.deliveryTime}}</span>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <span>{{view.remarks}}</span>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <span>{{view.orderAmount}}</span>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <span>{{view.orderState}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 查看弹窗end -->

      <!-- 编辑弹窗start -->
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible2" width="40%">
        <el-form :model="editobj">
          <el-form-item label="订单ID" :label-width="formLabelWidth">
            <el-input v-model="editobj.id"></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="editobj.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="editobj.orderTime"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="editobj.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="editobj.consignee"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="editobj.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="editobj.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="editobj.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="editobj.orderAmount"></el-input>
          </el-form-item>
           <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="editobj.orderState" placeholder="订单状态" clearable>
            <el-option v-for="item in option" :label="item" :value="item" :key="item"></el-option>
          </el-select>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="isSure">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹窗end -->
    </el-card>
  </div>
</template>
<script>
import { orderList } from "@/api/apis";
import { search } from "@/api/apis";
import { changeList } from "@/api/apis"; //修改订单接口
import { getTimer } from "@/utils/utils"; //时间格式渲染
import { getChinatime } from "@/utils/utils"; //时间格式渲染
export default {
  data() {
    return {
      //加载状态
      loading: true,
      //订单状态
      option: ["已受理", "派送中", "已完成"],
      //时间值
      value1: "",
      formInline: {
        user: "",
        num: "",
        phone: "",
        region: "",
      },
      //表单的数据
      tableData: [],
      //分页数据
      currentPage: 1,
      pagesize: 5,
      total: 50,
      //查看数据列表
      gridData: [],
      dialogTableVisible2: false,
      dialogFormVisible2: false,
      //查看页value值
      view: {},
      formLabelWidth: "120px",
      editobj: {}, //当前编辑数据
    };
  },
  methods: {
    //编辑功能
    handleSet(val) {
      this.editobj = { ...val };
      this.dialogFormVisible2 = true;
    },
    //编辑后确定事件
    isSure() {
      changeList(
        this.editobj.id,
        this.editobj.orderNo,
        this.editobj.orderTime,
        this.editobj.phone,
        this.editobj.consignee,
        this.editobj.deliverAddress,
        this.editobj.deliveryTime,
        this.editobj.remarks,
        this.editobj.orderAmount,
        this.editobj.orderState
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("修改成功!");
          this.dialogFormVisible2 = false;
          this.getApply();
        } else {
          this.$message.error("修改失败!");
          this.dialogFormVisible2 = false;
        }
      });
    },

    //查看功能
    handleClick(row) {
      //显示编辑对话框
      //渲染数据到对话框
      this.view = { ...row };
    },
    //每页显示条目个数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getApply();
    },
    //当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApply();
    },
    //数据渲染
    getApply() {
      this.loading = true;
      orderList(this.currentPage, this.pagesize).then((res) => {
        let arr = res.data.data;
        for (let item of arr) {
          item.orderTime = getChinatime(item.orderTime);
          item.deliveryTime = getChinatime(item.deliveryTime);
        }
        this.tableData = arr; //数据
        this.total = res.data.total;
      });
      this.loading = false;
    },

    //查询功能
    clickSearch() {
      //判断用户是否输入
      if (
        this.formInline.user == "" &&
        this.formInline.user == "" &&
        this.formInline.phone == "" &&
        this.formInline.region == "" &&
        this.value1 == ""
      ) {
        this.$message.error("至少输入一个查询项!!!");
        return false;
      }
      let timerArr = [
        getChinatime(this.value1[0]),
        getChinatime(this.value1[1]),
      ];
      search(
        this.currentPage,
        this.pagesize,
        this.formInline.num,
        this.formInline.user,
        this.formInline.phone,
        this.formInline.region,
        timerArr
      ).then((res) => {
        for (let item of res.data.data) {
          item.orderTime = getTimer(item.orderTime);
          item.deliveryTime = getTimer(item.deliveryTime);
        }
        this.$message.success("查询成功!!!");
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.loading = true;
    this.getApply();
    this.loading = false;
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
.page {
  margin-top: 10px;
}
.echarts-top {
  display: flex;
  align-items: center;
  color: #606266;
  span {
    margin-right: 22px;
  }
  .el-button {
    margin-left: 10px;
  }
}
.time-sope {
  margin: 0 10px;
}
.setTime{
  font-size: 12px;
  margin-right: 7px;
}
</style>