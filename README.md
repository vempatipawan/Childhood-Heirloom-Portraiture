# childhoodheirloomportraiture.com

A plain static site: HTML, one stylesheet, one small script. No framework and no build step.

```
index.html      the home page
privacy.html    privacy policy (a frame only, see below)
support.html    support page
styles.css
script.js       the before/after slider and the gallery colour / black and white switch
assets/icon-*.png, apple-touch-icon.png   the chosen logo (05) at web sizes
assets/img/     photographs and app screens
```

## Deploy on Vercel

Import the repo, leave the framework as "Other", no build command, output directory the folder that holds `index.html`. Then point the domain at it.

## Before it goes live

Search the files for `todo`. Every place that still needs a real answer is marked with that class and shows on the page as a yellow dashed box:

- The four module names
- Mel's photograph and a few lines about her
- The price, and the checkout link on the "Become a founding member" button (it points at `#offer` for now)
- Two answers in Questions: iPhone or Android, and whether a photo is kept
- The support email address and three answers on the support page
- The whole privacy policy. It has to be written from how the app really handles data and read by Mel before the app is submitted

Also:

- Rebuilt on Nov 24 around the Heirloom Christmas Card Set (25 printed cards, $179*). The offer and every sample value come from `launch/offer.md` in the heirloom-agent repo. Samples carry a gold asterisk in place of the old yellow `todo` boxes.
- At midnight Eastern on November 30 the prices change ($49 to $69, $179 to $219, $349 to $399) and the two founding bonuses come off the page. The printed tiers come off when the 50 orders are gone or after December 4.
- Three links are placeholders, marked `data-needs-approval`: the checkout link (points at `welcome.html`), and the web app link (points at `support.html#open`).
- The phone layout was checked on Nov 24 in a 390 pixel frame: home, Christmas and welcome pages.
- App Store and Google Play badges go in the footer once each listing is live. There is a comment marking the place.
- The four app screens come from the design set, not from the shipping build. Recapture them from the build so every label matches.
- The before and after in the hero is the pair from the app's Home screen. A site that says before and after needs a true pair; confirm with Mel.
- Every photograph of a child here needs Mel's say before it is public.

## Images

`assets/img/` is made by `../build_assets.py` from the app's screens and the portraits Mel shared. In the heirloom-agent repo those files are ignored by git. They have to be copied into the website's own repo by hand.

## Design checks

Polished against the Impeccable craft floor and its detector (`impeccable detect`) on Nov 23. The detector went from 17 findings to 1. The one left is a line-height warning (1.15) whose element could not be pinned down; headings, questions and module names were ruled out.
