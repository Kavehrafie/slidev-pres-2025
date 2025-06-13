---
layout: AnimatedNested
clicks: 5
sequence:
  -
    - id: 1
      label: "Introduction: The Rooster Crows"
    - id: 2
      label: "Jalil Ziapour: Constructing the Public"
    - id: 3
      label: "Parviz Tanavoli as Poet-Prophet"
    - id: 4
      label: "Monir Farmanfarmaian as Occult Technician"
    - id: 5
      label: Coda
  -
    - id: 1
      action: update
      children:
        - id: 1.1
          label: "General Introduction"
        - id: 1.2
          label: "Historical Context"
        - id: 1.3
          label: "The Genesis of New Art in Iran"
        - id: 1.4
          label: "Curators of the Ruins of Third-Worldism"
        - id: 1.5
          label: "Modernity’s Elsewhere"
    - id: 2
      class: text-gray-700
      action: update
    - id: 3
      class: text-gray-700
      action: update
    - id: 4
      class: text-gray-700
      action: update
    - id: 5
      class: text-gray-700
      action: update
  -
    - id: 1
      children: []
      class: text-gray-700
      action: update
    - id: 2
      action: update
      class: text-white
      children:
        - id: 2.1
          label: Introduction, the Search for National Culture
        - id: 2.2
          label: A Tribute To Red Iran
        - id: 2.3
          label: Unlikely Visitors to Āpādānā Gallery
        - id: 2.4
          label: Painting the Public
        - id: 2.5
          label: From Ziapour’s Sojourn in Paris to Khurūs Jangī
        - id: 2.6
          label: Reconstructing Modernity through Cubism
        - id: 2.7
          label: Painting Contra Ethnography
        - id: 2.8
          label: Ziapour, the Ethnographer-Painter
  -
    - id: 2
      action: update
      class: text-gray-700
      children: []
    - id: 3
      label: Parviz Tanavoli as Poet-Prophet
      action: update
      class: text-white
      children:
        - id: 3.1
          label: Introduction
        - id: 3.2
          label: From the Studio to Junkyards
        - id: 3.3
          label: The Return of Repressed
        - id: 3.4
          label: The Matriarchs of New Art
        - id: 3.5
          label: On Americanization and Its Discontents
        - id: 3.6
          label: From Caged Relics to Cultural Diplomacy
  -
    - id: 3
      action: update
      class: text-gray-700
      children: []
    - id: 4
      action: update
      class: text-white
      children:
        - id: 4.1
          label: Introduction
        - id: 4.2
          label: In the Coffeehouse
        - id: 4.3
          label: From Roses and Nightingales
        - id: 4.4
          label: The Fold
        - id: 4.5
          label: Seeing Like Nature
  -
    - id: 4
      action: update
      children: []
    - id: 1
      action: update
      class: text-white
    - id: 2
      action: update
      class: text-white
    - id: 3
      action: update
      class: text-white
    - id: 5
      action: update
      class: text-white

---

<div class="relative w-42">
<v-switch >
    <template #1 >
        <img src="https://res.cloudinary.com/image-solar/image/upload/c_scale,f_auto,h_400/v1743152775/ziapour/Khorous_Jangi_1_1_annotated-1_nx7omy.png" alt="Khorous Jangi 1_1_annotated" />
    </template>
    <template #2 >
        <img src="https://res.cloudinary.com/image-solar/image/upload/c_scale,f_auto,h_300/v1743141291/ziapour/56cc3baf-8325-4894-a00b-a5a1d94e9db7_yvkou2.png" alt="public bath" />
    </template>
    <template #3 >
        <img src="https://res.cloudinary.com/image-solar/image/upload/c_scale,f_auto,h_300/v1743320695/ziapour/20230714173537_amgyfx.jpg" alt="Tanavoli" />
    </template>
    <template #4 >
        <img src="https://res.cloudinary.com/image-solar/image/upload/c_scale,f_auto,h_300/v1749748135/ziapour/20230209155354_bbxkj4.png" alt="Farmanfarmaian" />
    </template>
</v-switch>
</div>
