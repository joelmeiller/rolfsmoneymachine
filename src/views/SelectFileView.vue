<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()
</script>

<template>
  <main>
    <h2>{{ title }}</h2>
    <section>
      <form>
        <p>{{ description }}</p>

        <div>
          <label for="file">Select a file:</label>
          <input type="file">
        </div>

        <button type="button" @click="button.onClick">{{ button.label }}</button>
      </form>
    </section>
  </main>
</template>
