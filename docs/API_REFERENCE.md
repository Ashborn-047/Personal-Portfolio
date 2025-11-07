# Public API Reference

Comprehensive reference for the reusable modules exposed by this portfolio codebase. All modules are authored in TypeScript/React and assume the project dependencies declared in `package.json` (React 18, Framer Motion, TailwindCSS, Vite). Paths in the headings match their file locations.

## Getting Started

- All components are written as function components; import them directly from their file paths (no barrel file).
- Styling relies on TailwindCSS utility classes supplemented by custom styles in `index.css`.
- Motion relies on [`framer-motion`](https://www.framer.com/motion/). Components that accept animation variants expect the exported objects from `motionVariants.tsx`.
- Asset URLs that need to work on GitHub Pages resolve against `import.meta.env.BASE_URL`. When serving from a custom origin, set `BASE_URL` accordingly.

```tsx
import App from './app';

export function Root() {
  return <App />;
}
```

## Application Shell

### `App` — `app.tsx`

- **Description:** Root component that orchestrates the loading screen, global visual effects, navigation, and content sections.
- **Props:** None.
- **Behavior:** Preloads key background assets, displays `LoadingScreen` until `handleLoadingComplete` runs, then renders the main layout with `EmberBackground`, `CursorTrail`, header, hero, and the primary sections.

```tsx
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `index.tsx`

- **Description:** Vite/React entry point that mounts `App` into the DOM.
- **Props:** None.
- **Usage:** Normally left unchanged; if you wrap `App` with providers (e.g., Zustand, Redux, Theme), do it here.

## Layout & Navigation Components

### `Header` — `components/Header.tsx`

- **Description:** Animated fixed header with navigation links and scroll-reactive styling.
- **Props:** None; update the `navLinks` array to change menu items.
- **Behavior:** Uses `framer-motion` for entrance animation, throttles scroll updates with `requestAnimationFrame`, toggles a translucent background once the user scrolls 50px.

```tsx
import Header from '../components/Header';

export function Layout() {
  return (
    <>
      <Header />
      {/* page content */}
    </>
  );
}
```

### `Logo` — `components/Logo.tsx`

- **Description:** Circular logo/progress indicator that visualizes scroll progress and scrolls to top when clicked.
- **Props:** None.
- **Behavior:** Tracks scroll position, applies an ease-in-out curve to the progress indicator, and renders a gradient SVG ring.

### `Footer` — `components/Footer.tsx`

- **Description:** Animated footer with social links.
- **Props:** None; customize `socialLinks` to add or swap accounts.
- **Behavior:** Animates icons on hover and renders the current year dynamically.

## Hero & Section Components

### `Hero` — `src/sections/Hero.tsx`

- **Description:** Primary landing section with background image, overlay gradients, and headline copy.
- **Props:** None.
- **Behavior:** Resolves the hero background image relative to `BASE_URL` and renders hero messaging with fade overlays that keep particles legible.

```tsx
import { Hero } from '../src/sections/Hero';

export function Landing() {
  return <Hero />;
}
```

### `HeroSection` — `components/HeroSection.tsx`

- **Description:** Alternate hero implementation that uses a remote placeholder image and inline motion variants.
- **Props:** None.
- **Note:** Use either `Hero` (optimized for local assets) or `HeroSection`, not both.

### `AboutSection` — `components/Aboutsection.tsx`

- **Description:** Narrative section pairing biography text with an avatar image card enhanced by `useEmberCursor`.
- **Props:** None.
- **Customization:** Replace `ASSET_ABOUT_AVATAR` with a local asset; adjust copy inside the `space-y-4` stack as desired.

### `OriginSection` — `components/OriginSection.tsx`

- **Description:** Optional origin story layout with image and text columns.
- **Props:** None.
- **Usage:** Not mounted by default; import into `App` to enable.

### `PhilosophySection` — `components/PhilosophySection.tsx`

- **Description:** Grid of guiding principles. Each card uses `useEmberCursor` for pointer-reactive glow.
- **Props:** None.
- **Customization:** Update the `principles` array to adjust titles/descriptions.

### `ProjectsSection` — `components/ProjectsSection.tsx`

- **Description:** Featured projects showcase with alternating layout and actionable links.
- **Props:** None (data is defined inline as `projects`).
- **Customization:** Edit the `projects` array to change project metadata. Each item supports `title`, `description`, `subtext`, `tags`, and optional `githubLink`/`liveLink`.

```tsx
import ProjectsSection from '../components/ProjectsSection';

export function ProjectsPage() {
  return <ProjectsSection />;
}
```

### `InsightsSection` — `components/InsightsSection.tsx`

- **Description:** Displays a randomly selected quote from a predefined list on mount.
- **Props:** None.
- **Customization:** Edit the `quotes` array; use a data source or API call to fetch dynamic insights if required.

### `ConnectSection` — `components/ConnectSection.tsx`

- **Description:** Call-to-action section with a styled contact form.
- **Props:** None.
- **Behavior:** The submit handler currently prevents default form submission and logs to the console; integrate with a backend or third-party form service inside `handleSubmit`.

## Visual & Motion Components

### `EmberBackground` — `src/components/EmberBackground.tsx`

- **Description:** Full-screen background particle system that simulates drifting embers.
- **Props:** None.
- **Behavior:** Spawns 50 embers that wrap around viewport edges, flicker opacity, and animate via `requestAnimationFrame`. The component returns a fixed, pointer-events-none container so it can sit beneath interactive content.

```tsx
import EmberBackground from '../src/components/EmberBackground';

export function Scene() {
  return (
    <div className="relative">
      <EmberBackground />
      {/* foreground UI */}
    </div>
  );
}
```

### `CursorTrail` — `src/components/CursorTrail.tsx`

- **Description:** Pointer-following ember trail that spawns short-lived particles along the cursor path.
- **Props:** None.
- **Behavior:** Throttles particle creation for performance, animates movement/opacity decay, and manages DOM nodes manually for maximal control.

### `LoadingScreen` — `src/components/LoadingScreen.tsx`

- **Description:** High-touch loading overlay with background reveal, ember particles, and cursor trail.
- **Props:**
  - `onComplete: () => void` — callback invoked after the exit animation finishes; typically toggles loading state in the parent.
- **Behavior:** Disables body scroll/pointer events while active, animates a multi-phase reveal timeline, then fades out and re-enables interactivity.

```tsx
import LoadingScreen from '../src/components/LoadingScreen';

function Example() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <LoadingScreen onComplete={() => setReady(true)} />}
      {ready && <main>Content</main>}
    </>
  );
}
```

### `AnimatedHeroText` — `src/components/AnimatedHeroText.tsx`

- **Description:** Motion-enhanced hero headline; suitable for use inside hero sections or marketing callouts.
- **Props:** None.
- **Usage:** Compose inside a hero layout when you need the animated typography without the full section scaffolding.

## Hooks

### `useEmberCursor` — `src/hooks/useEmberCursor.ts`

- **Description:** Custom hook that returns a `ref` which, when attached to a DOM node, updates CSS variables `--x` and `--y` to track cursor position relative to that node.
- **Usage:** Apply to elements styled with CSS that reads `--x`/`--y` for glow or gradient effects.

```tsx
import { useEmberCursor } from '../src/hooks/useEmberCursor';

export function GlowCard({ children }: React.PropsWithChildren) {
  const cardRef = useEmberCursor();

  return (
    <div ref={cardRef} className="glow-card">
      {children}
    </div>
  );
}
```

## Animation Variants — `motionVariants.tsx`

Exported variant objects for reuse with `framer-motion` components.

- `fadeInUp`: Fades in with upward motion (`opacity` from 0 to 1, `y` from 30px to 0).
- `fadeInLeft`: Fades in with rightward motion (`opacity` from 0 to 1, `x` from -30px to 0).
- `staggerContainer`: Applies `staggerChildren` (0.2s) and `delayChildren` (0.2s) transitions to nested motion elements.
- `hoverGlow`: Increases scale and adds a soft box shadow; apply via the `whileHover` prop.
- `tapEffect`: Slightly scales down; apply via `whileTap`.

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, hoverGlow } from '../motionVariants';

export function AnimatedButton() {
  return (
    <motion.button
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover={hoverGlow}
      whileTap="tap"
    >
      Hover Me
    </motion.button>
  );
}
```

## Icon Components — `components/Icons.tsx`

SVG icon components that accept standard `SVGProps<SVGSVGElement>` so size and color can be controlled through props or CSS.

- `ArrowUpRightIcon`
- `EmailIcon`
- `GithubIcon`
- `LinkedinIcon`
- `TwitterIcon`

```tsx
import { GithubIcon } from '../components/Icons';

export function GitHubLink() {
  return (
    <a href="https://github.com/username" className="text-slate-200 hover:text-white">
      <GithubIcon className="w-6 h-6" />
    </a>
  );
}
```

