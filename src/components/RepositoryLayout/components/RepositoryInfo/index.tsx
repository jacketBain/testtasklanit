import CodeIcon from "@mui/icons-material/Code";
import { IRepositoryInfo } from "./interface";
import {
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../../lib/hooks/redux";
import { useGetUserRepositoryBranchesQuery } from "../../../../api/repos/reposApi";

import "./styles.scss";

const RepositoryInfo = ({
  name,
  language,
  visibility,
  branch,
  onBranchChange,
}: IRepositoryInfo) => {
  const { user } = useAppSelector((state) => state.authReducer);

  const { data, isSuccess } = useGetUserRepositoryBranchesQuery({
    name: name,
    username: user?.login || "",
  });

  const handelChangeBranchSelect = (event: SelectChangeEvent) => {
    onBranchChange(event.target.value as string);
  };

  return (
    <Card className="repository_info">
      <div className="repository_info__title">
        <CodeIcon />
        <Typography
          className="repository_info__title__name"
          variant="h5"
          gutterBottom
        >
          {name}
        </Typography>
        {language && (
          <Chip
            size="small"
            label={language}
            color="primary"
            variant="outlined"
          />
        )}
        <Chip
          size="small"
          label={visibility}
          color="primary"
          variant="outlined"
        />
      </div>
      <FormControl className="repository_info__branch">
        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
        {isSuccess && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            label="Branch"
            onChange={handelChangeBranchSelect}
          >
            {data &&
              data.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      </FormControl>
    </Card>
  );
};
export default RepositoryInfo;
