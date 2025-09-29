// Custom hook for managing customizer state
// This hook integrates with the new database structure

import { useState, useEffect, useCallback } from 'react';
import customizerService from '../services/customizerService';

export const useCustomizer = () => {
  // State management
  const [bases, setBases] = useState([]);
  const [charms, setCharms] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedCharms, setSelectedCharms] = useState([]);
  const [customizationConfig, setCustomizationConfig] = useState({
    baseModelColor: '#ffffff',
    charms: [] // Array of charm configurations with position, rotation, scale
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [basesData, charmsData, collectionsData] = await Promise.all([
          customizerService.fetchBases(),
          customizerService.fetchCharms(),
          customizerService.fetchCollections()
        ]);

        setBases(basesData);
        setCharms(charmsData);
        setCollections(collectionsData);
        
        // Set default selected base
        if (basesData.length > 0) {
          setSelectedBase(basesData[0]);
        }
      } catch (err) {
        setError('Failed to load customizer data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Add charm to customization
  const addCharm = useCallback((charm, position = [0, 0, 0], rotation = [0, 0, 0], scale = [0.5, 0.5, 0.5]) => {
    const charmConfig = {
      id: Date.now(), // Temporary ID for 3D scene
      charmId: charm.id,
      charm: charm,
      position,
      rotation,
      scale
    };

    setCustomizationConfig(prev => ({
      ...prev,
      charms: [...prev.charms, charmConfig]
    }));

    // Update selected charms list
    setSelectedCharms(prev => [...prev, charm]);
  }, []);

  // Remove charm from customization
  const removeCharm = useCallback((charmConfigId) => {
    setCustomizationConfig(prev => ({
      ...prev,
      charms: prev.charms.filter(c => c.id !== charmConfigId)
    }));

    // Update selected charms list
    const removedCharm = customizationConfig.charms.find(c => c.id === charmConfigId);
    if (removedCharm) {
      setSelectedCharms(prev => prev.filter(c => c.id !== removedCharm.charmId));
    }
  }, [customizationConfig.charms]);

  // Update charm configuration (position, rotation, scale)
  const updateCharmConfig = useCallback((charmConfigId, updates) => {
    setCustomizationConfig(prev => ({
      ...prev,
      charms: prev.charms.map(charm =>
        charm.id === charmConfigId
          ? { ...charm, ...updates }
          : charm
      )
    }));
  }, []);

  // Update base color
  const updateColor = useCallback((baseModelColor) => {
    setCustomizationConfig(prev => ({
      ...prev,
      baseModelColor
    }));
  }, []);

  // Calculate total price
  const totalPrice = useCallback(() => {
    if (!selectedBase) return 0;
    return customizerService.calculateCustomProductPrice(selectedBase, selectedCharms);
  }, [selectedBase, selectedCharms]);

  // Save customization to database
  const saveCustomization = useCallback(async () => {
    if (!selectedBase) {
      throw new Error('No base selected');
    }

    try {
      setLoading(true);
      const customizationData = {
        baseId: selectedBase.id,
        baseModelColor: customizationConfig.baseModelColor,
        charms: customizationConfig.charms.map(charm => ({
          charmId: charm.charmId,
          position: charm.position,
          rotation: charm.rotation,
          scale: charm.scale
        })),
        version: "1.0"
      };

      const result = await customizerService.saveCustomization(customizationData);
      return result;
    } catch (err) {
      setError('Failed to save customization');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBase, customizationConfig]);

  // Create product from customization
  const createProduct = useCallback(async (productDetails) => {
    if (!selectedBase) {
      throw new Error('No base selected');
    }

    try {
      setLoading(true);
      const productData = {
        collectId: productDetails.collectId || null,
        title: productDetails.title,
        descript: productDetails.description || '',
        baseId: selectedBase.id,
        price: totalPrice(),
        userId: productDetails.userId,
        stock: productDetails.stock || 1,
        modelId: selectedBase.modelId,
        status: 'active',
        charms: selectedCharms.map(charm => charm.id),
        customizationData: customizationConfig
      };

      const result = await customizerService.createCustomProduct(productData);
      return result;
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedBase, selectedCharms, customizationConfig, totalPrice]);

  // Load saved customization
  const loadCustomization = useCallback(async (customizationId) => {
    try {
      setLoading(true);
      const customizationData = await customizerService.loadCustomization(customizationId);
      
      // Find the base
      const base = bases.find(b => b.id === customizationData.baseId);
      if (base) {
        setSelectedBase(base);
      }

      // Find all charms first
      const loadedCharms = customizationData.charms.map(charmConfig => 
        charms.find(c => c.id === charmConfig.charmId)
      ).filter(Boolean);

      // Set selected charms first
      setSelectedCharms(loadedCharms);

      // Then reconstruct charm configurations
      const charmConfigs = customizationData.charms.map(charmConfig => {
        const charm = charms.find(c => c.id === charmConfig.charmId);
        return {
          id: Date.now() + Math.random(),
          charmId: charmConfig.charmId,
          charm,
          position: charmConfig.position,
          rotation: charmConfig.rotation,
          scale: charmConfig.scale
        };
      });

      setCustomizationConfig({
        baseModelColor: customizationData.baseModelColor,
        charms: charmConfigs
      });
      
      return customizationData;
    } catch (err) {
      setError('Failed to load customization');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [bases, charms]);

  // Reset customization
  const resetCustomization = useCallback(() => {
    setCustomizationConfig({
      baseModelColor: '#ffffff',
      charms: []
    });
    setSelectedCharms([]);
  }, []);

  return {
    // Data
    bases,
    charms,
    collections,
    selectedBase,
    selectedCharms,
    customizationConfig,
    
    // Computed values
    totalPrice: totalPrice(),
    
    // State
    loading,
    error,
    
    // Actions
    setSelectedBase,
    addCharm,
    removeCharm,
    updateCharmConfig,
    updateColor,
    saveCustomization,
    createProduct,
    loadCustomization,
    resetCustomization,
    
    // Clear error
    clearError: () => setError(null)
  };
};

export default useCustomizer;