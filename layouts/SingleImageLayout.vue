<script setup>
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

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

const { $slidev } = useSlideContext();
const image = computed(() => {
  const images = $slidev.configs?.data.images || {};
  console.log("test", images);
  return (
    images[props.id] || {
      src: "",
      caption: `Image with '${props.id}' not found in data.yaml`,
    }
  );
});
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center p-4">
    <!-- Conditionally render the image only if src exists -->
    <img
      v-if="image.src"
      :src="image.src"
      class="max-h-[80vh] max-w-full object-contain"
      :alt="image.caption"
    />
    <!-- Show an error message if the image source is missing -->
    <div v-else class="text-red-500 font-bold">
      {{ image.caption }}
    </div>
    <!-- Display caption below the image -->
    <div class="mt-4 text-sm text-gray-600 text-center">
      <!-- Use custom caption if provided -->
      {{ image }}
      <span v-if="customCaption" v-html="customCaption" />
      <!-- Otherwise, use caption from data.yaml if image src exists -->
      <span v-else-if="image.src" v-html="image.caption" />
    </div>
  </div>
</template>
