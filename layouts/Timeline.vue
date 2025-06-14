<script setup lang="ts">
import { ref, watch } from "vue";
import { useSlideContext } from "@slidev/client";
import { tv } from "tailwind-variants";
import { computed } from "vue";

const { $clicks } = useSlideContext();

type TimelineEvent = {
  year: string;
  title: string;
  description?: string;
  image?: string;
  variant?: "default" | "stacked";
  icon?: null | "art" | "war" | "revolution";
};

const props = defineProps<{
  events: TimelineEvent[];
  variant?: "horizontal" | "vertical";
}>();

const eventRefs = ref<(HTMLElement | null)[]>([]);
const timelineContainerRef = ref<HTMLElement | null>(null);

const count = computed(() => props.events.length);

// Tailwind variants for timeline styling
// horizontal and vertical option must be implemented
const timelineVariants = tv({
  slots: {
    title: "text-xl font-bold ",
    line: "grid-timeline bg-primary h-2 ",
    event:
      "relative w-[400px] group flex flex-col justify-between border-l-2 dark:border-l-zinc-700 ",
    content: "flex px-4 gap-2 transition-all duration-300 py-2",
    year: "font-bold mb-2 px-4 dark:text-zinc-500",
    description: "",
    image: "max-h-[150px] max-w-[200px] w-auto object-contain rounded",
    icon: "block text-lg m-auto",
  },
  variants: {
    variant: {
      horizontal: {
        timeline: "",
        line: "",
      },
      vertical: {
        timeline: "",
        line: "",
      },
    },
    iconVariant: {
      war: {
        icon: "i-ph-airplane-tilt-fill ",
      },
      art: {
        icon: "i-ph-paint-brush-fill",
      },
      revolution: {
        icon: "i-ph-hand-fist-fill",
      },
      flag: {
        icon: "i-ph-flag-banner-fold-fill",
      },
    },
    eventVariant: {
      default: {
        year: "text-2xl",
        title: "text-lg",
      },
      stacked: {
        content: "flex-col",
      },
    },
    position: {
      above: {
        event: "grid-upper ",
      },
      below: {
        event: "grid-lower flex-col-reverse",
      },
    },
  },
  defaultVariants: {
    variant: "horizontal",
    eventVariant: "default",
  },
});

const styles = timelineVariants({
  variant: props.variant || "horizontal",
});

watch($clicks, (currentClick) => {
  const container = timelineContainerRef.value;
  if (!container || !eventRefs.value.length) return;

  const eventIndex = currentClick - 1;
  if (eventIndex >= 0 && eventIndex < eventRefs.value.length) {
    const targetEvent = eventRefs.value[eventIndex];
    if (targetEvent) {
      targetEvent.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }
});
</script>

<template>
  <div class="flex w-screen h-full">
    <div class="top-0 left-0 sticky z-10 relative flex">
      <div class="absolute">
        <slot />
      </div>
    </div>
    <div
      ref="timelineContainerRef"
      class="container-grid h-full w-full overflow-hidden"
    >
      <!-- Timeline line -->
      <div :class="styles.line()"></div>

      <!-- Timeline events -->
      <v-clicks>
        <div
          v-for="(event, index) in events"
          :key="index"
          :ref="(el: HTMLElement | null) => (eventRefs[index] = el)"
          :class="
            styles.event({
              position: index % 2 === 0 ? 'above' : 'below',
            })
          "
          :style="{ 'grid-column-start': index + 2 }"
        >
          <h4 :class="styles.year()">{{ event.year }}</h4>

          <div :class="styles.content({ eventVariant: event.variant })">
            <!-- title -->
            <p
              :class="styles.title()"
              v-html="event.title.replace(/\*(.*?)\*/g, '<i>$1</i>')"
            ></p>

            <!-- image -->
            <img :src="event.image" :class="styles.image()" />
          </div>

          <br />
          <!-- TODO: the  background solution is temporary -->
          <div
            class="-my-10 -mx-4 rounded-full bg-[rgb(18_18_18)] w-6 h-6 flex justify-center items-center border-3 border-primary box-content"
          >
            <span :class="styles.icon({ iconVariant: event.icon })"></span>
          </div>
        </div>
      </v-clicks>
    </div>
  </div>
</template>

<style scoped>
.container-grid {
  display: grid;
  grid-template-rows: 20px 1fr minmax(50px, auto) 1fr 20px;
  grid-template-columns: 150px repeat(v-bind("count"), minmax(200px, 1fr)) 150px;
}

.grid-upper {
  grid-row: 2 / 3;
  grid-column: span 1;
}

.grid-timeline {
  grid-row: 3/4;
  grid-column: 1 / -1;
  align-self: center;
}

.grid-lower {
  grid-row: 4 / 5;
  grid-column: span 1;
}

/* Minimal custom styles for animations and scrollbar */
.slidev-vclick-target {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  h2 {
    opacity: 1;
    transition-delay: 300ms;
    transition: all 200ms ease-out;
  }
}

.slidev-vclick-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-40px);
  h2 {
    opacity: 0;
    transform: translateY(40px);
  }
}

/* Custom scrollbar for better UX */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  border-radius: 3px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background: transparent;
}
</style>
