<script setup lang="ts">
import Label from '@/components/form/Label.vue';
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
    setFile({ file })
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
          <Label text="Select a file" />
          <input type="file" @change="onSelectFile">
        </div>

        <button type="button" @click="button.onClick">{{ button.label }}</button>
      </form>
    </section>
  </main>
</template>
