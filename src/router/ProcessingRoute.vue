<script setup lang="ts">
import ProcessingView from '@/views/ProcessingView.vue';
</script>

<template>
  <ProcessingView
    title="Bin dran ..."
    description="Bitte warten"
    :onDone="() => $router.push('/result')"
    :onAbort="{label: 'Abbrechen' , onClick: () => $router.push('/start') }"
  />
</template>