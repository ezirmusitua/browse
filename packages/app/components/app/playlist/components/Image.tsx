"use client";

import NextImage from "next/image";
import { useContext } from "react";
import Loading, { LoadingContext } from "./Loading";

interface iProps {
  src: string;
  mime: string;
}

function ImageViewer({ src, mime }: iProps) {
  const { hide: hide_loading } = useContext<{ hide: any }>(LoadingContext);
  if (!mime.startsWith("image")) return null;
  return (
    <div className="relative w-full h-full">
      <NextImage
        className="object-contain"
        src={src}
        onLoadingComplete={hide_loading}
        alt=""
        fill
      ></NextImage>
      <Loading></Loading>
    </div>
  );
}

export default ImageViewer;
