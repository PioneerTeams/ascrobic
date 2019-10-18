<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">店铺管理</div>
      <el-tabs v-model="activeName" class="managetabs">
        <el-tab-pane label="全部店铺" name="shop">
          <allshop @sechfn="getstorelist" />
          <tabs :table-data="tableData" :list="arr[activeName]" />
          <pageqi :totals="tabDatetotal" @currentpage="currentpage" />
        </el-tab-pane>
        <el-tab-pane label="e店铺" name="eshop">
          <eshop @sechfn="getstorelist" />
          <tabs :table-data="tableData" :list="arr[activeName]" />
          <pageqi :totals="tabDatetotal" @currentpage="currentpage" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import arr from './data/pages.js'
import { getStoreList } from '@/api/shopArcade.js'
import tabs from './components/tabs'
import pageqi from './components/fenpage'
import allshop from './components/Allshop'
import eshop from './components/Eshop'
export default {
  components: { tabs, pageqi, allshop, eshop },
  props: {},
  data() {
    return {
      arr,
      activeName: 'shop',
      tableData: [],
      tabDatetotal: 10,
      formInline: { vm_store_name: '', floor_id: '', category_id: '' },
      formE: { design: '', quanxian: '', pinpai: '' },
      fromdata: { page: 1, is_e_shop: '', store_type: '', scene_type: 1 }
    }
  },
  computed: {},
  created() {
    this.getstorelist(this.fromdata)
  },
  mounted() {},
  methods: {
    // 分页器
    currentpage(val) {
      this.fromdata.page = val
      this.$throttle(this.getstorelist, this.fromdata)
    },
    // 获取tabel 数据
    async getstorelist(data) {
      const result = await getStoreList(data)
      console.log(`%c${JSON.stringify(result)}`, 'color:skyblue')
      this.tableData = result.list
      this.tabDatetotal = result.page.totalNum
    }
  }
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
