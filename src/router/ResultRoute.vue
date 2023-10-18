<script setup lang="ts">
import ResultView from '@/views/ResultView.vue';
</script>

<template>
  <ResultView
    title="Super! Du hast es geschafft 🐣"
    description="Puhhh, das war harte Arbeit. Hier dein Resultat. Jetzt kannst du getrost etwas Pause mache."
    :button="{
      label: `Gleich noch mal! 🐈`,
      onClick: () => $router.push('/start')
    }" />
</template>