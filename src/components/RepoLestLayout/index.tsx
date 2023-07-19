import { useGetAllUserRepositoriesQuery } from "../../api/repos/reposApi";
import {
  Avatar,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import RepositoryItem from "./components/RepositoryItem";
import { useAppSelector } from "../../lib/hooks/redux";

import "./styles.scss";

const RepoLestLayout = () => {
  const { user } = useAppSelector((state) => state.authReducer);

  const { data, isFetching } = useGetAllUserRepositoriesQuery("");

  if (isFetching) {
    return <CircularProgress />;
  }
  return (
    <div className="repository_list_layout">
      <Card className="repository_list_layout__greetings">
        <Avatar
          style={{ width: "64px", height: "64px" }}
          alt="avatar"
          src={user?.avatar_url}
        />
        <Typography variant="h5">
          Welcome {user?.login}. Choose your repository
        </Typography>
      </Card>
      {data?.map((item) => {
        return (
          <RepositoryItem
            key={item.id}
            name={item.name}
            isPrivate={item.private}
            language={item.language}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default RepoLestLayout;
