<template>
  <div>
    <div class="markdown-container">
      <div class="top-content">
        <div class="top-title">
          <h3>店铺订单</h3>
        </div>
        <div class="top-bottom">
          <div class="batch-btn">批量导出</div>
          <div class="batch-btn">查看已生成报表</div>
        </div>
      </div>
      <div class="bottom-content">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#3ec6b6"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item) in navList"
            :key="item.id"
            class="nav-item"
            :index="item.id"
          >{{ item.title }}</el-menu-item>
        </el-menu>
        <div class="bottom-form">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row
              v-for="(item, index) in forms"
              :key="index"
              type="flex"
              style="display:flex;flex-wrap:wrap"
            >
              <el-col
                v-for="(value, key) in item"
                :key="key"
                :span="6"
                class="form-item"
                style="width:30%"
              >
                <el-form-item :label="value.label" class="form-label" style="width:auto">
                  <component
                    :is="value.is"
                    v-model="form[value.name]"
                    :placeholder="value.placeholder"
                    :range.sync="form[value.name]"
                    :type="value.type"
                    :range-separator="value.rangeSeparator"
                    :start-placeholder="value.startPlaceholder"
                    :end-placeholder="value.endPlaceholder"
                  >
                    <el-option
                      v-for="(v, k) in value.options"
                      :key="k"
                      :label="v.label"
                      :value="v.value"
                    />
                  </component>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submit">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'querystring'
import request from '@/utils/request'
export default {
  data() {
    return {
      activeIndex: 1,
      activeIndex2: 1,
      navList: [
        {
          title: '全部',
          id: 1
        },
        {
          title: '代付款',
          id: 2
        },
        {
          title: '代发货',
          id: 3
        },
        {
          title: '代收货',
          id: 4
        },
        {
          title: '已完成',
          id: 5
        }
      ],
      form: {
        shopOrderNumber: '',
        name: '',
        tel: '',
        orderType: '',
        orderNumber: '',
        sourceType: '',
        brand: '',
        goodsNumber: '',
        goodsName: '',
        orderTime: '',
        paymentTime: ''
      },
      forms: [
        [
          {
            label: '店铺订单编号',
            name: 'shopOrderNumber',
            placeholder: '店铺订单编号',
            is: 'el-input'
          },
          {
            label: '姓名',
            name: 'name',
            placeholder: '姓名',
            is: 'el-input'
          },
          {
            label: '手机号',
            name: 'tel',
            placeholder: '手机号',
            is: 'el-input'
          },
          {
            label: '订单类型',
            name: 'orderType',
            placeholder: '订单类型',
            is: 'el-select',
            options: [
              {
                label: '1',
                value: '1'
              }
            ]
          },
          {
            label: '订单编号',
            name: 'orderNumber',
            placeholder: '订单编号',
            is: 'el-input'
          },
          {
            label: '货源类型',
            name: 'sourceType',
            placeholder: '货源类型',
            is: 'el-select'
          },
          {
            label: '品牌',
            name: 'brand',
            placeholder: '品牌',
            is: 'el-select'
          },
          {
            label: '商品款号',
            name: 'goodsNumber',
            placeholder: '商品款号',
            is: 'el-input'
          },
          {
            label: '商品名称',
            name: 'goodsName',
            placeholder: '商品名称',
            is: 'el-input'
          },
          {
            label: '下单时间',
            name: 'orderTime',
            placeholder: '下单时间',
            is: 'el-date-picker',
            type: 'monthrange',
            rangeSeparator: '～',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
          },
          {
            label: '支付时间',
            name: 'paymentTime',
            placeholder: '支付时间',
            is: 'el-date-picker',
            type: 'monthrange',
            rangeSeparator: '～',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
          }
        ]
      ]
    }
  },
  mounted() {
    this.getSubList()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath, 'l')
    },
    submit() {
      console.log(this.form, 'this.form')
    },
    async getSubList() {
      const data = {
        org_id: 61500,
        org_type: 5,
        status: ''
      }
      const result = await request({
        url: '/order/get-order-search',
        baseURL: '/api',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      })
      console.log(result, 'pppppp')
      return result
    }
  }
}
</script>
<style>
@import url("./scss/markdown/markdown.css");
</style>
