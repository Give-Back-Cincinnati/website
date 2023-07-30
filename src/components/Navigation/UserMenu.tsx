import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material'
import { useGetMeQuery, useLogoutMutation } from '@/store/api/openApi'
import { apiSlice } from '@/store/api/apiSlice';
import { useAppDispatch } from '@/store/hooks';

export const UserMenu = () => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: user } = useGetMeQuery()
  
  const [ triggerLogout, { status } ] = useLogoutMutation()
  
  useEffect(() => {
    // if the logout was successful, clear the user from the store
    if (status === 'fulfilled') {
      dispatch(apiSlice.util.resetApiState())
    }
  }, [ status, dispatch ])

  const onLogout = useCallback(() => {
    triggerLogout()
  }, [ triggerLogout ])

  if (!user) return <></>
  return <>
    <IconButton onClick={handleClick}>
      <Avatar
        src={user.profilePicture}
        alt={`${user.firstName} ${user.lastName}`}
      />
    </IconButton>
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <MenuItem
        onClick={onLogout}
        disabled={status !== 'uninitialized'}
      >
        Logout
      </MenuItem>
    </Menu>
  </>
}