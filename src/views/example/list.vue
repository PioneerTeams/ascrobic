<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">导购管理</div>
      <el-tabs v-model="activeName" class="managetabs" @tab-click="currentClick">
        <el-tab-pane label="导购管理" name="guide">
          <guide />
        </el-tab-pane>
        <el-tab-pane name="invitation">
          <template slot="label">
            <el-badge :value="96" :max="99" class="item">邀请中</el-badge>
          </template>
          <tabs :table-data="invitation" :list="arr.invitation" />
        </el-tab-pane>
        <el-tab-pane label="角色描述" name="role">
          <tabs :table-data="role" :list="arr.role" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import guide from './components/guideShop'
import tabs from './components/exampleTabs'
import { getUserList, getDescList } from '@/api/shopArcade'
import arr from './data/data.js'
export default {
  components: { tabs, guide },
  props: {},
  data() {
    return {
      arr,
      current: 'invitation',
      activeName: 'guide',
      invitation: [],
      role: [],
      invitationdata: { type: 2, status: 3, page: 1, sort_time: '' },
      roledata: { mall_id: 61500, type: 2, page: 1 }
    }
  },
  created() {
    this.getUserLists()
    this.getDescLists()
  },
  methods: {
    async getUserLists() {
      const result = await getUserList(this.invitationdata)
      console.log(result, '邀请中')
      this.invitation = result.list
    },
    async getDescLists() {
      const result = await getDescList(this.roledata)
      console.log(result, '角色描述')
      this.role = result.list
    },
    currentClick() {
      console.log(this.activeName)
    }
  }
}
</script>
<style scoped lang="scss">
.management {
  width: 100%;
  padding: 30px;
}
.el-form--inline .el-form-item {
  margin-left: 35px;
}
.pagesye {
  float: right;
  padding: 15px 0;
  margin-right: 30px;
}
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
.el-badge__content.is-fixed {
    top: 7px;
    right: 22px;
}
.item{
  height: 100px;
}
</style>
