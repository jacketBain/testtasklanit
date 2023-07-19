import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IRepositoryItem } from "./interface";
import { useNavigate } from "react-router";

import "./styles.scss";

const RepositoryItem = ({
  name,
  isPrivate,
  description,
  language,
}: IRepositoryItem) => {
  const navigate = useNavigate();

  const handleOnClickOpen = () => {
    navigate(`/${name}`);
  };

  return (
    <Accordion className="repository_item">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="repository_item__title">
          <Typography>{name}</Typography>
          {isPrivate && (
            <Chip
              icon={<ShieldOutlinedIcon />}
              label="Private"
              color="error"
              variant="outlined"
            />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="repository_item__details">
          <div className="repository_item__details__description">
            <Typography variant="subtitle1">Description:</Typography>
            <Typography variant="subtitle2">{description || "None"}</Typography>
          </div>
          <Button variant="contained" onClick={handleOnClickOpen}>
            Open
          </Button>
          <Box>
            {language && (
              <Chip
                size="small"
                label={language}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
export default RepositoryItem;
