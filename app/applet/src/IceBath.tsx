import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Html, Text, RoundedBox, MeshTransmissionMaterial, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Snowflake, ThermometerSnowflake, Droplets, HeartPulse, ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

useGLTF.preload('/ice_cube.glb');

function IceCubeModel({ isMain = false, ...props }: any) {
  const { scene } = useGLTF('/ice_cube.glb');
  
  const meshData = useMemo(() => {
    const c = scene.clone(true);
    let geom: THREE.BufferGeometry | null = null;
    c.traverse((node: any) => {
      if (node.isMesh && !geom) {
        geom = node.geometry;
      }
    });
    
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const center = box.getCenter(new THREE.Vector3());

    const scale = maxDim > 0 ? 1 / maxDim : 1;
    
    return { geom, center, scale };
  }, [scene]);

  if (!meshData.geom) return null;

  return (
    <group {...props}>
       <group scale={meshData.scale}>
          <mesh geometry={meshData.geom} position={[-meshData.center.x, -meshData.center.y, -meshData.center.z]}>
             {isMain ? (
               <MeshTransmissionMaterial
                  backside
                  backsideThickness={1.5}
                  thickness={3}
                  roughness={0.15}
                  ior={1.25}
                  chromaticAberration={0.06}
                  transmission={1}
                  transparent={true}
                  color="#ffffff"
                  resolution={128}
               />
             ) : (
               <meshStandardMaterial
                  color="#ffffff"
                  opacity={0.6}
                  metalness={0.1}
                  roughness={0.1}
                  transparent={true}
                  side={THREE.DoubleSide}
                  depthWrite={false}
               />
             )}
          </mesh>
       </group>
    </group>
  );
}

function MainCube() {
  const group = useRef<THREE.Group>(null);
  const cubeModel = useRef<THREE.Group>(null);

  useEffect(() => {
    // Scroll animation for spinning the main cube via GSAP
    if (group.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-trigger-area',
          start: 'top top',
          end: '+=4000',
          scrub: 1.5,
          pin: true,
        },
      });

      // Turn right by 90deg increments
      tl.to(group.current.rotation, { y: -Math.PI / 2, duration: 1 })
        .to(group.current.rotation, { y: -Math.PI, duration: 1 })
        .to(group.current.rotation, { y: -Math.PI * 1.5, duration: 1 });
    }

    // Set initial scale explicit
    if (group.current) {
      group.current.scale.set(1, 1, 1);
    }
  }, []);

  const panelClass = "w-[320px] h-[320px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-white/10 to-blue-500/10 backdrop-blur-md border-[2px] border-white/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(255,255,255,0.1)] pointer-events-none [backface-visibility:hidden] transform-gpu";

  // Position offset to place panels slightly outside the IceCube model
  const offset = 4.5;

  const WebGLPanel = ({ title, subtitle, desc, step, position, rotation }: any) => {
    return (
      <group position={position} rotation={rotation}>
        {/* Background Panel */}
        <RoundedBox args={[4, 4, 0.05]} radius={0.2} smoothness={4} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#0b1b3d" transparent opacity={0.8} roughness={0.5} metalness={0.2} />
        </RoundedBox>
        <RoundedBox args={[4, 4, 0.05]} radius={0.2} smoothness={4} position={[0, 0, -0.06]}>
           <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
        </RoundedBox>
        {/* Title */}
        <Text position={[0, 0.8, 0.01]} fontSize={0.6} color="white" anchorX="center" anchorY="middle" letterSpacing={-0.05} fontStyle="italic" fontWeight="bold">
          {title}
        </Text>
        {/* Subtitle */}
        <Text position={[0, 0.2, 0.01]} fontSize={0.2} color="#dbeafe" anchorX="center" anchorY="middle" letterSpacing={0.1}>
          {subtitle.toUpperCase()}
        </Text>
        {/* Desc */}
        <Text position={[0, -0.5, 0.01]} fontSize={0.16} color="#eff6ff" anchorX="center" anchorY="top" maxWidth={3.5} textAlign="center" lineHeight={1.5}>
          {desc}
        </Text>
        {/* Step */}
        <Text position={[0, -1.6, 0.01]} fontSize={0.12} color="#ffffff" fillOpacity={0.5} anchorX="center" anchorY="middle" letterSpacing={0.2}>
          {step}
        </Text>
      </group>
    );
  };

  return (
    <group ref={group}>
      {/* 3D Ice Cube in the very center */}
      <group ref={cubeModel}>
         <IceCubeModel isMain={true} scale={8} />
      </group>

      {/* GUI PANELS using WebGL Panel */}
      <WebGLPanel
         position={[0, 0, offset]} 
         rotation={[0, 0, 0]}
         title="ICE BATH THERAPY"
         subtitle="Giới hạn cái lạnh"
         desc="Dòng nước -10°C cuốn trôi axit lactic, tống khứ mệt mỏi, tái tạo năng lượng nguyên thủy để bạn trở lại mạnh mẽ."
         step="01 / 04"
      />

      <WebGLPanel
         position={[offset, 0, 0]} 
         rotation={[0, Math.PI / 2, 0]}
         title="CHỮA LÀNH"
         subtitle="Phục hồi cơ bắp"
         desc="Giảm viêm, xoa dịu tổn thương vi mô sau những buổi tập cường độ cao."
         step="02 / 04"
      />

      <WebGLPanel
         position={[0, 0, -offset]} 
         rotation={[0, Math.PI, 0]}
         title="Ý CHÍ"
         subtitle="Rèn luyện tinh thần"
         desc="Khi tâm trí hoàn toàn tĩnh lặng trong cái lạnh buốt xương, không thử thách bên ngoài nào có thể cản bước bạn."
         step="03 / 04"
      />

      <WebGLPanel
         position={[-offset, 0, 0]} 
         rotation={[0, -Math.PI / 2, 0]}
         title="TÁI SINH"
         subtitle="Đánh thức giác quan"
         desc="Tăng cường hệ miễn dịch và giải phóng norepinephrine, cho bạn sự sắc bén tuyệt đối."
         step="04 / 04"
      />
    </group>
  );
}

export default function IceBath() {
  return (
    <div className="bg-[#05080e] min-h-[400vh] w-full font-sans text-blue-50 selection:bg-blue-500/30">
      <Helmet>
         <title>Ice Bath Therapy - Giới hạn cái lạnh | Active Fox</title>
      </Helmet>

      {/* Fixed Canvas covering the screen */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#a5f3fc" />
          <directionalLight position={[-10, 10, -5]} intensity={1} color="#3b82f6" />
          
          <Suspense fallback={null}>
            <MainCube />
            <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll Trigger Area spanning multiple viewports */}
      <div id="scroll-trigger-area" className="w-full h-[400vh] relative z-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center text-blue-200/50 uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold animate-pulse flex flex-col items-center gap-2">
             <div>Cuộn chuột để xoay</div>
             <ArrowDown size={18} />
          </div>
      </div>
      
      {/* Dark gradient overlay at bottom to transition to footer */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05080e] to-transparent z-20 pointer-events-none"></div>

    </div>
  );
}
