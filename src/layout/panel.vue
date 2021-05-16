<template>
  <div  class="panel">
      <div class="header">
          <slot name='header'/>
      </div>
      <div class="content">
        <slot name='content'/>
      </div>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
.panel{
    border-radius: 4px;
    .header{
        background-color: rgb(238, 238, 238);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
}
</style>