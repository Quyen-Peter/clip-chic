// src/features/customizer/pages/CustomizerPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { fetchBases, fetchCharms, fetchUserProducts } from "../services/customizerService";
import ModelViewer from "../components/ModelViewer";
import Header from "../../../component/Header";
import BaseProductSelector from "../components/BaseProductSelector";
import CustomProductSelector from "../components/CustomProductSelector";
import ColorPicker from "../components/ColorPicker";
import CharmSelector from "../components/CharmSelector";
import TransformControls from "../components/TransformControls";
import ActionButtons from "../components/ActionButtons";
import BaseProductModal from "../components/BaseProductModal";
import CharmModal from "../components/CharmModal";
import ColorModal from "../components/ColorModal";
import CustomProductModal from "../components/CustomProductModal";
import SaveProductModal from "../components/SaveProductModal";
import "../css/CustomizerLayout.css";

export default function CustomizerPage() {
  const [bases, setBases] = useState([]);
  const [charms, setCharms] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [isLoadingBases, setIsLoadingBases] = useState(true);
  const [isLoadingCharms, setIsLoadingCharms] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [selectedBase, setSelectedBase] = useState(null);
  const [baseModelColor, setBaseModelColor] = useState("#ffffff");
  const [transformMode, setTransformMode] = useState("translate");
  const [isCameraLocked, setIsCameraLocked] = useState(true);
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [currentCharms, setCurrentCharms] = useState([]); // Track charms locally for UI updates
  
  // State for popup menus
  const [showBaseMenu, setShowBaseMenu] = useState(false);
  const [showCharmMenu, setShowCharmMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showCustomProductMenu, setShowCustomProductMenu] = useState(false);
  const [showSaveProductModal, setShowSaveProductModal] = useState(false);
  
  // State for product save form
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStatus, setProductStatus] = useState("public");
  
  // Refs for selection containers and ModelViewer
  const baseSelectionRef = useRef(null);
  const charmSelectionRef = useRef(null);
  const modelViewerRef = useRef(null);

  // Fetch bases from API
  useEffect(() => {
    const loadBases = async () => {
      try {
        setIsLoadingBases(true);
        const data = await fetchBases();
        setBases(data || []);
        if (data && data.length > 0) {
          setSelectedBase(data[0]);
        }
      } catch (error) {
        console.error('Error loading bases:', error);
        toast.error('Failed to load bases. Please refresh the page.');
      } finally {
        setIsLoadingBases(false);
      }
    };
    loadBases();
  }, []);

  // Fetch charms from API
  useEffect(() => {
    const loadCharms = async () => {
      try {
        setIsLoadingCharms(true);
        const data = await fetchCharms();
        setCharms(data || []);
      } catch (error) {
        console.error('Error loading charms:', error);
        toast.error('Failed to load charms. Please refresh the page.');
      } finally {
        setIsLoadingCharms(false);
      }
    };
    loadCharms();
  }, []);

  // Fetch user's custom products from API
  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const data = await fetchUserProducts();
        setCustomProducts(data || []);
        console.log('Custom products loaded successfully:', data);
      } catch (error) {
        console.error('Error loading custom products:', error);
        // Check if error is due to authentication or other issues
        if (error.message && error.message.includes('401')) {
          console.log('User not authenticated - custom products unavailable');
        } else if (error.message && error.message.includes('User identifier')) {
          console.log('User identifier not in token - custom products unavailable');
        } else {
          console.warn('Could not load custom products:', error.message);
        }
        // Set to empty array on error - don't show error to user for non-critical feature
        setCustomProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadUserProducts();
  }, []);

  // Handle clicks outside selection triggers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (baseSelectionRef.current && !baseSelectionRef.current.contains(event.target)) {
        // Don't close if clicking on popup overlay or menu
        if (!event.target.closest('.customizer-layout-popup-overlay')) {
          setShowBaseMenu(false);
        }
      }
      if (charmSelectionRef.current && !charmSelectionRef.current.contains(event.target)) {
        // Don't close if clicking on popup overlay or menu
        if (!event.target.closest('.customizer-layout-popup-overlay')) {
          setShowCharmMenu(false);
        }
      }
      // Note: Color menu handled by its own click events, no ref needed
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize product form when modal opens
  useEffect(() => {
    if (showSaveProductModal && selectedBase) {
      const currentCharms = modelViewerRef.current ? modelViewerRef.current.getCharms?.() || [] : [];
      setProductTitle(`Custom ${selectedBase.name}`);
      setProductDescription(`Customized hair clip based on ${selectedBase.name} with ${currentCharms.length} charm(s)`);
      setProductStatus("active");
    }
  }, [showSaveProductModal, selectedBase]);

  // Handle base selection
  const handleBaseSelect = (base) => {
    setSelectedBase(base);
  };

  // Handle charm double click to add to model
  const handleCharmDoubleClick = (charm) => {
    // Call addCharm function on ModelViewer component with charm data
    if (modelViewerRef.current) {
      const modelPath = charm.modelPath || (charm.model && charm.model.address);
      modelViewerRef.current.addCharm(modelPath, charm.id);
      // Update local state immediately to keep UI in sync
      // Use a small delay to ensure ModelViewer state is updated
      setTimeout(() => {
        const latestCharm = modelViewerRef.current.getLatestCharm();
        if (latestCharm) {
          setCurrentCharms(prev => {
            // Check if charm already exists to avoid duplicates
            const exists = prev.some(c => c.id === latestCharm.id);
            if (!exists) {
              return [...prev, latestCharm];
            }
            return prev;
          });
        }
      }, 10);
    }
  };

  // Handle charm removal
  const handleRemoveCharm = (charmId) => {
    if (modelViewerRef.current) {
      modelViewerRef.current.removeCharm(charmId);
      // Update local state immediately to keep UI in sync
      setCurrentCharms(prev => prev.filter(charm => charm.id !== charmId));
      // Deselect if this charm was selected
      if (selectedCharm === charmId) {
        setSelectedCharm(null);
      }
    }
  };

  // Handle custom product selection
  const handleCustomProductSelect = async (customProduct) => {
    try {
      console.log('Loading custom product:', customProduct);
      
      // Get the model file URL from the API response
      const modelFileUrl = customProduct.model?.address;
      if (!modelFileUrl) {
        throw new Error('No model file URL available for this product');
      }
      
      console.log('Fetching model file from:', modelFileUrl);
      
      // Load configuration from the JSON file
      const response = await fetch(modelFileUrl);
      if (!response.ok) {
        throw new Error(`Failed to load configuration file: ${response.status} ${response.statusText}`);
      }
      
      const configData = await response.json();
      console.log('Configuration loaded:', configData);
      
      // Find the base product by ID from the API response
      const baseFromProduct = customProduct.base;
      if (!baseFromProduct) {
        throw new Error('Base product information not found');
      }
      
      // If base ID exists in bases array, use it; otherwise create a temporary reference
      let foundBase = bases.find(base => base.id === baseFromProduct.id);
      if (!foundBase) {
        // Use the base from the API response
        foundBase = baseFromProduct;
      }
      
      // Set the base product
      setSelectedBase(foundBase);
      
      // Set the base color from config or default
      if (configData.baseModelColor) {
        setBaseModelColor(configData.baseModelColor);
      } else {
        setBaseModelColor('#ffffff');
      }
      
      // Clear current charms and load new ones
      if (modelViewerRef.current && configData.charms && configData.charms.length > 0) {
        // Clear existing charms
        const currentCharms = modelViewerRef.current.getCharms();
        currentCharms.forEach(charm => {
          modelViewerRef.current.removeCharm(charm.id);
        });
        setCurrentCharms([]);
        
        // Add loaded charms with a delay to ensure base model is loaded
        setTimeout(() => {
          // Clear local state first
          setCurrentCharms([]);
          
          configData.charms.forEach((charmData, index) => {
            // Generate a consistent ID for the loaded charm
            const charmInstanceId = charmData.id || `charm-${charmData.charmId}-${Date.now()}-${index}`;
            
            // Get the charm model path
            const charmModelPath = charmData.modelPath || (charmData.model?.address);
            
            if (charmModelPath) {
              // Add charm to 3D viewer with saved transforms and ID
              modelViewerRef.current.addCharmWithTransforms(
                charmModelPath, 
                charmData.charmId,
                charmData.position,
                charmData.rotation,
                charmData.scale,
                charmInstanceId // Pass the saved ID
              );
              
              // Update local state with positioning data using the same ID
              const newCharm = {
                id: charmInstanceId,
                charmId: charmData.charmId,
                modelPath: charmModelPath,
                position: charmData.position || [0, 0, 0],
                rotation: charmData.rotation || [0, 0, 0],
                scale: charmData.scale || [0.5, 0.5, 0.5]
              };
              setCurrentCharms(prev => [...prev, newCharm]);
            }
          });
        }, 500);
      }
      
      toast.success(`Custom product "${customProduct.title}" loaded successfully!`);
      console.log('Custom product loaded successfully');
    } catch (error) {
      console.error('Error loading custom product:', error);
      toast.error(`Failed to load custom product: ${error.message}`);
    }
  };

  // Save customization function
  const saveCustomization = async () => {
    try {
      // Get current charms with actual transforms from ModelViewer
      const currentCharms = modelViewerRef.current ? modelViewerRef.current.getCurrentCharmsWithTransforms?.() || [] : [];
      
      // Capture screenshot
      const screenshot = modelViewerRef.current ? await modelViewerRef.current.captureScreenshot?.() : null;
      
      const customizationData = {
        baseId: selectedBase.id,
        baseModel: selectedBase.modelPath,
        baseModelColor: baseModelColor,
        charms: currentCharms.map(charm => ({
          id: charm.id, // Include the instance ID for proper loading
          charmId: charm.charmId || null,
          modelPath: charm.modelPath,
          position: charm.position,
          rotation: charm.rotation,
          scale: charm.scale
        })),
        timestamp: new Date().toISOString(),
        version: "1.0"
      };

      // Save customization data as JSON
      const dataStr = JSON.stringify(customizationData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `customization-${selectedBase.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      // Save screenshot if available
      if (screenshot) {
        const imageUrl = URL.createObjectURL(screenshot);
        const imageLink = document.createElement('a');
        imageLink.href = imageUrl;
        imageLink.download = `customization-${selectedBase.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
        imageLink.click();
        
        URL.revokeObjectURL(imageUrl);
        
        alert('Customization and screenshot saved successfully!');
      } else {
        alert('Customization saved successfully! (Screenshot not available)');
      }
      
    } catch (error) {
      alert('Failed to save customization. Please try again.');
    }
  };

  // Get current charms with full data
  const getCurrentCharmsData = () => {
    const currentCharms = modelViewerRef.current ? modelViewerRef.current.getCharms?.() || [] : [];
    return currentCharms.map(charm => {
      const charmModelPath = charm.modelPath || (charm.model && charm.model.address);
      const charmData = charms.find(c => 
        c.modelPath === charmModelPath || 
        (c.model && c.model.address) === charmModelPath
      );
      return {
        id: charm.id,
        name: charmData?.name || 'Unknown',
        price: charmData?.price || 0,
        modelPath: charmModelPath
      };
    });
  };
  const handleSaveAll = async () => {
    await saveCustomization();  // Lưu file JSON + Screenshot
    setShowSaveProductModal(true); // Sau đó mở modal Save Product
};
  return (
    <div>
    <Header />
    <div className="customizer-layout-container">

      {/* Main content container */}
      <div className="customizer-layout-main">
        <div className="customizer-layout-row">
          {/* Left Sidebar */}
          <div className="customizer-layout-sidebar">
            <div className="customizer-layout-card">
              <BaseProductSelector 
                selectedBase={selectedBase}
                onShowMenu={() => setShowBaseMenu(!showBaseMenu)}
                showMenu={showBaseMenu}
                isLoading={isLoadingBases}
              />

              <CustomProductSelector 
                onShowMenu={() => setShowCustomProductMenu(!showCustomProductMenu)}
                customProducts={customProducts}
                isLoading={isLoadingProducts}
              />

              <ColorPicker 
                baseModelColor={baseModelColor}
                onColorChange={setBaseModelColor}
                onShowMenu={() => setShowColorMenu(true)}
              />

              <CharmSelector 
                onShowMenu={() => setShowCharmMenu(!showCharmMenu)}
                showMenu={showCharmMenu}
                charms={charms}
                isLoading={isLoadingCharms}
              />
            </div>
          </div>

          {/* 3D Preview */}
          <div className="customizer-layout-preview">
            <div className="customizer-layout-card-preview">
              <div className="customizer-layout-preview-container">
                {selectedBase ? (
                  <ModelViewer
                    ref={modelViewerRef}
                    modelPath={selectedBase.modelPath || (selectedBase.model && selectedBase.model.address)}
                    baseModelColor={baseModelColor}
                    transformMode={transformMode}
                    isCameraLocked={isCameraLocked}
                    selectedCharm={selectedCharm}
                    onSelectedCharmChange={setSelectedCharm}
                    onCharmAdd={(charmModel) => {
                      console.log("Charm added:", charmModel);
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>{isLoadingBases ? 'Loading bases...' : 'Please select a base'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="customizer-layout-right">
            <TransformControls 
              transformMode={transformMode}
              onTransformModeChange={setTransformMode}
              selectedCharm={selectedCharm}
              onDeselectCharm={() => setSelectedCharm(null)}
              onRemoveCharm={handleRemoveCharm}
              charmsList={currentCharms}
              onSelectCharm={setSelectedCharm}
            />
          </div>
        </div>

        {/* New row with Save and Camera Lock buttons */}
        <ActionButtons 
  isCameraLocked={isCameraLocked}
  onToggleCameraLock={() => setIsCameraLocked(!isCameraLocked)}
  onSaveAll={handleSaveAll}
/>
      </div>
    </div>
    
    {/* Modals */}
    <BaseProductModal 
      bases={bases}
      selectedBase={selectedBase}
      isVisible={showBaseMenu}
      onClose={() => setShowBaseMenu(false)}
      onSelectBase={handleBaseSelect}
      isLoading={isLoadingBases}
    />
    
    <CharmModal 
      isVisible={showCharmMenu}
      onClose={() => setShowCharmMenu(false)}
      onCharmDoubleClick={handleCharmDoubleClick}
      charms={charms}
      isLoading={isLoadingCharms}
    />
    
    <CustomProductModal 
      customProducts={customProducts}
      isVisible={showCustomProductMenu}
      onClose={() => setShowCustomProductMenu(false)}
      onSelectCustomProduct={handleCustomProductSelect}
      isLoading={isLoadingProducts}
    />
    
    <ColorModal 
      baseModelColor={baseModelColor}
      onColorChange={setBaseModelColor}
      isVisible={showColorMenu}
      onClose={() => setShowColorMenu(false)}
    />
    
    <SaveProductModal 
      isVisible={showSaveProductModal}
      onClose={() => setShowSaveProductModal(false)}
      selectedBase={selectedBase}
      selectedCharms={getCurrentCharmsData()}
      modelViewerRef={modelViewerRef}
      productTitle={productTitle}
      setProductTitle={setProductTitle}
      productDescription={productDescription}
      setProductDescription={setProductDescription}
      productStatus={productStatus}
      setProductStatus={setProductStatus}
      onSaveComplete={() => {
        setShowSaveProductModal(false);
        setProductTitle('');
        setProductDescription('');
      }}
    />
    </div>
  );
}
