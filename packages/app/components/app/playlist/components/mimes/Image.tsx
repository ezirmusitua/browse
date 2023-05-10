"use client";

import NextImage from "next/image";
import { useContext } from "react";
import Loading, { LoadingContext } from "../Loading";
import { iMimeBaseProps } from "./interface";

function ImageViewer({ src, mime }: iMimeBaseProps) {
  const { hide: hideLoading } = useContext<{ hide: any }>(LoadingContext);
  if (!mime.startsWith("image")) return null;
  return (
    <div className="relative w-full h-full">
      <NextImage
        className="object-contain"
        src={src}
        onLoadingComplete={hideLoading}
        alt=""
        fill
        quality={50}
      ></NextImage>
      <Loading></Loading>
    </div>
  );
}

export default ImageViewer;
