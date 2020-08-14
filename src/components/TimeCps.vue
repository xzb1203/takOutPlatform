<template>
  <div>
    <!-- 时间范围小组件 -->
    <div class="echarts-top">
      <span>时间范围</span>
      <div class="time-sope">
        <el-time-picker
          is-range
          arrow-control
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <el-button type="primary">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.echarts-top {
  display: flex;
  align-items: center;
  color: #606266;
}
.time-sope {
  margin: 0 10px;
}
</style>