import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../lib/hooks/redux";

import "./styles.scss";
import AuthService from "../../../../service/AuthService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../store/reducers/AuthSlice";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useAppSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    AuthService.deleteToken();
    dispatch(deleteUser());
    navigate("/login");
  };

  const handleClickOnGoToPage = () => {
    if (user) {
      window.location.href = `https://github.com/${user.login}`;
    }
  };

  const userSettings = [
    {
      id: 1,
      title: "Page in Github",
      onClick: handleClickOnGoToPage,
    },
    {
      id: 2,
      title: "Log out",
      onClick: handleLogOut,
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar className="header_layout">
        <Typography textAlign="center" variant="h6">
          <a className="link" href="/">
            GitHub Viewer
          </a>
        </Typography>
        <div className="header_layout__user">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="avatar" src={user?.avatar_url} />
            </IconButton>
          </Tooltip>
          {user && (
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <MenuItem key={setting.id} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
          <Typography textAlign="center">{user?.login}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
