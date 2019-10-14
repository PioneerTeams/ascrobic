<template>
  <div>
    <div class="markdown-container">
      <div class="top-content">
        <div class="top-title">
          <h3>退款管理</h3>
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
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      navList: [
        {
          title: '全部',
          id: '1'
        },
        {
          title: '待商家处理',
          id: '2'
        },
        {
          title: '待买家处理',
          id: '3'
        },
        {
          title: '待审核',
          id: '4'
        },
        {
          title: '待财务确认',
          id: '5'
        },
        {
          title: '退款成功',
          id: '6'
        },
        {
          title: '退款关闭',
          id: '7'
        }
      ],
      form: {
        cancellationNumber: '',
        name: '',
        tel: '',
        orderNumber: '',
        shopOrderNumber: '',
        brand: '',
        goodsNumber: '',
        goodsName: '',
        applicationTime: '',
        cancellationTime: ''
      },
      forms: [
        [
          {
            label: '退单号',
            name: 'cancellationNumber',
            placeholder: '退单号',
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
            label: '订单号',
            name: 'orderNumber',
            placeholder: '订单编号',
            is: 'el-input'
          },
          {
            label: '店铺订单号',
            name: 'shopOrderNumber',
            placeholder: '店铺订单号',
            is: 'el-input'
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
            label: '申请时间',
            name: 'applicationTime',
            placeholder: '下单时间',
            is: 'el-date-picker',
            type: 'monthrange',
            rangeSeparator: '～',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
          },
          {
            label: '退款时间',
            name: 'cancellationTime',
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
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath, 'l')
    },
    submit() {
      console.log(this.form, 'this.form')
    },
    reset() {

    }
  }
}
</script>
<style>
@import url("./scss/markdown/markdown.css");
</style>
