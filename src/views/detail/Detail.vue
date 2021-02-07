<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
  import {getDetailData} from "../../network/detail";
  import DetailNavBar from "./childComps/DetailNavBar";

  export default {
    name: "Detail",
    components: {DetailNavBar},
    data() {
      return {
        iid: null
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //this.getDetailData(this.iid)
      //console.log(this.iid);
      //2.根据iid请求详情数据

    },
    methods:{
      //请求详情页数据
      getDetailData(){
        getDetailData().then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
