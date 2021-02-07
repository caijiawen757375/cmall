<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGood"/>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home"
  import {debounce} from "../../common/utils";


  export default {
    name: "Home",
    components: {BackTop, Scroll, GoodsList, TabControl, FeatureView, RecommendView, HomeSwiper, NavBar},
    data() {
      return {
        banners: [],
        recommends: [],
        keywords: [],
        dKeywords: [],
        goods: {
          'pop': {page: 0 ,list: []},
          'new': {page: 0 ,list: []},
          'sell': {page: 0 ,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed:{
      showGood(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       * 事件监听相关
       */
      tabClick(index){   //监听tabControl点击
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
        }
        //保持两个tabControl的状态一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      topClick(){   //点击返回顶部
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        //下拉超过1000px，出现返回顶部图标
        this.isShowBackTop = (-position.y) > 1000
        //下拉到offsetTop位置时，tabControl显示
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){  //上拉加载更多
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.refresh()
      },
      swiperImageLoad(){ //轮播图加载完成
        //获取tabControl的offsetTop
       /* console.log(this.$refs.tabControl2.$el.offsetTop);*/
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
          this.keywords = res.data.data.keywords.list
          this.dKeywords = res.data.data.dKeyword.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    created() {
      //1.请求多数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted(){

      const refresh = debounce(this.$refs.scroll.refresh,300)
      //下拉超过1000px，出现返回顶部图标
      /*this.$refs.scroll.scroll.on('scroll',(position) =>{
        this.isShowBackTop = (-position.y) > 1000
      })*/

      //监听图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
      })

    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    }
  }

</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{
    height: calc(100% - 49px);
    overflow: hidden;
  }*/
</style>
