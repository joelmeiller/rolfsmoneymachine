<script setup lang="ts">

import Snowflake from './Snowflake.vue';

const snowFlakes = Array.from({ length: 50 })

</script>

<template>
  <div class="app-background">
  </div>

  <div class="app-snowflakes">
    <Snowflake v-for="(_snowFlake, index) in snowFlakes" :key="index"></Snowflake>
  </div>
</template>

<style scoped>
.app-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  background-image: url(@/assets/santa-claus.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.app-snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>


