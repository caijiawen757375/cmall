<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        scroll: null
      }
    },
    props:{  //由使用者传入监听类型
      probeType: {
        type: Number,
        default(){
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,    //设置betterScroll内部的点击生效
        probeType: this.probeType,   //设置监听类型：0、1、2、3
        pullUpLoad: this.pullUpLoad  //是否上拉加载更多
      })
      //监听滚动位置
      this.scroll.on('scroll',(position) =>{
        this.$emit('scroll',position)
      })
      //上拉加载更多
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    },
    methods:{
      //滚动到指定位置
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //完成上拉加载更多
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      //刷新
      refresh(){
        this.scroll && this.scroll.refresh()
        /*console.log('刷新');*/
      },
      //获取scroll滚动的位置
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
