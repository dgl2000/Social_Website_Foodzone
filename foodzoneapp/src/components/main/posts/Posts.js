/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import List from '@mui/material/List'
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';
import DynamicFeedTwoToneIcon from '@mui/icons-material/DynamicFeedTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Pagination } from '@mui/material';
import {
    CardHeader,
    IconButton,
    CardMedia,
} from "@material-ui/core";
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';

function Posts(props) {
    const [userName, setUserName] = useState("");
    const [followList, setFollowList] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newPostImage, setNewPostImage] = useState("");
    const [disPlayPosts, setDisplayPosts] = useState([]);

    const [postSender, setPostSender] = useState([]);
    const [postDate, setPostDate] = useState([]);
    const [postList, setPostList] = useState([]);
    const [postContentList, setPostContentList] = useState([]);

    const [showComment, setShowComment] = useState([]);
    const [newContent, setNewContent] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [modifyContent, setModifyContent] = useState([]);
    const [postImg, setPostImg] = useState([]);
    const [postId, setPostId] = useState([]);
    const [commentRenderList, setCommentRenderList] = useState([]);
    const [modifyComment, setModifyComment] = useState([]);
    const [addCommentStatus, setAddCommentStatus] = useState([]);
    const [addNewComment, setAddNewComment] = useState([]);
    const [page, setPage] = useState(1);
    const [editCommentPermission, setEditCommentPermission] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [newPostError, setNewPostError] = useState({
        post: ""
    });

    const PER_PAGE = 5;
    let pageStart = 0;
    let pageEnd = 4;

    const [imageUrl, setImageUrl] = useState([]);
    const [postComment, setPostComment] = useState([]);
    const [editPermit, setEditPermit] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const getLocalStorage = function () {
        if (props.followList) {
            setFollowList(props.followList.follow);
        }
        fetch('https://foodzone-gd25.herokuapp.com/username', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },

            credentials: 'include'
        })
            .then(res => {
                if (res.status === 401) {
                    return null;
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    setUserName(data.username);
                }
            })
    }


    const getPosts = () => {
        fetch('https://foodzone-gd25.herokuapp.com/articles', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },

            credentials: 'include'
        })
            .then(res => {
                if (res.status === 401) {
                    return null;
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    setPostList(data.articles);
                }
            })
    }

    const getPostItem = () => {
        var postSenderArr = [];
        var postContentArr = [];
        var postDateArr = [];
        var editPermitArr = [];
        var postIdArr = [];
        var postCommentArr = [];
        var editCommentArr = [];
        var newCommentArr = [];
        var postImageArr = [];
        var postImageStatus = [];
        var editCommentPermitArr = [];
        postList.forEach((item) => {
            let tempModifyArr = [];
            postSenderArr.push(item.author);
            postContentArr.push(item.text);
            postDateArr.push(timeManage(item.date));
            if (item.author === userName) {
                editPermitArr.push(true);
            } else {
                editPermitArr.push(false);
            }
            postIdArr.push(item.pid);
            postCommentArr.push(item.comments);
            item.comments.forEach((item) => {
                if (item.author === userName) {
                    tempModifyArr.push(true);
                } else {
                    tempModifyArr.push(false);
                }
            })

            editCommentPermitArr.push(tempModifyArr);
            editCommentArr.push(Array(item.comments.length).fill(false));
            newCommentArr.push(Array(item.comments.length).fill(""));
            postImageArr.push(item.imageUrl);
            if (item.imageUrl === undefined) {
                postImageStatus.push(true);
            } else {
                postImageStatus.push(false);
            }
        });
        setPostSender(postSenderArr);
        setPostContentList(postContentArr);
        setPostDate(postDateArr);
        setEditPermit(editPermitArr);
        setPostId(postIdArr)
        setPostComment(postCommentArr);
        setModifyComment(editCommentArr);
        setImageUrl(postImageArr);
        setEditCommentPermission(editCommentPermitArr);

        setShowComment(Array(postContentArr.length).fill(false));
        setModifyContent(Array(postContentArr.length).fill(false));
        setPostImg(postImageStatus);
        setNewContent(Array(postContentArr.length).fill(""));
        setAddCommentStatus(Array(postContentArr.length).fill(false));
        setAddNewComment(Array(postContentArr.length).fill(""));
        setNewComment(newCommentArr);
        let count = Math.ceil(postContentArr.length / PER_PAGE);
        setPageCount(count);
    }

    const timeManage = (inputDate) => {
        var created_date = new Date(inputDate);

        var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
        var year = created_date.getFullYear();
        var month = months[created_date.getMonth()];
        var date = created_date.getDate();
        var hour = created_date.getHours();
        var min = created_date.getMinutes();
        var sec = created_date.getSeconds();
        var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;    // final date with time, you can use this according your requirement
        return time;
    }

    const handleNewPost = (event) => {
        setNewPost(event.target.value);
        if (event.target.value !== "") {
            setNewPostError(postError => ({ ...postError, 'post': null }));
        }
    }

    const handleNewContent = (event) => {
        let tmp = newContent;
        tmp[event.currentTarget.id] = event.target.value;
        setNewContent(tmp);
    }

    const handleNewCmment = (event) => {
        let tmp = newComment;
        tmp[event.currentTarget.id][event.currentTarget.name] = event.target.value;
        setNewComment(tmp);
    }

    const handleModifyComment = (event) => {
        let tmp = [...modifyComment];
        let id = event.currentTarget.id;
        let idx1 = id.substring(0, id.indexOf(' '));
        let idx2 = id.substring(id.indexOf(' ') + 1);
        tmp[idx1][idx2] = !tmp[idx1][idx2];
        setModifyComment(tmp);
        renderPost();
    }

    const handleReset = () => {
        setNewPost('');
        setNewPostImage('');
    }

    const handleAddSubmit = () => {
        if (newPost !== "") {

            let tempContent = postContentList;
            tempContent.unshift(newPost);
            setPostContentList(tempContent);

            let tempShowComment = showComment;
            tempShowComment.unshift(false);
            setShowComment(tempShowComment);

            let tempEditPermit = editPermit;
            tempEditPermit.unshift(true);
            setEditPermit(tempEditPermit);

            let tempModifyComment = modifyComment;
            tempModifyComment.unshift([]);
            setModifyComment(tempModifyComment);

            let tempNewComment = newComment;
            tempNewComment.unshift([]);
            setNewComment(tempNewComment);

            let tempAddCommentStatus = addCommentStatus;
            tempAddCommentStatus.unshift(false);
            setAddCommentStatus(tempAddCommentStatus);

            let tempModifyContent = modifyContent;
            tempModifyContent.unshift(false);
            setModifyContent(tempModifyContent);

            let tempAddNewCommet = addNewComment;
            tempAddNewCommet.unshift("");
            setAddNewComment(tempAddNewCommet);

            let tempEditCommentPermission = editCommentPermission;
            tempEditCommentPermission.unshift([]);
            setEditCommentPermission(tempEditCommentPermission);

            let count = Math.ceil(postContentList.length / PER_PAGE);
            setPageCount(count);


            const fd = new FormData();
            let tempPostImg = postImg;

            if (newPostImage) {
                fd.append('image', newPostImage);
                tempPostImg.unshift(false);
            } else {
                tempPostImg.unshift(true);
            }

            setPostImg(tempPostImg);
            fd.append('text', newPost);

            fetch('https://foodzone-gd25.herokuapp.com/article', {
                method: 'POST',
                credentials: 'include',
                body: fd
            })
                .then((res) => res.json())
                .then(
                    (data) => {
                        let temp = imageUrl;
                        let length = data.articles.length;
                        temp.unshift(data.articles[length - 1].imageUrl);
                        setImageUrl(temp);

                        let tempPostComment = postComment;
                        tempPostComment.unshift(data.articles[length - 1].comments);
                        setPostComment(tempPostComment);

                        let tempPostSender = postSender;
                        tempPostSender.unshift(data.articles[length - 1].author);
                        setPostSender(tempPostSender);

                        let tempPostDate = postDate;
                        tempPostDate.unshift(timeManage(data.articles[length - 1].date));
                        setPostDate(tempPostDate);

                        let tempPostId = postId;
                        tempPostId.unshift(data.articles[length - 1].pid);
                        setPostId(tempPostId);

                        setNewPost('');
                        setNewPostImage('');

                        renderPost();
                    }
                )
        } else {
            if (newPost === "") {
                setNewPostError(postError => ({ ...postError, 'post': "Please add post!" }));
            }
        }
    }

    const handleComment = (event) => {

        let tmp = showComment;
        let tmpComment = addCommentStatus;
        let tmpModify = modifyContent;

        if (tmp[event.currentTarget.id]) {

            if (tmpComment[event.currentTarget.id]) {
                tmpComment[event.currentTarget.id] = !tmpComment[event.currentTarget.id];
                setAddCommentStatus(tmpComment);
            }
        }

        if (tmpModify[event.currentTarget.id]) {
            tmpModify[event.currentTarget.id] = !tmpModify[event.currentTarget.id];
            setModifyContent(tmpModify);
        }

        tmp[event.currentTarget.id] = !tmp[event.currentTarget.id];
        setShowComment(tmp);

        renderPost();
    }

    const handleModifyContent = (event) => {
        let tmp = modifyContent;
        tmp[event.currentTarget.id] = !tmp[event.currentTarget.id];
        setModifyContent(tmp);
        renderPost();
    }

    const handleAddComment = (event) => {
        let tmp = addCommentStatus;
        tmp[event.currentTarget.id] = !tmp[event.currentTarget.id];
        setAddCommentStatus(tmp);
        renderPost();
    }

    const handleNewCommentVal = (event) => {
        let tmp = addNewComment;
        tmp[event.currentTarget.id] = event.target.value;
        setAddNewComment(tmp);
    }

    const handleUpdateComment = (event) => {
        let id = event.currentTarget.id;
        let articel_id = event.currentTarget.name;
        let idx = id.substring(0, id.indexOf(' '));
        let idx2 = id.substring(id.indexOf(' ') + 1);
        if (newComment[idx][idx2] !== "") {
            let bodyContent = { text: newComment[idx][idx2], commentId: idx2 };
            fetch('https://foodzone-gd25.herokuapp.com/articles/' + articel_id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(bodyContent)
            })
                .then((res) => {
                    let tmp = modifyComment;
                    tmp[idx][idx2] = !tmp[idx][idx2];
                    setModifyComment(tmp);

                    // Move back to show the updated content
                    let tmpComment = postComment;
                    tmpComment[idx][idx2].text = newComment[idx][idx2];
                    setPostComment(tmpComment);

                    renderPost();
                })
        }
    }

    const handleCancelUpdateComment = (event) => {
        let idx = event.currentTarget.id;
        let idx_y = event.currentTarget.name;
        let tmp = modifyComment;
        tmp[idx][idx_y] = !tmp[idx][idx_y];
        setModifyComment(tmp);
        renderPost();
    }

    const handleUpdatePost = (event) => {
        if (newContent[event.currentTarget.id] !== "") {
            let idx = event.currentTarget.id;
            let bodyContent = { text: newContent[event.currentTarget.id] };
            fetch('https://foodzone-gd25.herokuapp.com/articles/' + event.currentTarget.name, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },

                credentials: 'include',
                body: JSON.stringify(bodyContent)
            })
                .then((res) => {
                    let tmp = modifyContent;
                    tmp[idx] = !tmp[idx];
                    setModifyContent(tmp);

                    // Move back to show the updated content
                    let tmpPost = postContentList;
                    tmpPost[idx] = newContent[idx];
                    setPostContentList(tmpPost);

                    renderPost();
                })
        }
    }

    const handleAddNewComment = (event) => {
        let idx = event.currentTarget.id;
        if (addNewComment[event.currentTarget.id] !== "") {
            let bodyContent = { text: addNewComment[event.currentTarget.id], commentId: '-1' };
            fetch('https://foodzone-gd25.herokuapp.com/articles/' + event.currentTarget.name, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(bodyContent)
            })
                .then((res) => res.json())
                .then((data) => {
                    let tmp = addCommentStatus;
                    tmp[idx] = !tmp[idx];
                    setAddCommentStatus(tmp);


                    let tmpModifyComment = [...modifyComment];
                    tmpModifyComment[idx].push(false);
                    setModifyComment(tmpModifyComment);


                    let tmpNewComment = [...newComment];
                    tmpNewComment[idx].push([]);
                    setNewComment(tmpNewComment);

                    let tmpAddNewCommet = addNewComment;
                    tmpAddNewCommet.push('');
                    setAddNewComment(tmpAddNewCommet);

                    let tmpEditCommentPermission = [...editCommentPermission];
                    tmpEditCommentPermission[idx].push(true);
                    setEditCommentPermission(tmpEditCommentPermission);

                    let tmpPostComment = postComment;
                    tmpPostComment[idx] = data.articles.comments;
                    setPostComment(tmpPostComment);

                    renderPost();
                });
        }

    }

    const handleCancelAddNewComment = (event) => {
        let idx = event.currentTarget.id;
        let tmp = addCommentStatus;
        tmp[idx] = !tmp[idx];
        setAddCommentStatus(tmp);
        renderPost();
    }

    // Render the posts on the main page
    const renderPost = () => {
        let postArr = [];
        let commentArr = [];
        for (let i = 0; i < postSender.length; i++) {
            let commentSliceArr = [];
            for (let j = 0; j < postComment[i].length; j++) {
                commentSliceArr.push
                    (<Grid key={"comment-" + j}>
                        {modifyComment[i][j] ?
                            (<>
                                <TextField
                                    fullWidth
                                    label="Edit"
                                    multiline={true}
                                    minRows={3}
                                    defaultValue={postComment[i][j].text}
                                    onChange={handleNewCmment}
                                    id={i.toString()}
                                    name={j.toString()}
                                    margin="dense"
                                />
                                <IconButton id={i} name={j} onClick={handleCancelUpdateComment}>
                                    <CancelPresentationTwoToneIcon />
                                </IconButton>
                                <IconButton id={i + ' ' + j} name={postId[i]} onClick={handleUpdateComment}>
                                    <CheckCircleOutlineTwoToneIcon />
                                </IconButton>
                            </>)
                            : editCommentPermission[i][j] ?
                                (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Author:</strong> {postComment[i][j].author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Date:</strong> {postComment[i][j].date}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Comment:</strong> {postComment[i][j].text}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Modify:</strong>
                                            <IconButton id={i + " " + j} onClick={handleModifyComment}>
                                                <RateReviewTwoToneIcon />
                                            </IconButton>
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            -----------------
                                        </Typography>
                                    </>) :

                                (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Author:</strong> {postComment[i][j].author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Date:</strong> {postComment[i][j].date}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Comment:</strong> {postComment[i][j].text}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ------------------
                                        </Typography>
                                    </>)

                        }
                    </Grid>
                    )
            }
            commentArr.push(commentSliceArr);
        }
        setCommentRenderList(commentArr);

        for (let i = 0; i < postSender.length; i++) {
            if (i >= pageStart && i <= pageEnd) {
                postArr.push(
                    <Card sx={{ marginLeft: 4, width: 300 }} key={i} data-testid="postTestList">
                        <CardHeader
                            avatar={
                                <Avatar src="https://res.cloudinary.com/hevjiekwx/image/upload/v1669835919/apple-touch-icon_ptjygl.png">
                                </Avatar>
                            }
                            title={postSender[i]}
                            subheader={postDate[i]}
                        />
                        {postImg[i]
                            ? null
                            : (
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={imageUrl[i]}
                                    alt="Meal"
                                />
                            )
                        }

                        <CardContent>
                            <Typography variant="body1" color="text.secondary" style={{ fontWeight: 600 }}>
                                {showComment[i] ? "Comments" : "Contents"}
                            </Typography>
                            {
                                modifyContent[i] ? (
                                    <TextField
                                        fullWidth
                                        label="Edit"
                                        multiline={true}
                                        minRows={10}
                                        defaultValue={postContentList[i]}
                                        onChange={handleNewContent}
                                        id={i.toString()}
                                        margin="dense"
                                    />)
                                    : addCommentStatus[i] ?
                                        (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    label="Add"
                                                    multiline={true}
                                                    minRows={6}
                                                    onChange={handleNewCommentVal}
                                                    id={i.toString()}
                                                    margin="dense"
                                                />
                                                <IconButton id={i} name={postId[i]} onClick={handleCancelAddNewComment}>
                                                    <CancelPresentationTwoToneIcon />
                                                </IconButton>
                                                <IconButton id={i} name={postId[i]} onClick={handleAddNewComment}>
                                                    <CheckCircleOutlineTwoToneIcon />
                                                </IconButton>
                                            </>
                                        )
                                        : showComment[i] ?
                                            (commentArr[i].map((value, idx) => { return value }))
                                            :
                                            (
                                                <Typography variant="body2" color="text.secondary">
                                                    {postContentList[i]}
                                                </Typography>
                                            )

                            }
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton id={i} onClick={handleComment}>
                                {showComment[i]
                                    ? <DynamicFeedTwoToneIcon />
                                    : <MessageTwoToneIcon />
                                }
                            </IconButton>
                            {showComment[i]
                                ? (
                                    <IconButton id={i} onClick={handleAddComment}>
                                        <PostAddIcon />
                                    </IconButton>
                                )
                                : null
                            }

                            {!editPermit[i] ?
                                null :
                                showComment[i]
                                    ? null
                                    : (
                                        <IconButton id={i} onClick={handleModifyContent}>
                                            <BorderColorTwoToneIcon />
                                        </IconButton>
                                    )
                            }

                            {editPermit[i] && modifyContent[i]
                                ? (
                                    <IconButton id={i} name={postId[i]} onClick={handleUpdatePost}>
                                        <CheckCircleOutlineTwoToneIcon />
                                    </IconButton>
                                )
                                : null
                            }

                        </CardActions>
                    </Card>
                );
            }

        }
        setDisplayPosts(postArr);
    }

    // Filter the article and author and re-render the posts
    const handleSearchSubmit = () => {
        if (searchInput !== '') {
            const resultIdx = [];
            // filter the post text and author.
            postSender.forEach((val, idx) => {
                if (val.toLowerCase().includes(searchInput.toLowerCase())) {
                    if (resultIdx.indexOf(idx) === -1) {
                        resultIdx.push(idx);
                    }
                }
            });

            postContentList.forEach((val, idx) => {
                if (val.toLowerCase().includes(searchInput.toLowerCase())) {
                    if (resultIdx.indexOf(idx) === -1) {
                        resultIdx.push(idx);
                    }
                }
            });

            const tempPostSender = [];
            postSender.forEach((val, idx) => {
                if (resultIdx.indexOf(idx) !== -1) {
                    tempPostSender.push(val);
                }
            });


            const tempPostContentList = [];
            postContentList.forEach((val, idx) => {
                if (resultIdx.indexOf(idx) !== -1) {
                    tempPostContentList.push(val);
                }
            });


            setPostSender(tempPostSender);
            setPostContentList(tempPostContentList);

            setSearchInput('');
        } else {
            getPostItem();
        }
    }

    const handleChangePage = (event, page) => {
        const pageNumber = Math.max(1, page);
        setPage(currentPage => Math.min(pageNumber, pageCount));

        let currentPage = Math.min(pageNumber, pageCount);
        pageStart = (currentPage - 1) * PER_PAGE;
        pageEnd = pageStart + PER_PAGE - 1;

        renderPost();
    }

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    }

    const handleUploadImage = (event) => {
        setNewPostImage(event.target.files[0]);
    }

    useEffect(() => {
        getPosts();
    }, []);


    useEffect(() => {
        getLocalStorage();
        getPosts();
        getPostItem();
    }, [props.followList])


    useEffect(() => {
        getPostItem();
    }, [postList]);

    useEffect(() => {
        renderPost();
    }, [postSender]);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    style={{
                                        width: '70%'
                                    }}
                                    id="filled-multiline-flexible"
                                    label="Post"
                                    multiline={true}
                                    minRows={7}
                                    value={newPost}
                                    onChange={handleNewPost}
                                    helperText={newPostError['post']}
                                    error={!!newPostError['post']}
                                    inputProps={{ "data-testid": "newPost" }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={handleAddSubmit}
                                data-testid="post-btn"
                            >
                                <SendTwoToneIcon fontSize="small" />
                                Post
                            </Button>
                        </Grid>

                        <Grid item style={{ marginLeft: 10 }}>
                            <Button
                                type="reset"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={handleReset}
                            >
                                <DeleteForeverTwoToneIcon fontSize="small" />
                                Cancel
                            </Button>
                        </Grid>

                        <Grid item style={{ marginLeft: 10 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                component="label"
                            >
                                <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleUploadImage}
                                />
                                <AddPhotoAlternateIcon fontSize="small" />
                                Upload Image
                            </Button>
                        </Grid>

                        <Grid item style={{ marginLeft: 10 }}>
                            <Typography variant="body2" color="text.secondary">
                                {newPostImage.name}
                            </Typography>
                        </Grid>

                    </Grid>
                    <br />
                    <Grid container
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="search"
                                label="Search"
                                type="text"
                                id="search"
                                value={searchInput}
                                onChange={handleSearchInput}
                                autoComplete="newTitle"
                                inputProps={{ "data-testid": "searchField" }}
                            />
                        </Grid>

                        <Grid item style={{ marginLeft: 10 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={handleSearchSubmit}
                                data-testid="search-btn"
                            >
                                <SearchTwoToneIcon fontSize="small" />
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Paper style={{ overflow: 'auto', width: '100%', display: 'flex' }} >
                <List sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' } }} data-testid="postList">
                    {disPlayPosts.map((value, idx) => { return value })}
                </List>
            </Paper>

            <Paper style={{
                overflow: 'auto', width: '100%', display: 'flex', justifyContent: "center",
                alignItems: "center",
            }}>
                <Pagination
                    count={pageCount}
                    size="large"
                    page={page}
                    color="primary"
                    shape="rounded"
                    onChange={handleChangePage}
                />
            </Paper>
        </>
    );
}

export default Posts;