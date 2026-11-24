# childhoodheirloomportraiture.com

A plain static store: HTML, CSS and a little script. No framework and no build step. Deploy the folder as it is.

Rebuilt late on Nov 24, 2026 from a landing page into a store: a mom picks one of twelve Christmas card designs, sees her own child on it, chooses her set and checks out. She picks; we make the card. Every price, date and count is a sample until Mel approves it, and carries a gold asterisk on the page.

```
index.html        home, led by the offer
pricing.html      the whole offer on one page: worth, regular, Black Friday, the stack, the promises, the four tiers
cards.html        the twelve designs; "see your child on every design"; favourites
card.html         one design: front, back, Grandma's card; the names; set, quantity, add-ons, total
checkout.html     summary, more cards, add-ons, address, consent; the pay button (see below)
opening.html      where the pay button goes until payment exists: "Ordering opens Black Friday"
order.html        what she sees after ordering (a sample page)
course.html       the four lessons as video places
welcome.html, support.html, privacy.html, christmas.html

store-config.js   prices, dates, the count of places, payment links, the app link: the only file to edit for those
store.js          what the store remembers in her browser (choices, names, favourites, her portrait); prices and totals
cards.js          the twelve card designs, drawn in the browser so her portrait can replace the sample
cards.css         the card designs' styles
styles.css        the site; store.css the store pages on top of it
script.js         the before/after slider on the home page
assets/img/cards/ the six sample portraits the designs use, and every design's front, Grandma card and back as pictures
assets/img/scene-*.jpg   Grandma's mantel and the set on a table: CC0 room photographs with our cards placed in them
```

## Taking money

Nothing on the site takes money or collects anything yet. In `store-config.js`, `payLinks` holds one link per tier (`kit`, `set`, `collection`), all `null`. While a link is `null`, the checkout's pay button goes to `opening.html` and nothing is sent or kept. Put a payment link made in Mel's own account (for example a Stripe Payment Link) in the tier's slot and the pay button goes there instead. The developers' brief, `launch/website/FOR-THE-DEVS.md` in the heirloom-agent repo, says what the order has to carry.

## Her portrait

On the card pages she can add a portrait to see it on every design. The browser shrinks it and keeps it in its own storage on her device. It is never uploaded. Private storage for the portrait she sends for her order is the developers' job and is not built.

## On December 1

`store-config.js` switches the prices on its own at midnight Eastern on November 30 (`regularFrom`). The pages written in words still say "Black Friday" and $99; blocks marked `data-bf-only` hide and blocks marked `data-regular-only` show, but the bar at the top and several sentences need a hand edit. Search for `$99` and `Black Friday`.

## Pictures

Made by `../build_store_assets.py` (heirloom-agent repo): the sample portraits, each design as a picture, the two scenes and the share picture. They show children's photographs: they live in this private repo on Pawan's approval and in no other repo.

## Checking

`../check_pages.py` takes screenshots at phone width (inside a 390 px frame) and at desktop width.

## Still placeholders

- Every asterisk: prices, values, dates, the count of places, the promises' terms, the course lengths, the support address.
- The payment links, the web app link (`appLink`), the lesson videos, the portrait upload on the order page, the order page itself.
- Mel's photograph on the home page.
- The two scenes are made here from CC0 photographs; better pictures later.
