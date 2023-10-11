<script setup lang="ts">
import { useConfigStore } from '@/stores/config';

defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()

const { setFile } = useConfigStore()

const onSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    setFile({ filePath: file.name })
  }
}
</script>

<template>
  <main>
    <h2>{{ title }}</h2>
    <section>
      <form>
        <p>{{ description }}</p>

        <div>
          <label for="file">Select a file:</label>
          <input type="file" @change="onSelectFile">
        </div>

        <button type="button" @click="button.onClick">{{ button.label }}</button>
      </form>
    </section>
  </main>
</template>
