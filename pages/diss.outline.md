---
layout: AnimatedNested
clicks: 2
sequence:
  -
    - id: 1
      label: Introduction
      children:
        - id: 1.1
          label: History
    - id: 2
      label: Ziapour
  -
    - id: 3
      label: Tanavoli
      action: add
    - id: 1
      class: opacity-50
      action: update
  -
    - id: 2
      action: delete

---



---
layout: center
---

<ol>
    <li class="text-xl uppercase" v-motion :initial="{opacity: 1}" :click-2="{opacity: 0.5}" >
        Introdution: The Rooster Crows
        <ol>
            <li v-click class="text-base">General Introduction</li>
            <li class="text-base">Historical Context</li>
            <li class="text-base">The Genesis of New Art in Iran</li>
            <li class="text-base">Historical Context</li>
        </ol>
    </li>
    <li class="text-xl">Header 1
        <ol v-click>
            <li class="text-base">Header 1.1</li>
            <li class="text-base">Header 1.1</li>
        </ol>
    </li>
</ol>
