<template>
  <div id="category">
    <scroll class="content">
      <h2>分类</h2>
    </scroll>
  </div>

</template>

<script>
    import Scroll from "../../components/common/scroll/Scroll";
    export default {
        name: "Category",
      components: {Scroll}
    }
</script>

<style scoped>
  .content{
    height: 300px;
    overflow: hidden;
  }
</style>
