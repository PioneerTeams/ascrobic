<template>
    <div class="content-action">
        <div class="wrap">
            <div class="title">
                <h3>{{detail.brand_name}}</h3>
                <span>{{detail.src_type_name}}商品</span>
            </div>
            <div class="type">
                <h3>商品类型</h3>
                <p :class="{'type-active':index==i}" v-for="(item,i) in basicList.product_type" :key="item.id" @click="tabActive(i)">{{item.name}}</p>
            </div>
            <div class="box">
                <div class="basic">
                    <h3>基本信息</h3>
                    <div class="shopImg">
                        <span>商品图</span>
                        <div class="goods-img">
                            <div class="image">
                                <div class="item-img" v-for="item in detail.main_image" :key="item.path">
                                    <img :src="item.url" alt="">
                                </div>
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                                <p>建议尺寸：800 x 800像素,最多上传5张。</p>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <span>品牌</span>
                        <el-select v-model="detail.brand_name" placeholder="请选择" class="setWidth">
                            <el-option
                                v-for="item in basicList.brands"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="list">
                        <span>商品名</span>
                        <el-input class="setWidth" v-model="detail.name" placeholder="请输入内容" @change="inputName"></el-input>
                    </div>
                    <div class="list">
                        <span>商品款号</span>
                        <el-input class="setWidth" :value="detail.code" :disabled="true"></el-input>
                    </div>
                    <div class="list">
                        <span>吊牌价格</span>
                        <el-input class="setWidth" :value="detail.price"></el-input>
                    </div>
                    <div class="list">
                        <span>商品分类</span>
                        <el-cascader
                            class="setWidth"
                            :props="defaultParams"
                            :options="options"
                            v-model="selectedOptions">
                        </el-cascader>
                    </div>
                </div>
                <div class="basic">
                    <h3>价格库存</h3>
                    <div class="list">
                        <span>商品规格</span>
                        <div class="typeRight">
                            <div class="sku-item" v-for="(item,i) in detail.sale_attr" :key="item.id">
                                <div class="list">
                                    <span>规格名:</span>
                                    <el-select class="list-item" disabled v-model="detail.sale_attr[0].name" placeholder="请选择">
                                        <el-option
                                            v-for="item in detail.sale_attr[0].values"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                        </el-option>
                                    </el-select>
                                    <el-checkbox v-show="i==0" v-model="checked" style="margin-top: 5px;" @change="addImg">添加规格图片</el-checkbox>
                                </div>
                                <div class="list">
                                    <span>规格值:</span>
                                    <div class="list-item" v-for="obj in item.values" :key="obj.id">
                                        <el-input placeholder="请输入内容" v-model="obj.name" :disabled="true"></el-input>
                                        <div class="list-item-img" v-show="obj.image_url" v-if="checked">
                                            <img :src="obj.image_url" alt="">
                                        </div>
                                    </div>
                                    <div class="list-item" v-show="isShow">
                                        <el-input placeholder="请输入内容" v-model="input"></el-input>
                                        <el-upload
                                            v-show="i==0"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :on-preview="PictureCardPreview"
                                            :on-remove="Remove">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="visible">
                                            <img width="100%" :src="imageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                    <span style="cursor: pointer; color: #1890ff; margin-left: 10px; margin-top: 5px;" @click="addSize">添加规格值</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <span>品牌</span>
                        <div class="typeRight">
                            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#606266'}">
                                <el-table-column
                                    v-for="(item,i) in title"
                                    :key="i"
                                    :prop="item.key"
                                    :label="item.tit"
                                    width="180"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="basic">
                    <h3>物流信息</h3>
                    <div>
                        <el-checkbox
                            v-for="item in basicList.delivery"
                            :key="item.id"
                            v-model="deliveryCheck"
                            @change="deliveryChange(item.id)"
                        >{{item.name}}</el-checkbox>
                        <dl class="pre-time" v-show="pre">
                            <dt>备货时间</dt>
                            <dd>
                                <el-radio 
                                    v-for="item in basicList.processing_time"
                                    :key="item.id"
                                    v-model="radio" 
                                    :label="item.id">{{item.name}}</el-radio>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="basic">
                    <h3>商品信息</h3>
                    <div class="list" v-for="item in shopList.base_attr" :key="item.id">
                        <span>{{item.name}}</span>
                        <el-select class="list-select" v-model="value" placeholder="请选择" v-show="item.type==1||item.type==2">
                            <el-option
                                v-for="obj in item.values"
                                :key="obj.id"
                                :label="obj.name"
                                :value="obj.name">
                            </el-option>
                        </el-select>
                        <el-input class="list-select" v-model="iptVal" placeholder="请输入" v-show="item.type==3"/>
                    </div>
                    <div class="list">
                        <span>详情图</span>
                        <div class="detail-img">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="PictureCard"
                                :on-remove="Onremove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="disible">
                                <img width="100%" :src="dmageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div class="list">
                        <span>商品描述</span>
                        <el-input class="list-select" type="textarea" v-model="detail.description"></el-input>
                    </div>
                </div>
                <div class="basic">
                    <h3>其他信息</h3>
                    <div class="list">
                        <span>上架时间</span>
                        <div>
                            <el-radio 
                            v-for="item in basicList.publish_mode"
                            :key="item.id"
                            v-model="upradio" 
                            :label="item.id">{{item.name}}</el-radio>
                        </div>
                    </div>
                    <div class="list">
                        <span>下架时间</span>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="list">
                        <span>售后服务</span>
                        <div>
                            <el-radio 
                            v-for="item in basicList.return_status"
                            :key="item.id"
                            v-model="lastradio" 
                            :label="item.id">{{item.name}}</el-radio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tableSearch, shopMinxin, basicMinxin } from '@/api/commodity'
    export default {
        data() {
            return {
                detail:{},
                tableData:[],
                shopList:{},
                basicList:{},
                index:0,
                checked: true,
                imageUrl: '',
                visible: false,
                input:'',
                isShow:'',
                deliveryCheck:false,
                radio: 0,
                pre:false,
                value:'',
                iptVal:'',
                desc:'',
                upradio:1,
                value1:'',
                lastradio:1,
                title:[{
                    tit:'颜色',
                    key:'color'
                },{
                    tit:'尺码',
                    key:'size'
                },{
                    tit:'SKU编码',
                    key:'sku_code'
                },{
                    tit:'条形码',
                    key:'bar_code'
                },{
                    tit:'价格',
                    key:'price'
                },{
                    tit:'折扣价',
                    key:'discount_price'
                },{
                    tit:'库存',
                    key:'stock'
                }],
                dialogImageUrl: '',
                dialogVisible: false,
                dmageUrl: '',
                disible: false,
                options:[],
                selectedOptions: [7],
                defaultParams: {
                    label: 'title',
                    value: 'value',
                    children: 'children'
                },
            }
        },
        created(){
            this.getLookList()
            this.getShopMinxin()
            this.getBasicMinxin()
        },
        mounted() {
            // this.getLookList()
        },
        methods: {
            inputName(){
                console.log(this.detail.name)
            },
            getLookList(){
                tableSearch(this.$route.query).then(res=>{
                    this.detail=res.data
                    const arr=res.data.sku_list.map(item=>item.attr_list)
                    let brr=[]
                    arr.forEach((item,index)=>{
                        let obj={}
                        obj.color=item[0].item_name
                        obj.size=item[1].item_name
                        brr.push(obj)
                    })
                    this.tableData=res.data.sku_list
                    this.tableData.forEach((item,i)=>{
                        item.color=brr[i].color
                        item.size=brr[i].size
                    })
                })
            },
            async getShopMinxin(){
                const arr = await shopMinxin(this.$route.query.standard_category_id)
                this.shopList = arr.data
            },
            async getBasicMinxin(){
                const arr = await basicMinxin()
                this.basicList = arr.data
                this.options=arr.data.categories
            },
            tabActive(i){
                this.index=i
            },
            addSize(i){
                this.isShow=!this.isShow
            },
            addImg(){
                this.checked=!this.checked
            },
            deliveryChange(id){
                this.deliveryCheck=!this.deliveryCheck
                
                if(id==1){
                    this.pre=this.deliveryCheck
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            Remove(file, fileList) {
                console.log(file, fileList);
            },
            PictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            Onremove(file, fileList) {
                console.log(file, fileList);
            },
            PictureCard(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .content-action{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 24px;
        background-color: #fcfcfc;
        .wrap{
            background: #fff;
            min-height: 600px;
            margin-top: 24px;
            padding: 24px;
        }
    }
    .title{
        padding: 24px;
        border-bottom: 1px solid #e8e8e8;
        h3{
            display: inline-block;
            margin-right: 10px;
        }
        span{
            display: inline-block;
            margin: 0 8px 0 0;
            padding: 0 7px;
            font-size: 12px;
            line-height: 20px;
            white-space: nowrap;
            background: #fafafa;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            cursor: default;
        }
    }
    .type{
        padding: 24px;
        border-bottom: 1px solid #e8e8e8;
        h3{
            font-size: 18px;
        }
        p{
            margin-top: 24px;
            margin-bottom: 8px;
            margin-left: 20px;
            font-size: 14px;
            display: inline-block;
            padding: 6px 15px;
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid rgb(232, 232, 232);
        }
        .type-active{
            border: 1px solid rgb(62, 198, 182)
        }
    }
    .box{
        margin-top: 24px;
        .basic{
            padding: 24px;
            border-bottom: 1px solid #e8e8e8;
            h3{
                font-size: 18px;
            }
        }
    }
    .shopImg{
        width: 100%;
        margin-top: 24px;
        span{
            width: 108px;
            text-align: right;
            display: block;
        }
        .goods-img{
            margin-left: 108px;
            .image{
                .item-img{
                    float: left;
                    padding: 8px;
                    border-radius: 4px;
                    margin: 0 8px 8px 0;
                    border: 1px solid #d9d9d9;
                    img{
                        width: 120px;
                        height: 160px;
                        margin-right: 8px;
                        object-fit: contain;
                    }
                }
                p{
                    clear: both;
                    color: #a0a0a0;
                    margin-bottom: 8px;
                }
            }
        }
    }
    .image /deep/ .el-upload--picture-card{
        height: 182px;
        line-height: 182px;
    }
    .image /deep/ .el-upload-list--picture-card .el-upload-list__item{
        height: 182px;
    }
    .list-item /deep/ .el-upload--picture-card{
        width: 120px;
        height: 128px;
        margin-top: 8px;
        line-height: 128px;
    }
    .list-item /deep/ .el-upload-list--picture-card .el-upload-list__item{
        height: 128px;
    }
    .pre-time{
        padding: 24px;
        display: flex;
        background-color: #fafafa;
        dd{
           margin-left: 20px;
        }
    }
    .pre-time /deep/ .el-radio{
        display: block;
        margin-top: 10px;
    }
    .list /deep/ .el-radio{
        display: block;
        margin-top: 10px;
        margin-left: 20px;
    }
    .list /deep/ .el-date-editor{
        margin-left: 20px;
    }
    .list{
        width: 100%;
        margin-top: 24px;
        font-size: 14px;
        display: flex;
        color: rgba($color: #000000, $alpha: 0.65);
        span:first-child{
            width: 108px;
            text-align: right;
            display: inline-block;
        }
        // span:nth-of-type(2){
        //     cursor: pointer;
        //     color: #1890ff;
        //     margin-left: 10px;
        //     margin-top: 5px;
        // }
        .typeRight{
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            width: 90%;
            margin-left: 20px;
            padding: 24px;
        }
        .list-item{
            width: 120px;
            margin-right: 10px;
            padding-left: 10px;
            span{
                height: 32px;
                display: block;
                width: 120px;
                border: 1px solid #d9d9d9;
                line-height: 32px;
                border-radius: 4px;
                text-align: left;
                padding-left: 10px;
            }
            .list-item-img{
                width: 120px;
                height: 128px;
                padding: 10px;
                margin-top: 8px;
                background: #fff;
                border: 1px dashed #d9d9d9;
                border-radius: 2px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .detail-img{
            width: 80%;
            margin-left: 20px;
            img{
                width: 640px;
                height: 330px;
                margin-right: 8px;
                object-fit: contain;
            }
        }
        .setWidth{
            width: 41.66666667%;
            margin-left: 20px;
        }
        .list-select{
            width: 25%;
            margin-left: 24px;
        }
    }
</style>