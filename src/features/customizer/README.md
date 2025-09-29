# Customizer Feature - Database Integration

This document explains the updated customizer feature that now aligns with the ClipNChic database schema.

## Overview

The customizer has been updated to work with the new database structure where:
- `baseProduct` → `base` (Base table)
- `accessories` → `charm` (Charm table)

## Database Mapping

### Core Tables Used
- **Base**: Hair clip base products with colors and pricing
- **Charm**: Decorative accessories that can be added to bases
- **Product**: Final customized products combining base + charms
- **CharmProduct**: Many-to-many relationship between products and charms
- **Image**: Storage for preview images
- **Model**: Storage for 3D model file references
- **Collection**: Organization of products into collections
- **User**: Product ownership and creation tracking

## File Structure

```
src/features/customizer/
├── components/
│   └── ModelViewer.jsx          # 3D viewer component (updated)
├── css/
│   └── CustomizerLayout.css     # Styling with charm-specific styles
├── hooks/
│   └── useCustomizer.js         # Custom hook for state management
├── mock/
│   └── mockData.js              # Mock data aligned with DB schema
├── pages/
│   └── CustomizerPage.jsx       # Main customizer page (updated)
├── services/
│   └── customizerService.js     # API service layer
└── README.md                    # This file
```

## Key Changes

### 1. Terminology Updates
- `baseProducts` → `bases`
- `accessories` → `charms`
- `selectedProduct` → `selectedBase`
- `selectedAccessory` → `selectedCharm`
- All function names and variables updated accordingly

### 2. Enhanced Data Structure
Each base and charm now includes:
```javascript
{
  id: number,              // Database ID
  name: string,           // Display name
  price: number,          // Price in database format
  imageId: number,        // Reference to Image table
  modelId: number,        // Reference to Model table
  // Resolved references for easy access
  image: object,          // Full image object
  model: object,          // Full model object
  // Backward compatibility
  previewImage: string,   // Direct path
  modelPath: string       // Direct path
}
```

### 3. New Service Layer
`customizerService.js` provides API integration:
- `fetchBases()` - Get all available bases
- `fetchCharms()` - Get all available charms
- `createCustomProduct()` - Save customized product
- `saveCustomization()` - Save customization configuration
- `loadCustomization()` - Load saved customization
- `calculateCustomProductPrice()` - Calculate total price

### 4. Custom Hook
`useCustomizer.js` provides state management:
```javascript
const {
  bases,
  charms,
  selectedBase,
  selectedCharms,
  customizationConfig,
  totalPrice,
  addCharm,
  removeCharm,
  updateCharmConfig,
  saveCustomization,
  createProduct
} = useCustomizer();
```

## Usage Examples

### Basic Implementation
```jsx
import { useCustomizer } from '../hooks/useCustomizer';

function CustomizerPage() {
  const {
    bases,
    charms,
    selectedBase,
    setSelectedBase,
    addCharm,
    totalPrice
  } = useCustomizer();

  return (
    <div>
      {/* Base selection */}
      {bases.map(base => (
        <div key={base.id} onClick={() => setSelectedBase(base)}>
          <img src={base.previewImage} alt={base.name} />
          <p>{base.name} - ${base.price}</p>
        </div>
      ))}

      {/* Charm selection */}
      {charms.map(charm => (
        <div key={charm.id} onClick={() => addCharm(charm)}>
          <img src={charm.previewImage} alt={charm.name} />
          <p>{charm.name} - ${charm.price}</p>
        </div>
      ))}

      <p>Total: ${totalPrice}</p>
    </div>
  );
}
```

### Saving Customization
```javascript
const handleSave = async () => {
  try {
    const result = await saveCustomization();
    console.log('Customization saved:', result);
  } catch (error) {
    console.error('Save failed:', error);
  }
};
```

### Creating Product
```javascript
const handleCreateProduct = async () => {
  try {
    const productData = {
      title: "My Custom Clip",
      description: "A beautiful customized hair clip",
      stock: 1,
      userId: currentUser.id
    };
    
    const result = await createProduct(productData);
    console.log('Product created:', result);
  } catch (error) {
    console.error('Product creation failed:', error);
  }
};
```

## API Integration

To connect with your backend, update the `API_BASE_URL` in `customizerService.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Expected API Endpoints
- `GET /api/bases` - Return array of base objects
- `GET /api/charms` - Return array of charm objects
- `GET /api/images/:id` - Return image object by ID
- `GET /api/models/:id` - Return model object by ID
- `GET /api/collections` - Return array of collection objects
- `POST /api/products` - Create new custom product
- `POST /api/customizations` - Save customization configuration
- `GET /api/customizations/:id` - Load customization by ID

## 3D Model Integration

The ModelViewer component has been updated to:
- Handle charm drag-and-drop
- Support transform controls for positioning charms
- Save/load 3D positioning data
- Apply single color customization to base models

### Charm Positioning Data
Each charm in a customization stores:
```javascript
{
  charmId: number,        // Reference to Charm table
  position: [x, y, z],    // 3D position
  rotation: [x, y, z],    // 3D rotation  
  scale: [x, y, z]        // 3D scale
}
```

### Color Customization
The base model supports single color customization:
- **baseModelColor**: Applied to the entire base model

## Styling

New CSS classes added for charm display:
- `.customizer-layout-charm-item` - Container for charm display
- `.customizer-layout-charm-name` - Charm name styling
- `.customizer-layout-charm-price` - Charm price styling
- `.customizer-layout-product-price` - Base product price styling

## Migration Notes

When migrating from the old structure:
1. Update all references from `baseProducts` to `bases`
2. Update all references from `accessories` to `charms`
3. Remove materials and textures components (not in database)
4. Update state variable names accordingly
5. Replace mock data imports
6. Integrate with the new service layer
7. Update component props to use new naming

## Environment Setup

Add to your `.env` file:
```
REACT_APP_API_URL=http://your-backend-url/api
```

This ensures the customizer can connect to your ClipNChic database API.