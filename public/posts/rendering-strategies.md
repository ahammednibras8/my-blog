---
title: SSG - The Only Rendering Strategy for V1
date: "2025-09-30"
description: A quick look at why we immediately locked into Static Site Generation (SSG)—it's not complicated, it's just the superior financial and architectural choice for a V1.
---

# The Story: Why We Didn't Waste Time on Anything Else

The goal for this V1 blog was simple: Maximum SEO, Minimum Cost. I did a quick check on rendering strategies and immediately dismissed anything that complicated the build process. My commitment was to Static Site Generation (SSG), and here is the simple, non-negotiable logic behind it.

My entire V1 plan (1-15 posts) is based on one principle: **Build once, serve everywhere.**

## The Two Choices That Were Dead on Arrival

| Strategy | Why We Skipped It | The Simple Cost |
|:-- | :-- | :-- |
| **Client-Side Rendering (CSR)** | Requires the user's browser to do all the work (fetch data, render Markdown). This hurts SEO and makes the site feel slow (poor LCP score) | **Latency Cost** (Slow perception, bad SEO) |
| **Server-Side Rendering (SSR)** | Forces the server to run the same Markdown parsing logic for every visit. This is expensive and pointless for static files | **Compute Cost** (Higher cloud bills, unnecessary server load) |

## The Winning Strategy: SSG (Static Site Generation)
SSG is the only path that aligns with V1 execution goals: Speed, Cost, and SEO.

1. **Guaranteed SEO and Speed**: The entire HTML file for every post is pre-built during the ```npm run build``` command. The server doesn't run code at runtime; it just sends a perfect ```.html``` file from the CDN. This is the fastest possible experience.
2. Z**ero Runtime Cost:** Since the site is serving pre-built files, the cost of distribution is near-zero. We solve a financial problem by moving all computation to the single build step.

## Enforcing the SSG Guarantee
My only concern was avoiding the **CSR grenade**—the accidental "use client" directive that forces rendering back to the browser. I needed to ensure that even though the build was easy, it was absolutely locked into SSG.

Here is how we guaranteed the system works as intended:
1. **Synchronous File Access**: In my data layer (```lib/posts.js```), I use ```fs.readFileSync```. This forces all file I/O to happen synchronously during the build. The data is present before the static file is written.
2. **Explicit Paths**: Using ```generateStaticParams()``` tells Next.js, "These are the only posts; build them now." This command forces the SSG path and prevents any dynamic fallback confusion.
3. **No Client Hooks**: The ```Post``` component uses no client-side hooks (``useState``, ```useEffect```) and no ```"use client"``` directive, visually enforcing its role as a Server Component that renders once.

**The Principle I Learned: SSG is not a struggle; it is a tactical head start**. For V1, the easiest path is the one that gives you the best performance, lowest cost, and maximum peace of mind. Why would I choose anything else?