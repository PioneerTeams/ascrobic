<template>
  <div>markdowndetail

  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MarkdownDetail',
  data() {
    return {
      dataList: {}
    }
  },
  methods: {
    ...mapActions('order', ['subOrderInfoAction']),
    async getSubOrderInfo() {
      const data = await this.subOrderInfoAction({ sub_order_number: this.$route.params.sub_order_number })
      this.dataList = data
      console.log(data, 'alskdlaksdlkaldsk')
    }
  },
  created() {
    this.getSubOrderInfo()
  },
  mounted() {

  }
}
</script>
