<template>
  <div class="app-container">
    <div class="manger">
      <h3>商品管理</h3>
      <div class="options-active">
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
        <div
          v-for="item in navSelect"
          :class="{'navActive':activeName==item.type}"
          :key="item.type"
          @click="handleClick(item.type)"
        >{{item.label}}</div>
      </div>
      <div class="card-group">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px">
          <el-form-item label="手机号:">
            <el-input v-model="formInline.mobile" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="formInline.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input v-model="formInline.nickname" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="会员卡号:">
            <el-input v-model="formInline.cid" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="会员等级:">
            <el-select v-model="formInline.grade_code" filterable placeholder="请选择">
              <el-option
                v-for="item in category"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="总购买次数:">
              <div class="num">
                <el-input v-model="formInline.buy_times_min" placeholder="最小值" />
                -
                <el-input v-model="formInline.buy_times_max" placeholder="最大值" />
              </div>
          </el-form-item>
          <el-form-item label="客单价:">
              <div class="num">
                <el-input v-model="formInline.price_min" placeholder="最小值" />
                -
                <el-input v-model="formInline.price_max" placeholder="最大值" />
              </div>
          </el-form-item>
        <el-form-item label="最近消费时间:">
            <el-date-picker
              v-model="lately"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="成为有效顾客:">
            <el-date-picker
              v-model="sucess"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item class="last-formItem">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <CommodityTable :tableData="tableData" :list="tableHead" class="mangeTable"/>
    <div class="paging">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { tableList, searchSet, memberList } from "@/api/commodity";
import CommodityForm from "@/components/Commodity/form";
import CommodityTable from "@/components/phorManger";
import tableHead from './table'

export default {
  name: "ExportZip",
  data() {
    return {
      tableHead,
      navSelect: [
        {
          type: 1,
          label: "有效顾客"
        },
        {
          type: 2,
          label: "潜在客户"
        }
      ],
      lately:'',
      sucess:'',
      category:[],
      activeName: 1,
      tableData: [],
      count: 0,
      page:1,
      formInline:{
        mobile: '',
        name: '',
        nickname: '',
        cid: '',
        grade_code: '',
        buy_times_min: '',
        buy_times_max: '',
        price_min: '',
        price_max: '',
        lately_consume_time_start: '',
        lately_consume_time_end: '',
        first_consume_time_start: '',
        first_consume_time_end: '',
      }
    };
  },
  components: { CommodityForm, CommodityTable },
  mounted() {
    this.getTable();
    this.getform()
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab;
      this.getTable();
    },
    async getform(){
        const arr = await searchSet()
        for( let k in arr.data.grade_level){
          const obj={}
          obj.key=k
          obj.value=arr.data.grade_level[k]
          this.category.push(obj)
        }
    },
    // 初始化表格数据
    async getTable() {
        const result = await memberList(this.activeName,this.page,this.formInline)
        this.tableData=result.data.list
        this.count=result.data.pagination.totalCount
    },
    onSubmit() {
      this.formInline.lately_consume_time_start = new Date(this.lately[0]).toLocaleDateString().replace(/\//g, '-')
      this.formInline.lately_consume_time_end = new Date(this.lately[1]).toLocaleDateString().replace(/\//g, '-')
      this.formInline.first_consume_time_start = new Date(this.sucess[0]).toLocaleDateString().replace(/\//g, '-')
      this.formInline.first_consume_time_end = new Date(this.sucess[1]).toLocaleDateString().replace(/\//g, '-')
      
      this.getTable(this.activeName,this.page,this.formInline)
    },
    resetForm(formName) {
      const arr = Object.keys(this.formInline)
      arr.forEach(item => {
        this.formInline[item] = ''
      })
    },
    handleCurrentChange(val) {
        this.page=val
        this.getTable(this.activeName, val, this.formInline);
    },
  },
  watch: {
    // page(size) {
    //   this.getTable(this.activeName, size, this.formInline);
    // },
    // list(list) {
    //   this.tableData = list.list;
    //   const stock = list.list.map(item => item.sku_stock_num);
    //   const num = list.list.map(item => item.sku_nums);
    //   this.tableData.map(
    //     (item, i) => (item.stock = `${num[i]}个SKU${stock[i]}个库存`)
    //   );
    //   this.count = list.pagination.count;
    // }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 24px;
  background-color: #fcfcfc;
}
.manger {
  background-color: #fff;
  padding: 24px;
  h3 {
    padding-bottom: 24px;
  }
  .options-active {
    font-size: 14px;
    .batch-btn {
      display: inline-block;
      margin-right: 24px;
      i {
        margin-right: 10px;
        font-size: 16px;
      }
    }
  }
}
.tab-form {
  margin-top: 24px;
  padding-top: 24px;
  background-color: #fff;
  .nav-selected {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    div {
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
    .navActive {
      color: #3ec6b6;
      border-bottom: 2px solid #3ec6b6;
    }
  }
  .nav-selected /deep/ .el-tabs__active-bar {
    background-color: #3ec6b6;
  }
  .nav-selected /deep/ .el-tabs__item.is-active {
    color: #3ec6b6;
  }
  .nav-selected /deep/ .el-tabs__item:hover {
    color: #3ec6b6;
  }
}
.card-group {
  padding: 24px;
  border-bottom: 1px solid #e8e8e8;
  .el-input {
    width: 250px;
  }
  .el-date-editor {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
  .last-formItem {
    display: block;
    text-align: right;
  }
  .el-button--primary {
    background: #3ec6b6;
    border: 1px solid #3ec6b6;
  }
  .num{
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.mangeTable {
  margin-top: 24px;
  padding: 24px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
}
.paging{
    float: right;
}
</style>