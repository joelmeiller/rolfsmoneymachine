<script setup lang="ts">
import { defineProps } from 'vue'

import { Translator } from '@/services/Translator'

defineProps<{
  title: string
  description: string
}>()

</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <p>{{ description }}</p>
    </section>

  </main>
</template>
