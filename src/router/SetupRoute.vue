<script setup lang="ts">
import SetupView from '@/views/SetupView.vue';
</script>

<template>
  <SetupView
    title="Optionen adjustieren"
    :button="{
      label: `Und los! 🌊🏄🏻‍♂️`,
      onClick: () => $router.push('/processing')
    }" />
</template>