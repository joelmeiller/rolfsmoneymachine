<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { ref } from 'vue';
import { Language } from '@/types/enums';
import Label from '@/components/form/Label.vue';

const props = defineProps<{
  title: string
  button: {
    label: string
    onClick: () => void
  }
}>()

const { setConfig } = useConfigStore()

const languages = ref<Language[]>([Language.English])
const numRows = ref<number>(10)

const onSubmit = () => {
  setConfig({
    languages: languages.value,
    numRows: numRows.value,
  })

  props.button.onClick()
}
</script>

<template>
  <main>
    <h2>{{ title }}</h2>
    <section>
      <form>
        <div>
          <Label text="In welche Sprachen soll übersetzt werden:" />

          <div class="checkbox-option">
            <input type="checkbox" :id="Language.English" :value="Language.English" v-model="languages">
            <label :for="Language.English">Englisch ☕️</label>
          </div>

          <div class="checkbox-option">
            <input type="checkbox" :id="Language.French" :value="Language.French" v-model="languages">
            <label :for="Language.French">Französisch 🥐</label>
          </div>

          <div class="checkbox-option">
            <input type="checkbox" :id="Language.Italian" :value="Language.Italian" v-model="languages">
            <label :for="Language.Italian">Italienisch 🍕</label>
          </div>
        </div>

        <div>
          <Label text="Anzahl zu übersetzender Zeilen:" />
          <input type="number" min="0" step="1" v-model="numRows" />
        </div>

        <button @click="onSubmit">{{ button.label }}</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.checkbox-option {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 24px;
}

.checkbox-option label {
  font-size: 1rem;
  font-weight: 700;
}

input[type="checkbox"] {
  height: 24px;
  cursor: pointer;
}

input[type="checkbox"]:before {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-background-section);
  content: "";
  background: var(--color-background-section);
}

input[type="checkbox"]:after {
  position: relative;
  display: block;
  left: 0px;
  top: -24px;
  width: 24px;
  height: 24px;
  content: "";
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-section);
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:after {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC');
  background-color: var(--color-background-active);
}

input[type="checkbox"]:disabled:after {
  filter: opacity(0.4);
}

input[type="checkbox"]:not(:disabled):checked:hover:after {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC');
  background-color: var(--color-background-hover);
}

/* input[type="checkbox"]:not(:disabled):hover:before {
  background-color: var(--color-background-hover);
  border-color: var(--color-border-hover);
} */
input[type="checkbox"]:not(:disabled):hover:after {
  background-color: var(--color-background-hover);
  border-color: var(--color-border-hover);
}
</style>
