export const destinations = [
  {
    id: "kyoto", name: "Kyoto", country: "Japan", region: "Asia", continent: "Asia",
    tagline: "Ancient rituals, quiet lanes, and a city in bloom.",
    description: "Kyoto balances centuries-old temples with intimate neighbourhoods, tea houses and a food culture that rewards slow wandering.",
    coords: [35.0116, 135.7681], best: "Mar–May", duration: "4–6 days", temperature: "18°",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Fushimi Inari", type: "Shrine", note: "Walk beneath thousands of vermilion torii gates as the trail climbs into the forest.", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=85" },
      { name: "Kiyomizu-dera", type: "Temple", note: "A hillside temple with sweeping views across Kyoto's tiled rooftops.", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85" },
      { name: "Arashiyama", type: "Neighbourhood", note: "Bamboo groves, river walks and mountain light on the city's western edge.", image: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=85" }
    ]
  },
  {
    id: "lisbon", name: "Lisbon", country: "Portugal", region: "Europe", continent: "Europe",
    tagline: "Sunlit hills, tiled façades, and Atlantic air.",
    description: "Lisbon is made for wandering: steep lanes, neighbourhood bakeries, viewpoints and a riverfront that glows at golden hour.",
    coords: [38.7223, -9.1393], best: "Apr–Jun", duration: "3–5 days", temperature: "21°",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Alfama", type: "Old quarter", note: "Lose yourself among winding lanes, laundry lines and small fado rooms.", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85" },
      { name: "Belém Tower", type: "Landmark", note: "A Manueline riverside fortress and one of Lisbon's defining silhouettes.", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1200&q=85" },
      { name: "LX Factory", type: "Creative district", note: "Independent shops, studios and restaurants inside a converted industrial complex.", image: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=85" }
    ]
  },
  {
    id: "capetown", name: "Cape Town", country: "South Africa", region: "Africa", continent: "Africa",
    tagline: "Ocean, mountain, vineyard — all in one frame.",
    description: "Cape Town layers dramatic landscapes with a vibrant food and design scene, from the Atlantic seaboard to the Winelands.",
    coords: [-33.9249, 18.4241], best: "Nov–Mar", duration: "4–7 days", temperature: "23°",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Table Mountain", type: "Nature", note: "Take the cableway or hike for a perspective that makes the city's geography click.", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85" },
      { name: "Bo-Kaap", type: "Neighbourhood", note: "Colourful façades, Cape Malay heritage and one of the city's most photographed streetscapes.", image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=85" },
      { name: "Boulders Beach", type: "Coast", note: "A sheltered beach where African penguins gather among granite boulders.", image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1200&q=85" }
    ]
  },
  {
    id: "newyork", name: "New York", country: "United States", region: "Americas", continent: "Americas",
    tagline: "Big energy, tiny rituals, endless neighbourhoods.",
    description: "New York rewards curiosity: one subway ride can take you from museum afternoons to late-night slices and skyline walks.",
    coords: [40.7128, -74.0060], best: "Sep–Nov", duration: "4–6 days", temperature: "19°",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Central Park", type: "Park", note: "The city's great pause: paths, reservoirs, bridges and people-watching.", image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=85" },
      { name: "The Met", type: "Museum", note: "A world-class collection that deserves a slow, selective visit.", image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=85" },
      { name: "DUMBO", type: "Neighbourhood", note: "Cobblestones, river light and one of Manhattan's most recognisable bridge views.", image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1200&q=85" }
    ]
  },
  {
    id: "melbourne", name: "Melbourne", country: "Australia", region: "Oceania", continent: "Oceania",
    tagline: "Good coffee, sharp design, and a coastline nearby.",
    description: "Melbourne feels effortlessly lived-in: laneway art, excellent cafés, independent galleries and day trips along the coast.",
    coords: [-37.8136, 144.9631], best: "Mar–May", duration: "4–6 days", temperature: "17°",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Hosier Lane", type: "Laneway", note: "A changing outdoor gallery of large-scale street art in the CBD.", image: "https://images.unsplash.com/photo-1544914379-806667cd9489?auto=format&fit=crop&w=1200&q=85" },
      { name: "Queen Victoria Market", type: "Market", note: "A long-running city market for produce, snacks, makers and local texture.", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=85" },
      { name: "St Kilda", type: "Seaside", note: "Beach walks, old amusement-park charm and sunsets over Port Phillip Bay.", image: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?auto=format&fit=crop&w=1200&q=85" }
    ]
  },
  {
    id: "reykjavik", name: "Reykjavík", country: "Iceland", region: "Europe", continent: "Europe",
    tagline: "Wild landscapes with a small-city rhythm.",
    description: "Use Reykjavík as a base for geothermal pools, volcanic landscapes, black-sand coasts and long northern light.",
    coords: [64.1466, -21.9426], best: "Jun–Aug", duration: "3–5 days", temperature: "10°",
    image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1600&q=85",
    places: [
      { name: "Hallgrímskirkja", type: "Landmark", note: "A striking concrete church inspired by Iceland's basalt landscapes.", image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1200&q=85" },
      { name: "Sky Lagoon", type: "Geothermal", note: "A modern oceanfront geothermal ritual with a dramatic horizon.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85" },
      { name: "Harpa", type: "Culture", note: "A crystalline concert hall on the harbour, especially atmospheric at dusk.", image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=85" }
    ]
  }
];

export const continents = ["All", "Asia", "Europe", "Africa", "Americas", "Oceania"];
