import { useParams } from "react-router-dom";
import { useGetUserRepositoryQuery } from "../../api/repos/reposApi";
import { useAppSelector } from "../../lib/hooks/redux";
import { Card, CircularProgress } from "@mui/material";

import "./styles.scss";
import { useEffect } from "react";
import React from "react";
import { IErrorResponse} from "../../api/common/commonApi";
import FileTrees from "./components/FileTrees";
import RepositoryInfo from "./components/RepositoryInfo";
import ErrorCard from "../ErrorCard";

const RepositoryLayout = () => {
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.authReducer);

  const [currentBranch, setCurrentBranch] = React.useState("");

  const { data, isFetching, isError, error } = useGetUserRepositoryQuery({
    name: id || "",
    username: user?.login || "",
  });

  useEffect(() => {
    if (data) {
      setCurrentBranch(data.default_branch);
    }
  }, [data]);

  const handleChangeBranch = (branch: string) => {
    setCurrentBranch(branch);
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <ErrorCard message={(error as IErrorResponse).data.message} />;
  }

  return (
    <div className="repository_layout">
      {data && user && (
        <div className="repository_layout__content">
          <RepositoryInfo
            name={data.name}
            language={data.language}
            visibility={data.visibility}
            branch={currentBranch}
            onBranchChange={(value) => handleChangeBranch(value)}
          />
          <Card>
            <FileTrees
              name={data.name}
              username={user.login}
              path=""
              branch={currentBranch}
            />
          </Card>
        </div>
      )}
    </div>
  );
};
export default RepositoryLayout;
