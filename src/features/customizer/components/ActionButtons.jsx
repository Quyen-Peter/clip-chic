// src/features/customizer/components/ActionButtons.jsx
import React from "react";
import camera360 from "../../../assest/360.png";

export default function ActionButtons({ 
  isCameraLocked, 
  onToggleCameraLock, 
  onSaveAll,
  onAddToCart,
  addToCartState = {}
}) {
  const { isSubmitting = false, isSuccess = false } = addToCartState;
  return (
    <div className="customizer-layout-bottom-row">
      <div className="customizer-layout-bottom-controls">
        <div className="customizer-layout-bottom-left-controls">
          <button
            onClick={onToggleCameraLock}
            className={`customizer-layout-bottom-button ${isCameraLocked ? 'camera-locked' : 'camera-unlocked'}`}
          >
            <img 
              src={camera360}
              alt="Chuyển trạng thái camera" 
              className="camera-toggle-icon"
            />
          </button>
        </div>

        <div className="customizer-layout-bottom-right-controls">
          <button
            onClick={onSaveAll}
            className="customizer-layout-bottom-button save-button"
            title="Lưu cấu hình & sản phẩm"
          >
            Lưu
          </button>
          <button
            className="customizer-layout-bottom-button add-button"
            title="Thêm vào giỏ hàng"
            onClick={onAddToCart}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang thêm...' : isSuccess ? 'Đã thêm!' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  );
}
