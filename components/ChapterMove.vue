<template>
  <div v-motion :initial="{ opacity: 0.5 }" :click-1="{ opacity: 0 }">
    <slot />
  </div>
</template>
