# CHANGELOG

## Root Causes Found
1. **Slide Rendering & Layout:** 
   - Slides were clipped on smaller screens due to `overflow: hidden` on the main container. 
   - `object-fit: cover` on `.screen-frame > img` aggressively cropped presentation screenshots, causing "weird" scaling.
   - Rapid slide navigation caused elements to remain hidden (`opacity: 0`) because `motion.dev` animations were interrupted before completing, leaving inline styles stuck.
2. **Image Loading Failures:**
   - The path `src="images/..."` was implicitly relative. Depending on how Vercel routes URLs (or local file system loading), it could fail.
   - The primary culprit for missing images was a brittle `onerror` attribute embedded directly in the `<img>` tags. If an ad-blocker or momentary network jitter blocked the image load, the element was forcefully replaced with a placeholder, permanently deleting the real image from the DOM.

## Fixes Applied
1. **Robust Image Loading:**
   - Appended `./` to make image paths explicitly relative (`./images/onboarding/...`).
   - Completely stripped out the destructive `onerror="..."` DOM replacement.
   - Switched `object-fit: cover` to `object-fit: contain` so images scale down without cropping critical UI details.
2. **Slide Layout & Animation Bug:**
   - Changed `.s-inner` to use `overflow-y: auto; overflow-x: hidden;` ensuring long text content does not get truncated on short viewports.
   - Fixed the `motion.dev` interruption bug inside the `goTo()` JS function: previous slide elements now have their `opacity` and `transform` explicitly reset to `1` and `none` on slide change so they never get stuck invisible.
3. **Design Upgrade:**
   - Adopted a striking "editorial" color palette: stark `#030303` black backgrounds with `#ffffff` text for maximum contrast.
   - Substantially increased the typographic hierarchy (`.display-xl` pushed to `7.5rem` max clamp) to match high-end agency pitch decks.

## How to Verify Each Fix
- **Images:** Open the site and ensure all 4 screenshot images load. Even if throttled to "Slow 3G" in DevTools, the images should eventually pop in without being replaced by a placeholder.
- **Scaling:** Shrink your browser vertically; notice the image now scales proportionally (`contain`) instead of zooming and cutting off (`cover`). Scroll down to verify `.s-inner` now scrolls rather than hiding content.
- **Animations:** Quickly spam the "Next" and "Previous" buttons. The text elements should always reappear correctly when navigating backwards.
- **Design:** The typography should appear massively larger and bolder, resembling an art direction portfolio.

## Template Inspiration
**Readymag Template 3597881 ("Miracle")** 
I used this minimalist, high-contrast portfolio template as inspiration. It heavily relies on massive, tightly-kerned typography (serifs paired with brutalist sans-serifs), large uninterrupted padding, and stark dark/light color blocking. It moves the design away from a "default software tutorial" look into an expensive, professional agency aesthetic.