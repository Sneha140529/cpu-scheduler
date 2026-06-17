import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    if (mountRef.current) {
      mountRef.current.appendChild(
        renderer.domElement
      );
    }

    const geometry =
      new THREE.BoxGeometry();

    const material =
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });

    const cube = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();

      if (
        mountRef.current &&
        mountRef.current.contains(
          renderer.domElement
        )
      ) {
        mountRef.current.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}

export default Scene3D;