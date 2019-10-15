<template>
  <div class="app-container">
    <div class="manger">
      <h3>商品管理</h3>
      <div class="options-active">
        <div class="batch-btn">
          <i class="el-icon-download" />批量上传
        </div>
        <div class="batch-btn">
          <i class="el-icon-download" />批量导出
        </div>
        <div class="batch-btn">
          <i class="el-icon-document-delete" />查看已生成报表
        </div>
      </div>
    </div>
    <div class="tab-form">
      <div class="nav-selected">
        <span class="nav-active">销售中</span>
        <span>仓库中</span>
        <span>草稿箱</span>
        <span>待审核</span>
        <span>未通过审核</span>
      </div>
      <div class="card-group">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
          <el-form-item label="款号:">
            <el-input v-model="formInline.styleNum" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="商品名称:">
            <el-input v-model="formInline.shopName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="分类:">
            <el-select v-model="formInline.list" filterable placeholder="请选择">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:">
            <el-select v-model="formInline.brand" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品来源:">
            <el-select v-model="formInline.source" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-select v-model="formInline.types" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="配送方式:">
            <el-select v-model="formInline.dispatching" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="店铺:">
            <el-select v-model="formInline.store" placeholder="请选择">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="上架时间:">
            <el-date-picker
              v-model="formInline.value"
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
    <div class="table-content">
      <div class="btn-add">+</div>
      <div class="table-wrap">
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="date" label="主图" type="selection" />
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="province" label="品牌价" />
          <el-table-column prop="city" label="库存" />
          <el-table-column prop="address" label="分类" />
          <el-table-column prop="zip" label="品牌" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="1000"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { manageList } from '@/api/commodity'

export default {
  name: 'DynamicTable',
  data() {
    return {
      activeName: 'first',
      formSelect:{},
      formInline: {
        styleNum: '',
        shopName: '',
        list: '',
        brand: '',
        source: '',
        types: '',
        dispatching: '',
        store: '',
        putaway: '',
        value: ''
      },
      options: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }, {
        label: '',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }]
      }],
      tableData: [{
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        operate: ''
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        children: [{
          id: 31,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 5,
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 7,
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist(){
      manageList().then(res=>{
        this.formSelect=res.data
        console.log(this.formSelect)
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
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
    padding: 24px;
    background-color: #fff;
    // .nav-selected{
    //   border-bottom: 1px solid #e8e8e8;
    //   span{
    //     display: inline-block;
    //     box-sizing: content-box;
    //     padding: 5px 5px 10px;
    //     margin: 0 24px;
    //     font-size: 14px;
    //     text-align: center;
    //     line-height: 22px;
    //     cursor: pointer;
    //   }
    //   .nav-active{
    //     color: #3ec6b6;
    //     border-bottom: 2px solid #3ec6b6;
    //   }
    // }

    .nav-selected /deep/ .el-tabs__active-bar{
      background-color: #3ec6b6;
    }
    .nav-selected /deep/ .el-tabs__item.is-active {
      color: #3ec6b6;
    }
    .nav-selected /deep/ .el-tabs__item:hover{
      color: #3ec6b6;
    }
    .card-group{
      padding: 24px;
      border-bottom: 1px solid #e8e8e8;
      .el-input{
       width: 250px;
      }
      .el-date-editor{
        width: 250px;
      }
      .el-select{
        width: 250px;
      }
      .last-formItem{
        display: block;
        text-align: right;
      }
      .el-button--primary{
        background: #3ec6b6;
        border: 1px solid #3ec6b6;
      }
    }
  }
  .table-content{
    margin-top: 24px;
    padding: 24px;
    background-color: #fff;
    .btn-add{
      width: 34px;
      height: 34px;
      background: #3ec6b6;
      border-radius: 50%;
      color: #fff;
      font-size: 30px;
      margin-bottom: 24px;
      text-align: center;
      line-height: 34px;
      font-weight: 200;
      cursor: pointer;
    }
    .table-wrap{
      margin: 24px 0;
    }
    .paging{
      float: right;
    }
  }
</style>
