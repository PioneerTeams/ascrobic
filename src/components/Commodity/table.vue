<template>
    <div class="table-content">
        <div class="btn-add">+</div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="image" label="主图" type="selection">
                <!-- <img v-for="item in tableData" :key="item.id" :src="item.image" alt=""> -->
            </el-table-column>
            <el-table-column prop="name" label="商品名称" >
            </el-table-column>
            <el-table-column prop="price" label="品牌价">
            </el-table-column>
            <el-table-column prop="sku_stock_num" label="库存">
            </el-table-column>
            <el-table-column prop="category_name" label="分类">
            </el-table-column>
            <el-table-column prop="brand_name" label="品牌">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
    </div>
</template>

<script>
    import { tableList } from '@/api/commodity'
    export default {
        data() {
            return {
                tableData: [{
                    id:1,
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    operate:''
                }, {
                    id:2,
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    id:3,
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
                    id:4,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    id:5,
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    id:6,
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    id:7,
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
            this.getList()
        },
        methods: {
            getList(){
                tableList().then(res=>{
                    this.tableData=res.data.list
                    const stock=res.data.list.map(item=>item.sku_stock_num)
                    const num=res.data.list.map(item=>item.sku_nums)
                    // this.tableData.map(item=>item.stock:`${num}个SKU${stock}个库存`)
                    console.log(this.tableData)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
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
        .el-button--danger{
            color: #fff;
            background-color: #3ec6b6;
            border-color: #3ec6b6;
        }
    }
</style>