import React, { Suspense, useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, TransformControls } from "@react-three/drei";

function Model({ modelPath, position = [0, 0, 0], scale = 1, baseColor = "#ffffff" }) {
  const { scene } = useGLTF(modelPath); // load glb
  
  // Apply color to the model
  useEffect(() => {
    if (scene) {
      // Apply base color to all meshes
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Clone the material to avoid affecting other instances
          if (!child.material.isColorCustomized) {
            child.material = child.material.clone();
            child.material.isColorCustomized = true;
          }
          
          // Apply base color to all parts
          child.material.color.setHex(parseInt(baseColor.replace('#', ''), 16));
        }
      });
    }
  }, [scene, baseColor]);

  return <primitive object={scene} position={position} scale={scale} />;
}

function Charm({ modelPath, isSelected, onSelect, transformMode, initialPosition, onPositionChange, initialRotation, onRotationChange, initialScale, onScaleChange, charmId, onTransformingChange }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef();
  const transformRef = useRef();
  const [isTransforming, setIsTransforming] = useState(false);
  
  // Apply visual selection effect
  useEffect(() => {
    if (groupRef.current && scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (isSelected) {
            // Add a subtle emission to selected charms
            child.material = child.material.clone();
            child.material.emissive.setHex(0x444444);
          } else {
            // Reset emission for unselected charms
            if (child.material.emissive) {
              child.material.emissive.setHex(0x000000);
            }
          }
        }
      });
    }
  }, [isSelected, scene]);
  
  // Set initial transform only when not actively transforming
  useEffect(() => {
    if (groupRef.current && !isTransforming) {
      if (initialPosition) {
        groupRef.current.position.set(...initialPosition);
      }
      if (initialRotation) {
        groupRef.current.rotation.set(...initialRotation);
      }
      if (initialScale) {
        groupRef.current.scale.set(...initialScale);
      }
    }
  }, [initialPosition, initialRotation, initialScale, isTransforming]);
  
  return (
    <>
      <group 
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <primitive object={scene.clone()} />
      </group>
      {groupRef.current && isSelected && (
        <TransformControls 
          ref={transformRef}
          key={`transform-${charmId}-${isSelected}`} // Force recreation when selection changes
          object={groupRef.current} 
          mode={transformMode}
          size={0.5}
          space="local"
          translationSnap={null}
          rotationSnap={null}
          scaleSnap={null}
          showX={true}
          showY={true}
          showZ={true}
          enabled={true}
          onPointerDown={(e) => {
            console.log('TransformControls pointer down for charm:', charmId);
            // Prevent canvas click when interacting with transform controls
            e.stopPropagation();
          }}
          onObjectChange={() => {
            console.log('*** onObjectChange fired for charm:', charmId);
            // Capture position during transform as backup
            if (groupRef.current && onPositionChange && onRotationChange && onScaleChange) {
              const newPosition = [
                groupRef.current.position.x,
                groupRef.current.position.y,
                groupRef.current.position.z
              ];
              const newRotation = [
                groupRef.current.rotation.x,
                groupRef.current.rotation.y,
                groupRef.current.rotation.z
              ];
              const newScale = [
                groupRef.current.scale.x,
                groupRef.current.scale.y,
                groupRef.current.scale.z
              ];
              
              // Update state with current transform values
              onPositionChange(newPosition);
              onRotationChange(newRotation);
              onScaleChange(newScale);
            }
          }}
          onDraggingChanged={(dragging) => {
            console.log('*** onDraggingChanged fired ***', { dragging, charmId });
            setIsTransforming(dragging);
            if (onTransformingChange) {
              onTransformingChange(dragging);
            }
            
            // Only update position when dragging ENDS to prevent re-renders during drag
            if (!dragging && groupRef.current && onPositionChange && onRotationChange && onScaleChange) {
              console.log('Dragging ended for charm:', charmId);
              // Add a small delay to ensure transform controls are properly detached
              setTimeout(() => {
                if (groupRef.current) {
                  const newPosition = [
                    groupRef.current.position.x,
                    groupRef.current.position.y,
                    groupRef.current.position.z
                  ];
                  const newRotation = [
                    groupRef.current.rotation.x,
                    groupRef.current.rotation.y,
                    groupRef.current.rotation.z
                  ];
                  const newScale = [
                    groupRef.current.scale.x,
                    groupRef.current.scale.y,
                    groupRef.current.scale.z
                  ];
                  
                  // Update the state with actual values
                  console.log('Transform ended, updating position to:', newPosition);
                  onPositionChange(newPosition);
                  onRotationChange(newRotation);
                  onScaleChange(newScale);
                }
              }, 50);
            }
          }}
        />
      )}
    </>
  );
}

const ModelViewer = forwardRef(({ 
  modelPath, 
  onCharmAdd, 
  baseModelColor = "#ffffff",
  transformMode = "translate",
  isCameraLocked = true,
  selectedCharm = null,
  onSelectedCharmChange
}, ref) => {
  const [charms, setCharms] = useState([]);
  const [isAnyCharmTransforming, setIsAnyCharmTransforming] = useState(false);
  const canvasRef = useRef();

  // Expose addCharm, removeCharm, getCharms, and captureScreenshot functions to parent component
  useImperativeHandle(ref, () => ({
    addCharm,
    addCharmWithTransforms,
    removeCharm,
    getCharms: () => charms,
    captureScreenshot,
    getCurrentCharmsWithTransforms
  }));

  // Get current charms with actual 3D transforms
  const getCurrentCharmsWithTransforms = () => {
    console.log('Getting charms with transforms:', charms);
    return charms;
  };

  // Capture screenshot of the 3D scene
  const captureScreenshot = () => {
    return new Promise((resolve) => {
      if (canvasRef.current) {
        // Get the canvas element from the Three.js renderer
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };

  // Add charm with transforms (for loading saved configurations)
  const addCharmWithTransforms = (charmModelPath, charmId, position, rotation, scale) => {
    setCharms((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        charmId: charmId,
        modelPath: charmModelPath,
        position: position || [0, 0, 0],
        rotation: rotation || [0, 0, 0],
        scale: scale || [0.5, 0.5, 0.5]
      },
    ]);

    // Call callback for CustomizerPage if available
    if (onCharmAdd) onCharmAdd(charmModelPath);
  };

  // Add charm programmatically (called from parent component)
  const addCharm = (charmModelPath, charmId = null) => {
    setCharms((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        charmId: charmId,
        modelPath: charmModelPath,
        position: [0, 0, 0], // Initial position
        rotation: [0, 0, 0], // Initial rotation
        scale: [0.5, 0.5, 0.5] // Initial scale
      },
    ]);

    // Call callback for CustomizerPage if available
    if (onCharmAdd) onCharmAdd(charmModelPath);
  };

  // Remove charm programmatically (called from parent component)
  const removeCharm = (charmId) => {
    setCharms((prev) => prev.filter(charm => charm.id !== charmId));
    
    // Deselect charm if it was selected
    if (selectedCharm === charmId && onSelectedCharmChange) {
      onSelectedCharmChange(null);
    }
  };

  const handleCanvasClick = (e) => {
    // Don't deselect on single click - only through double click or deselect button
  };

  const handleCanvasDoubleClick = (e) => {
    // Only deselect charm on double click of empty canvas space
    if (!isAnyCharmTransforming) {
      if (onSelectedCharmChange) {
        onSelectedCharmChange(null);
      }
    }
  };

  // Remove the control functions since they're now handled by parent
  // const toggleCameraLock = () => {
  //   setIsCameraLocked(!isCameraLocked);
  // };

  // const changeTransformMode = (mode) => {
  //   setTransformMode(mode);
  // };

  const updateCharmPosition = (charmId, newPosition) => {
    console.log('updateCharmPosition called:', charmId, newPosition);
    setCharms((prev) =>
      prev.map((charm) =>
        charm.id === charmId
          ? { ...charm, position: newPosition }
          : charm
      )
    );
  };

  const updateCharmRotation = (charmId, newRotation) => {
    setCharms((prev) =>
      prev.map((charm) =>
        charm.id === charmId
          ? { ...charm, rotation: newRotation }
          : charm
      )
    );
  };

  const updateCharmScale = (charmId, newScale) => {
    setCharms((prev) =>
      prev.map((charm) =>
        charm.id === charmId
          ? { ...charm, scale: newScale }
          : charm
      )
    );
  };

  // Save customization data
  const saveCustomization = () => {
    const customizationData = {
      baseModel: modelPath,
      baseModelColor: baseModelColor,
      charms: charms.map(charm => ({
        modelPath: charm.modelPath,
        position: charm.position,
        rotation: charm.rotation,
        scale: charm.scale
      })),
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    // Convert to JSON and create downloadable file
    const dataStr = JSON.stringify(customizationData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customized-product-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Load customization data
  const loadCustomization = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.baseModel === modelPath && data.charms) {
            setCharms(data.charms.map(charm => ({
              ...charm,
              id: Date.now() + Math.random() // Generate new IDs
            })));
            
            // Load color if available
            if (data.baseModelColor) {
              // Note: baseModelColor is now controlled by parent component
            }
            
            alert('Customization loaded successfully!');
          } else {
            alert('This customization file is not compatible with the current base model.');
          }
        } catch (error) {
          alert('Error loading customization file: ' + error.message);
        }
        
        // Reset the file input so user can select the same file again
        event.target.value = '';
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative"
    >
      {/* Control buttons moved to parent component */}

      <Canvas
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Center>
            {/* Base product */}
            <Model modelPath={modelPath} scale={1.5} baseColor={baseModelColor} />
          </Center>
          {/* Rendered charms */}
          {charms.map((charm) => (
            <Charm 
              key={charm.id} 
              modelPath={charm.modelPath}
              charmId={charm.id}
              isSelected={selectedCharm === charm.id}
              onSelect={() => {
                console.log('Charm clicked! Selecting charm ID:', charm.id);
                if (onSelectedCharmChange) {
                  onSelectedCharmChange(charm.id);
                }
              }}
              transformMode={transformMode}
              initialPosition={charm.position}
              onPositionChange={(newPosition) => updateCharmPosition(charm.id, newPosition)}
              initialRotation={charm.rotation}
              onRotationChange={(newRotation) => updateCharmRotation(charm.id, newRotation)}
              initialScale={charm.scale}
              onScaleChange={(newScale) => updateCharmScale(charm.id, newScale)}
              onTransformingChange={setIsAnyCharmTransforming}
            />
          ))}
        </Suspense>

        <OrbitControls 
          enabled={!isCameraLocked && !isAnyCharmTransforming}
          enablePan={!isCameraLocked && !isAnyCharmTransforming}
          enableZoom={!isCameraLocked && !isAnyCharmTransforming}
          enableRotate={!isCameraLocked && !isAnyCharmTransforming}
        />
      </Canvas>
    </div>
  );
});

export default ModelViewer;