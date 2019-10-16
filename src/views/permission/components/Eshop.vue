<template>
  <div class="mangeFrom">
    <el-form ref="formInline" :inline="true" :model="frome" class="demo-form-inline">
      <el-form-item label="店铺名">
        <el-input v-model="frome.vm_store_name" placeholder="请输入店铺名" />
      </el-form-item>
      <el-form-item label="店铺权限">
        <el-select v-model="frome.power_name" placeholder="请选择">
           <el-option v-for="ele in powerList" :key="ele.id" :label="ele.name" :value="ele.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="授权品牌">
        <el-select v-model="frome.brand" placeholder="请选择">
          <el-option v-for="ele in branlist" :key="ele.id" :label="ele.name" :value="ele.id" />
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
</template>
<script>
import { getBranchList, getStorePowerList } from '@/api/shopArcade.js'
export default {
  props: {},
  components: {},
  data() {
    return {
        branlist:[],
        powerList:[],
        fromdata: { page: 1, is_e_shop: 1, store_type: "", scene_type: 1 },
        frome:{ vm_store_name: '', power_name: '', brand: ''}
    };
  },
  computed: {},
  methods: {
    // 获取授权品牌数据
    async getBranchlists() { const result = await getBranchList(); this.branlist = result; },
    // 获取店铺权限
    async getStorePowerLists() { const result = await getStorePowerList(); this.powerList = result; console.log(this.powerList) },
     onSubmit() {
        // 搜索
      const obj = {};
      for (const k in this.frome) {
        if (this.frome[k]) {
          obj[k] = this.frome[k];
        }
      }
      this.$emit('sechfn',Object.assign(this.fromdata, obj));
    },
    onReset() {
      // 重置表单
      const arr = Object.keys(this.frome);
      arr.forEach(item => {
        this.frome[item] = "";
      });
      Object.assign(this.fromdata, this.frome);
    }
  },
  created() {
      this.getBranchlists();
      this.getStorePowerLists();
  },
  mounted() {}
};
</script>

