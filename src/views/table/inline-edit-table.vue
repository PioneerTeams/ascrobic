<template>
  <div class="inline-edit-table">
    <div class="edit-top">
      <span>维他命商城后台</span>
      <span>&gt;</span>
      <span>商品</span>
      <span>&gt;</span>
      <span>自维护销售属性值管理</span>
      <span v-show="flag==false">查看分类与属性组关系</span>
    </div>
    <div class="edit-content">
      <div class="edit-con-top">
        <h3 v-text="flag?'自维护销售属性值管理':'查看分类与属性组关系'"></h3>
      </div>
      <div class="edit-nav-select">
        <span class="active">规格值列表</span>
        <span>分类与属性组关系</span>
      </div>
      <div class="edit-group">
        <el-form ref="form" :model="form" label-width="120px">
          <el-row v-for="(item, index) in flag?formList:typeList" :key="index" type="flex">
            <el-col v-for="(value, key) in item" :key="key" :span="7" class="form-item">
              <el-form-item :label="value.label" class="form-label">
                <component
                  :is="value.is"
                  v-model="form[value.name]"
                  :placeholder="value.placeholder"
                  style="width:200px;"
                  :options="options"
                >
                  <!----  根据value.is判断渲染Ipt组件还是select组件 ---->
                  <el-option
                    v-for="(v,k) in attrStoreList"
                    v-show="value.name == 'storeId'"
                    :key="k.id"
                    :label="v.name"
                    :value="v.id"
                  />
                  <el-option
                    v-for="(val) in value.list"
                    v-show="value.name == 'status'"
                    :key="val.name"
                    :label="val.name"
                    :value="val.value"
                  />

                  <el-option
                    v-show="value.name == 'attrId'"
                    v-for="val in attrList"
                    :key="val.attr_id"
                    :label="val.attr_name"
                    :value="val.attr_id"
                  />
                  <!---  渲染下拉框的每一项  ---->
                </component>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn">
            <el-button type="primary" class="search" @click="submit">查询</el-button>
            <el-button type="primary" class="rest-info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="edit-list" v-show="flag===true">
        <el-row>
          <el-button style="background: #3ec6b6; color: #fff;" icon="el-icon-plus" circle></el-button>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="item in column"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <el-row class="table-btm">
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])" disabled="true">当页全选</el-button>
            <el-button @click="toggleSelection()" disabled="true">删除</el-button>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="0"
            layout="total, prev, pager, next"
            :total="0"
            style="margin-top: 20px"
          ></el-pagination>
        </el-row>
      </div>
      <div class="edit-list" v-show="flag===false">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="date" label="分类" ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看销售属性</el-button>
               <el-button type="text" size="small" @click="handleClick(scope.row)">查看一般属性</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "InlineEditTable",
  data() {
    return {
      flag: true,
      form: {
        storeId: "", //所属门店
        status: "", //状态
        attrId: "", //关联属性组名
        itemValue: "", //属性值,
        father_id: ""
      },
      formList: [
        [
          {
            label: "所属门店",
            name: "storeId",
            placeholder: "",
            is: "el-select"
          },
          {
            label: "状态",
            name: "status",
            placeholder: "请选择状态",
            is: "el-select",
            list: [
              {
                name: "生效",
                value: 1
              },
              {
                name: "失效",
                value: 0
              }
            ]
          },
          {
            label: "关联属性组名",
            name: "attrId",
            placeholder: "请选择属性组名称",
            is: "el-select"
          },
          {
            label: "属性值",
            name: "itemValue",
            placeholder: "请输入名称或编码",
            is: "el-input"
          }
        ]
      ],
      typeList: [
        [
          {
            label: "分类",
            name: "father_id",
            placeholder: "请选择",
            is: "el-cascader"
          }
        ]
      ],
      column: [
        {
          label: "名称",
          prop: "name"
        },
        {
          label: "编码",
          prop: "encoded"
        },
        {
          label: "门店",
          prop: "store"
        },
        {
          label: "状态",
          prop: "type"
        },
        {
          label: "操作",
          prop: "action"
        }
      ]
    };
  },
  computed: {
    ...mapState("inline-edit-table", ["attrStoreList", "attrList"])
  },
  created() {
    this.getAttrStoreListAction();
    this.getAttrListAction();
  },
  methods: {
    ...mapActions("inline-edit-table", [
      "getAttrStoreListAction",
      "getAttrListAction"
    ]),
    submit() {},
    reset() {},
    handleSelectionChange() {}
  }
};
</script>

<style scoped>
@import url("./scss/inline-edit.css");
</style>
