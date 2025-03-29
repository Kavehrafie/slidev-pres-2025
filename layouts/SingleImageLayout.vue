<script setup>
import { computed } from "vue";
import data from "../data.yaml";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  customCaption: {
    type: String,
    default: null,
  },
});

const image = computed(() => {
  const images = data?.images || {};
  return (
    images[props.id] || {
      src: "",
      caption: `Image with '${props.id}' not found in data.yaml`,
    }
  );
});
</script>

<template>
  <div class="w-full h-full grid grid-rows-[1fr_auto] p-4 gap-2">
    <!-- Image container: fills available space -->
    <div class="flex items-center justify-center overflow-hidden">
      <img
        v-if="image.src"
        :src="image.src"
        class="max-h-full max-w-full object-contain"
        :alt="image.caption"
      />
      <!-- Error message if image source is missing -->
      <div v-else class="text-red-500 font-bold">
        {{ image.caption }}
      </div>
    </div>
    <!-- Caption container: auto height -->
    <div
      v-if="
        (customCaption && customCaption.length > 0) ||
        (image.src && image.caption && image.caption.length > 0)
      "
      class="text-xs text-center max-w-prose flex mx-auto"
    >
      <span v-if="customCaption" v-html="customCaption" />
      <span v-else v-html="image.caption" />
    </div>
  </div>
</template>
