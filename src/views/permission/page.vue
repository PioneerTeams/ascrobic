<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">店铺管理</div>
      <el-tabs v-model="activeName" class="managetabs" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first" />
        <el-tab-pane label="配置管理" name="second" />
      </el-tabs>
    </div>
    <div class="mangeFrom">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="店铺名">
          <el-input v-model="formInline.user" placeholder="请输入店铺名" />
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="f1" value="f1" />
            <el-option label="f2" value="f2" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="formInline.user" placeholder="请选择" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first',
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  computed: {},
  created() {
    console.log(this.$router)
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      console.log(event.target)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped lang="scss">
.management {
  width: 100%;
  padding: 30px;
  background: #fcfcfc;
  .managementTab {
    width: 100%;
    background: #fff;
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
}
</style>
