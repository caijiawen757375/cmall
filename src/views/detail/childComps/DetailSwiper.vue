<template>
    <swiper class="detail-swiper">
      <slide v-for="item in topImages">
        <img :src="item">
      </slide>
    </swiper>
</template>

<script>
    import Swiper from "../../../components/common/swiper/Swiper";
    import Slide from "../../../components/common/swiper/SwiperItem";
    export default {
        name: "DetailSwiper",
      components: {Slide, Swiper},
      props:{
          topImages:{
            type: Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
  }
</style>
