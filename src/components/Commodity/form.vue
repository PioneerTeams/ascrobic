<template>
    <div class="card-group">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="90px">
          <el-form-item label="款号:">
            <el-input v-model="formInline.styleNum" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品名称:">
            <el-input v-model="formInline.shopName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分类:">
            <el-select v-model="formInline.list" filterable placeholder="请选择">
              <el-option-group v-for="group in formSelect.category" :key="group.id" :label="group.title">
                <el-option  v-for="item in group.children" :key="item.id" :label="item.title" :value="item.title">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:">
            <el-select v-model="formInline.brand" placeholder="请选择">
              <el-option v-for="item in formSelect.brand" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品来源:">
            <el-select v-model="formInline.source" placeholder="请选择">
              <el-option v-for="item in formSelect.source" :key="item.id" :label="item.name" :value="item.name"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-select v-model="formInline.types" placeholder="请选择">
              <el-option v-for="item in formSelect.product_type" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配送方式:">
            <el-select v-model="formInline.dispatching" placeholder="请选择">
              <el-option v-for="item in formSelect.delivery" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺:">
            <el-select v-model="formInline.store" placeholder="请选择">
              <el-option-group v-for="group in formSelect.store" :key="group.id" :label="group.title">
                <el-option  v-for="item in group.children" :key="item.id" :label="item.title" :value="item.title">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item :label="activeName==4?'上架时间:':(activeName==1?'提交时间:':(activeName==3?'审核时间:':''))" v-show="activeName==3||activeName==1||activeName==4">
            <el-date-picker
              v-model="formInline.value"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下架原因:" v-show="activeName==5">
            <el-select v-model="formInline.reason" placeholder="请选择">
              <el-option v-for="item in formSelect.down_reason" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供货商状态:" v-show="activeName==5">
            <el-select v-model="formInline.retailer" placeholder="请选择">
              <el-option v-for="item in formSelect.retailer_status" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="last-formItem">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { manageList } from '@/api/commodity'

    export default {
        props:{
            activeName:Number
        },
        data() {
            return {
                formSelect:{},
                formInline: {
                    styleNum:'',
                    shopName: '',
                    list:'',
                    brand:'',
                    source:'',
                    types:'',
                    dispatching:'',
                    store:'',
                    putaway:'',
                    value:'',
                    reason:'',
                    retailer:'',
                    submit:'',
                },
                num:4,
            }
        },
        mounted() {
            this.getlist(this.activeName)
        },
        methods: {
            getlist(num){
                manageList(num).then(res=>{
                    this.formSelect=res.data
                })
            },
            onSubmit() {
                console.log('submit!');
            },
            resetForm(formName) {
                let arr = Object.keys(this.formInline)
                arr.forEach((item)=>{
                  this.formInline[item] = ""
                })
            }
        },
        watch: {
            activeName(num){
                this.getlist(num)
            }
        },
    }
</script>

<style lang="scss" scoped>
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
</style>