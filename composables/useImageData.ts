import { ref } from "vue";
import dataFile from "../data.yaml";

const imageData = ref<Record<string, any> | null>(dataFile);
const isLoaded = ref<boolean>(true);

export function useImageData() {
  const loadData = async (path?: string) => {
    if (isLoaded.value) {
      console.log("Data already loaded using cache!");
      return;
    }

    try {
      // Data is already imported statically, just ensure it's set
      imageData.value = dataFile;
      isLoaded.value = true;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return {
    imageData,
    loadData,
  };
}
