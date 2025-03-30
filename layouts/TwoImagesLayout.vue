<script setup lang="ts">
import { computed } from "vue";
import data from "../data.yaml"; // Import YAML data

// Define props for image IDs and an optional custom caption
const props = defineProps<{
  id1: string;
  id2: string;
  customCaption?: string;
}>();

// Helper function to get image data or return a fallback
const getImageData = (id: string) => {
  const images = data?.images || {};
  return (
    images[id] || {
      src: "",
      caption: `Image with ID '${id}' not found in data.yaml`,
    }
  );
};

// Computed properties to get data for each image
const image1Data = computed(() => getImageData(props.id1));
const image2Data = computed(() => getImageData(props.id2));

// Computed property for the combined caption with indicators
const combinedCaption = computed(() => {
  const cap1 = image1Data.value?.src ? image1Data.value.caption : null; // Only include caption if image src exists
  const cap2 = image2Data.value?.src ? image2Data.value.caption : null; // Only include caption if image src exists

  let parts = [];
  if (cap1) {
    parts.push(`◀ ${cap1}`); // Left indicator
  }
  if (cap2) {
    parts.push(`${cap2} ▶`); // Right indicator
  }

  return parts;
});
</script>

<template>
  <!-- Main layout: Images row fills space, caption row adjusts -->
  <div class="w-full h-full grid grid-rows-[1fr_auto] p-4 gap-2">
    <div class="inset-0 absolute p-6">
      <slot />
    </div>
    <!-- Image container grid -->
    <div class="grid grid-cols-2 gap-4 overflow-hidden">
      <!-- Left Image -->
      <div class="flex items-center justify-center overflow-hidden">
        <img
          v-if="image1Data.src"
          :src="image1Data.src"
          class="max-h-full max-w-full object-contain"
          :alt="image1Data.caption"
        />
        <!-- Error message if image source is missing -->
        <div v-else class="text-red-500 font-bold">
          {{ image1Data.caption }}
        </div>
      </div>

      <!-- Right Image -->
      <div class="flex items-center justify-center overflow-hidden">
        <img
          v-if="image2Data.src"
          :src="image2Data.src"
          class="max-h-full max-w-full object-contain"
          :alt="image2Data.caption"
        />
        <!-- Error message if image source is missing -->
        <div v-else class="text-red-500 font-bold">
          {{ image2Data.caption }}
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
      <p class="grid grid-cols-2 gap-4" v-else>
        <span
          v-html="combinedCaption[0]"
          class="justify-start text-left"
        ></span>
        <span v-html="combinedCaption[1]" class="text-right"></span>
      </p>
    </div>
  </div>
</template>
