// Mock data for custom products based on database schema
export const customProducts = [
  {
    id: 1,
    collectId: 1,
    title: "Pink Butterfly Dreams",
    descript: "A beautiful pink hair clip with butterfly charm",
    baseId: 1,
    price: 25.99,
    userId: 1,
    stock: 1,
    modelId: 1,
    createDate: "2024-01-15T10:30:00Z",
    status: "public",
    previewImage: "/mock/customization-decor-clip-1758790253876.png",
    configurationFile: "/mock/customization-decor-clip-1758790253872.json"
  },
  {
    id: 2,
    collectId: 1,
    title: "Golden Star Collection",
    descript: "Elegant golden hair clip with multiple star charms",
    baseId: 2,
    price: 32.50,
    userId: 2,
    stock: 1,
    modelId: 2,
    createDate: "2024-01-20T14:15:00Z",
    status: "public",
    previewImage: "/mock/customization-decor-clip-1758790253876.png",
    configurationFile: "/mock/customization-decor-clip-1758790253872.json"
  },
  {
    id: 3,
    collectId: 2,
    title: "Ocean Breeze",
    descript: "Blue themed hair clip with flower and pearl charms",
    baseId: 1,
    price: 28.75,
    userId: 1,
    stock: 1,
    modelId: 1,
    createDate: "2024-01-22T09:45:00Z",
    status: "public",
    previewImage: "/mock/customization-decor-clip-1758790253876.png",
    configurationFile: "/mock/customization-decor-clip-1758790253872.json"
  },
  {
    id: 4,
    collectId: 1,
    title: "Vintage Rose",
    descript: "Classic white base with elegant rose charm",
    baseId: 3,
    price: 22.00,
    userId: 3,
    stock: 1,
    modelId: 3,
    createDate: "2024-01-25T16:20:00Z",
    status: "public",
    previewImage: "/mock/customization-decor-clip-1758790253876.png",
    configurationFile: "/mock/customization-decor-clip-1758790253872.json"
  },
  {
    id: 5,
    collectId: 2,
    title: "Rainbow Fantasy",
    descript: "Colorful creation with multiple mixed charms",
    baseId: 2,
    price: 35.25,
    userId: 2,
    stock: 1,
    modelId: 2,
    createDate: "2024-01-28T11:10:00Z",
    status: "public",
    previewImage: "/mock/customization-decor-clip-1758790253876.png",
    configurationFile: "/mock/customization-decor-clip-1758790253872.json"
  }
];

// Mock collections data
export const collections = [
  {
    id: 1,
    name: "Classic Collection",
    descript: "Timeless and elegant designs"
  },
  {
    id: 2,
    name: "Modern Collection", 
    descript: "Contemporary and trendy styles"
  }
];

// Mock users data (for reference)
export const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com"
  }
];