// src/features/customizer/pages/CustomizerPage.jsx
import React, { useState } from "react";
import { baseProducts, materials, accessories } from "../mock/mockData";
import ModelViewer from "../components/ModelViewer";
import Header from "../../../component/Header";
import "../css/CustomizerLayout.css";

export default function CustomizerPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedProduct, setSelectedProduct] = useState(baseProducts[0]);
  const [baseModelColor, setBaseModelColor] = useState("#ffffff");
  const [detailColor, setDetailColor] = useState("#000000");

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

              <h5 className="customizer-layout-title">Base Model Colors</h5>
              <div className="customizer-layout-color-section">
                <div className="customizer-layout-color-group">
                  <label className="customizer-layout-color-label">Base Color:</label>
                  <div className="customizer-layout-color-picker">
                    <input
                      type="color"
                      value={baseModelColor}
                      onChange={(e) => setBaseModelColor(e.target.value)}
                      className="customizer-layout-color-input"
                      title="Change base model color"
                    />
                    <span className="customizer-layout-color-value">{baseModelColor}</span>
                  </div>
                  <div className="customizer-layout-preset-colors">
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ffffff" }}
                      onClick={() => setBaseModelColor("#ffffff")}
                      title="White"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#000000" }}
                      onClick={() => setBaseModelColor("#000000")}
                      title="Black"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ff0000" }}
                      onClick={() => setBaseModelColor("#ff0000")}
                      title="Red"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#00ff00" }}
                      onClick={() => setBaseModelColor("#00ff00")}
                      title="Green"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#0000ff" }}
                      onClick={() => setBaseModelColor("#0000ff")}
                      title="Blue"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ffff00" }}
                      onClick={() => setBaseModelColor("#ffff00")}
                      title="Yellow"
                    ></div>
                  </div>
                </div>
                
                <div className="customizer-layout-color-group">
                  <label className="customizer-layout-color-label">Detail Color:</label>
                  <div className="customizer-layout-color-picker">
                    <input
                      type="color"
                      value={detailColor}
                      onChange={(e) => setDetailColor(e.target.value)}
                      className="customizer-layout-color-input"
                      title="Change detail color"
                    />
                    <span className="customizer-layout-color-value">{detailColor}</span>
                  </div>
                  <div className="customizer-layout-preset-colors">
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#000000" }}
                      onClick={() => setDetailColor("#000000")}
                      title="Black"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ffffff" }}
                      onClick={() => setDetailColor("#ffffff")}
                      title="White"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ffff00" }}
                      onClick={() => setDetailColor("#ffff00")}
                      title="Yellow"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#ffa500" }}
                      onClick={() => setDetailColor("#ffa500")}
                      title="Orange"
                    ></div>
                    <div 
                      className="customizer-layout-color-preset"
                      style={{ backgroundColor: "#800080" }}
                      onClick={() => setDetailColor("#800080")}
                      title="Purple"
                    ></div>
                  </div>
                </div>
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
                    baseModelColor={baseModelColor}
                    detailColor={detailColor}
                    onAccessoryDrop={(accessoryModel) => {
                      console.log("Accessory dropped:", accessoryModel);
                    }}
                    style={{ width: '100%', height: '100%' }}
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
    </div>
  );
}
