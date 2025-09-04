import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, TransformControls } from "@react-three/drei";

function Model({ modelPath, position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(modelPath); // load glb
  return <primitive object={scene} position={position} scale={scale} />;
}

function Accessory({ modelPath, isSelected, onSelect, transformMode, initialPosition, onPositionChange, initialRotation, onRotationChange, initialScale, onScaleChange }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();
  const [objectRef, setObjectRef] = useState(null);
  
  useEffect(() => {
    const checkRef = () => {
      if (ref.current && !objectRef) {
        setObjectRef(ref.current);
        // Set initial position, rotation, and scale
        if (initialPosition) {
          ref.current.position.set(...initialPosition);
        }
        if (initialRotation) {
          ref.current.rotation.set(...initialRotation);
        }
        if (initialScale) {
          ref.current.scale.set(...initialScale);
        }
      }
    };
    
    // Check immediately
    checkRef();
    
    // Also check after a short delay to ensure the ref is set
    const timer = setTimeout(checkRef, 50);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once
  
  // Update transform when it changes
  useEffect(() => {
    if (objectRef) {
      if (initialPosition) {
        objectRef.position.set(...initialPosition);
      }
      if (initialRotation) {
        objectRef.rotation.set(...initialRotation);
      }
      if (initialScale) {
        objectRef.scale.set(...initialScale);
      }
    }
  }, [initialPosition, initialRotation, initialScale, objectRef]);
  
  return (
    <>
      <primitive 
        ref={ref} 
        object={scene.clone()} 
        scale={initialScale || [0.5, 0.5, 0.5]}
        position={initialPosition || [0, 0, 0]}
        rotation={initialRotation || [0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      />
      {objectRef && (
        <TransformControls 
          object={objectRef} 
          mode={transformMode}
          size={0.5}
          showX={true}
          showY={true}
          showZ={true}
          onObjectChange={(e) => {
            // Update all transform properties in parent component
            if (objectRef && onPositionChange && onRotationChange && onScaleChange) {
              onPositionChange([
                objectRef.position.x,
                objectRef.position.y,
                objectRef.position.z
              ]);
              onRotationChange([
                objectRef.rotation.x,
                objectRef.rotation.y,
                objectRef.rotation.z
              ]);
              onScaleChange([
                objectRef.scale.x,
                objectRef.scale.y,
                objectRef.scale.z
              ]);
            }
          }}
        />
      )}
    </>
  );
}

export default function ModelViewer({ modelPath, onAccessoryDrop }) {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [isCameraLocked, setIsCameraLocked] = useState(true);
  const [transformMode, setTransformMode] = useState("translate");

  const handleDrop = (e) => {
    e.preventDefault();
    const accessoryModel = e.dataTransfer.getData("modelPath");
    if (accessoryModel) {
      // Thêm accessory vào danh sách đang render
      setAccessories((prev) => [
        ...prev,
        { 
          id: Date.now(), 
          modelPath: accessoryModel,
          position: [0, 0, 0], // Initial position
          rotation: [0, 0, 0], // Initial rotation
          scale: [0.5, 0.5, 0.5] // Initial scale
        },
      ]);

      // Gọi callback cho CustomizerPage nếu có
      if (onAccessoryDrop) onAccessoryDrop(accessoryModel);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCanvasClick = () => {
    // Deselect accessory when clicking on empty space
    setSelectedAccessory(null);
  };

  const toggleCameraLock = () => {
    setIsCameraLocked(!isCameraLocked);
  };

  const changeTransformMode = (mode) => {
    setTransformMode(mode);
  };

  const updateAccessoryPosition = (accessoryId, newPosition) => {
    setAccessories((prev) =>
      prev.map((acc) =>
        acc.id === accessoryId
          ? { ...acc, position: newPosition }
          : acc
      )
    );
  };

  const updateAccessoryRotation = (accessoryId, newRotation) => {
    setAccessories((prev) =>
      prev.map((acc) =>
        acc.id === accessoryId
          ? { ...acc, rotation: newRotation }
          : acc
      )
    );
  };

  const updateAccessoryScale = (accessoryId, newScale) => {
    setAccessories((prev) =>
      prev.map((acc) =>
        acc.id === accessoryId
          ? { ...acc, scale: newScale }
          : acc
      )
    );
  };

  return (
    <div
      className="w-full h-full relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Control buttons */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={toggleCameraLock}
          className={`px-3 py-2 rounded text-sm font-medium ${
            isCameraLocked 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}
        >
          {isCameraLocked ? '🔒 Camera Locked' : '🔓 Camera Unlocked'}
        </button>
        
        {/* Transform mode selector */}
        <div className="flex gap-1">
          <button
            onClick={() => changeTransformMode("translate")}
            className={`px-2 py-1 rounded text-xs font-medium ${
              transformMode === "translate" 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Move (Translate)"
          >
            Move
          </button>
          <button
            onClick={() => changeTransformMode("rotate")}
            className={`px-2 py-1 rounded text-xs font-medium ${
              transformMode === "rotate" 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Rotate"
          >
            Rotate
          </button>
          <button
            onClick={() => changeTransformMode("scale")}
            className={`px-2 py-1 rounded text-xs font-medium ${
              transformMode === "scale" 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Scale"
          >
            Scale
          </button>
        </div>

        {selectedAccessory && (
          <button
            onClick={() => setSelectedAccessory(null)}
            className="px-3 py-2 rounded text-sm font-medium bg-gray-500 text-white hover:bg-gray-600"
          >
            Deselect
          </button>
        )}
      </div>

      <Canvas
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        onClick={handleCanvasClick}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Center>
            {/* Base product */}
            <Model modelPath={modelPath} scale={1.5} />
          </Center>
          {/* Các accessories đã drop */}
          {accessories.map((acc) => (
            <Accessory 
              key={acc.id} 
              modelPath={acc.modelPath}
              isSelected={selectedAccessory === acc.id}
              onSelect={() => {
                setSelectedAccessory(acc.id);
              }}
              transformMode={transformMode}
              initialPosition={acc.position}
              onPositionChange={(newPosition) => updateAccessoryPosition(acc.id, newPosition)}
              initialRotation={acc.rotation}
              onRotationChange={(newRotation) => updateAccessoryRotation(acc.id, newRotation)}
              initialScale={acc.scale}
              onScaleChange={(newScale) => updateAccessoryScale(acc.id, newScale)}
            />
          ))}
        </Suspense>

        <OrbitControls 
          enabled={!isCameraLocked}
          enablePan={!isCameraLocked}
          enableZoom={!isCameraLocked}
          enableRotate={!isCameraLocked}
        />
      </Canvas>
    </div>
  );
}