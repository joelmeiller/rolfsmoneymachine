<template>
  <div class="snowflake" v-html="snowContent[random(snowContent.length)]" v-bind:style="getRandomStyles()"></div>
</template>

<script setup lang="ts">
const snowContent = ['&#10052', '&#10053', '&#10054']

const random = (num: number) => {
  return Math.floor(Math.random() * num)
}

const getRandomStyles = () => {
  const top = random(100)
  const left = random(100)
  const dur = random(10) + 10
  const size = random(25) + 25

  return { top: `${top}%`, left: `${left}%`, fontSize: `${size}px`, animationDuration: `${dur}s` }
}
</script>

<style scoped>
.snowflake {
  animation:
    fall ease-in infinite,
    sway ease-in-out infinite;
  color: white;
  position: absolute;
}

@keyframes fall {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    top: 100vh;
    opacity: 1;
  }
}

@keyframes sway {
  0% {
    margin-left: 0;
  }

  25% {
    margin-left: 50px;
  }

  50% {
    margin-left: -50px;
  }

  75% {
    margin-left: 50px;
  }

  100% {
    margin-left: 0;
  }
}
</style>