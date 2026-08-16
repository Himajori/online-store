/* Product inventory — array of JavaScript objects */
const PRODUCTS = [
  {
    id: "HL-101",
    name: "Ceramic Pour-Over Mug",
    price: 18.0,
    shortDescription: "Matte stoneware mug sized for a slow morning pour.",
    longDescription:
      "Hand-finished stoneware with a wide mouth and steady base. Holds 12 oz, microwave-safe, and built for daily coffee or tea.",
    thumbnail:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-102",
    name: "Field Notebook",
    price: 12.5,
    shortDescription: "Pocket notebook with numbered pages and a cloth cover.",
    longDescription:
      "A5 softcover notebook with 120 dotted pages, a lay-flat stitch binding, and an elastic band for closing.",
    thumbnail:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-103",
    name: "Daylight Desk Lamp",
    price: 42.0,
    shortDescription: "Adjustable LED lamp with warm and cool modes.",
    longDescription:
      "Compact aluminum desk lamp with three brightness levels and warm/cool color modes for long work sessions.",
    thumbnail:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-104",
    name: "Canvas Weekender Tote",
    price: 36.75,
    shortDescription: "Heavy canvas tote with interior pocket and long straps.",
    longDescription:
      "12 oz cotton canvas with reinforced stitching, an interior zip pocket, and straps long enough for shoulder carry.",
    thumbnail:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-105",
    name: "Wireless Earbuds",
    price: 59.99,
    shortDescription: "Compact earbuds with a charging case for commuting.",
    longDescription:
      "Lightweight earbuds with touch controls, a magnetic charging case, and clear mics for calls on the go.",
    thumbnail:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-106",
    name: "USB-C Multiport Hub",
    price: 34.95,
    shortDescription: "Four-port hub for laptop docks and travel kits.",
    longDescription:
      "Adds HDMI, USB-A, USB-C data, and SD card slots through one USB-C connection in an aluminum shell.",
    thumbnail:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-107",
    name: "Linen Tea Towel Set",
    price: 22.0,
    shortDescription: "Set of two washed linen towels for the kitchen.",
    longDescription:
      "Soft pre-washed linen towels that dry quickly and hang neatly from a stitched loop.",
    thumbnail:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-108",
    name: "Beeswax Candle",
    price: 16.5,
    shortDescription: "Slow-burn beeswax candle in a frosted glass jar.",
    longDescription:
      "Naturally scented beeswax with a cotton wick and about 35 hours of steady burn time.",
    thumbnail:
      "https://images.unsplash.com/photo-1603006905004-abe642ffe562?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-109",
    name: "Oak Cutting Board",
    price: 48.0,
    shortDescription: "Thick oak board with juice groove and oil finish.",
    longDescription:
      "End-grain oak board sealed with food-safe oil, sized for daily prep and serving cheese.",
    thumbnail:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-110",
    name: "Stainless Water Bottle",
    price: 28.0,
    shortDescription: "Insulated 20 oz bottle that keeps drinks cold or hot.",
    longDescription:
      "Double-wall stainless steel bottle with a leak-resistant lid and powder-coated exterior.",
    thumbnail:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-111",
    name: "Wool Beanie",
    price: 24.0,
    shortDescription: "Merino blend beanie for cool mornings.",
    longDescription:
      "Soft merino-acrylic blend that breathes well and keeps its shape after washing.",
    thumbnail:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-112",
    name: "Leather Card Case",
    price: 32.0,
    shortDescription: "Slim vegetable-tanned leather case for cards and cash.",
    longDescription:
      "Two card slots and a center pocket for folded notes, stitched with waxed thread.",
    thumbnail:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-113",
    name: "Ceramic Plant Pot",
    price: 19.5,
    shortDescription: "Speckled pot with drainage hole and saucer.",
    longDescription:
      "Mid-size ceramic planter with a matching saucer for herbs and small houseplants.",
    thumbnail:
      "https://images.unsplash.com/photo-1485955900006-10f4d32477c2?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-114",
    name: "Bamboo Desk Organizer",
    price: 27.0,
    shortDescription: "Three-compartment tray for pens and small tools.",
    longDescription:
      "Smooth bamboo organizer that keeps stationery, cables, and sticky notes in one place.",
    thumbnail:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-115",
    name: "Cotton Throw Blanket",
    price: 54.0,
    shortDescription: "Lightweight woven throw for sofa or bed.",
    longDescription:
      "Breathable cotton weave with fringed edges, machine washable and easy to drape.",
    thumbnail:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-116",
    name: "Glass Food Containers",
    price: 29.99,
    shortDescription: "Set of three glass boxes with locking lids.",
    longDescription:
      "Oven-safe glass containers with snap lids for leftovers, meal prep, and fridge storage.",
    thumbnail:
      "https://images.unsplash.com/photo-1604719312566-891d68d2c9c9?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-117",
    name: "Mechanical Pencil Set",
    price: 14.0,
    shortDescription: "Two 0.5 mm pencils with spare leads and erasers.",
    longDescription:
      "Metal-barrel pencils with a soft grip and a tin of refill leads for sketching and notes.",
    thumbnail:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-118",
    name: "Travel Packing Cubes",
    price: 31.0,
    shortDescription: "Set of three mesh cubes for organized packing.",
    longDescription:
      "Lightweight cubes with two-way zippers to separate clothes and keep luggage tidy.",
    thumbnail:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-119",
    name: "Cast Iron Skillet",
    price: 45.0,
    shortDescription: "Pre-seasoned 10-inch skillet for stovetop and oven.",
    longDescription:
      "Even-heating cast iron with a helper handle, ready for searing, baking, and camping trips.",
    thumbnail:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-120",
    name: "Bluetooth Speaker",
    price: 64.0,
    shortDescription: "Portable speaker with 12-hour battery life.",
    longDescription:
      "IPX5 splash-resistant speaker with rich bass and a USB-C charge port for travel.",
    thumbnail:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-121",
    name: "Silk Sleep Mask",
    price: 18.5,
    shortDescription: "Soft mulberry silk mask with adjustable strap.",
    longDescription:
      "Gentle on skin and hair, with contoured padding that blocks light without pressure.",
    thumbnail:
      "https://images.unsplash.com/photo-1541781779527-4eb94874012a?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-122",
    name: "Reusable Produce Bags",
    price: 15.0,
    shortDescription: "Set of five mesh bags for market shopping.",
    longDescription:
      "Washable mesh bags with drawstrings, sized for fruit, vegetables, and bulk goods.",
    thumbnail:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-123",
    name: "Desk Calendar Stand",
    price: 21.0,
    shortDescription: "Wood stand with tear-off monthly sheets.",
    longDescription:
      "Solid wood base and a full year of dated sheets for planning at a glance.",
    thumbnail:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-124",
    name: "Insulated Lunch Tote",
    price: 26.5,
    shortDescription: "Padded tote that keeps lunch cool for hours.",
    longDescription:
      "Water-resistant exterior, foil lining, and a front pocket for utensils and napkins.",
    thumbnail:
      "https://images.unsplash.com/photo-1593095948071-474c5ee0d86b?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-125",
    name: "Yoga Mat",
    price: 38.0,
    shortDescription: "Non-slip 5 mm mat with carrying strap.",
    longDescription:
      "Closed-cell foam mat that cushions joints and rolls compact for studio or home use.",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-126",
    name: "Coffee Pour-Over Set",
    price: 41.0,
    shortDescription: "Glass dripper, server, and paper filters.",
    longDescription:
      "Heat-resistant glass pour-over kit for a clean cup without a machine.",
    thumbnail:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-127",
    name: "Wall Clock",
    price: 33.0,
    shortDescription: "Silent sweep clock with a matte metal frame.",
    longDescription:
      "Battery-powered wall clock with a quiet movement and easy-to-read numerals.",
    thumbnail:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe70?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-128",
    name: "Gardening Glove Pair",
    price: 17.0,
    shortDescription: "Breathable gloves with grip palms.",
    longDescription:
      "Flexible gloves with reinforced fingertips for planting, weeding, and potting.",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-129",
    name: "Phone Tripod",
    price: 23.5,
    shortDescription: "Foldable mini tripod with phone clamp.",
    longDescription:
      "Lightweight aluminum legs and a ball head for desk videos and travel photos.",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-130",
    name: "Scented Diffuser",
    price: 29.0,
    shortDescription: "Reed diffuser with a soft cedar scent.",
    longDescription:
      "Glass bottle, natural reeds, and a long-lasting oil blend for living rooms and desks.",
    thumbnail:
      "https://images.unsplash.com/photo-1602921830852-6e771678b3f6?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-131",
    name: "Cable Organizer Kit",
    price: 12.99,
    shortDescription: "Velcro ties and clips for desk cables.",
    longDescription:
      "Reusable ties and adhesive clips to keep chargers and peripherals from tangling.",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-132",
    name: "Enamel Mug",
    price: 14.5,
    shortDescription: "Camp-style mug for coffee outdoors or at home.",
    longDescription:
      "Speckle enamel on steel with a welded handle that stands up to campfires and dishwashers.",
    thumbnail:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-133",
    name: "Folding Umbrella",
    price: 25.0,
    shortDescription: "Wind-resistant compact umbrella with auto open.",
    longDescription:
      "Fiberglass ribs and a water-repellent canopy that packs into a slim sleeve.",
    thumbnail:
      "https://images.unsplash.com/photo-1524634126441-9374aa45b3d4?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-134",
    name: "Kitchen Scale",
    price: 27.5,
    shortDescription: "Digital scale with gram and ounce modes.",
    longDescription:
      "Tare function, backlit display, and a slim profile that stores in a drawer.",
    thumbnail:
      "https://images.unsplash.com/photo-1556911220-bff31c28d293?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-135",
    name: "Photo Frame Set",
    price: 30.0,
    shortDescription: "Set of three wood frames for 4x6 photos.",
    longDescription:
      "Natural wood frames with standing easels and wall hooks included.",
    thumbnail:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-136",
    name: "Laptop Sleeve",
    price: 35.0,
    shortDescription: "Padded 14-inch sleeve with zipper pocket.",
    longDescription:
      "Soft-lined sleeve that fits most 13–14 inch laptops with room for a charger.",
    thumbnail:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-137",
    name: "Herb Scissors",
    price: 11.0,
    shortDescription: "Multi-blade scissors for chopping herbs fast.",
    longDescription:
      "Five stainless blades and a cleaning comb for basil, cilantro, and green onions.",
    thumbnail:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-138",
    name: "Reading Light Clip",
    price: 19.0,
    shortDescription: "USB-rechargeable clip light for books and beds.",
    longDescription:
      "Warm LED clip light with three brightness levels and a flexible neck.",
    thumbnail:
      "https://images.unsplash.com/photo-1532012197267-da84d127e954?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-139",
    name: "Doormat",
    price: 28.5,
    shortDescription: "Coir doormat with a non-slip rubber back.",
    longDescription:
      "Tough natural coir fibers that scrape mud and trap dirt at the door.",
    thumbnail:
      "https://images.unsplash.com/photo-1556912173-46c336b7dd52?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: "HL-140",
    name: "Travel Journal",
    price: 20.0,
    shortDescription: "Hardcover journal with blank and lined pages.",
    longDescription:
      "Ribbon marker, elastic closure, and mixed pages for sketches and trip notes.",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&h=800&q=80",
  },
];

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function formatMoney(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
