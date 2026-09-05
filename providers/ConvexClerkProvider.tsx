"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Fallback avoids crashing prerender when the env var isn't configured (e.g. missing on Vercel);
// the real URL is required at runtime for Convex calls to work.
const convex = new ConvexReactClient(convexUrl || "https://placeholder.convex.cloud");

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
    layout: { 
      socialButtonsVariant: 'iconButton',
      logoImageUrl: '/icons/auth-logo.svg'
    },
    variables: {
      colorBackground: '#15171c',
      colorPrimary: '',
      colorText: 'white',
      colorInputBackground: '#1b1f29',
      colorInputText: 'white',
    }
  }}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexClerkProvider;