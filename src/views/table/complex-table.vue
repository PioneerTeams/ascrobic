<template>
  <div class="complex-table">
    <div class="complex-top">
      <span>维他命商城后台</span>
      <span>&gt;</span>
      <span>商品</span>
      <span>&gt;</span>
      <span>商品分组</span>
    </div>
    <div class="complex-content">
      <div class="complex-con-top">
           <h3>商品分组</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  components: {  },
  directives: {  },

  data() {
    return {
      listLoading: true,  
    }
  },
  created() {
    
  },
  methods: {
  }
}
</script>

<style>
@import url("./scss/complex/index.css");
</style>
