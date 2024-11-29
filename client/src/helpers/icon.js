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
      return faImage; // Image files
    case "mp3":
    case "wav":
    case "flac":
    case "aac":
    case "ogg":
      return faFileAudio; // Audio files
    case "mp4":
    case "mkv":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
      return faFileVideo; // Video files
    case "pdf":
      return faFilePdf; // PDF files
    case "txt":
      return faFileAlt; // Text files
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
      return faFileCode; // SQL files
    case "md":
      return faFileAlt; // Markdown files
    case "xlsx":
    case "xls":
      return faFileExcel; // Excel files
    case "docx":
    case "doc":
      return faFileWord; // Word documents
    case "pptx":
    case "ppt":
      return faFilePowerpoint; // PowerPoint files
    case "zip":
    case "rar":
    case "tar":
    case "gz":
      return faFileArchive; // Archive files
    case "svg":
      return faFileImage; // SVG files
    default:
      return faFile; // Default for unknown types
  }
};
