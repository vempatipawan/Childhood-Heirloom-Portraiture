/* Store settings. Every price, date and count here is a SAMPLE until Mel approves it (launch/offer.md section 0).
   To take money: put one payment link per tier in payLinks (for example a Stripe Payment Link made in Mel's own
   account). While a link is null the pay button goes to opening.html and nothing is taken or collected. */
window.CHPConfig = {
  // Black Friday prices run through Monday, November 30, 11:59 pm Eastern; regular prices from December 1.
  regularFrom: "2026-12-01T05:00:00Z",

  tiers: {
    portrait:   { name: "The portrait",                         bf: 0,   regular: 0,   cards: 0 },
    kit:        { name: "The Heirloom Kit",                     bf: 49,  regular: 69,  cards: 0 },
    set:        { name: "The Heirloom Christmas Card Set",      bf: 99,  regular: 149, cards: 25, worth: 700 },
    collection: { name: "The Grandmother Collection",           bf: 349, regular: 399, cards: 50 }
  },

  addons: {
    more25:  { name: "25 more cards",                                     price: 59, perQty: false },
    frame:   { name: "A framed 8 x 10 for the other Grandma, delivered",  price: 79 },
    mailed:  { name: "Addressed, stamped and mailed for you",             price: 59, per25: true },
    gmaCard: { name: "One more Grandma card, mailed to her",              price: 9 }
  },

  // Founding sets: a sample count. Someone keeps it true by hand until the store counts orders itself.
  foundingSets: 50,
  placesLeft: 50,

  dates: {
    orderBy: "Monday, November 30",
    portraitBy: "Friday, December 4",
    atDoorBy: "Monday, December 14",
    lateAfter: "December 18",
    uspsBy: "Thursday, December 17"
  },

  // One payment link per tier. null = ordering not open yet.
  payLinks: { kit: null, set: null, collection: null },

  // The web app (Anshuman). null = not live yet; buttons go to support.html#open.
  appLink: null,

  email: "hello@childhoodheirloomportraiture.com"
};
