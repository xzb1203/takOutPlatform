<template>
  <el-container>
    <el-aside width="200px">
      <h1 class="shopName">
        <i class="el-icon-platform-eleme"></i>外面商家中心
      </h1>
      <!-- 左侧树菜单 -->
      <el-menu
        :default-active="isHash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <!-- 可展开菜单 -->
        <!-- <el-menu-item index="/main/index">
          <i class="el-icon-menu"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/main/oms">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-claim"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/main/ShopList">商品列表</el-menu-item>
            <el-menu-item index="/main/ShopAdd">商品添加</el-menu-item>
            <el-menu-item index="/main/ShopClass">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/main/StoreAdm">
          <i class="el-icon-suitcase"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>
        <el-submenu index="/main/AccAdm">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>账户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/main/AccList">账号列表</el-menu-item>
            <el-menu-item index="/main/AccAdd">添加账号</el-menu-item>
            <el-menu-item index="/main/AccPsw">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/main/Shop">商品统计</el-menu-item>
            <el-menu-item index="/main/Order">订单统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>-->

        <div v-for="item in powerArr" :key="item.url">
          <!-- 如果循环对象没有子类就用此结构 -->
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.uname }}</span>
          </el-menu-item>
          <!-- 否则就用它 -->
          <el-submenu v-else :index="item.url">
            <!-- 大标题的名字 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.uname }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.uname}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
      <!-- 菜单对象，不可展开 -->
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadList" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <span>{{username}}</span>
          <i>
            <img @click="clickPic" :src="mySrc" />
          </i>
        </div>
      </el-header>
      <!-- 二级路由 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken } from "@/api/apis";
import { accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      username: "",
      isHash: "",
      mySrc: "",
      list: [
        {
          url: "/main/index",
          icon: "el-icon-menu",
          uname: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/oms",
          icon: "el-icon-notebook-2",
          uname: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "1",
          icon: "el-icon-s-claim",
          uname: "商品管理",
          roles: ["super", "normal"],
          children: [
            { url: "/main/ShopList", uname: "商品列表" },
            { url: "/main/ShopAdd", uname: "商品添加" },
            { url: "/main/ShopClass", uname: "商品分类" },
          ],
        },
        {
          url: "/main/StoreAdm",
          icon: "el-icon-suitcase",
          uname: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/main/AccAdm",
          icon: "el-icon-s-custom",
          uname: "账号管理",
          roles: ["super"],
          children: [
            { url: "/main/AccList", uname: "账号列表" },
            { url: "/main/AccAdd", uname: "添加账号" },
            { url: "/main/AccPsw", uname: "修改密码" },
          ],
        },
        {
          url: "2",
          icon: "el-icon-receiving",
          uname: "销售统计",
          roles: ["super"],
          children: [
            { url: "/main/Shop", uname: "商品统计" },
            { url: "/main/Order", uname: "订单统计" },
          ],
        },
      ],
      breadList: [],
    };
  },
  created() {
    //控制菜单选中激活
    this.isHash = this.$route.path;
    //监听bus事件
    this.$bus.$on("imguploadfinish", () => {
      //头像更新
      this.getPicChange();
    });
    //token功能
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.user;
      } else {
        this.username = "请登录";
      }
    });
    //头像更新
    this.getPicChange();
    this.breadList = this.$route.meta.breadList;
  },
  watch: {
    //面包屑导航监听
    $route(to) {
      this.breadList = to.meta.breadList;
    },
  },
  //计算属性
  computed: {
    //权限数组
    powerArr() {
      // es5写法
      // let newArr = this.list.filter((item) => {
      //   return item.roles.includes(localStorage.role);
      // });
      // return newArr;
      // es6写法
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
  methods: {
    clickPic() {
      location.hash = "/main/UserMsg";
    },
    //头像图片接口
    getPicChange() {
      accountinfo(localStorage.id).then((res) => {
        this.mySrc = res.data.accountInfo.imgUrl;
      });
    },
  },
};
</script>

<style lang="less">
@base: #545c64;
@graybase: #f0f2f5;
@cfff: #ffffff;
.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.el-aside {
  background-color: @base;
}

.el-main {
  background-color: @graybase;
  padding: 15px;
}

.el-menu {
  border: 0;
}
.right {
  display: flex;
  align-items: center;
  i {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 5px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.shopName {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  box-sizing: border-box;
  color: white;
  i {
    font-size: 30px;
    margin-right: 5px;
  }
}
</style>