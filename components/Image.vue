<script setup lang="ts">
import { useSlideContext, onSlideEnter } from "@slidev/client";
import { useImageData } from "../composables/useImageData";
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import { useAttrs } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  showCaption: {
    type: Boolean,
    default: false,
  },
});

const imgRef = ref<HTMLImageElement | null>(null);
const width = ref<string>("100%");
const isImageLoaded = ref(false);
let resizeObserver: ResizeObserver | null = null;

const { $slidev } = useSlideContext();
const attrs = useAttrs();
const { imageData, loadData } = useImageData();

onMounted(async () => {
  await loadData($slidev.configs?.dataPath);
});

const imageInfo = computed(() => {
  return imageData.value?.images?.[props.id] || null;
});

const updateCaptionWidth = () => {
  if (!imgRef.value || !isImageLoaded.value) return;

  const imgWidth = imgRef.value.clientWidth || imgRef.value.offsetWidth;
  if (imgWidth > 0) {
    width.value = imgWidth + "px";
  }
};

const handleImageLoad = () => {
  isImageLoaded.value = true;
  nextTick(() => {
    updateCaptionWidth();
  });
};

const setupResizeObserver = () => {
  if (!imgRef.value || !window.ResizeObserver) return;

  resizeObserver = new ResizeObserver(() => {
    updateCaptionWidth();
  });

  resizeObserver.observe(imgRef.value);
};

onSlideEnter(() => {
  nextTick(() => {
    if (isImageLoaded.value) {
      updateCaptionWidth();
    }
    setupResizeObserver();
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <div>
    <img
      ref="imgRef"
      v-if="imageInfo"
      :src="imageInfo.src"
      :alt="imageInfo.caption"
      @load="handleImageLoad"
      v-bind="attrs"
    />
    <p
      class="text-sm mt-2"
      v-if="showCaption && imageInfo?.caption"
      :style="{ width, maxWidth: width }"
    >
      {{ imageInfo.caption }}
    </p>
  </div>
</template>
