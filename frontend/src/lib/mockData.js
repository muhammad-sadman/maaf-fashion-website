export const mockCategories = [
  { id: 1, name: "Men's Wear", slug: "mens-wear", product_count: 2 },
  { id: 2, name: "Women's Wear", slug: "womens-wear", product_count: 2 },
  { id: 3, name: "Kids' Wear", slug: "kids-wear", product_count: 2 },
  { id: 4, name: "Baby Wear", slug: "baby-wear", product_count: 2 },
];

export const mockProducts = [
  {
    id: 1,
    name: "Classic Crew Neck T-Shirt",
    slug: "mw-1001-classic-crew-neck-t-shirt",
    sku_style_code: "MW-1001",
    category: mockCategories[0],
    description: "100% combed cotton, 180 GSM, single jersey knit.",
    image: null,
  },
  {
    id: 2,
    name: "Zip-Through Fleece Hoodie",
    slug: "mw-1042-zip-through-fleece-hoodie",
    sku_style_code: "MW-1042",
    category: mockCategories[0],
    description: "Brushed-back fleece, 320 GSM, YKK zipper.",
    image: null,
  },
  {
    id: 3,
    name: "Ribbed Tank Top",
    slug: "ww-2010-ribbed-tank-top",
    sku_style_code: "WW-2010",
    category: mockCategories[1],
    description: "Stretch cotton-elastane rib, 210 GSM.",
    image: null,
  },
  {
    id: 4,
    name: "Relaxed Fit Sweatshirt",
    slug: "ww-2077-relaxed-fit-sweatshirt",
    sku_style_code: "WW-2077",
    category: mockCategories[1],
    description: "Loopback cotton fleece, garment-washed.",
    image: null,
  },
  {
    id: 5,
    name: "Printed Graphic Tee",
    slug: "kw-3005-printed-graphic-tee",
    sku_style_code: "KW-3005",
    category: mockCategories[2],
    description: "Organic cotton, water-based ink print.",
    image: null,
  },
  {
    id: 6,
    name: "Jogger Set (2-piece)",
    slug: "kw-3019-jogger-set",
    sku_style_code: "KW-3019",
    category: mockCategories[2],
    description: "Interlock cotton, elasticated waistband.",
    image: null,
  },
  {
    id: 7,
    name: "Bodysuit 3-Pack",
    slug: "bw-4002-bodysuit-3-pack",
    sku_style_code: "BW-4002",
    category: mockCategories[3],
    description: "GOTS-certified organic cotton, snap closures.",
    image: null,
  },
  {
    id: 8,
    name: "Knit Romper",
    slug: "bw-4015-knit-romper",
    sku_style_code: "BW-4015",
    category: mockCategories[3],
    description: "Soft rib knit, flatlock seams for sensitive skin.",
    image: null,
  },
];

export const mockCertifications = [
  { id: 1, name: "ISO 9001:2015", description: "Quality Management System", issuing_body: "ISO" },
  { id: 2, name: "WRAP", description: "Worldwide Responsible Accredited Production", issuing_body: "WRAP" },
  { id: 3, name: "BSCI", description: "Business Social Compliance Initiative", issuing_body: "amfori" },
  { id: 4, name: "SEDEX / SMETA", description: "Ethical trade audit membership", issuing_body: "Sedex" },
  { id: 5, name: "OEKO-TEX Standard 100", description: "Tested for harmful substances", issuing_body: "OEKO-TEX" },
  { id: 6, name: "GOTS", description: "Global Organic Textile Standard", issuing_body: "GOTS" },
  { id: 7, name: "BCI", description: "Better Cotton Initiative member", issuing_body: "Better Cotton" },
];

export const mockDepartments = [
  {
    id: 1,
    name: "Knitting",
    slug: "knitting",
    description: "State-of-the-art circular and flat knitting floor.",
    equipment_items: [
      "18 x Single Jersey Circular Knitting Machines",
      "6 x Rib Knitting Machines",
      "4 x Flatbed Knitting Machines",
    ],
    daily_capacity: "30,000 pcs/day",
  },
  {
    id: 2,
    name: "Dyeing",
    slug: "dyeing",
    description: "High-precision dyeing with reduced water consumption.",
    equipment_items: [
      "8 x High-Temperature Dyeing Machines",
      "4 x Sample Dyeing Units",
      "2 x Effluent Treatment Plants",
    ],
    daily_capacity: "20,000 kg/day",
  },
  {
    id: 3,
    name: "Printing & Embroidery",
    slug: "printing-embroidery",
    description: "In-house print and embroidery for full vertical control.",
    equipment_items: [
      "6 x Automatic Screen Printing Machines",
      "10 x Computerized Embroidery Heads",
      "2 x Digital Printing Units",
    ],
    daily_capacity: "15,000 pcs/day",
  },
];

export const mockStats = [
  { id: 1, label: "Years of Experience", value: "15", suffix: "+" },
  { id: 2, label: "Daily Production Capacity", value: "65,000", suffix: "pcs" },
  { id: 3, label: "Workforce", value: "1,200", suffix: "staff" },
  { id: 4, label: "Export Markets", value: "20", suffix: "+ countries" },
];

export const mockGallery = [
  { id: 1, title: "Factory Floor Overview", category: "infrastructure", caption: "Factory Floor Overview" },
  { id: 2, title: "Central Warehouse", category: "infrastructure", caption: "Central Warehouse" },
  { id: 3, title: "Knitting Line in Operation", category: "process", caption: "Knitting Line in Operation" },
  { id: 4, title: "Quality Control Checkpoint", category: "process", caption: "Quality Control Checkpoint" },
  { id: 5, title: "Worker Welfare Facility", category: "welfare", caption: "Worker Welfare Facility" },
  { id: 6, title: "On-Site Medical Center", category: "welfare", caption: "On-Site Medical Center" },
];

export const mockAboutImages = [];
