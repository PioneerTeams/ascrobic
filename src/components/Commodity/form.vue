<template>
  <div class="card-group">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="90px">
      <el-form-item label="款号:">
        <el-input v-model="formInline.prod_code" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="商品名称:">
        <el-input v-model="formInline.prod_name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="分类:">
        <el-select v-model="formInline.category_id" filterable placeholder="请选择">
          <el-option-group
            v-for="group in formSelect.category"
            :key="group.id"
            :label="group.title"
          >
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.title"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌:">
        <el-select v-model="formInline.brand_id" placeholder="请选择">
          <el-option
            v-for="item in formSelect.brand"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品来源:">
        <el-select v-model="formInline.prod_src" placeholder="请选择">
          <el-option
            v-for="item in formSelect.source"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型:">
        <el-select v-model="formInline.prod_type" placeholder="请选择">
          <el-option
            v-for="item in formSelect.product_type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配送方式:">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option
            v-for="item in formSelect.delivery"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="店铺:">
        <el-select v-model="formInline.vm_store_id" placeholder="请选择">
          <el-option-group v-for="group in formSelect.store" :key="group.id" :label="group.title">
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.title"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="activeName==3||activeName==1||activeName==4"
        :label="activeName==4?'上架时间:':(activeName==1?'提交时间:':(activeName==3?'审核时间:':''))"
      >
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item v-show="activeName==5" label="下架原因:">
        <el-select v-model="formInline.down_reason" placeholder="请选择">
          <el-option
            v-for="item in formSelect.down_reason"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="activeName==5" label="供货商状态:">
        <el-select v-model="formInline.retailer_status" placeholder="请选择">
          <el-option
            v-for="item in formSelect.retailer_status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="last-formItem">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('formInline')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { manageList, tableList } from '@/api/commodity'

export default {
  props: {
    activeName: Number
  },
  data() {
    return {
      formSelect: {},
      formInline: {
        prod_code: '',
        prod_name: '',
        category_id: '',
        brand_id: '',
        prod_src: '',
        prod_type: '',
        type: '',
        vm_store_id: '',
        putaway: '',
        date: [],
        down_reason: '',
        retailer_status: '',
        up_time: [],
        submit_time: [],
        audit_time: []
      },
      num: 4
    }
  },
  computed: {
    ...mapState('commodity', ['list'])
  },
  created() {
    this.getFormTable(this.formInline)
  },
  mounted() {
    this.getlist(this.activeName)
  },
  methods: {
    ...mapMutations('commodity', ['setForm']),
    ...mapActions('commodity', ['getFormTable']),
    getlist(num) {
      manageList(num).then(res => {
        this.formSelect = res.data
      })
    },
    onSubmit() {
      const arr = []
      const brr = []
      arr.push(this.formInline.type)
      this.formInline.delivery_type = arr
      const start = new Date(this.formInline.date[0])
        .toLocaleDateString()
        .replace(/\//g, '-')
      const end = new Date(this.formInline.date[1])
        .toLocaleDateString()
        .replace(/\//g, '-')
      if (this.formInline.date.length) {
        brr.push(start, end)
      }

      if (this.num === 4) {
        this.formInline.up_time = brr
      } else if (this.num === 1) {
        this.formInline.submit_time = brr
      } else if (this.num === 3) {
        this.formInline.audit_time = brr
      }
      this.setForm(this.formInline)
      this.getFormTable(this.formInline)
    },
    resetForm(formName) {
      const arr = Object.keys(this.formInline)
      arr.forEach(item => {
        this.formInline[item] = ''
      })
    }
  },
  watch: {
    activeName(num) {
      this.num = num
      this.getlist(num)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-group {
  padding: 24px;
  border-bottom: 1px solid #e8e8e8;
  .el-input {
    width: 250px;
  }
  .el-date-editor {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
  .last-formItem {
    display: block;
    text-align: right;
  }
  .el-button--primary {
    background: #3ec6b6;
    border: 1px solid #3ec6b6;
  }
}
</style>
