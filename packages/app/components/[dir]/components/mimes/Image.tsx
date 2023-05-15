"use client";

import NextImage from "next/image";
import { useContext } from "react";
import Loading, { LoadingContext } from "../Loading";
import { iMimeBaseProps } from "./interface";

interface iImageProps {
  use_next?: boolean;
  alt?: string;
  src: string;
  onLoadingComplete: {
    (): void;
  };
}

function ImageRender({
  use_next = false,
  alt = "",
  src,
  onLoadingComplete,
}: iImageProps) {
  if (use_next) {
    return (
      <NextImage
        className="object-contain"
        src={src}
        onLoadingComplete={onLoadingComplete}
        alt={alt}
        fill
        quality={50}
      ></NextImage>
    );
  }
  return (
    // eslint-disable-next-line
    <img
      alt={alt}
      src={src}
      className="h-full w-full object-contain"
      onLoad={onLoadingComplete}
    ></img>
  );
}

function ImageViewer({ src, mime }: iMimeBaseProps) {
  const { hide: hideLoading } = useContext<{ hide: any }>(LoadingContext);
  if (!mime.startsWith("image")) return null;
  return (
    <div className="relative w-full h-full">
      <ImageRender src={src} onLoadingComplete={hideLoading}></ImageRender>
      <Loading></Loading>
    </div>
  );
}

export default ImageViewer;
