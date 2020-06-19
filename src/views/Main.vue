<template>
  <el-container style="height:100%">
    <el-aside width="auto" style="background-color:#545c64;"
      ><common-aside style="border:none;"></common-aside
    ></el-aside>
    <el-container>
      <el-header style="background-color:#333;"
        ><common-header></common-header
      ></el-header>
      <common-tab></common-tab>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonHeader from "../components/CommonHeader"
import CommonAside from "../components/CommonAside"
import CommonTab from "../components/CommonTab"
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  padding-top: 0;
}
</style>
