<script setup lang="ts">
import { ref, watch } from "vue";
import { useSlideContext } from "@slidev/client";
import { tv } from "tailwind-variants";
import { cn } from "../utilities";

const { $clicks } = useSlideContext();

type TimelineEvent = {
  year: string;
  title: string;
  description?: string;
  image?: string;
  variant?: "default" | "highlight" | "minimal";
};

const props = defineProps<{
  title?: string;
  events: TimelineEvent[];
  variant?: "horizontal" | "vertical";
}>();

const eventRefs = ref<(HTMLElement | null)[]>([]);
const timelineContainerRef = ref<HTMLElement | null>(null);

// Tailwind variants for timeline styling
const timelineVariants = tv({
  slots: {
    container: "flex items-center justify-center h-full w-full p-8",
    title: "text-4xl font-bold text-center",
    timeline: "relative flex items-center gap-12 py-68 px-2 w-[fit-content]",
    line: "absolute h-1 bg-primary rounded-full",
    event: "relative flex flex-col items-center min-w-[300px] group",
    dot: "relative z-10 w-4 h-4 rounded-full border-4 transition-all duration-300",
    content:
      "absolute text-center px-4 transition-all duration-300 group-hover:scale-110",
    year: "font-bold mb-2",
    description: "text-sm opacity-80 leading-relaxed",
    image: "rounded-lg shadow-lg object-cover",
    imageContainer: "flex items-center gap-4 justify-between",
  },
  variants: {
    variant: {
      horizontal: {
        timeline: "flex-row",
        line: "top-1/2 left-8 right-8 h-1 w-auto -translate-y-1/2",
      },
      vertical: {
        timeline: "flex-col gap-8",
        line: "left-1/2 top-8 bottom-8 w-1 h-auto -translate-x-1/2",
      },
    },
    eventVariant: {
      default: {
        dot: "bg-zinc-100 dark:bg-zinc-900 border-primary",
        year: "text-2xl",
        title: "text-lg",
      },
      highlight: {
        dot: "bg-purple-500 border-purple-600 scale-110",
        year: "text-2xl text-purple-600",
        title: "text-lg text-purple-800",
      },
      minimal: {
        dot: "bg-gray-300 border-gray-400",
        year: "text-xl text-gray-600",
        title: "text-base text-gray-700",
      },
    },
    position: {
      above: {
        content: "bottom-18",
      },
      below: {
        content: "top-18",
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

// Watch for clicks to scroll to events
watch($clicks, (currentClick) => {
  const container = timelineContainerRef.value;
  if (!container || !eventRefs.value.length) return;

  const eventIndex = currentClick - 1;
  if (eventIndex >= 0 && eventIndex < eventRefs.value.length) {
    const targetEvent = eventRefs.value[eventIndex];
    if (targetEvent) {
      targetEvent.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }
});
</script>

<template>
  <div :class="styles.container()">
    <div class="w-full max-w-7xl">
      <h1 v-if="title" :class="styles.title()">
        {{ title }}
      </h1>

      <div
        ref="timelineContainerRef"
        :class="styles.timeline()"
        class="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <!-- Timeline line -->
        <div :class="styles.line()" />

        <!-- Timeline events -->
        <div
          v-for="(event, index) in events"
          v-click
          :key="index"
          :ref="(el) => (eventRefs[index] = el as HTMLElement)"
          :class="styles.event()"
        >
          <!-- Connector dot -->
          <div
            :class="
              styles.dot({
                eventVariant: event.variant || 'default',
              })
            "
          />

          <!-- Event content -->
          <div
            :class="
              styles.content({
                position: index % 2 === 0 ? 'above' : 'below',
              })
            "
          >
            <!-- Content with image -->
            <div v-if="event.image" :class="styles.imageContainer()">
              <div class="my-auto">
                <div
                  :class="
                    cn(
                      styles.year({
                        eventVariant: event.variant || 'default',
                      }),
                      'text-right',
                    )
                  "
                >
                  {{ event.year }}
                </div>
                <div
                  v-if="event.title"
                  :class="
                    cn(
                      styles.title({
                        eventVariant: event.variant || 'default',
                      }),
                      'text-right',
                    )
                  "
                >
                  {{ event.title }}
                </div>
              </div>
              <img
                :src="event.image"
                :alt="event.title"
                :class="styles.image()"
                class="w-40 h-40"
              />
            </div>

            <!-- Content without image -->
            <template v-else>
              <div
                :class="
                  styles.year({
                    eventVariant: event.variant || 'default',
                  })
                "
              >
                {{ event.year }}
              </div>
              <div
                v-if="event.title"
                :class="
                  styles.title({
                    eventVariant: event.variant || 'default',
                  })
                "
              >
                {{ event.title }}
              </div>
            </template>

            <!-- Description -->
            <div v-if="event.description" :class="styles.description()">
              {{ event.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal custom styles for animations and scrollbar */
.slidev-vclick-target {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slidev-vclick-hidden {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
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
