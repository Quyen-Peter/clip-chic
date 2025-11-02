# Customizer API Integration Guide

## Overview
The customizer feature has been integrated with the ClipNChic backend API. This guide explains the API endpoints being used and how to test the integration.

## API Endpoints Used

### 1. Fetch All Bases
**Endpoint:** `GET /Base/GetAll`
**Purpose:** Get all available base hair clips for customization
**Service Function:** `fetchBases()`
**Location:** `src/features/customizer/services/customizerService.ts`

### 2. Fetch All Charms
**Endpoint:** `GET /Charm/GetAll`
**Purpose:** Get all available charms/accessories that can be added to bases
**Service Function:** `fetchCharms()`
**Location:** `src/features/customizer/services/customizerService.ts`

### 3. Fetch User's Products
**Endpoint:** `GET /Product/GetByUserId`
**Purpose:** Get all custom products created by the logged-in user
**Service Function:** `fetchUserProducts()`
**Location:** `src/features/customizer/services/customizerService.ts`
**Authentication:** Required (uses JWT token from sessionStorage)

### 4. Create Custom Product
**Endpoint:** `POST /Product/Create`
**Purpose:** Save a newly created custom product to the database
**Service Function:** `createCustomProduct(productData, images, modelFile)`
**Location:** `src/features/customizer/services/customizerService.ts`
**Content-Type:** `multipart/form-data`
**Authentication:** Required (uses JWT token from sessionStorage)

**Request Parameters:**
```typescript
{
  collectId?: number,
  title: string,
  descript?: string,
  baseId: number,
  price: number,
  userId: number,
  stock?: number,
  createDate: string,
  status?: string,
  Images?: File[],
  ModelFile?: File
}
```

## Data Models

### Base
```typescript
interface Base {
  id: number;
  name: string;
  color: string;
  price: number;
  imageId?: number;
  modelId?: number;
}
```

### Charm
```typescript
interface Charm {
  id: number;
  name: string;
  price: number;
  imageId?: number;
  modelId?: number;
}
```

### Product
```typescript
interface Product {
  id: number;
  collectId?: number;
  title: string;
  descript?: string;
  baseId: number;
  price: number;
  userId: number;
  stock: number;
  createDate: string;
  status: string;
}
```

## Authentication

The customizer uses JWT token-based authentication. The token is stored in `sessionStorage` after login.

**Auth Utility:** `src/utils/authUtils.ts`

### Key Functions:
- `getToken()` - Retrieves JWT token from sessionStorage
- `getUserIdFromToken()` - Extracts user ID from JWT token
- `isAuthenticated()` - Checks if user is logged in
- `logout()` - Clears authentication data

## Configuration

The API base URL is configured in `src/services/apiClient.ts`:
```typescript
const DEFAULT_API_BASE_URL = "https://localhost:7169";

export const API_BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_BASE_URL ?? DEFAULT_API_BASE_URL
);
```

To override the default, set the environment variable:
```
REACT_APP_API_BASE_URL=https://your-backend-url
```

## File Structure

```
src/features/customizer/
├── components/
│   ├── SaveProductModal.jsx         # Updated with API integration
│   └── ... other components
├── pages/
│   └── CustomizerPage.jsx           # Main page with API integration
├── services/
│   └── customizerService.ts         # API service layer
├── types/
│   └── index.ts                     # TypeScript interfaces
└── API_INTEGRATION_GUIDE.md         # This file
```

## Testing the Integration

### 1. Load Bases and Charms
The CustomizerPage will automatically load bases and charms when the page loads. Verify by:
- Checking browser Network tab for `/Base/GetAll` and `/Charm/GetAll` requests
- Checking browser Console for any errors

### 2. Create a Custom Product
1. Select a base from the Base Product menu
2. Add charms by double-clicking on them
3. Click "Save & Product" button
4. Fill in the product details (title, description, visibility)
5. Click "Save Product"

**Expected behavior:**
- Success toast notification appears
- Modal closes
- Product is saved to the database

### 3. Error Handling
The application handles the following errors:
- **Not authenticated:** User must be logged in to save products
- **Invalid title:** Product title is required
- **API errors:** Server error messages are displayed in toast notifications
- **Network errors:** Connection errors are handled gracefully

## Common Issues and Solutions

### Issue: 401 Unauthorized
**Cause:** JWT token is missing or expired
**Solution:** 
- Check that user is logged in via Google/Facebook login
- Clear sessionStorage and log in again
- Verify token is being sent in Authorization header

### Issue: CORS errors
**Cause:** Backend CORS policy doesn't allow frontend origin
**Solution:**
- Check backend CORS configuration
- Ensure REACT_APP_API_BASE_URL matches backend domain
- Verify backend allows the frontend origin

### Issue: 500 Internal Server Error
**Cause:** Backend processing error
**Solution:**
- Check backend logs for detailed error
- Verify all required fields are being sent
- Ensure files (if any) are in correct format

## Future Enhancements

1. **Image Capture**: Implement screenshot capture from 3D model viewer
2. **Model Export**: Export customized 3D model as file
3. **Charm Positioning**: Save exact 3D positioning of charms in database
4. **Gallery View**: Display user's created products in a gallery
5. **Product Edit**: Allow users to edit previously created products
6. **Product Share**: Share customized products with other users

## Environment Setup

Add to `.env`:
```
REACT_APP_API_BASE_URL=https://localhost:7169
```

Or use the default URL if running backend on standard ASP.NET Core HTTPS port.

## Support

For issues or questions:
1. Check browser Console for error messages
2. Check Network tab to verify API calls
3. Review backend logs for server-side errors
4. Contact the development team with screenshots and error messages
