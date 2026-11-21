/* =============================================================================
   ROMANTIC JUICE — OWNER EDIT PANEL
   -----------------------------------------------------------------------------
   Everything the owner needs to change lives in this one file.
   Edit a value, save, refresh. No build step, no dependencies.

   IMPORTANT
   - Phone number, exact street address, opening hours and social URLs are
     intentionally LEFT EMPTY. Fill them in before publishing. Nothing is invented.
   - Menu names are suggestions for the owner to confirm. Prices are blank on
     purpose and render as "XX DH" until a value is entered.
   ========================================================================== */

window.RJ_CONFIG = {
  /* ---------------------------------------------------------------------------
     1. BRAND
  --------------------------------------------------------------------------- */
  brand: {
    name: "Romantic Juice",
    subtitle: "Chez Hamza",
    slogan: "Goût d'Amour • Taste of Love • ذوق الحب",
    city: "Essaouira",
    country: "Morocco",
    heroTitle: "A Taste of Love in Every Sip",
    heroText: "Des jus frais, préparés avec amour à Essaouira."
  },

  /* ---------------------------------------------------------------------------
     2. ESTABLISHMENT PHOTO
     The real shop photo from assets/img. Swap the path to use another one.
  --------------------------------------------------------------------------- */
  shopPhoto: "assets/img/photo-01-sm.jpg",

  /* ---------------------------------------------------------------------------
     3. CONTACT & LINKS — placeholders until the owner fills them in
  --------------------------------------------------------------------------- */
  contact: {
    // WhatsApp number, international format, DIGITS ONLY (no + or spaces).
    // e.g. "212612345678". Leave empty to open WhatsApp's contact picker.
    whatsappPhone: "",

    // Pre-filled message on every WhatsApp button.
    whatsappMessage:
      "Bonjour Romantic Juice ! Je souhaite avoir plus d'informations sur votre menu.",

    addressLine1: "Essaouira",
    addressLine2: "Morocco",

    // Editable Google Maps URL. Replace with the shop's exact Google Maps link.
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Romantic%20Juice%20Chez%20Hamza%20Essaouira%20Morocco",

    // Paste full profile URLs. Empty links are shown as "to be added".
    instagram: "",
    facebook: "",

    // Editable opening hours. Leave time blank to display "To be confirmed".
    hours: [{ days: "Opening hours", time: "" }]
  },

  /* ---------------------------------------------------------------------------
     4. IMAGE LIBRARY
     Local shop photography first. Remote fruit/drink photography fills the
     categories the shop photos do not cover. Replace any value with your own.
  --------------------------------------------------------------------------- */
  images: {
    shop: "assets/img/photo-01-sm.jpg",
    shopSign: "assets/img/photo-09-sm.jpg",
    shopMood: "assets/img/photo-10.jpg",
    natural: "assets/img/photo-04-sm.jpg",
    fruit: "assets/img/photo-05-sm.jpg",
    fruitPortrait: "assets/img/photo-06-sm.jpg",
    board: "assets/img/photo-11.jpg",

    orange: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
    citrus: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80",
    apple: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=800&q=80",
    lemon: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=80",
    mango: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
    pineapple: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80",
    tropical: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    berries: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80",
    cocktail: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    mocktail: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
    smoothie: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    strawberry: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    platter: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80"
  },

  /* ---------------------------------------------------------------------------
     5. MENU
     Names below are suggestions for the owner to confirm. An empty price
     renders as "XX DH" so no price is ever invented.
  --------------------------------------------------------------------------- */
  menuNote:
    "A preview of our flavours — selection and prices confirmed at the counter.",

  menu: [
    {
      id: "fresh-juices", number: "01", name: "Fresh Juices", nameFr: "Jus Frais",
      note: "Pressed fresh, served cold, nothing added.",
      items: [
        { name: "Orange Juice", nameFr: "Jus d'orange", description: "Freshly squeezed Moroccan oranges.", image: "orange", price: "" },
        { name: "Apple Juice", nameFr: "Jus de pomme", description: "Crisp apples, pressed and served chilled.", image: "apple", price: "" },
        { name: "Lemon Juice", nameFr: "Jus de citron", description: "Bright, tangy and wonderfully refreshing.", image: "lemon", price: "" },
        { name: "Seasonal Fresh Juice", nameFr: "Jus de saison", description: "Whatever the season brings, freshly pressed.", image: "citrus", price: "" }
      ]
    },
    {
      id: "tropical-juices", number: "02", name: "Tropical Juices", nameFr: "Jus Tropicaux",
      note: "A little island escape in every glass.",
      items: [
        { name: "Tropical Mix", nameFr: "Mix tropical", description: "A sunny blend of tropical fruits.", image: "tropical", price: "" },
        { name: "Mango Juice", nameFr: "Jus de mangue", description: "Ripe mango, silky and sweet.", image: "mango", price: "" },
        { name: "Pineapple Juice", nameFr: "Jus d'ananas", description: "Golden pineapple with a bright finish.", image: "pineapple", price: "" },
        { name: "Exotic Fruit Mix", nameFr: "Fruits exotiques", description: "A colourful mix of exotic favourites.", image: "fruit", price: "" }
      ]
    },
    {
      id: "fruit-cocktails", number: "03", name: "Fruit Cocktails", nameFr: "Cocktails de Fruits",
      note: "Colourful, layered and made to be photographed.",
      items: [
        { name: "Romantic Cocktail", nameFr: "Cocktail romantique", description: "Our signature blend for two.", image: "mocktail", price: "" },
        { name: "Tropical Cocktail", nameFr: "Cocktail tropical", description: "A refreshing mix of tropical fruits.", image: "cocktail", price: "" },
        { name: "Special Fruit Cocktail", nameFr: "Cocktail de fruits spécial", description: "A generous medley of fresh fruit.", image: "berries", price: "" }
      ]
    },
    {
      id: "smoothies", number: "04", name: "Smoothies", nameFr: "Smoothies",
      note: "Thick, creamy and seriously satisfying.",
      items: [
        { name: "Strawberry Smoothie", nameFr: "Smoothie fraise", description: "Sweet strawberries blended until smooth.", image: "strawberry", price: "" },
        { name: "Banana Smoothie", nameFr: "Smoothie banane", description: "Creamy banana, naturally sweet.", image: "banana", price: "" },
        { name: "Mango Smoothie", nameFr: "Smoothie mangue", description: "Mango with a soft, velvety finish.", image: "smoothie", price: "" }
      ]
    },
    {
      id: "special-romantic", number: "05", name: "Special Romantic Drinks", nameFr: "Boissons Romantiques",
      note: "Little signature touches, made for sharing.",
      items: [
        { name: "Romantic Special", nameFr: "Spécial romantique", description: "Our special signature drink.", image: "mocktail", price: "" },
        { name: "Love Cocktail", nameFr: "Cocktail amour", description: "A sweet surprise in every sip.", image: "cocktail", price: "" },
        { name: "Chef's Special", nameFr: "Spécial du chef", description: "Ask us what's inside today's creation.", image: "platter", price: "" }
      ]
    }
  ],

  /* ---------------------------------------------------------------------------
     6. GALLERY — local shop images first, then fruit and drink photography
  --------------------------------------------------------------------------- */
  gallery: [
    { image: "shop", title: "Our corner in Essaouira", tag: "The shop", size: "wide" },
    { image: "fruit", title: "Fresh colours", tag: "Fresh fruit" },
    { image: "natural", title: "100% natural", tag: "Fresh juices" },
    { image: "orange", title: "Squeezed fresh", tag: "Orange juice" },
    { image: "shopSign", title: "Goût d'Amour", tag: "The shop", size: "tall" },
    { image: "tropical", title: "Tropical colours", tag: "Tropical" },
    { image: "cocktail", title: "Made for moments", tag: "Cocktails" },
    { image: "smoothie", title: "Creamy & cold", tag: "Smoothies" },
    { image: "fruitPortrait", title: "Sunshine in a glass", tag: "Fresh fruit", size: "tall" },
    { image: "board", title: "Our flavours", tag: "Fresh juices" },
    { image: "mocktail", title: "A taste of love", tag: "Romantic drinks" },
    { image: "platter", title: "Fruit arrangements", tag: "Fresh fruit" }
  ]
};
