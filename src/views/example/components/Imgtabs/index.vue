<template>
  <div class="mangeTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="img" label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="img" alt>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(ele,index) in list"
        :key="index"
        :prop="ele.prop?ele.prop:'无'"
        :label="ele.label"
      />
      <el-table-column label="操作" width="120">
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
    list: {
      defaultValue: [],
      type: Array
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      if (event.label === '操作') {
        const id = tab.id
        this.$router.push({ name: 'pageDetails', query: { id }})
      }
    }
  }
}
</script>
<style scoped lang="scss">
.mangeTable {
  margin-top: 24px;
  padding: 24px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
}
.img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
