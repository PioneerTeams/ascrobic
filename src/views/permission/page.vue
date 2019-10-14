<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">导购管理</div>
      <el-tabs v-model="activeName" class="managetabs" @tab-click="handleClick">
        <el-tab-pane label="导购管理" name="first">

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
          <el-pagination background layout="prev, pager, next" :total="1" />

        </el-tab-pane>
        <el-tab-pane label="角色描述" name="second">
          <div class="mangeFrom">
            <el-form ref="formInline" :inline="true" :model="formE" class="demo-form-inline">
              <el-form-item label="店铺名">
                <el-input v-model="formE.design" placeholder="请输入店铺名" />
              </el-form-item>
              <el-form-item label="店铺权限">
                <el-select v-model="formE.quanxian" placeholder="请选择">
                  <el-option label="f1" value="f1" />
                  <el-option label="f2" value="f2" />
                </el-select>
              </el-form-item>
              <el-form-item label="授权品牌">
                <el-select v-model="formE.pinpai" placeholder="请选择">
                  <el-option label="f1" value="f1" />
                  <el-option label="f2" value="f2" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="onReset('formE')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
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
          <el-pagination background layout="prev, pager, next" :total="1" />
        </el-tab-pane>
      </el-tabs>
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
        design: '',
        floor: '',
        classification: ''
      },
      formE: {
        design: '',
        quanxian: '',
        pinpai: ''
      },
      tableData: [
        {
          name: '拿美店仓',
          floor_name: 'F4',
          address: '4楼',
          category_data: ['女装'],
          shop_manager: '迎春,刘小哥,红杰,17600665361,15822294356',
          building: '楼管,宋凯',
          status_str: '有效',
          id: 43529
        },
        {
          name: '拿美店仓',
          floor_name: 'F4',
          address: '4楼',
          category_data: ['女装'],
          shop_manager: '迎春,刘小哥,红杰,17600665361,15822294356',
          building: '楼管,宋凯',
          status_str: '有效',
          id: 43528
        }
      ]
    }
  },
  computed: {},
  created() {
    console.log(this.$router)
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {},
    onSubmit() {},
    onReset(rulesFrom) {
      console.log(rulesFrom)
      console.log(this.$refs)
      this.$refs[rulesFrom].resetFields()
    },
    goDetail(row, column, cell, event) {
      console.log(row.id)
    }
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
