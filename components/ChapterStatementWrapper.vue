<script setup lang="ts"></script>

<template>
  <div
    v-motion
    :initial="{ scale: 1, x: 0 }"
    :click-1="{
      scale: 0.5,
      x: -220,
      transition: { type: 'keyframes', ease: 'easeOut' },
    }"
  >
    <slot />
  </div>

  <v-click>
    <slot name="statement" />
  </v-click>
</template>
