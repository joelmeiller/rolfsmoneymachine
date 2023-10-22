<script setup lang="ts">
import LoginView from '@/views/LoginView.vue';
</script>

<template>
  <LoginView
    title="Bist du bereit?"
    description="Bitte gib deinen ganz persönlichen Usernamen und dein ganz persönliches und unerratbares Passwort ein"
    :button="{
      label: `Bitte prüfe, ob das stimmt 🥸`,
      onClick: () => $router.push('/start')
    }"
   />
</template>