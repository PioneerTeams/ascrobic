<template>
    <div class="table-content">
        <div class="btn-add">+</div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            @cell-click="columnChange">
            <el-table-column type="selection">
            </el-table-column>
             <el-table-column type="expand" ref="cell">
                <template>
                    <el-table :data="tableColumn" style="width: 100%">
                        <el-table-column prop="image" label="缩略图">
                            <template slot-scope="scope">            
                                <img :src="scope.row.image" class="img" alt=""/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="颜色">
                        </el-table-column>
                        <el-table-column prop="code" label="SKU编码">
                        </el-table-column>
                        <el-table-column prop="price" label="原价">
                        </el-table-column>
                        <el-table-column prop="discount_price" label="促销价">
                        </el-table-column>
                        <el-table-column prop="stock" label="电商库存">
                        </el-table-column>
                        <el-table-column prop="bar_code" label="条形码">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="主图">
                <template slot-scope="scope">            
                   <img :src="scope.row.image" class="img" alt=""/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="price" label="品牌价">
            </el-table-column>
            <el-table-column prop="stock" label="库存">
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
                  @click="handleDelete(scope.$index, scope.row)">查询
                  </el-button>
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
            :total="count"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
    </div>
</template>

<script>
    import { tableList, tableChild } from '@/api/commodity'
    export default {
        props:{
            activeName:Number
        },
        data() {
            return {
                tableColumn:[],
                tableData: [],
                num:4,
                count:0,
                page:1,
                storeId:0
            }
        },
        mounted() {
            this.getTable(this.num,this.page)
        },
        methods: {
            // 初始化表格数据
            getTable(num,page){
                tableList(num,page).then(res=>{
                    this.count=res.data.pagination.count
                    this.tableData=res.data.list
                    const stock=res.data.list.map(item=>item.sku_stock_num)
                    const num=res.data.list.map(item=>item.sku_nums)
                    this.tableData.map((item,i)=>item.stock=`${num[i]}个SKU${stock[i]}个库存`)
                })
            },
            // 子表格的数据
            columnChange(row, column, cell, event){
                tableChild(row.vm_store_id,this.num,row.vm_store_product_id).then(res=>{
                    this.tableColumn=res.data.sku_list
                })
            },
            // 获得页码
            handleCurrentChange(val) {
                this.page=val
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$router.history.push({
                    name:'look',
                    query:{
                        id:row.id,
                        vm_store_product_id:row.vm_store_product_id,
                        status:this.num
                    }
                })
            }
        },
        watch: {
            activeName(num){
                this.num=num
                this.getTable(num,this.page)
            },
            page(size){
                this.getTable(this.num,size)
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
            .img{
                width: 48px;
                height: 64px;
                background-size: 100% 100%;
            }
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