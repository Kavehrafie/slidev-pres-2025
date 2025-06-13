# Timeline Component Usage Guide

This guide shows how to use the improved Timeline component in your Slidev presentations.

## Basic Usage

```vue
---
layout: Timeline
---

<Timeline
  title="Company Milestones"
  :events="[
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a small team of 5 passionate developers',
      variant: 'highlight'
    },
    {
      year: '2021',
      title: 'First Product Launch',
      description: 'Released our flagship product to the market'
    },
    {
      year: '2022',
      title: 'Series A Funding',
      description: 'Raised $10M to accelerate growth',
      variant: 'highlight'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Opened offices in 5 new countries'
    }
  ]"
/>
```

## With Images

```vue
---
layout: Timeline
---

<Timeline
  title="Product Evolution"
  :events="[
    {
      year: '2020',
      title: 'MVP Release',
      description: 'Basic functionality with core features',
      image: '/images/mvp-screenshot.png'
    },
    {
      year: '2021',
      title: 'Mobile App',
      description: 'Extended to mobile platforms',
      image: '/images/mobile-app.png',
      variant: 'highlight'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Added machine learning capabilities',
      image: '/images/ai-features.png'
    }
  ]"
/>
```

## Vertical Timeline

```vue
---
layout: Timeline
---

<Timeline
  title="Development Process"
  variant="vertical"
  :events="[
    {
      year: 'Phase 1',
      title: 'Research & Planning',
      description: 'Market analysis and requirement gathering',
      variant: 'minimal'
    },
    {
      year: 'Phase 2',
      title: 'Design & Prototyping',
      description: 'UI/UX design and interactive prototypes',
      variant: 'default'
    },
    {
      year: 'Phase 3',
      title: 'Development',
      description: 'Full-stack development and testing',
      variant: 'highlight'
    },
    {
      year: 'Phase 4',
      title: 'Launch',
      description: 'Deployment and go-to-market strategy',
      variant: 'highlight'
    }
  ]"
/>
```

## Event Variants

The component supports three event variants:

### Default
- Standard blue color scheme
- Regular emphasis
- Good for most timeline events

### Highlight
- Purple color scheme with larger dot
- Emphasis for important milestones
- Use sparingly for maximum impact

### Minimal
- Gray color scheme
- Subtle appearance
- Good for supporting or background events

## Props Reference

### Timeline Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Optional title for the timeline |
| `events` | `TimelineEvent[]` | `[]` | Array of timeline events |
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Timeline orientation |

### TimelineEvent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `year` | `string` | - | Year or phase label |
| `title` | `string` | - | Event title |
| `description` | `string` | `undefined` | Optional event description |
| `image` | `string` | `undefined` | Optional image URL |
| `variant` | `'default' \| 'highlight' \| 'minimal'` | `'default'` | Visual variant |

## Best Practices

### 1. Content Guidelines
- Keep titles concise (1-3 words)
- Use descriptions for details (1-2 sentences max)
- Choose meaningful years/phases
- Limit to 5-7 events per slide for readability

### 2. Visual Design
- Use `highlight` variant for 1-2 key events maximum
- Mix variants to create visual rhythm
- Ensure images are properly sized and high quality
- Consider using icons or illustrations for consistency

### 3. Animation & Flow
- Events animate in sequence with v-click
- The timeline auto-scrolls to each event
- Works well with Slidev's presentation flow
- Test scrolling behavior with your content

### 4. Responsive Considerations
- Horizontal timelines work best on wide screens
- Vertical timelines are better for mobile/narrow screens
- Images automatically scale within containers
- Text remains readable at different zoom levels

## Advanced Examples

### Technology Stack Evolution
```vue
<Timeline
  title="Our Tech Stack Journey"
  :events="[
    {
      year: '2019',
      title: 'Monolith Era',
      description: 'Single PHP application with MySQL',
      variant: 'minimal'
    },
    {
      year: '2020',
      title: 'Microservices',
      description: 'Migrated to Node.js microservices architecture',
      variant: 'default'
    },
    {
      year: '2021',
      title: 'Cloud Native',
      description: 'Adopted Kubernetes and cloud infrastructure',
      variant: 'highlight'
    },
    {
      year: '2022',
      title: 'Edge Computing',
      description: 'Implemented CDN and edge functions',
      variant: 'default'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Added ML pipelines and AI-powered features',
      variant: 'highlight'
    }
  ]"
/>
```

### Project Phases with Images
```vue
<Timeline
  title="Project Alpha Development"
  :events="[
    {
      year: 'Q1',
      title: 'Discovery',
      description: 'User research and market analysis',
      image: '/images/research.svg',
      variant: 'minimal'
    },
    {
      year: 'Q2',
      title: 'Design',
      description: 'Wireframes, prototypes, and user testing',
      image: '/images/design.svg',
      variant: 'default'
    },
    {
      year: 'Q3',
      title: 'Development',
      description: 'Frontend and backend implementation',
      image: '/images/code.svg',
      variant: 'highlight'
    },
    {
      year: 'Q4',
      title: 'Launch',
      description: 'Beta testing and public release',
      image: '/images/rocket.svg',
      variant: 'highlight'
    }
  ]"
/>
```

## Troubleshooting

### Common Issues

1. **Images not displaying**: Ensure image paths are correct and files exist in the `public` directory
2. **Scroll not working**: Check that events have proper `v-click` directives
3. **Content overflow**: Reduce text length or adjust container width
4. **Poor mobile experience**: Consider using vertical variant for narrow screens

### Performance Tips

- Optimize images before adding them to the timeline
- Limit the number of events per slide
- Use appropriate image formats (WebP, SVG for icons)
- Test on different screen sizes and devices