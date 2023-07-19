import { IFileLabel } from "./interface";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Typography } from "@mui/material";

import "./styles.scss";

const FileLabel = ({ name, type, size }: IFileLabel) => {
  return (
    <div className="file_label">
      <div className="file_label__name">
        {type === "dir" ? <FolderIcon /> : <InsertDriveFileIcon />}
        <Typography variant="body1">{name}</Typography>
      </div>
      {type === "file" && (
        <Typography variant="caption">{size} bytes</Typography>
      )}
    </div>
  );
};
export default FileLabel;
