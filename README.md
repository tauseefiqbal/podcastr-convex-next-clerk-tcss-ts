# Podcastr 🎙️

An AI-powered podcast platform where you can generate podcast audio and thumbnails with AI, upload your own, discover trending podcasts, and manage your podcaster profile.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)
- [Test and Admin Users Credentials](#test-and-admin-users-credentials)
- [How to Use App for Regular User](#how-to-use-app-for-regular-user)
  - [1. Sign Up / Sign In](#1-sign-up--sign-in)
  - [2. Create a Podcast](#2-create-a-podcast)
  - [3. Discover Podcasts](#3-discover-podcasts)
  - [4. Listen to a Podcast](#4-listen-to-a-podcast)
  - [5. View a Podcaster Profile](#5-view-a-podcaster-profile)
- [How to Use App for Admin User](#how-to-use-app-for-admin-user)
- [Environment Variables](#environment-variables)
- [Getting Started Locally](#getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Convex Backend](#running-the-convex-backend)
  - [Running the Dev Server](#running-the-dev-server)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- ✅ Sign up / sign in with email, Google, or GitHub via Clerk authentication
- ✅ AI-generated podcast audio from a text prompt (OpenAI text-to-speech)
- ✅ Multiple AI voice options to narrate your podcast
- ✅ AI-generated podcast thumbnails from a text prompt (OpenAI image generation)
- ✅ Upload a custom thumbnail image instead of generating one
- ✅ Real-time backend powered by Convex (database, file storage, serverless functions)
- ✅ Discover page with trending podcasts and full-text search
- ✅ Individual podcast details page with a persistent audio player
- ✅ Similar podcasts recommendations based on voice type
- ✅ Podcaster public profile page showing all podcasts by that author
- ✅ "Fans Like You" carousel and "Top Podcasters" leaderboard
- ✅ Responsive UI with a collapsible sidebar and mobile navigation
- ✅ Podcast deletion for the podcast owner
- ✅ Toast notifications for success/error feedback across the app

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **Backend / Database:** [Convex](https://www.convex.dev/) (real-time database, file storage, serverless functions/actions)
- **Authentication:** [Clerk](https://clerk.com/)
- **AI Provider:** [OpenAI](https://platform.openai.com/) (text-to-speech + image generation)
- **File Uploads:** [@xixixao/uploadstuff](https://www.npmjs.com/package/@xixixao/uploadstuff) + [react-dropzone](https://react-dropzone.js.org/)
- **Forms & Validation:** [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/)
- **Carousel:** [embla-carousel-react](https://www.embla-carousel.com/)
- **Icons:** [lucide-react](https://lucide.dev/)

## Deployment

The app is live at:

**[APP URL]**

> Replace `[APP URL]` above with the deployed production URL of this application.

## Test and Admin Users Credentials

This application does not have a separate admin panel or admin role — every signed-in user has the same permissions and can create, view, and delete their own podcasts.

To try the app, sign up for a new account directly from the [Sign Up](/sign-up) page, or use the credentials below if a shared test account has been provisioned for this deployment:

| Role | Email | Password |
| --- | --- | --- |
| Test User | `[TEST_USER_EMAIL]` | `[TEST_USER_PASSWORD]` |

> Replace the placeholders above with real test credentials before sharing this README, or remove this section if no shared test account exists.

## How to Use App for Regular User

### 1. Sign Up / Sign In

- Visit the app's live URL.
- Click **Sign In** (or **Sign Up** if you don't have an account yet).
- Authenticate using email or a supported social provider through Clerk.

### 2. Create a Podcast

- Click **Create Podcast** in the sidebar.
- Enter a **Title** and **Description** for your podcast.
- Choose an **AI voice**, then provide a text prompt and click **Generate** to create the podcast audio.
- Choose to either **generate an AI thumbnail** from a text prompt or **upload your own image**.
- Click **Submit & Publish Podcast** to save it.

### 3. Discover Podcasts

- Click **Discover** in the sidebar to browse all podcasts.
- Use the search bar to find podcasts by title, description, or author.

### 4. Listen to a Podcast

- Click any podcast card to open its details page.
- Use the persistent audio player at the bottom of the screen to play, pause, seek, mute, or skip forward/backward.
- Browse **Similar Podcasts** with the same voice type at the bottom of the page.

### 5. View a Podcaster Profile

- Click a podcaster's name or avatar to visit their public profile.
- View all podcasts published by that podcaster and play a random one directly from the profile.

## How to Use App for Admin User

There is currently no dedicated admin role, admin dashboard, or admin-only functionality in this application. All authenticated users share the same capabilities described in [How to Use App for Regular User](#how-to-use-app-for-regular-user).

If admin-specific features (e.g. moderating podcasts, managing users) are added in the future, document the admin workflow in this section.

## Environment Variables

Create a `.env.local` file in the project root (see `.env.example`) with the following variables:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Set `OPENAI_API_KEY` as a Convex environment variable (not in `.env.local`), since AI actions run on the Convex backend:

```bash
npx convex env set OPENAI_API_KEY sk-...
```

## Getting Started Locally

### Prerequisites

- Node.js 18+
- A [Convex](https://www.convex.dev/) account and project
- A [Clerk](https://clerk.com/) account and application
- An [OpenAI](https://platform.openai.com/) API key

### Installation

```bash
npm install
```

### Running the Convex Backend

```bash
npx convex dev
```

Keep this running in a separate terminal — it syncs your `convex/` functions to your Convex deployment and must stay running while developing.

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                # Next.js App Router pages (auth, root layout, routes)
components/         # Reusable UI components
components/ui/       # shadcn/ui primitives
constants/          # Static app constants (sidebar links, voice options)
convex/              # Convex schema, queries, mutations, and actions
lib/                 # Utility functions and hooks
providers/           # React context providers (audio player, Clerk + Convex)
public/              # Static assets (icons, images)
types/               # Shared TypeScript types
```

## License

This project is provided as-is for educational/demonstration purposes.
