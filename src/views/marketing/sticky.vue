<template>
  <div class="sticky">
    <div class="sticky-top">
      <span>维他命商城后台</span>
      <span>&gt;</span>
      <span>营销</span>
      <span>&gt;</span>
      <span>店内促销</span>
    </div>
    <div class="sticky-content">
      <div class="sticky-con-top">
        <h3 class="sticky-title">店内促销</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row v-for="(item, index) in formList" :key="index" type="flex">
            <el-col v-for="(value, key) in item" :key="key" :span="10" class="form-item">
              <el-form-item :label="value.label" class="form-label">
                <component
                  :is="value.is"
                  v-model="form[value.name]"
                  :type="value.type"
                  :range-separator="value.swparator"
                  :start-placeholder="value.alery"
                  :end-placeholder="value.last"
                  :options="value.options"
                  :placeholder="value.placeholder"
                  :range.sync="form[value.name]"
                >
                  <!-- <! 根据value.is判断渲染Ipt组件还是select组件 ---->
                  <el-option v-for="(v, k) in value.options" :key="k" :label="v.name" :value="v.value" />
                  <!-- <! 渲染下拉框的每一项 ---->
                </component>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" class="search" @click="submit">查询</el-button>
            <el-button type="primary" class="rest-info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { mapActions } from 'vuex'
export default {
  name: 'StickyDemo',
  components: { Sticky },
  data() {
    return {
      form: {
        shopName: '',
        building: '',
        cateGory: '',
        Type: '',
        startTime: '',
        endTime: ''
      },
      formList: [
        [{
          label: '店铺名',
          name: 'shopName',
          placeholder: '请输入店铺名称',
          is: 'el-input'
        },
        {
          label: '楼层',
          name: 'building',
          placeholder: '请输入店铺名称',
          is: 'el-select',
          options: [
            {
              name: 'F1',
              value: 0
            }
          ]
        }, {
          label: '分类',
          name: 'cateGory',
          placeholder: '请选择',
          is: 'el-cascader',
          options: [
            {
              label: 'F1',
              value: 0,
              children: [
                {
                  label: '化妆品'
                }
              ]
            }
          ]
        }, {
          label: '状态',
          name: 'Type',
          placeholder: '请选择',
          is: 'el-select',
          options: [
            {
              name: 'F1',
              value: 0
            }
          ]
        }, {
          label: '开始时间',
          name: 'startTime',
          septarator: '~',
          type: ' daterange',
          alery: '最早开始时间',
          last: '最晚开始时间',
          is: 'el-date-picker'
        }, {
          label: '结束时间',
          name: 'endTime',
          septarator: '~',
          type: ' daterange',
          alery: '最早结束时间',
          last: '最晚结束时间',
          is: 'el-date-picker'
        }]
      ]
    }
  },
  methods: {
    ...mapActions('sticky', ['getFloorList'])
  },
  mounted() {
    this.getFloorList()
  }
}
</script>

<style >
@import url("./scss/sticky/index.css");
.el-row{
  display: flex;
  flex-wrap: wrap;
}
.form-item{
  width: 40%;
}
.search{
    display: inline-block;
    background: #3ec6b6;
    border: 1px solid #3ec6b6;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    width: 60px;
    height: 35px;
    padding: 6px 15px;
}

.rest-info{
  display: inline-block;
  color: #3c3c3c;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  background: white;
  width: 60px;
  height: 35px;
  padding: 6px 15px;
}
</style>
