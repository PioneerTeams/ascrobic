<template>
  <el-pagination
    class="pagesye"
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="currentpages"
  />
</template>
<script>
export default {
  props: ['total','currentpage'],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
      currentpages(val){
          this.$emit('currentpage',val)
      }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="">
</style>