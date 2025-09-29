// Enhanced mock data structure aligned with database schema
// In production, this would be replaced by API calls to customizerService.js

// Mock Images (Maps to Image table)
export const mockImages = [
  { id: 1, name: "base_clip_preview", address: "/mock/images/products/base_clip.png" },
  { id: 2, name: "decor_clip_preview", address: "/mock/images/products/decor_clip.png" },
  { id: 3, name: "flower_charm_preview", address: "/mock/images/accessories/flower.png" },
  { id: 4, name: "heart_charm_preview", address: "/mock/images/accessories/heart.png" },
];

// Mock 3D Models (Maps to Model table)
export const mockModels = [
  { id: 1, name: "base_clip_model", address: "/mock/models/base_clip.glb" },
  { id: 2, name: "decor_clip_model", address: "/mock/models/decor_clip.glb" },
  { id: 3, name: "flower_charm_model", address: "/mock/models/accessories/flower.glb" },
  { id: 4, name: "heart_charm_model", address: "/mock/models/accessories/heart.glb" },
];

// Mock Collections (Maps to Collection table)
export const mockCollections = [
  { id: 1, name: "Basic Collection", descript: "Simple and elegant designs" },
  { id: 2, name: "Decorative Collection", descript: "Ornate and detailed pieces" },
];
// Base Products (aligned with Base table in database)
export const bases = [
  {
    id: 1,
    name: "Base Clip",
    color: "Default",
    price: 5.00,
    imageId: 1, // References Image table
    modelId: 1, // References Model table
    // Enhanced with resolved references for easy access
    image: mockImages.find(img => img.id === 1),
    model: mockModels.find(model => model.id === 1),
    // For backward compatibility with existing code
    previewImage: "/mock/images/products/base_clip.png",
    modelPath: "/mock/models/base_clip.glb",
  },
  {
    id: 2,
    name: "Decor Clip",
    color: "Silver",
    price: 7.50,
    imageId: 2,
    modelId: 2,
    image: mockImages.find(img => img.id === 2),
    model: mockModels.find(model => model.id === 2),
    previewImage: "/mock/images/products/decor_clip.png",
    modelPath: "/mock/models/decor_clip.glb",
  },
];

// Materials and Textures removed - not in database schema

// Charms (aligned with Charm table in database)
export const charms = [
  {
    id: 1,
    name: "Flower",
    price: 2.5,
    imageId: 3, // References Image table
    modelId: 3, // References Model table
    // Enhanced with resolved references
    image: mockImages.find(img => img.id === 3),
    model: mockModels.find(model => model.id === 3),
    // For backward compatibility
    previewImage: "/mock/images/accessories/flower.png",
    modelPath: "/mock/models/accessories/flower.glb",
  },
  {
    id: 2,
    name: "Heart",
    price: 3.0,
    imageId: 4,
    modelId: 4,
    image: mockImages.find(img => img.id === 4),
    model: mockModels.find(model => model.id === 4),
    previewImage: "/mock/images/accessories/heart.png",
    modelPath: "/mock/models/accessories/heart.glb",
  },
];
