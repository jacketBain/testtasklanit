import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { useGetUserRepositoryContentQuery } from "../../../../api/repos/reposApi";
import { IFileTrees } from "./interface";
import { CircularProgress } from "@mui/material";
import FileLabel from "./components/FileLabel";
import ErrorCard from "../../../ErrorCard";
import { IErrorResponse } from "../../../../api/common/commonApi";

import "./styles.scss";

const FileTrees = ({ name, username, path, branch }: IFileTrees) => {
  const { data, isSuccess, isFetching, isError, error } =
    useGetUserRepositoryContentQuery({
      name: name,
      username: username || "",
      path: path,
      branch: branch,
    });

  const renderCatalogTree = () => {
    if (data)
      return data.map((item, index) => {
        return (
          <TreeItem
            className="filecatalog_layout__item"
            nodeId={index.toString()}
            label={
              <FileLabel name={item.name} type={item.type} size={item.size} />
            }
          >
            {item.type === "dir" && (
              <FileTrees
                name={name}
                username={username}
                path={`${path}/${item.name}`}
                branch={branch}
              />
            )}
          </TreeItem>
        );
      });
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <ErrorCard message={(error as IErrorResponse).data.message} />;
  }

  return (
    <TreeView className="filecatalog_layout" aria-label="file system navigator">
      {isSuccess && renderCatalogTree()}
    </TreeView>
  );
};
export default FileTrees;
