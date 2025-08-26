import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, TransformControls } from "@react-three/drei";

function Model({ modelPath, position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(modelPath); // load glb
  return <primitive object={scene} position={position} scale={scale} />;
}

function Accessory({ modelPath}) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();
  return (
    <TransformControls object={ref.current} mode="translate">
      <primitive ref={ref} object={scene.clone()} scale={0.5}/>
    </TransformControls>
  );
}

export default function ModelViewer({ modelPath, onAccessoryDrop }) {
  const [accessories, setAccessories] = useState([]);

    const handleDrop = (e) => {
    e.preventDefault();
    const accessoryModel = e.dataTransfer.getData("modelPath");
    if (accessoryModel) {
      // Thêm accessory vào danh sách đang render
      setAccessories((prev) => [
        ...prev,
        { id: Date.now(), modelPath: accessoryModel },
      ]);

      // Gọi callback cho CustomizerPage nếu có
      if (onAccessoryDrop) onAccessoryDrop(accessoryModel);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

return (
    <div
      className="w-full h-full relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Canvas
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
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
              <Accessory key={acc.id} modelPath={acc.modelPath} />
            ))}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}