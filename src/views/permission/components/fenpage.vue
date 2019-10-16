<template>
  <el-pagination
    class="pagesye"
    background
    layout="prev, pager, next"
    :total="totals"
    @current-change="currentpages"
  />
</template>
<script>
export default {
  components: {},
  props: {
    totals: {
      type: Number,
      default: 10
    },
    currentpage: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    currentpages(val) {
      this.$emit('currentpage', val)
    }
  }
}
</script>
<style scoped lang="">
</style>
