import NextImage from "next/image";
interface iProps {
  src: string;
  mime: string;
}

function ImageViewer({ src, mime }: iProps) {
  if (!mime.startsWith("image")) return null;
  return (
    <div className="relative w-full h-full">
      <NextImage className="object-contain" src={src} alt="" fill></NextImage>
    </div>
  );
}

export default ImageViewer;
