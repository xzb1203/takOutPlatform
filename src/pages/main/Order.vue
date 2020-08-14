<template>
  <div class="echarts">
    <!-- 时间范围小组件 -->
    <div class="echarts-top">
      <span>时间范围</span>
      <div class="time-sope">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="clickQuery">查询</el-button>
    </div>
    <!-- 图表 -->
    <el-card class="box-card">
      <div class="echarts-body" id="content"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
import { ordertotal } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  name: "Echarts",
  data() {
    return {
      date: [new Date('2020-04-01 00:00:00'),new Date()],
    };
  },
  methods: {
    //查询按钮
    clickQuery() {
      let timeArr = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);

      this.refreshEcharts(timeArr);
    },
    //渲染echarts表格
    refreshEcharts(timeArr) {
      ordertotal(timeArr).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
            name: "价格",
            min: 0,
            max: 150,
            interval: 20,
            axisLabel: {
              formatter: "{value} 元",
            },
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };
        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("content"));
  },
  created() {
    this.clickQuery()
  },
};
</script>
<style lang="less" scoped>
#content {
  width: 100%;
  height: 450px;
}
.el-card {
  margin-top: 40px;
}
.echarts-top {
  display: flex;
  align-items: center;
  color: #606266;
}
.time-sope {
  margin: 0 10px;
}
</style>