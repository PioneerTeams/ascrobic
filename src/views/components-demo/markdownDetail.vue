<template>
  <div>
    <div class="markdown-container">
      <div class="top-content">
        <div class="top-title">
          <h3>待收货</h3>
        </div>
        <div class="top-bottom">
          <div class="batch-btn">
            店铺订单编号：{{ sub_order_number }}
          </div>
          <div class="batch-btn">
            下单时间：
          </div>
        </div>
      </div>
      <div class="bottom-content" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MarkdownDetail',
  data() {
    return {
      dataList: {},
      sub_order_number: this.$route.params.sub_order_number
    }
  },
  methods: {
    ...mapActions('order', ['subOrderInfoAction']),
    async getSubOrderInfo() {
      const data = await this.subOrderInfoAction({
        sub_order_number: this.$route.params.sub_order_number
      })
      this.dataList = data
      console.log(data, 'alskdlaksdlkaldsk')
    }
  },
  created() {
    this.getSubOrderInfo()
  },
  mounted() {}
}
</script>
<style >
@import url("./scss/markdown/markdown.css");
@import url("//at.alicdn.com/t/font_1457873_jhcbgikojs.css");
</style>
