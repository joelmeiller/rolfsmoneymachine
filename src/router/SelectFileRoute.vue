<script setup lang="ts">
import SelectFileView from '@/views/SelectFileView.vue';
</script>

<template>
  <SelectFileView
    title="Excel File auswählen"
    description="Wähle die Excel-Datei aus, die du mit der Money Machine übersetzen möchtest."
    :button="{
      label: `Weiter`,
      onClick: () => $router.push('/setup')
    }" />
</template>