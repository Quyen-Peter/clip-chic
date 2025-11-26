import { apiRequest } from '../../../services/apiClient';

/**
 * Fetch all available bases from the database
 * GET /Base/GetAll
 */
export const fetchBases = async () => {
  try {
    return await apiRequest('Base/GetAll');
  } catch (error) {
    console.error('Error fetching bases:', error);
    throw error;
  }
};

/**
 * Fetch all available charms from the database
 * GET /Charm/GetAll
 */
export const fetchCharms = async () => {
  try {
    return await apiRequest('Charm/GetAll');
  } catch (error) {
    console.error('Error fetching charms:', error);
    throw error;
  }
};

/**
 * Fetch user's custom products
 * GET /Product/GetByUserId
 * Only loads products created by the currently logged-in user
 */
export const fetchUserProducts = async () => {
  try {
    return await apiRequest('Product/GetByUserId');
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw error;
  }
};

/**
 * Create a new custom product
 * POST /Product/Create
 */
export const createCustomProduct = async (productData, images, modelFile) => {
  try {
    const formData = new FormData();
    
    formData.append('collectId', productData.collectId || '');
    formData.append('title', productData.title || '');
    formData.append('descript', productData.descript || '');
    formData.append('baseId', productData.baseId || '');
    formData.append('price', productData.price || 0);
    formData.append('userId', productData.userId || '');
    formData.append('stock', productData.stock || 1);
    formData.append('createDate', new Date().toISOString());
    formData.append('status', productData.status || 'active');
    
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('Images', image);
      });
    }
    
    if (modelFile) {
      formData.append('ModelFile', modelFile);
    }

    return await apiRequest('Product/Create', {
      method: 'POST',
      body: formData
    });
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing custom product (including model file)
 * PUT /Product/UpdateWithFile
 */
export const updateCustomProduct = async (productData, images, modelFile) => {
  try {
    const formData = new FormData();

    formData.append('id', productData.id || '');
    formData.append('collectId', productData.collectId || '');
    formData.append('title', productData.title || '');
    formData.append('descript', productData.descript || '');
    formData.append('baseId', productData.baseId || '');
    formData.append('price', productData.price || 0);
    formData.append('userId', productData.userId || '');
    formData.append('stock', productData.stock || 1);
    formData.append('modelId', productData.modelId || '');
    formData.append('createDate', productData.createDate || new Date().toISOString());
    formData.append('status', productData.status || 'active');
    
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('Images', image);
      });
    }
    
    if (modelFile) {
      formData.append('ModelFile', modelFile);
    }

    return await apiRequest('Product/UpdateWithFile', {
      method: 'PUT',
      body: formData
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
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
const customizerService = {
  fetchBases,
  fetchCharms,
  fetchUserProducts,
  createCustomProduct,
  updateCustomProduct,
  calculateCustomProductPrice
};

export default customizerService;
