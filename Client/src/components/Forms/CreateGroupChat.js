import {
  InputBase,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { Create, Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import LoginModal from '../Modal/Login';
import customAxios from '../../utils/fetchData';
import {createGroupChat} from '../../redux/callApi/messageCall'; 

  export default function CreateGroupChat(props) {
    const { handleClose, usersParent, nameParent } = props;
  
    const dispatch = useDispatch();
  
    const [state, setState] = useState({
      loading: false,
      error: null,
    });
    const [error, setError] = useState("")
  
    const { auth} = useSelector(state => state);
  

    const [name, setName] = useState(nameParent || "");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [users, setUsers] = useState(usersParent|| []);
    
    const classes = formStyles();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return setSearchResult([]);
        try {
            const res = await customAxios().get(`/user/search_by_name?fullname=${search}`)
            const tempData = res.data.users.filter(item => item._id !== auth.user._id)
            setSearchResult(tempData);
        } catch (err) {
            console.log(err)
        }
    }
    const handleAdd = (user) => {
        const isVail = users.filter(item => item._id === user._id)
        if(isVail.length > 0){
          setError("Đã thêm thành viên!")
          return;
        }else{
          setUsers([...users, user]);
        }
    }

    const removeUser = index => {
        let temp = [...users];
        temp.splice(index, 1);
        setUsers(temp);
      };
    const handleSubmit = e => {
        e.preventDefault();
        if (name === "") {
            setError("Cần điền tên nhóm!")
            return;
        }
        if(users.length < 2){
            setError("Cần thêm ít nhất 2 thành viên!")
            return;
        }
        setState({
            loading: true,
            error: null
        });
        dispatch(createGroupChat(users, name, auth, () => {
            setState({
              loading: false,
              error: false
            });
            handleClose();
          }
        ));
    };
    return (
      <>
        {auth.token ? (
          <Paper className={classes.paperContainer}>
            <div className={classes.modal_header}>
              <Typography variant="h5" style={{ marginLeft: '35%' }}>
                  Tạo nhóm trò chuyện
              </Typography>
              <IconButton size="small" onClick={handleClose}>
                <Close className={classes.modal_header_closeIcon} />
              </IconButton>
            </div>
            <div className={classes.create} style={{marginBottom: 0}}>
              {error !== "" &&
                  <Typography variant='body1' style={{color:"red"}} >{error}</Typography>
              }
              <div className={classes.createWrapper}>
                  <InputBase
                      placeholder="Tên nhóm trò chuyện"
                      title="name"
                      variant="outlined"
                      name="name"
                      id="name"
                      required
                      className={classes.user}
                      value={name}
                      onChange={e => setName(e.target.value)}
                  />
                <form onSubmit={handleSearch}>
                    <InputBase
                        placeholder="Tìm tên thành viên"
                        title="search"
                        variant="outlined"
                        name="search"
                        id="search"
                        className={classes.user}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                
              </div>
            </div>
            <div style={{ padding: '5px 0 5px 0' }}>
                {users.map((value, idx) => (
                  <Chip
                    label={value.fullname}
                    onDelete={() => removeUser(idx)}
                    key={idx}
                    style={{
                      marginInline: 5,
                      marginBottom: 5,
                      backgroundColor: '#A5DEC8'
                    }}
                  />
                ))}
            </div>
            <List className={classes.message_users_list}>
                    {
                       searchResult.length > 0 ? <>
                            {searchResult.map(user => 
                                <ListItem button key={user._id} onClick={() => handleAdd(user)}>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={user.avatar}>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.fullname} />
                                </ListItem>
                            )}
                        </> : <></>
                    }
            </List>
            <Button
              className={classes.button}
              onClick={handleSubmit}
              disabled={state.loading}
            >
              {state.loading ? (
                <CircularProgress size="25px" color="inherit" />
              ) : (
                <>
                  <Create style={{ marginRight: 10 }} />
                   Tạo
                </>
              )}
            </Button>
          </Paper>
        ) : (
          <LoginModal />
        )}
      </>
    );
  }
  