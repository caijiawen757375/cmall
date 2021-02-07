<template>
  <swiper>
    <slide v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src= "item.image" @load="imageLoad">
      </a>
    </slide>
  </swiper>
</template>

<script>
  import Swiper from "../../../components/common/swiper/Swiper";
  import Slide from "../../../components/common/swiper/SwiperItem";

  export default {
    name: "HomeSwiper",
    components: {Slide, Swiper},
    props:{
      banners:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        imageIsLoad: false
      }
    },
    methods:{
      imageLoad(){
        if(!this.imageIsLoad){
          this.$emit('swiperImageLoad')
          this.imageIsLoad = true
        }

      }
    }
  }
</script>

<style scoped>

</style>
