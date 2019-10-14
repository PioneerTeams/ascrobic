<template>
  <div class="mangeTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(ele,index) in list" :key="index" :prop="ele.prop" :label="ele.label" />
      <el-table-column prop="address" label="操作" width="120">
        <el-button type="text" size="small">查看</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    tableData: Array,
    list: Array
  },
  data() {
    return {}
  },
  computed: {},
  created() { console.log(this.list, '------list ') },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
</style>
