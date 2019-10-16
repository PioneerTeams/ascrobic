<template>
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
          <el-option v-for="ele in selectArr" :key="ele.id" :label="ele.name" :value="ele.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="formInline.category_id" placeholder="请选择">
          <el-option-group v-for="group in categorys" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <div class="mright"  style="text-align: right">
          <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import pageqi from "./fenpage";
import { getFloorList, getcategoryList } from "@/api/shopArcade.js";
export default {
  props: {},
  components: { pageqi },
  data() {
    return {
      selectArr: [],
      categorys: [],
      tabDatetotal: 10,
      formInline: { vm_store_name: "", floor_id: "", category_id: "" },
      fromdata: { page: 1, is_e_shop: "", store_type: "", scene_type: 1 }
    };
  },
  computed: {},
  methods: {
      // Select分类
    async getcategory() { const result = await getcategoryList(); this.categorys = result; },
    // Select楼层
    async getFoor() { const result = await getFloorList(); this.selectArr = result.list; },
    onSubmit() {
        // 搜索
      const obj = {};
      for (const k in this.formInline) {
        if (this.formInline[k]) {
          obj[k] = this.formInline[k];
        }
      }
      this.$emit('sechfn',Object.assign(this.fromdata, obj));
    },
    onReset() {
      // 重置表单
      const arr = Object.keys(this.formInline);
      arr.forEach(item => {
        this.formInline[item] = "";
      });
      Object.assign(this.fromdata, this.formInline);
    }
  },
  created() {
    this.getcategory();
    this.getFoor();
  },
  mounted() {}
};
</script>
