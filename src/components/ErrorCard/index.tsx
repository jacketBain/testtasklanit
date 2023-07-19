import { Card, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { IErrorCard } from "./interface";

import "./styles.scss";

const ErrorCard = ({ message }: IErrorCard) => {
  return (
    <div className="error_layout">
      <Card>
        <div className="error_layout__card">
          <ErrorIcon style={{ width: "64px", height: "64px" }} />
          <div className="error_layout__card__description">
            <Typography variant="h5">Error</Typography>
            <Typography variant="body1">{message}</Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ErrorCard;
