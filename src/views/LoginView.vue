<script setup lang="ts">
import { AuthenticationServer } from '@/services/AuthenticationService';
import { computed, ref } from 'vue';
import Label from '@/components/form/Label.vue';

const props = defineProps<{
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}>()

const username = ref<string>('')
const password = ref<string>('')
const hasLoginFailed = ref<boolean>(false)

const onLogin = () => {
  AuthenticationServer.login({ username: username.value, password: password.value }).then(({ authenticated }) => {
    if (authenticated) {
      props.button.onClick()
    } else {
      hasLoginFailed.value = true
    }
  })
}

const showLoginFailed = computed(() => {
  return hasLoginFailed.value
})

</script>

<template>
  <main class="page">
    <h2>{{ title }}</h2>

    <section>
      <form>
        <p class="description">{{ description }}</p>

        <p v-if="showLoginFailed" class="error">Benutzername oder Passwort sind falsch.</p>

        <div class="field">
          <Label text="Benutzername:" />
          <input v-model="username" />
        </div>

        <div class="field">
          <Label text="Passwort:" />
          <input type="password" v-model="password" />
        </div>


        <button type="button" @click="onLogin">{{ button.label }}</button>
      </form>
    </section>

  </main>
</template>

<style scoped>
.red {
  border: 2px solid red;
  border-radius: 4px;
  padding: 1rem 2rem;
  background-color: rgba(255, 245, 245, 0.5);
  color: red;
}
</style>