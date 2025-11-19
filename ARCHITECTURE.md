# Project Architecture: Olivare Erlebnis

This document provides a comprehensive overview of the architecture, tech stack, and structure of the Olivare Erlebnis e-commerce application.

## 1. Project Overview

Olivare Erlebnis is a modern, full-stack e-commerce web application built with Next.js and the App Router. It serves as a feature-rich online store for a premium olive oil brand, complete with user authentication, a shopping cart, a product catalog, an admin dashboard, and AI-powered features.

The application is designed to be performant, maintainable, and scalable, leveraging server-side rendering (SSR) and Server Components where possible, while providing a rich, interactive user experience with Client Components.

## 2. Tech Stack & Key Packages

The project is built on a foundation of modern web technologies:

-   **Framework:** [Next.js](https://nextjs.org/) (v15) with App Router
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Library:** [React](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) for pre-built, accessible components.
-   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) for server-side AI flows, specifically for food pairing suggestions.
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for managing global client-side state (cart, wishlist, orders).
-   **Authentication:** A mock authentication system is implemented using React Context to simulate user login, including admin roles.
-   **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth page transitions and micro-interactions.
-   **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for robust form validation.
-   **Icons:** [Lucide React](https://lucide.dev/) for a clean and consistent icon set.

### Installed NPM Packages (`package.json`):

-   `next`: The core React framework.
-   `react`, `react-dom`: The UI library.
-   `typescript`, `@types/*`: For static typing.
-   `tailwindcss`, `postcss`, `autoprefixer`: For styling.
-   `class-variance-authority`, `clsx`, `tailwind-merge`: Utilities for managing Tailwind classes.
-   `shadcn-ui` (via `components.json`): A collection of UI components (`@radix-ui/*`).
-   `lucide-react`: Icon library.
-   `framer-motion`: For animations.
-   `zustand`: For global state management.
-   `react-hook-form`, `@hookform/resolvers`, `zod`: For form validation.
-   `genkit`, `@genkit-ai/googleai`, `@genkit-ai/next`: For AI functionality.
-   `firebase`: Used for Firebase services like Storage for image uploads.
-   `date-fns`: For date formatting.
-   `embla-carousel-react`, `embla-carousel-autoplay`: For the testimonial carousel.
-   `recharts`: For the charts in the admin dashboard.

## 3. Directory Structure

The project follows a standard Next.js App Router structure.

```
.
├── public/
│   ├── images/         # Static product images
│   └── videos/         # Static video assets (e.g., hero video)
├── src/
│   ├── app/            # Main application routes
│   │   ├── admin/      # Admin-only pages
│   │   ├── cart/       # Shopping cart page
│   │   ├── checkout/   # Checkout page
│   │   ├── login/      # Login page
│   │   ├── pairings/   # AI Food Pairings page
│   │   ├── products/   # Product listing and detail pages
│   │   ├── profile/    # User profile pages
│   │   ├── signup/     # Signup page
│   │   ├── story/      # "Our Story" page
│   │   ├── wishlist/   # Wishlist page
│   │   ├── globals.css # Global styles and Tailwind layers
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Homepage
│   ├── components/
│   │   ├── admin/      # Components specific to the admin dashboard
│   │   ├── home/       # Components for the homepage sections
│   │   ├── icons/      # Custom SVG icon components
│   │   ├── layout/     # Header and Footer
│   │   ├── pairings/   # Components for the AI pairings feature
│   │   ├── ui/         # ShadCN UI components
│   │   └── ...         # Other shared components (PageLoader, ThemeToggle)
│   ├── context/
│   │   └── auth-context.tsx # Mock authentication provider
│   ├── data/
│   │   └── *.ts        # Static data for products, reviews, etc.
│   ├── hooks/
│   │   └── *.ts        # Custom React hooks (e.g., useAuth, useToast)
│   ├── lib/
│   │   ├── actions.ts  # Next.js Server Actions
│   │   ├── firebase.ts # Firebase configuration and helper functions
│   │   └── utils.ts    # Utility functions (e.g., cn for classnames)
│   ├── store/
│   │   ├── cart-slice.ts    # Zustand store for the shopping cart
│   │   ├── order-slice.ts   # Zustand store for orders
│   │   └── wishlist-slice.ts# Zustand store for the wishlist
│   └── ai/
│       ├── flows/      # Genkit AI flow definitions
│       └── genkit.ts   # Genkit initialization
└── tailwind.config.ts  # Tailwind CSS configuration
```

## 4. Pages & Routing

All pages are located within the `src/app` directory and use the file-based App Router.

-   **`src/app/page.tsx`**: The homepage, featuring a hero video, featured products, and other promotional sections.
-   **`src/app/story/page.tsx`**: A dedicated page telling the brand's story, from the olive groves in Tunisia to the final product.
-   **`src/app/products/page.tsx`**: The main product listing page. It includes filtering by category, intensity, and price.
-   **`src/app/products/[id]/page.tsx`**: The product detail page, which shows detailed information, images, customer reviews, and related products for a single product.
-   **`src/app/pairings/page.tsx`**: An interactive page where users can input olive oil characteristics to get AI-generated food pairing and recipe suggestions.
-   **`src/app/cart/page.tsx`**: The shopping cart page, where users can view, update quantities, and remove items.
-   **`src/app/checkout/page.tsx`**: The checkout form for shipping and payment information.
-   **`src/app/wishlist/page.tsx`**: Displays all items the user has added to their wishlist.
-   **`src/app/login/page.tsx`**: The user login page with email/password and Google sign-in options.
-   **`src/app/signup/page.tsx`**: The user registration page.

### Protected Routes

-   **`src/app/admin/**`**: This group of routes forms the Admin Dashboard. Access is controlled by the `useAuth` hook, which checks if the logged-in user has an admin role. It includes pages for managing products, orders, and customers.
-   **`src/app/profile/**`**: This is the user profile section. It includes pages for viewing order history and managing personal details.

## 5. State Management

Global client-side state is managed using **Zustand**. This avoids prop-drilling and provides a simple, hook-based API for state access.

-   **`cart-slice.ts`**: Manages the items in the shopping cart.
-   **`wishlist-slice.ts`**: Manages the user's wishlist items.
-   **`order-slice.ts`**: Manages a local list of orders for demonstration purposes.

All stores are persisted to `localStorage` and are **user-aware**. The storage key is dynamically generated based on the user's ID, ensuring that each user has their own separate cart and wishlist.

## 6. Authentication

Authentication is simulated using a mock system built with React Context (`src/context/auth-context.tsx`).

-   It defines two mock users: `admin@example.com` and `user@example.com`.
-   The `AuthProvider` component wraps the entire application in `layout.tsx`.
-   The `useAuth` hook provides access to the current user, loading state, and admin status.
-   User state is persisted in `localStorage` to simulate a session.

## 7. Styling

-   **Tailwind CSS:** Used for all utility-first styling. The configuration is in `tailwind.config.ts`.
-   **ShadCN UI:** Provides the base for most UI components (Buttons, Cards, Dialogs, etc.). The theme is configured in `src/app/globals.css` using CSS variables for easy customization of colors, radius, etc.
-   **Framer Motion:** Used for sophisticated animations, such as the page loader and staggered animations on section reveals.

## 8. Generative AI

-   **Genkit:** The application uses Genkit to power its "AI Pairings" feature.
-   **`src/ai/flows/suggest-food-pairings.ts`**: This server-side file defines the Genkit flow. It takes olive oil characteristics as input, sends a structured prompt to a Google AI model, and returns formatted food and recipe suggestions.
-   **`src/lib/actions.ts`**: A Next.js Server Action acts as a bridge between the client-side form and the server-side Genkit flow, ensuring security and separation of concerns.
