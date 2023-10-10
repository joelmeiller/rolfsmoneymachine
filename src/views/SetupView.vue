<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

defineProps<{
  title: string
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
      <div>
        <label for="targetLanguages">In welche Sprachen soll übersetzt werden:</label>
        <div class="checkbox-option">
          <input type="checkbox" id="english" name="english" value="en">
          <label for="english">Englisch ☕️</label>
        </div>

        <div class="checkbox-option">
          <input type="checkbox" id="french" name="french" value="fr">
          <label for="french">Französisch 🥐</label>
        </div>

        <div class="checkbox-option">
          <input type="checkbox" id="italian" name="italian" value="it">
          <label for="italian">Italienisch 🍕</label>
        </div>
      </div>

      <div>
        <label for="numRows">Anzahl zu übersetzender Zeilen:</label>
        <input name="numRows" type="number" min="0" step="1" />
      </div>

      <button @click="button.onClick">{{ button.label }}</button>
    </section>
  </main>
</template>
