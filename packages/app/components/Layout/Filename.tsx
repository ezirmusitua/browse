import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileText,
  faFileVideo,
  faFileWord,
  faFileZipper,
  faFolder,
} from "@fortawesome/free-regular-svg-icons";
import { useMemo } from "react";

interface iProps {
  ext: string;
  active: boolean;
  children?: React.ReactNode;
  onClick?: {
    (e): void;
  };
}

const MimeIconMap = {
  ".aac": faFileAudio,
  ".ape": faFileAudio,
  ".flac": faFileAudio,
  ".mp3": faFileAudio,
  ".wav": faFileAudio,
  ".c": faFileCode,
  ".cpp": faFileCode,
  ".js": faFileCode,
  ".jsx": faFileCode,
  ".json": faFileCode,
  ".py": faFileCode,
  ".ts": faFileCode,
  ".tsx": faFileCode,
  ".yaml": faFileCode,
  ".csv": faFileExcel,
  ".xls": faFileExcel,
  ".xlsx": faFileExcel,
  ".avif": faFileImage,
  ".ico": faFileImage,
  ".gif": faFileImage,
  ".jpg": faFileImage,
  ".jpeg": faFileImage,
  ".png": faFileImage,
  ".webp": faFileImage,
  ".pdf": faFilePdf,
  ".ppt": faFilePowerpoint,
  ".pptx": faFilePowerpoint,
  ".txt": faFileText,
  ".mp4": faFileVideo,
  ".avi": faFileVideo,
  ".webm": faFileVideo,
  ".wmv": faFileVideo,
  ".doc": faFileWord,
  ".docx": faFileWord,
  ".rtf": faFileWord,
  ".7z": faFileZipper,
  ".gz": faFileZipper,
  ".zip": faFileZipper,
};

function Filename({ ext = "", active, children = null, onClick }: iProps) {
  const className = useMemo(() => {
    let name = "px-4 py-2 flex items-center text-white";
    return name + (active ? " bg-blue-900" : "");
  }, [active]);

  const icon = useMemo(() => {
    if (!ext) return faFolder;
    const _icon = MimeIconMap[ext];
    if (!_icon) return faFile;
    return _icon;
  }, [ext]);

  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      <p className="pl-2 mb-0 text-md text-one-line">{children}</p>
    </div>
  );
}

export default Filename;
