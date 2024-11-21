import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as THREE from 'three';
import {
  useSetRadiusMutation,
  useGetRadiusQuery,
} from '../../features/api/apiSlice';

function Sphere() {
  const [radius, setRadius] = useState(10);

  // Fetch current radius from the backend
  const { data: currentRadius, refetch } = useGetRadiusQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  // Mutation to update radius
  const [setRadiusMutation] = useSetRadiusMutation();

  useEffect(() => {
    if (currentRadius) {
      setRadius(currentRadius);
    }
  }, [currentRadius]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById('sphereGeometry');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Geometry and material for the sphere
    let geometry = new THREE.SphereGeometry(radius, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 'lightblue' });
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      sphere.rotation.x += 0.01;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      // Clean up on component unmount
      renderer.dispose();
      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
    };
  }, [radius]);

  const handleRadiusAdjustment = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newRadius = parseFloat(form.radiusValue.value);
    if (!isNaN(newRadius)) {
      await setRadiusMutation(newRadius); // Send radius to the backend
      refetch(); // Refresh the current radius
    }
    form.reset();
  };

  return (
    <div className="h-fit bg-black relative">
      <div>
        <canvas id="sphereGeometry" />
      </div>
      <div className="text-white mt-20 bg-red-500 left-1/4 top-2/3 absolute">
        <form onSubmit={handleRadiusAdjustment}>
          <div>
            <input
              name="radiusValue"
              type="number"
              placeholder="Type here"
              className="text-black input input-bordered w-full max-w-xs"
            />
          </div>
          <button className="text-white border-2 border-black py-1 px-3 font-semibold text-2xl">
            Set The Radius
          </button>
        </form>
      </div>
      <div>
        <NavLink to={'/'}>
          <h1 className="text-center my-3 text-white text-2xl font-semibold border-2 border-black">
            Go To Home
          </h1>
        </NavLink>
      </div>
    </div>
  );
}

export default Sphere;
