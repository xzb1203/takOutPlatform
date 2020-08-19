<template>
  <div>
    <!-- 头部 -->
    <ul class="head">
      <li>
        <i class="el-icon-document-checked"></i>
        <div>
          <h3>总订单</h3>
          <span>{{data.totalOrder}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-money"></i>
        <div>
          <h3>总销售额</h3>
          <span>{{data.totalAmount}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-tickets"></i>
        <div>
          <h3>今日订单数</h3>
          <span>{{data.todayOrder}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-pie-chart"></i>
        <div>
          <h3>今日销售额</h3>
          <span>{{data.totayAmount}}</span>
        </div>
      </li>
    </ul>
    <!-- 主体 -->
    <el-card class="box-card">
      <div id="content"></div>
    </el-card>
  </div>
</template>

<script>
import { totaldata } from "@/api/apis";
export default {
  name: "Echarts",
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    //调用接口
    var myChart = this.$echarts.init(document.getElementById("content"));
    totaldata().then((res) => {
      this.data = { ...res.data };
      // 基于准备好的dom，初始化echarts实例
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数据", "金额数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
@cfff: #ffffff;

.head {
  display: flex;
  justify-content: space-between;
  li {
    width: 23%;
    background-color: @cfff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    h3 {
      color: #cccccc;
    }
    i {
      font-size: 100px;
      color: #1296db;
    }
    span {
      font-weight: bold;
    }
    &:nth-child(2) i {
      color: #d4237a;
    }
    &:nth-child(4) i {
      color: #1afa29;
    }
  }
}
#content {
  width: 100%;
  height: 450px;
}
.box-card {
  margin-top: 40px;
}
</style>