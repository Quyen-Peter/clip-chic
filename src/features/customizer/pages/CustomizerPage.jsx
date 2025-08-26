// src/features/customizer/pages/CustomizerPage.jsx
import React, { useState } from "react";
import { baseProducts, materials, textures, accessories } from "../mock/mockData";
import ModelViewer from "../components/ModelViewer";
import Header from "../../../component/Header";
import "../css/CustomizerLayout.css";

export default function CustomizerPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [selectedProduct, setSelectedProduct] = useState(baseProducts[0]);

  return (
    <div className="customizer-layout-container">
      <Header />

      {/* Main content container */}
      <div className="customizer-layout-main">
        <div className="customizer-layout-row">
          {/* Left Sidebar */}
          <div className="customizer-layout-sidebar">
            <div className="customizer-layout-card">
              <h5 className="customizer-layout-title">Base Products</h5>
              {baseProducts.map((product) => (
                <div
                  key={product.id}
                  className={`customizer-layout-product-card ${
                    selectedProduct.id === product.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="customizer-layout-product-card-content">
                    <img
                      src={product.previewImage}
                      alt={product.name}
                      className="customizer-layout-product-image"
                    />
                    <p className="customizer-layout-product-name">{product.name}</p>
                  </div>
                </div>
              ))}

              <h5 className="customizer-layout-title">Materials</h5>
              <div className="customizer-layout-materials-grid">
                {materials.map((m) => (
                  <img
                    key={m.id}
                    src={m.previewImage}
                    alt={m.name}
                    className={`customizer-layout-thumbnail ${
                      selectedMaterial.id === m.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedMaterial(m)}
                  />
                ))}
              </div>

              <h5 className="customizer-layout-title">Textures</h5>
              <div className="customizer-layout-materials-grid">
                {textures.map((t) => (
                  <img
                    key={t.id}
                    src={t.previewImage}
                    alt={t.name}
                    className={`customizer-layout-thumbnail ${
                      selectedTexture.id === t.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTexture(t)}
                  />
                ))}
              </div>

              <h5 className="customizer-layout-title">Accessories</h5>
              <div className="customizer-layout-accessories-grid">
                {accessories.map((a) => (
                  <img
                    key={a.id}
                    src={a.previewImage}
                    alt={a.name}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("modelPath", a.modelPath)}
                    className="customizer-layout-accessory"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3D Preview */}
          <div className="customizer-layout-preview">
            <div className="customizer-layout-card-preview">
              <div className="customizer-layout-preview-container">
                {selectedProduct && (
                  <ModelViewer
                    modelPath={selectedProduct.modelPath}
                    onAccessoryDrop={(accessoryModel) => {
                      console.log("Accessory dropped:", accessoryModel);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="customizer-layout-right">
            <div className="customizer-layout-info-panel">
              <h5 className="customizer-layout-info-title">Info Panel</h5>
              <p className="customizer-layout-info-text">Additional controls and information will go here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
