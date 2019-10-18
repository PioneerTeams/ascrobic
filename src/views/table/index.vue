<template>
  <div class="app-container">
      <div class="manger">
          <h3>商品管理</h3>
          <div class="options-active">
              <div class="batch-btn">
                <i class="el-icon-download"></i>批量上传
              </div>
              <div class="batch-btn">
                <i class="el-icon-download"></i>批量导出
              </div>
              <div class="batch-btn">
                <i class="el-icon-document-delete"></i>查看已生成报表
              </div>
          </div>
      </div>
      <div class="tab-form">
          <div class="nav-selected">
            <div v-for="item in navSelect" :class="{'navActive':activeName==item.status}" :key="item.status" @click="handleClick(item.status)">{{item.label}}</div>
          </div>
          <CommodityForm :activeName="activeName" :show="show"/>
      </div>
      <CommodityTable :show="show" :activeName="activeName" :tableData="tableData" :count="count"/>
  </div>
</template>

<script>
import { tableList } from '@/api/commodity'
import CommodityForm from '@/components/Commodity/form'
import CommodityTable from '@/components/Commodity/table'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DynamicTable',
  data() {
    return {
      navSelect:[{
        status:4,
        label:'销售中'
      },{
        status:5,
        label:'仓库中'
      },{
        status:2,
        label:'草稿箱'
      },{
        status:1,
        label:'待审核'
      },{
        status:3,
        label:'未通过审核'
      }],
      activeName: 4,
      tableData: [],
      count:0,
      show:true,
    }
  },
  computed: {
    ...mapState('commodity',['page','list'])
  },
  components: { CommodityForm, CommodityTable },
  mounted() {
    this.getTable()
    this.setActive(this.activeName)
  },
  methods: {
    ...mapMutations('commodity',['setActive','setPage']),
    handleClick(tab) {
      this.activeName=tab
      this.getTable()
      this.setActive(tab)
    },
    // 初始化表格数据
    getTable(){
        tableList(this.activeName,this.page).then(res=>{
            this.count=res.data.pagination.count
            this.tableData=res.data.list
            const stock=res.data.list.map(item=>item.sku_stock_num)
            const num=res.data.list.map(item=>item.sku_nums)
            this.tableData.map((item,i)=>item.store_stock=`${num[i]}个SKU${stock[i]}个库存`)
        })
    },
  },
  watch: {
    page(size){
        this.getTable(this.num,size)
    },
    list(list){
        this.tableData=list.list
        const stock=list.list.map(item=>item.sku_stock_num)
        const num=list.list.map(item=>item.sku_nums)
        this.tableData.map((item,i)=>item.stock=`${num[i]}个SKU${stock[i]}个库存`)
        this.count=list.pagination.count
    }
  },
}
</script>

<style lang="scss" scoped>
  .app-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 24px;
    background-color: #fcfcfc;
  }
  .manger{
    background-color: #fff;
    padding: 24px;
    h3{
        padding-bottom: 24px;      
    }
    .options-active{
        font-size: 14px;
        .batch-btn{
          display: inline-block;
          margin-right: 24px;
          i{
              margin-right: 10px;
              font-size: 16px;
          }
        }
    }
  }
  .tab-form{
    margin-top: 24px;
    padding-top: 24px;
    background-color: #fff;
    .nav-selected{
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      div{
        display: inline-block;
        box-sizing: content-box;
        padding: 5px 5px 10px;
        margin: 0 24px;
        border-bottom: 2px solid transparent;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #595959;
        text-align: center;
        line-height: 22px;
        cursor: pointer;
      }
      .navActive{
        color: #3ec6b6;
        border-bottom: 2px solid #3ec6b6;
      }
    }
    .nav-selected /deep/ .el-tabs__active-bar{
      background-color: #3ec6b6;
    }
    .nav-selected /deep/ .el-tabs__item.is-active {
      color: #3ec6b6;
    }
    .nav-selected /deep/ .el-tabs__item:hover{
      color: #3ec6b6;
    }
  }
</style>