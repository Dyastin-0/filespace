import {
  faFile,
  faImage,
  faFileAudio,
  faFileVideo,
  faFileAlt,
  faFileCode,
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faFileArchive,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";

export const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "webp":
    case "tiff":
      return faImage;
    case "mp3":
    case "wav":
    case "flac":
    case "aac":
    case "ogg":
      return faFileAudio;
    case "mp4":
    case "mkv":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
      return faFileVideo;
    case "pdf":
      return faFilePdf;
    case "txt":
      return faFileAlt;
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "html":
    case "css":
    case "json":
    case "py":
    case "rb":
    case "go":
    case "java":
    case "php":
    case "cpp":
    case "c":
    case "cs":
    case "swift":
    case "kt":
    case "rs":
    case "xml":
    case "yaml":
    case "yml":
    case "sql":
      return faFileCode;
    case "md":
      return faFileAlt;
    case "xlsx":
    case "xls":
      return faFileExcel;
    case "docx":
    case "doc":
      return faFileWord;
    case "pptx":
    case "ppt":
      return faFilePowerpoint;
    case "zip":
    case "rar":
    case "tar":
    case "gz":
      return faFileArchive;
    case "svg":
      return faFileImage;
    default:
      return faFile;
  }
};
