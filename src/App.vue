<template>
  <UserInsure />
</template>

<script>
  import { onMounted } from '@vue/runtime-core'
  import UserInsure from './components/UserInsure/UserInsure.vue'

  export default{
    components:{
      UserInsure
    },

    stup(){
      onMounted(() => {
        console.log("Mounted");
      })
    }
  }
</script>

<style></style>