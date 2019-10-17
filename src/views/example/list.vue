<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">导购管理</div>
      <el-tabs v-model="activeName" class="managetabs">
        <el-tab-pane label="导购管理" name="guide">
          <guide />
        </el-tab-pane>
        <el-tab-pane label="邀请中" name="inivte" />
        <el-tab-pane label="角色描述" name="desc" />
      </el-tabs>
    </div>
  </div>
</template>
<script>
import guide from './components/guideShop'
export default {
  components: { guide },
  props: {},
  data() {
    return {
      activeName: 'guide'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.management {
  width: 100%;
  padding: 30px;
  .mangeFrom {
    margin-top: 24px;
    padding: 24px;
    background: #fff;
    border-radius: 10px;
  }
  .managementTab {
    width: 100%;
    background: #fcfcfc;
    .managetabs {
      margin-left: 12px;
      .el-tabs__header {
        margin: 0;
        background: red;
      }
    }
    .managementhead {
      padding: 24px;
      overflow: hidden;
    }
  }
  .mangeTable {
    margin-top: 24px;
    padding: 24px;
    background: #fff;
    text-align: center;
    border-radius: 10px;
  }
}
.el-form--inline .el-form-item {
  margin-left: 35px;
}
.pagesye {
  float: right;
  padding: 15px 0;
  margin-right: 30px;
}
</style>
