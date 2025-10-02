// src/features/customizer/pages/CustomizerPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { bases, charms } from "../mock/mockData";
import { customProducts } from "../mock/customProductsData";
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
  const [selectedBase, setSelectedBase] = useState(bases[0]);
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
    if (showSaveProductModal) {
      const currentCharms = modelViewerRef.current ? modelViewerRef.current.getCharms?.() || [] : [];
      setProductTitle(`Custom ${selectedBase.name}`);
      setProductDescription(`Customized hair clip based on ${selectedBase.name} with ${currentCharms.length} charm(s)`);
      setProductStatus("public");
    }
  }, [showSaveProductModal, selectedBase.name]);

  // Handle base selection
  const handleBaseSelect = (base) => {
    setSelectedBase(base);
  };

  // Handle charm double click to add to model
  const handleCharmDoubleClick = (charm) => {
    // Call addCharm function on ModelViewer component with charm data
    if (modelViewerRef.current) {
      modelViewerRef.current.addCharm(charm.modelPath, charm.id);
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
      // Load configuration from the JSON file
      const response = await fetch(customProduct.configurationFile);
      if (!response.ok) {
        throw new Error('Failed to load configuration file');
      }
      const configData = await response.json();
      
      // Find the base product by ID
      const foundBase = bases.find(base => base.id === configData.baseId);
      if (foundBase) {
        // Set the base product
        setSelectedBase(foundBase);
        
        // Set the base color
        if (configData.baseModelColor) {
          setBaseModelColor(configData.baseModelColor);
        }
        
        // Clear current charms and load new ones
        if (modelViewerRef.current && configData.charms) {
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
              
              // Add charm to 3D viewer with saved transforms and ID
              modelViewerRef.current.addCharmWithTransforms(
                charmData.modelPath, 
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
                modelPath: charmData.modelPath,
                position: charmData.position || [0, 0, 0],
                rotation: charmData.rotation || [0, 0, 0],
                scale: charmData.scale || [0.5, 0.5, 0.5]
              };
              setCurrentCharms(prev => [...prev, newCharm]);
            });
          }, 500);
        }
        
        alert(`Custom product "${customProduct.title}" loaded successfully!`);
      } else {
        alert('Base product not found. This custom product may be incompatible.');
      }
    } catch (error) {
      console.error('Error loading custom product:', error);
      alert('Failed to load custom product configuration. Please try again.');
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

  // Save as product function (saves to database)
  const saveAsProduct = async () => {
    try {
      const currentCharms = modelViewerRef.current ? modelViewerRef.current.getCharms?.() || [] : [];
      
      // Calculate total price
      const basePrice = parseFloat(selectedBase.price) || 0;
      const charmsPrice = currentCharms.reduce((total, charm) => {
        const charmData = charms.find(c => c.modelPath === charm.modelPath);
        return total + (charmData ? parseFloat(charmData.price) : 0);
      }, 0);
      const totalPrice = basePrice + charmsPrice;
      
      const productData = {
        collectId: null, // Could be set based on user selection
        title: productTitle.trim() || `Custom ${selectedBase.name}`,
        descript: productDescription.trim() || `Customized hair clip based on ${selectedBase.name}`,
        baseId: selectedBase.id,
        price: totalPrice,
        userId: null, // Should be set from current user session
        stock: 1,
        modelId: selectedBase.modelId,
        createDate: new Date().toISOString(),
        status: productStatus,
        charms: currentCharms.map(charm => {
          const charmData = charms.find(c => c.modelPath === charm.modelPath);
          return charmData ? charmData.id : null;
        }).filter(id => id !== null),
        customizationData: {
          baseModelColor: baseModelColor,
          charms: currentCharms.map(charm => ({
            modelPath: charm.modelPath,
            position: charm.position,
            rotation: charm.rotation,
            scale: charm.scale
          }))
        }
      };

  
      // TODO: Replace with actual API call to create product
      
      // For now, save as JSON file
      const dataStr = JSON.stringify(productData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `product-${productTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      setShowSaveProductModal(false);
      alert(`Product "${productTitle}" saved successfully! Total price: $${totalPrice.toFixed(2)}`);
      
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
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
              />

              <CustomProductSelector 
                onShowMenu={() => setShowCustomProductMenu(!showCustomProductMenu)}
              />

              <ColorPicker 
                baseModelColor={baseModelColor}
                onColorChange={setBaseModelColor}
                onShowMenu={() => setShowColorMenu(true)}
              />

              <CharmSelector 
                onShowMenu={() => setShowCharmMenu(!showCharmMenu)}
                showMenu={showCharmMenu}
              />
            </div>
          </div>

          {/* 3D Preview */}
          <div className="customizer-layout-preview">
            <div className="customizer-layout-card-preview">
              <div className="customizer-layout-preview-container">
                {selectedBase && (
                  <ModelViewer
                    ref={modelViewerRef}
                    modelPath={selectedBase.modelPath}
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
    />
    
    <CharmModal 
      isVisible={showCharmMenu}
      onClose={() => setShowCharmMenu(false)}
      onCharmDoubleClick={handleCharmDoubleClick}
    />
    
    <CustomProductModal 
      customProducts={customProducts}
      isVisible={showCustomProductMenu}
      onClose={() => setShowCustomProductMenu(false)}
      onSelectCustomProduct={handleCustomProductSelect}
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
      modelViewerRef={modelViewerRef}
      productTitle={productTitle}
      setProductTitle={setProductTitle}
      productDescription={productDescription}
      setProductDescription={setProductDescription}
      productStatus={productStatus}
      setProductStatus={setProductStatus}
      onSaveProduct={saveAsProduct}
    />
    </div>
  );
}
