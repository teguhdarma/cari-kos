import React, { Suspense } from "react";
import {
 
    HomeIcon,
 
  } from "@heroicons/react/solid";
import Image from "next/image";
import Text from "./Text";
import House from "./House";
import Box from "./Box";
import Typed from 'react-typed';
import { Canvas } from "@react-three/fiber";
import {OrbitControls,Drei} from "@react-three/drei";
function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] mb-12">
          <Canvas>
              <OrbitControls enableZoom={false}  autoRotate={true}/>
        <ambientLight intensity={0.5}/>
        
        <directionalLight position={[-2,6,2]} intensity={1} />
        <Suspense fallback={null}>
        <House/>
        </Suspense>
      
      </Canvas>
       
      
      <div className="absolute top-1/2 w-full text-center ">
         
    
          <button className="text-blue-500  bg-white px-6 py-3 mt-12 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"><HomeIcon className="hidden md:inline-flex h-8 bg-blue-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
                <Typed
                strings={[
                    'Selamat datang di re:on',
                    'tempat mencari kos ',
                    'temukan tempat nyaman']}
                    typeSpeed={40}
                    backSpeed={50}
                    
                    loop >
                    <input type="text"/>
                </Typed></button>
          

      </div>
    </div>
  );
}

export default Banner;
