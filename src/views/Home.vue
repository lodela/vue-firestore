<template>
  <div class="home">
    <BoardList />
  </div>
</template>

<script>
// @ is an alias to /src
import BoardList from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    BoardList
  }
}
</script>
