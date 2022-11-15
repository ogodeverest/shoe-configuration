import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useConfigStore, { ConfigItems } from "./store";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    shoe: THREE.Mesh;
    shoe_1: THREE.Mesh;
    shoe_2: THREE.Mesh;
    shoe_3: THREE.Mesh;
    shoe_4: THREE.Mesh;
    shoe_5: THREE.Mesh;
    shoe_6: THREE.Mesh;
    shoe_7: THREE.Mesh;
  };
  materials: {
    laces: THREE.MeshStandardMaterial;
    mesh: THREE.MeshStandardMaterial;
    caps: THREE.MeshStandardMaterial;
    inner: THREE.MeshStandardMaterial;
    sole: THREE.MeshStandardMaterial;
    stripes: THREE.MeshStandardMaterial;
    band: THREE.MeshStandardMaterial;
    patch: THREE.MeshStandardMaterial;
  };
};
const modelUrl = "https://ogodeverest.github.io/shoe-configuration/shoe.glb";
export default function Shoe(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;

  const items: ConfigItems = useConfigStore((state) => state.items);
  const hovered = useConfigStore((state) => state.hovered);
  const setCurrent = useConfigStore((state) => state.setCurrent);
  const setHovered = useConfigStore((state) => state.setHovered);
  const current = useConfigStore((store) => store.current);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // (group.current as THREE.Group).rotation.z =
    //   -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    (group.current as THREE.Group).rotation.x = Math.cos(t / 4) / 8;
    (group.current as THREE.Group).rotation.y = Math.sin(t / 4) / 8;
    (group.current as THREE.Group).position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  useEffect(() => {
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${
      items[hovered as keyof ConfigItems]
    }"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;

    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
      return () => {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          auto
        )}'), auto`;
      };
    }
  }, [hovered]);

  return (
    <group
      {...props}
      dispose={null}
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        const material = (e.object as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        setHovered(material.name as keyof ConfigItems);
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) setHovered(null);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        const material = (e.object as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        setCurrent(material.name as keyof ConfigItems);
      }}
      onPointerMissed={(e) => {
        setCurrent("mesh");
      }}
    >
      {current && (
        <Text
          position-z={-2}
          fontSize={2.3}
          font={
            "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
          }
          anchorX="center"
          anchorY="middle"
        >
          <meshStandardMaterial color={items[current]} />
          {current.toUpperCase()}
        </Text>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={items.laces}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={items.mesh}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={items.caps}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={items.inner}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={items.sole}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={items.stripes}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={items.band}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={items.patch}
      />
    </group>
  );
}

useGLTF.preload(modelUrl);
