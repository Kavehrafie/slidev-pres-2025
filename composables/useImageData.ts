import { ref } from "vue";

const imageData = ref<Record<string, any> | null>();
const pathCache = ref<string | null>();
export function useImageData() {
  const loadData = async (path: string) => {
    if (pathCache.value === path) {
      console.log("Data already loaded using cache!");
      return;
    }
    try {
      const module = await import(/* @vite-ignore */ path);
      imageData.value = module.default;
      pathCache.value = path;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return {
    imageData,
    loadData,
  };
}
