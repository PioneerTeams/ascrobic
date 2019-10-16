<template>
  <div class="management">
    <div class="managementTab">
      <div class="managementhead">店铺管理</div>
      <el-tabs v-model="activeName" class="managetabs">
        <el-tab-pane label="全部店铺" name="shop">
          <div class="mangeFrom">
            <el-form
              ref="formInline"
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              label-width="180"
            >
              <el-form-item label="店铺名">
                <el-input v-model="formInline.vm_store_name" placeholder="请输入店铺名" />
              </el-form-item>
              <el-form-item label="楼层">
                <el-select v-model="formInline.floor_id" placeholder="请选择">
                  <el-option
                    v-for="ele in selectArr"
                    :key="ele.id"
                    :label="ele.name"
                    :value="ele.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="分类">
                <el-select v-model="formInline.category_id" placeholder="请选择">
                  <el-option-group
                    v-for="group in categorys"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item in group.children"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-option-group>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="onReset('formInline')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <tabs :table-data="tableData" :list="arr[activeName]" />
          <el-pagination
            class="pagesye"
            background
            layout="prev, pager, next"
            @current-change="currentpage"
            :total="tabDatetotal"
          />
        </el-tab-pane>
        <el-tab-pane label="e店铺" name="eshop">
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
                  <el-option
                    v-for="ele in branlist"
                    :key="ele.id"
                    :label="ele.name"
                    :value="ele.name"
                  />
                </el-select>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="onReset('formE')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <tabs :table-data="tableData" :list="arr[activeName]" />
          <el-pagination class="pagesye" background layout="prev, pager, next" :total="1" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import arr from "./data/pages.js";
import {
  getFloorList,
  getStoreList,
  getBranchList,
  getcategoryList
} from "@/api/shopArcade.js";
import tabs from "./components/tabs";
export default {
  components: { tabs },
  props: {},
  data() {
    return {
      activeName: "shop",
      selectArr: [],
      formInline: { vm_store_name: "", floor_id: "", category_id: "" },
      formE: { design: "", quanxian: "", pinpai: "" },
      tableData: [],
      arr,
      branlist: [],
      categorys: [],
      fromdata: { page: 1, is_e_shop: "", store_type: "", scene_type: 1 },
      tabDatetotal:10
    };
  },
  computed: {},
  created() {
    this.getFoor();
    this.getstorelist(this.fromdata);
    this.getBranchlistt();
    this.getcategory();
    console.log(this)
  },
  mounted() {},
  methods: {
    onSubmit() {
      const obj = {};
      for (const k in this.formInline) {
        if (this.formInline[k]) {
          obj[k] = this.formInline[k];
        }
      }
      this.getstorelist(Object.assign(this.fromdata, obj));
    },
    onReset(rulesFrom) {
      const arr = Object.keys(this.formInline);
      arr.forEach(item => {
        this.formInline[item] = "";
      });
      Object.assign(this.fromdata, this.formInline);
    },
    currentpage(val) {
      this.fromdata.page = val;
      this.$throttle(this.getstorelist,this.fromdata)
    },
    goDetail(row) {},
    async getFoor() {
      const result = await getFloorList();
      this.selectArr = result.list;
    },
    async getstorelist(data) {
      const result = await getStoreList(data);
      this.tableData = result.list;
      this.tabDatetotal = result.page.totalNum;
    },
    async getBranchlistt() {
      const result = await getBranchList();
      this.branlist = result;
    },
    async getcategory() {
      const result = await getcategoryList();
      this.categorys = result;
    }
  }
};
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
