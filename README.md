# ☕ Chai Logic - Modern Café Website

A beautiful, responsive single-page café website built with Next.js and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Modern UI**: Clean, professional design with a warm café aesthetic
- **Interactive Spin & Win**: Engaging spinner wheel modal for discount offers
- **Horizontal Menu Scroll**: Netflix-style scrollable menu section
- **Sticky Navbar**: Navigation that stays with you as you scroll

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Google Fonts** - Poppins font family

## Color Palette

- **Brown**: `#4B2E2E` - Primary brand color
- **Cream**: `#FFF3E0` - Background color
- **Gold**: `#D4AF37` - Accent and CTA color
- **Gold Light**: `#F4E4A1` - Highlights

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd chai-logic
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
chai-logic/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main page combining all sections
│   │   └── globals.css         # Global styles and animations
│   └── components/
│       ├── Navbar.tsx          # Sticky navigation bar
│       ├── Hero.tsx            # Full-screen hero section
│       ├── MenuSection.tsx     # Horizontal scrollable menu
│       ├── SpinnerWheel.tsx    # Spin & Win modal
│       └── Footer.tsx          # Footer with contact info
├── public/                     # Static assets
└── package.json
```

## Sections

### 1. Navbar
- Sticky top navigation
- Logo on the left
- Menu links on desktop
- Hamburger menu on mobile

### 2. Hero Section
- Full-screen background image
- Animated heading and subheading
- Call-to-action button with pulse animation
- Scroll indicator animation

### 3. Menu Section
- Horizontal scrollable cards
- Hover effects with scale and shadow
- Beautiful food photography

### 4. Spin & Win Section
- Prominent CTA button
- Modal popup with spinning wheel
- Random prize selection
- Smooth rotation animation

### 5. Footer
- Café information
- Location and contact details
- Social media links
- Opening hours

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Animations

- Fade-in on scroll
- Smooth page transitions
- Button hover effects
- Spinner wheel rotation
- Card hover scale effects
- Pulse animation on CTAs

## Performance

- Optimized images with Next.js Image component
- Lazy loading for off-screen images
- Efficient component structure
- Code splitting by default

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Created By

Built with ❤️ for Chai Logic Café
