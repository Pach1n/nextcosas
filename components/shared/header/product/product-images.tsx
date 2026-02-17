"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ProductImages({ images }: { images: string[] }) {
  const searchParams = useSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const imageIndex = searchParams.get("imageIndex");
    if (imageIndex !== null) {
      setSelectedImageIndex(parseInt(imageIndex));
    }
  }, [searchParams]);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <Image
        src={images[selectedImageIndex]}
        alt="imagen de prueba"
        width={1000}
        height={1000}
        priority
        className="min-h-[300px] object-cover object-center"
      />

      {/* Poner diferentes imagenes depende de la seleccion */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`cursor-pointer border-2 transition-all aspect-square ${
              selectedImageIndex === index
                ? "border-orange-500"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Producto - vista ${index + 1}`}
              width={100}
              height={100}
              className="rounded w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
