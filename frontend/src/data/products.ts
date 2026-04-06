export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  flavorNotes: string;
  image: string;
  category: "classic" | "specialty" | "vegan" | "sugar-free";
  featured?: boolean;
  isFlavorOfMonth?: boolean;
  pairsWellWith?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Madagascar Vanilla",
    price: 18.5,
    description:
      "Our signature handcrafted vanilla ice cream made with rare Madagascar vanilla beans, creating an unparalleled depth of flavor.",
    flavorNotes: "Pure Madagascar vanilla, hints of caramel, rich cream",
    image:
      "https://images.unsplash.com/photo-1689076758310-92b693fe6b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "classic",
    featured: true,
    isFlavorOfMonth: true,
    pairsWellWith: ["Dark Chocolate Truffle", "Salted Caramel"],
    reviews: [
      {
        id: "r1",
        author: "Sophie Chen",
        rating: 5,
        comment:
          "The most exquisite vanilla I've ever tasted. Worth every penny.",
        date: "2026-03-28",
      },
      {
        id: "r2",
        author: "Marcus Williams",
        rating: 5,
        comment:
          "Absolutely divine. You can taste the quality in every spoonful.",
        date: "2026-03-25",
      },
    ],
  },
  {
    id: "2",
    name: "Dark Chocolate Truffle",
    price: 19.0,
    description:
      "Rich Belgian dark chocolate infused with espresso undertones, finished with hand-rolled truffle pieces.",
    flavorNotes: "72% dark chocolate, espresso, cocoa nibs",
    image:
      "https://anitalianinmykitchen.com/wp-content/uploads/2016/07/icream-truffles-sq-1-of-1.jpg",
    category: "classic",
    featured: true,
    pairsWellWith: ["Madagascar Vanilla", "Pistachio & Rose"],
    reviews: [
      {
        id: "r3",
        author: "Elena Rodriguez",
        rating: 5,
        comment:
          "Decadent and sophisticated. The truffle pieces are perfection.",
        date: "2026-03-30",
      },
    ],
  },
  {
    id: "3",
    name: "Salted Caramel",
    price: 17.5,
    description:
      "Butter caramel swirled through cream, delicately balanced with Himalayan pink salt crystals.",
    flavorNotes: "Butter caramel, Himalayan pink salt, vanilla cream",
    image:
      "https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "classic",
    featured: true,
    pairsWellWith: ["Madagascar Vanilla", "Dark Chocolate Truffle"],
  },
  {
    id: "4",
    name: "Pistachio & Rose",
    price: 20.0,
    description:
      "Sicilian pistachios ground fresh daily, delicately perfumed with Damascus rose water.",
    flavorNotes: "Sicilian pistachio, Damascus rose, honey",
    image:
      "https://michellesipsandsavors.com/wp-content/uploads/2019/06/DD30B797-B6E8-4E9E-AB08-90F5811E6CAE-960x1200.jpeg",
    category: "specialty",
    featured: true,
    pairsWellWith: ["Honey Lavender", "Dark Chocolate Truffle"],
  },
  {
    id: "5",
    name: "Honey Lavender",
    price: 18.0,
    description:
      "Wildflower honey infused with French lavender, creating an aromatic and floral masterpiece.",
    flavorNotes: "Wildflower honey, French lavender, cream",
    image:
      "https://images.unsplash.com/photo-1650455459097-d8ebc86d6805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "specialty",
    pairsWellWith: ["Pistachio & Rose", "Madagascar Vanilla"],
  },
  {
    id: "6",
    name: "Earl Grey & Bergamot",
    price: 18.5,
    description:
      "Premium Earl Grey tea steeped overnight, highlighted with bergamot essence and cream.",
    flavorNotes: "Earl Grey tea, bergamot, vanilla",
    image:
      "https://images.unsplash.com/photo-1532537455099-5025af0bac65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "specialty",
    pairsWellWith: ["Honey Lavender", "Dark Chocolate Truffle"],
  },
  {
    id: "7",
    name: "Coconut Cream (Vegan)",
    price: 17.0,
    description:
      "Organic coconut milk base with toasted coconut flakes, completely dairy-free without compromise.",
    flavorNotes: "Organic coconut, toasted coconut, vanilla",
    image:
      "https://images.unsplash.com/photo-1671466357495-bff7bacafd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "vegan",
    pairsWellWith: ["Dark Chocolate Truffle", "Salted Caramel"],
  },
  {
    id: "8",
    name: "Almond Praline (Vegan)",
    price: 18.0,
    description:
      "Almond milk infused with house-made praline, studded with candied almonds.",
    flavorNotes: "Almond milk, praline, candied almonds",
    image:
      "https://images.unsplash.com/photo-1586090447164-1802e5fc27b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "vegan",
    pairsWellWith: ["Coconut Cream (Vegan)", "Dark Chocolate Truffle"],
  },
  {
    id: "9",
    name: "Sugar-Free Vanilla Bean",
    price: 16.5,
    description:
      "All the luxury of our classic vanilla, crafted with natural sweeteners for guilt-free indulgence.",
    flavorNotes: "Vanilla bean, natural sweetener, cream",
    image:
      "https://images.unsplash.com/photo-1559398049-0a4a31ebb9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "sugar-free",
    pairsWellWith: ["Dark Chocolate Truffle", "Salted Caramel"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getFlavorOfMonth = (): Product | undefined => {
  return products.find((p) => p.isFlavorOfMonth);
};
