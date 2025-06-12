<script setup lang="ts">
import { computed } from "vue";
import data from "../data.yaml";

// Define props for image IDs and an optional custom caption
const props = defineProps<{
  ids: string[];
  customCaption?: string;
  separator?: string;
}>();

type ImageData = {
  src: string;
  caption: string;
};

// Helper function to get image data or return a fallback
const getImageData = (id: string): ImageData => {
  const images = data?.images || {};
  return (
    images[id] || {
      src: "",
      caption: `Image with ID '${id}' not found in data.yaml`,
    }
  );
};

// Computed properties to get data for each image
const images = computed(() => props.ids.map(getImageData));

// Computed property for the combined caption with indicators
const combinedCaption = computed(() =>
  images.value
    .map((img) =>
      img?.caption
        ? img.caption
        : "<span class='text-red'> caption not provided </span>",
    )
    .join(props.separator ?? "; ")
    .replace(/([^.])$/, "$1."),
);
</script>

<template>
  <!-- Main layout: Images row fills space, caption row adjusts -->
  <div class="w-full h-full grid grid-rows-[1fr_auto] p-4 gap-2">
    <div class="inset-0 absolute p-6">
      <slot />
    </div>

    <!-- Image container grid -->
    <div
      class="grid auto-cols-[minmax(auto,1fr)] grid-flow-col gap-4 overflow-hidden"
    >
      <div
        class="flex items-center justify-center overflow-hidden min-w-[100px]"
        v-for="image in images"
      >
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
    </div>
    <!-- Combined Caption container: auto height, centered -->
    <div
      v-if="customCaption || combinedCaption"
      class="text-xs text-center mx-auto w-full px-4"
    >
      <!-- Render custom caption if provided, otherwise render combined caption -->
      <span v-if="customCaption" class="max-w-prose" v-html="customCaption" />
      <p class="text-left" v-else>
        From left to right: <span v-html="combinedCaption"></span>
      </p>
    </div>
  </div>
</template>
