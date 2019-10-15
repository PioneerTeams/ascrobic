<template>
  <div class="pagedetail">
    <div class="pagedetailNav">
      <img
        src="https://img.weitaming.com/vm_brand/logo/20160726/8a50d1fe4aee6e224be1b103a9f88eb8.png"
      >
      <span class="pagedetailTitle">拿美店仓</span>
    </div>
    <div class="pagedetailBottom">
      <el-container>
        <el-aside width="100%">
          <el-tabs tab-position="left" style="width: 200px">
            <el-tab-pane label="基本信息">基本信息</el-tab-pane>
            <el-tab-pane label="匹配设置">匹配设置</el-tab-pane>
            <el-tab-pane label="e店铺设置">e店铺设置</el-tab-pane>
            <el-tab-pane label="团队">团队</el-tab-pane>
            <el-tab-pane label="店铺设置">店铺设置</el-tab-pane>
            <el-tab-pane label="操作历史">操作历史</el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {
    const { id } = this.$route.query
    this.getPageDetails(id)
  },
  methods: {
    async getPageDetails(id) {
      console.log(id)
    }
  }
}
</script>
<style scoped lang="scss">
.pagedetail {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  background: #fcfcfc;
  .pagedetailNav {
    padding: 24px;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    img {
      width: 60px;
      height: 60px;
    }
    .pagedetailTitle {
      margin-left: 20px;
    }
  }
  .pagedetailBottom {
    display: flex;
    width: 100%;
    height: 600px;
    .el-col-12 {
      width: 100%;
      height: 100%;
    }
    aside {
      padding:24px;
    }
  }
}
</style>
