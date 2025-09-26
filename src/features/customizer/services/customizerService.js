// Service layer for customizer functionality
// This service would interact with the ClipNChic database

// API base URL - this would be configured based on your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all available bases from the database
 * Maps to Base table
 */
export const fetchBases = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bases`);
    if (!response.ok) throw new Error('Failed to fetch bases');
    return await response.json();
  } catch (error) {
    console.error('Error fetching bases:', error);
    // Return mock data as fallback
    return [
      {
        id: 1,
        name: "Base Clip",
        color: "Default",
        price: 5.00,
        imageId: 1,
        modelId: 1,
      },
      {
        id: 2,
        name: "Decor Clip",
        color: "Silver", 
        price: 7.50,
        imageId: 2,
        modelId: 2,
      }
    ];
  }
};

/**
 * Fetch all available charms from the database
 * Maps to Charm table
 */
export const fetchCharms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/charms`);
    if (!response.ok) throw new Error('Failed to fetch charms');
    return await response.json();
  } catch (error) {
    console.error('Error fetching charms:', error);
    // Return mock data as fallback
    return [
      {
        id: 1,
        name: "Flower",
        price: 2.5,
        imageId: 3,
        modelId: 3,
      },
      {
        id: 2,
        name: "Heart",
        price: 3.0,
        imageId: 4,
        modelId: 4,
      }
    ];
  }
};

/**
 * Fetch image details by ID
 * Maps to Image table
 */
export const fetchImageById = async (imageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/images/${imageId}`);
    if (!response.ok) throw new Error('Failed to fetch image');
    return await response.json();
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

/**
 * Fetch 3D model details by ID
 * Maps to Model table
 */
export const fetchModelById = async (modelId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}`);
    if (!response.ok) throw new Error('Failed to fetch model');
    return await response.json();
  } catch (error) {
    console.error('Error fetching model:', error);
    return null;
  }
};

/**
 * Create a new custom product
 * Maps to Product table with CharmProduct relations
 */
export const createCustomProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectId: productData.collectId || null,
        title: productData.title,
        descript: productData.descript || '',
        baseId: productData.baseId,
        price: productData.price,
        userId: productData.userId,
        stock: productData.stock || 1,
        modelId: productData.modelId,
        createDate: new Date().toISOString(),
        status: productData.status || 'active',
        charms: productData.charms || [], // Array of charm IDs for CharmProduct table
        customizationData: productData.customizationData // Store 3D positioning data
      })
    });
    
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Save customization configuration for a product
 * This could store the 3D positioning and color data
 */
export const saveCustomization = async (customizationData) => {
  try {
    // This could be stored in a separate table or as JSON in the Product table
    const response = await fetch(`${API_BASE_URL}/customizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseId: customizationData.baseId,
        baseModelColor: customizationData.baseModelColor,
        charms: customizationData.charms.map(charm => ({
          charmId: charm.charmId,
          position: charm.position,
          rotation: charm.rotation,
          scale: charm.scale
        })),
        timestamp: new Date().toISOString(),
        version: customizationData.version || "1.0"
      })
    });
    
    if (!response.ok) throw new Error('Failed to save customization');
    return await response.json();
  } catch (error) {
    console.error('Error saving customization:', error);
    throw error;
  }
};

/**
 * Load a saved customization
 */
export const loadCustomization = async (customizationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customizations/${customizationId}`);
    if (!response.ok) throw new Error('Failed to load customization');
    return await response.json();
  } catch (error) {
    console.error('Error loading customization:', error);
    throw error;
  }
};

/**
 * Fetch collections for organizing products
 * Maps to Collection table
 */
export const fetchCollections = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/collections`);
    if (!response.ok) throw new Error('Failed to fetch collections');
    return await response.json();
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

/**
 * Calculate total price for a custom product
 */
export const calculateCustomProductPrice = (base, selectedCharms) => {
  const basePrice = parseFloat(base.price) || 0;
  const charmsPrices = selectedCharms.reduce((total, charm) => {
    return total + (parseFloat(charm.price) || 0);
  }, 0);
  
  return basePrice + charmsPrices;
};

// Export all services as default object
export default {
  fetchBases,
  fetchCharms,
  fetchImageById,
  fetchModelById,
  createCustomProduct,
  saveCustomization,
  loadCustomization,
  fetchCollections,
  calculateCustomProductPrice
};