<template>
  <div>
    <div class="markdown-container">
      <div class="top-content">
        <div class="top-title">
          <h3>店铺订单</h3>
        </div>
        <div class="top-bottom">
          <div class="batch-btn">
            <i class="iconfont icon-download" />
            批量导出
          </div>
          <div class="batch-btn">
            <i class="iconfont icon-ziyuan" />
            查看已生成报表
          </div>
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
            v-for="(item,index) in navList"
            :key="item.id"
            class="nav-item"
            :index="item.id"
            @click="()=>changeTab(index)"
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
                      :label="v.name"
                      :value="v.name"
                    />

                    <el-option
                      v-for="(v, k) in floor.length&&floor"
                      v-show="value.name=='floor'"
                      :key="k"
                      :label="v.name"
                      :value="v.name"
                    />

                    <el-option-group
                      v-for="(v, k) in store.length&&store"
                      v-show="value.name=='store'"
                      :key="k"
                      :label="v.title"
                      :value="v.title"
                    >
                      <el-option
                        v-for="item in v.children"
                        :key="item.value"
                        :label="item.title"
                        :value="item.title"
                      />
                    </el-option-group>
                  </component>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="form-btns">
              <div class="form-btns-left" />
              <div class="form-btns-right">
                <el-button type="primary" @click="submit">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-table :data="subOrderList" style="width: 100%">
            <el-table-column prop="sub_number" label="店铺订单编号" width="248" />
            <el-table-column prop="created_at_str" label="下单时间" sortable width="196" />
            <el-table-column prop="vm_store_name" label="店铺" width="114" />
            <el-table-column prop="customer_name" label="顾客" width="88" />
            <el-table-column prop="order_type" label="订单类型" width="95" />
            <el-table-column prop="return_status_str" label="售后" width="95" />
            <el-table-column prop="stock_source_str" label="货源类型" width="95" />
            <el-table-column prop="status_str" label="订单状态" width="108" />
            <el-table-column prop="pay_amount" label="实付金额" width="95" />
            <el-table-column fixed="right" label="操作" width="66">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="100"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
      activeIndex: '1',
      activeIndex2: '1',
      floor: [],
      store: [],
      subOrderList: [],
      navList: [
        {
          title: '全部',
          id: '1'
        },
        {
          title: '代付款',
          id: '2'
        },
        {
          title: '代发货',
          id: '3'
        },
        {
          title: '代收货',
          id: '4'
        },
        {
          title: '已完成',
          id: '5'
        }
      ],
      form: {
        shopOrderNumber: '',
        name: '',
        tel: '',
        orderType: '',
        orderNumber: '',
        sourceType: '',
        floor: '',
        store: '',
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
                name: '全部'
              },
              {
                name: '线上pos'
              },
              {
                name: '电商订单'
              },
              {
                name: '电子卡券'
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
            is: 'el-select',
            options: [
              {
                name: '全部'
              },
              {
                name: '总仓'
              },
              {
                name: '店仓'
              }
            ]
          },
          {
            label: '楼层',
            name: 'floor',
            placeholder: '楼层',
            is: 'el-select'
          },
          {
            label: '店铺',
            name: 'store',
            placeholder: '店铺',
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
  watch: {
    floor(val) {
      this.floor = val
    }
  },
  mounted() {},
  created() {
    this.getOrderSearch()
    this.getSubOrder()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath, 'l')
    },
    changeTab(index) {
      this.getOrderSearch(index)
    },
    submit() {
      console.log(this.form, 'this.form')
    },
    handleClick(row) {
      console.log(row)
    },
    reset() {},
    async getOrderSearch(index = 0) {
      const data = {
        org_id: 61500,
        org_type: 5,
        status: index
      }
      const result = await request({
        url: '/order/get-order-search',
        baseURL: '/api',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      })
      this.floor = result.data.floor
      this.store = result.data.store
      // console.log(result, "lllll");
      return result
    },
    async getSubOrder(index = 0) {
      const data = {
        org_id: 61500,
        page: 1,
        org_type: 5,
        status: index
      }
      const result = await request({
        url: '/order/get-sub-order-list',
        baseURL: '/api',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      })
      console.log(result, 'lllll')
      if (result.code === 200) {
        this.subOrderList = result.data.list
      }
      return result
    }
  }
}
</script>
<style>
@import url("./scss/markdown/markdown.css");
@import url("//at.alicdn.com/t/font_1457873_jhcbgikojs.css");
</style>
