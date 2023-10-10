<script setup lang="ts">
import StartView from '@/views/StartView.vue';
</script>

<template>
  <StartView
    title="Bist du bereit Rolf?"
    description="Denn hier kommt deine ganz persönliche Money Machine. File auswählen, Sprachen selektieren und los geht's!"
    :button="{
      label: `Na dann: Let's make some money 🤑`,
      onClick: () => $router.push('/select_file')
    }"
   />
</template>