<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">专柜导航设置</div>
    </div>
    <div class="mangeFrom">
      <div>
        <el-form
          ref="formInline"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="180"
        >
          <el-form-item label="店铺名称">
            <el-input v-model="formInline.mobile" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="楼层">
            <el-select v-model="formInline.store_id" placeholder="请选择">
              <!-- <el-option v-for="ele in listSech" :key="ele.id" :label="ele.name" :value="ele.id" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="formInline.role_id" placeholder="请选择">
              <!-- <el-option
                v-for="ele in roleArr"
                :key="ele.id"
                :label="ele.description"
                :value="ele.id"
              /> -->
            </el-select>
          </el-form-item>
          <div class="mright" style="text-align: right">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <tabs :tableData="shopArr" :list="list"/>
    </div>
  </div>
</template>
<script>
import { getStoreList } from '@/api/shopArcade'
import tabs from '@/components/phorManger'
import title from './data/pages'
export default {
  components: { tabs },
  props: {},
  data() {
    return {
      activeName: "guide",
        formInline: {
        mobile: '',
        store_id: '',
        role_id: '',
        relation_user_status: '',
        status: ''
      },
      tableArr:[''],
      guideDate:{ page: 1,scene_type: 2, store_type: 1 },
      shopArr:[],
      list:title.navshop
    };
  },
  created() {
    this.getStoreLists()
  },
  methods: {
    async getStoreLists(){
      let result = await getStoreList(this.guideDate)
      this.shopArr = result.list
      console.log(result)
    },
    onSubmit() {
      // 搜索
      const obj = {};
      for (const k in this.formInline) {
        if (this.formInline[k]) {
          obj[k] = this.formInline[k];
        }
      }
      this.$emit("sechfn", Object.assign(this.fromdata, obj));
    },
    onReset() {
      // 重置表单
      const arr = Object.keys(this.formInline);
      arr.forEach(item => {
        this.formInline[item] = "";
      });
      Object.assign(this.fromdata, this.formInline);
    }
  }
};
</script>
<style scoped lang="scss">
.management {
  width: 100%;
  padding: 30px;
  background: #fcfcfc;
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
    background: #fff;
  }
}
.mangeTable {
  margin-top: 24px;
  padding: 24px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
}
</style>
