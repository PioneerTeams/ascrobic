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
             <el-table-column type="expand" ref="cell" v-if="show">
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
            <el-table-column prop="image" label="主图" v-if="show">
                <template slot-scope="scope">            
                   <img :src="scope.row.image" class="img" alt=""/>
                </template>
            </el-table-column>
            <el-table-column prop="image_url" label="主图" v-else>
                <template slot-scope="scop">  
                   <img :src="scop.row.image_url" class="img" alt=""/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" v-if="show"/>
            <el-table-column prop="product_code" label="商品款号" v-else/>
            <el-table-column prop="price" label="品牌价" v-if="show"/>
            <el-table-column prop="sku_code" label="SKU编码" v-if="show"/>
            <el-table-column prop="stock" label="库存" v-if="show"/>
            <el-table-column prop="brand_name" label="品牌" v-else/>
            <el-table-column prop="category_name" label="分类" v-if="show"/>
            <el-table-column prop="category_name" label="商品规格"/>
            <el-table-column prop="brand_name" label="品牌" v-if="show"/>
            <el-table-column prop="stock" label="电商库存" v-else/>
            <el-table-column prop="vm_store_name" label="门店" v-if="show==false"/>
            <el-table-column label="操作">
              <template slot-scope="scope" v-if="show">
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
  </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import { tableList, tableChild } from '@/api/commodity'
    export default {
        props:{
            activeName:Number,
            tableData:Array,
            count:Number,
            show:Boolean
        },
        data() {
            return {
                tableColumn:[],
                num:4,
                page:1,
                storeId:0
            }
        },
        methods: {
            ...mapMutations('commodity',['setActive','setPage']),
            // 子表格的数据
            columnChange(row, column, cell, event){
                tableChild(row.vm_store_id,this.num,row.vm_store_product_id).then(res=>{
                    this.tableColumn=res.data.sku_list
                })
            },
            // 获得页码
            handleCurrentChange(val) {
                this.page=val
                this.setPage(val)
            },
            // 编辑
            handleEdit(index, row) {
                this.$router.history.push({
                    name:'compile',
                    query:{
                        id:row.id,
                        vm_store_product_id:row.vm_store_product_id,
                        standard_category_id:row.standard_category_id,
                        status:this.num
                    }
                })
            },
            // 查看
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
                this.setActive(num)
            },
        },
    }
  }
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
