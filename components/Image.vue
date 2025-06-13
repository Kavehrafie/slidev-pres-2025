<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { useImageData } from "../composables/useImageData";
import { computed } from "vue";
import { useAttrs } from "vue";
import { onMounted } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const { $slidev } = useSlideContext();
const attrs = useAttrs();
const { imageData, loadData } = useImageData();

onMounted(async () => {
  await loadData($slidev.configs?.dataPath);
});

const imageInfo = computed(() => {
  return imageData.value?.images?.[props.id] || null;
});
</script>

<template>
  <img
    v-if="imageInfo"
    :src="imageInfo.src"
    :alt="imageInfo.alt"
    v-bind="attrs"
  />
</template>
