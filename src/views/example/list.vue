<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">导购管理</div>
      <el-tabs v-model="activeName" class="managetabs" @tab-click="handleClick">
        <el-tab-pane label="导购管理" name="guide">
          <div class="mangeFrom">
            <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="店铺名">
                <el-input v-model="formInline.design" placeholder="请输入店铺名" />
              </el-form-item>
              <el-form-item label="楼层">
                <el-select v-model="formInline.floor" placeholder="请选择">
                  <el-option label="f1" value="f1" />
                  <el-option label="f2" value="f2" />
                </el-select>
              </el-form-item>
              <el-form-item label="分类">
                <el-input v-model="formInline.classification" placeholder="请选择" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="onReset('formInline')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <tabs :tableData="tableData" :list="title[activeName]" />
        </el-tab-pane>
        <el-tab-pane label="邀请中" name="invitation">
         <tabs :tableData="tableData" :list="title[activeName]" />
        </el-tab-pane>
        <el-tab-pane label="角色描述" name="role">
          <div class="mangeTable">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="店铺名称" width="120" />
              <el-table-column prop="floor_name" label="楼层" width="120" />
              <el-table-column prop="address" label="位置" width="120" />
              <el-table-column prop="category_data" label="所属分类" width="120" />
              <el-table-column prop="shop_manager" label="店长" />
              <el-table-column prop="building" label="楼管" width="180" />
              <el-table-column prop="status_str" label="状态" width="120" />
              <el-table-column prop="address" label="操作" width="120">
                <el-button type="text" size="small" @cell-click="goDetail">查看</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import tabs from './components/exampleTabs'
import title from './data/data'
export default {
  components: {tabs},
  props: {},
  data() {
    return {
      activeName: 'guide',
      formInline: { design: '', floor: '', classification: '' },
      fromdata:{ type:2, page:1, status:'[0,1]' },
      title,
      tableData: []
    }
  },
  computed: {},
  async created() {
    this.tableData = await this.getuserlist(this.fromdata)
  },
  mounted() {},
  methods: {
    ...mapActions( 'shopArcade', ['getuserlist'] ),
    handleClick(tab, event) {
      this.activeName = tab.name
      if(tab.name==='invitation'){

      }
    },
    onSubmit() {},
    onReset(rulesFrom) {
      this.$refs[rulesFrom].resetFields()
    },
    goDetail(row, column, cell, event) {},
    
  }
}
</script>
<style scoped lang="scss">
.management {
  width: 100%;
  padding: 30px;
  background: #fcfcfc;
  .mangeFrom {
    margin-top: 24px;
    padding: 24px;
    background: #fff;
  }
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
  .mangeTable {
    margin-top: 24px;
    padding: 24px;
    background: #fff;
    text-align: center;
  }
}
</style>
