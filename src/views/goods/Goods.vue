<template>
  <div>
    <div class="nav flex">
      <a
        v-for="(item,index) in navList"
        :key="index"
        :class="{'active': num === index}"
        @click="changeSore(index)"
      >{{item}}</a>
      <div class="price-interval">
        <input type="number" placeholder="价格" class="input" v-model="priceGt" />
        <span style="margin: 0px 5px;">-</span>
        <input type="number" placeholder="价格" class="input" v-model="priceLte" />
        <Button type="primary" @click="changeSore(3)">确定</Button>
      </div>
    </div>
    <div class="goods-box flex">
      <div
        v-for="(item,index) in allGood"
        :key="index"
        class="good-item"
        @click="goodsDetails(item.productId)"
      >
        <ShopDe :ShopDe="item"></ShopDe>
      </div>
    </div>
    <div class="el-pagination flex">
      <Page :total="total" :current="page" :page-size="size" :page-size-opts="pageSizeOpts" size="small" @on-change="changePage" @on-page-size-change="changeSize" show-total show-elevator show-sizer />
    </div>
  </div>
</template>

<script>
import ShopDe from "../../components/home/ShopDe";
import util from "../../assets/js/util";
export default {
  data() {
    return {
      navList: ["综合排序", "价格从低到高", "价格从高到低"],
      num: 0,
      page: 1,
      size: 8,
      sort: '',
      priceGt: -Infinity,
      total:null,
      priceLte: Infinity,
      allGood: [],
      sideGood:[],
      currPage:true,
      pageSizeOpts:[],
    };
  },
  components: {
    ShopDe
  },
  props: {},
  methods: {
    changeSore(index) {
      this.num = index;
      if(index===0){
        this.currPage=true
        this.sort= ''
      this.total=null
      }else if(index===1){
        this.sort= 1
      }else if(index===2){
        this.sort= -1
      }else if(index===3){
        this.num=0
         this.currPage=true
         this.size= 8
      }
      this.page=1
     
      if(index!==0&&this.$route.query._id){
        this.sideSore()
      }else{
 this.allGoods()
      }
      
      

    },
    allGoods() {
      this.$api
        .allGoods(this.page, this.size, this.sort, this.priceGt, this.priceLte)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.allGood = res.data;
            // this.total=res.total
            if(this.num===0&&this.currPage){
              this.allGood=util.shuffle(this.allGood)
              this.total=0
              this.sideGood=[]
              let i=1
              for(i;i*this.size<=res.total+7;i++){
              
                 this.$api
        .allGoods(i, this.size, this.sort, this.priceGt, this.priceLte).then(ress=>{
           this.total+= ress.data.length
          ress.data.map(item=>{
if(item._id.includes(this.$route.query._id)){
  this.sideGood.push(item)
          }
          })
          
             
              
        })
        
              }
            
     
   setTimeout(() => {
     
       if(this.$route.query._id){
                this.total= this.sideGood.length
                console.log(this.sideGood)
                this.changePages()
              }
      this.pageOpts(this.total)
    }, 500);
            }
          }
          // console.log(this.pageSizeOpts);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 每页条数切换的配置
    pageOpts(val){
   
this.pageSizeOpts=[]
              for(let i=1;i*8<=val;i++){
this.pageSizeOpts.push(i*8)

              }
               
    },
    // 跳转到详情页
    goodsDetails(productId) {
      const { href } = this.$router.resolve({
        name: "goodsDetails",
        query: { productId: productId }
      });
      window.open(href, "_blank");
      // window.open(`/goodsDetails?productId=${productId}`, "_blank");
    },
    // 改变页数
    changePage(page){
       this.currPage=false
this.page=page
  if( this.$route.query._id){
this.changePages()
      }else{
this.allGoods()
      }
    },
    // 改变每页数量
    changeSize(	size){
      this.currPage=false
      this.size=	size
     
      if( this.$route.query._id){
this.changePages()
      }else{
this.allGoods()
      }
      
    },
    // 品牌周边
    changePages(){
      this.allGood=this.sideGood.slice((this.page-1)*this.size,this.page*this.size)
    },
    sideSore(){
  
this.sideGood=[]
for(let i=1;i*this.size<=30;i++){
              
                 this.$api
        .allGoods(i, this.size, this.sort, this.priceGt, this.priceLte).then(ress=>{
          
          ress.data.map(item=>{
if(item._id.includes(this.$route.query._id)){

  this.sideGood.push(item)
          }
          })

          
             
              
        })
       
        
              }
                

      setTimeout(() => {
      this.changePages()
    }, 500);
      
    }
    // // 改变页面显示数据
    // changeGoods(){

    // }
  },
  beforeMount() {
    this.allGoods();
    this.$api.recommend().then(res=>{
      console.log(res);
    })
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.nav {
  height: 60px;
  line-height: 60px;
  justify-content: flex-start;
  a {
    padding: 0 15px;
    height: 100%;
    font-size: 12px;
    color: #999;
  }
  .active {
    color: #5683ea;
  }
  .price-interval {
    padding: 0 15px;
    .input {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
    input {
      //  去除获取焦点的边框
      outline: none;
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      font-size: 12px;
    }
    /deep/ .ivu-btn {
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      margin-left: 10px;
    }
  }
}
.goods-box {
  justify-content: flex-start;
  .good-item {
    background: #fff;
    width: 25%;
    transition: all 0.5s;
    border: 1px solid #efefef;
    // height: 445px;
    // overflow: hidden;
  }
}
.el-pagination {
  justify-content: flex-end;
  margin-top: 60px;
  padding: 2px 5px;
  color: #48576a;
}
</style>