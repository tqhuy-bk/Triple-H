import React, { useEffect, useState } from 'react';
import { Card, Typography, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  Favorite,
  InsertLink,
  ChatBubbleOutlineSharp
} from '@material-ui/icons';
import InputComment from '../../Input/Comment';
import ImageList from '../../Modal/ImageList';
import { postStyles } from '../../../style';

import { Avatar, Box, CardContent, CardHeader } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { timeAgo } from '../../../utils/date';
import { SeeMoreText } from '../../SeeMoreText';

function Header(props) {
  const { post } = props;

  const classes = postStyles();

  return (
    <CardHeader
      className={classes.cardHeader}
      avatar={<Avatar alt="avatar" src={post.userId.avatar} />}
      title={
        <Typography
          component={Link}
          to={`/u/${post.userId._id}`}
          noWrap={false}
          className={classes.userName}
        >
          {post.userId.fullname}
        </Typography>
      }
      subheader={
        <Link to={`/post/${post._id}`} className={classes.subheader}>
          {timeAgo(new Date(post.createdAt))}
        </Link>
      }
    />
  );
}

function ShareContent({ post }) {
  const classes = postStyles();
  return (
    <>
      <Header post={post} />
      <CardContent>
        <SeeMoreText variant="body1" maxText={100} text={post.content} />
        <div className={classes.hashtagWrap}>
          {post.hashtags.map((item, index) => (
            <Typography className={classes.hashtag} key={index}>
              #{item}
            </Typography>
          ))}
        </div>
        <Box
          style={{
            border: '1px solid #e8e8e8',
            borderBottomColor: 'transparent'
          }}
        >
          <BaseContent post={post.shareId} share={true} />
          {post.shareId?.images?.length > 0 && (
            <CardMedia>
              <ImageList
                imageList={post.shareId.images}
                show2Image={true}
                defaultHeight={500}
                isPost={true}
              />
            </CardMedia>
          )}
        </Box>
      </CardContent>
    </>
  );
}

function BaseContent(props) {
  const { post, share } = props;
  const classes = postStyles();

  return (
    <>
      <Header post={post} share={share} />
      <CardContent>
        {post.isPostReview && (
          <>
            <div>
              <Typography
                variant="body1"
                component={Link}
                to={`/location/${post.locationId.name}`}
              >
                {post.locationId.fullname}
              </Typography>
            </div>
            <Rating
              name="location-rating"
              value={post.rate}
              readOnly
              style={{ marginBottom: 10 }}
            />
          </>
        )}
        <SeeMoreText variant="body1" maxText={100} text={post.content} />
        <div className={classes.hashtagWrap}>
          {post.hashtags.map((item, index) => (
            <Typography className={classes.hashtag} key={index}>
              #{item}
            </Typography>
          ))}
        </div>
        <CardMedia>
          <ImageList
            imageList={post.images}
            show2Image={true}
            defaultHeight={500}
            isPost={true}
          />
        </CardMedia>
      </CardContent>
    </>
  );
}

function PostContent({ post }) {
  return (
    <>
      {post && post.shareId ? (
        <ShareContent post={post} />
      ) : (
        <BaseContent post={post} share={false} />
      )}
    </>
  );
}

export default function PostReport(props) {
  const [showCmt] = useState(false);
  const [post, setPost] = useState(null);

  const classes = postStyles({ showCmt });

  useEffect(() => {
    setPost(props.post);
  }, [props.post]);

  return (
    <Card className={classes.cardContainer}>
      {post && (
        <>
          <PostContent post={post} />
          <div className={classes.postFooter}>
            <div className={classes.likers}>
              {post?.likes.length > 0 &&
                post.likes.map((item, index) => (
                  <img
                    className={classes.liker}
                    src={item.avatar}
                    alt="avatar"
                    key={index}
                  />
                ))}
            </div>
            <div className={classes.likersText}>
              <p style={{ color: '#888da8', margin: 0 }}>
                {post?.likes.length > 0 &&
                  post.likes.slice(0, 5).map((item, index) => (
                    <Typography
                      key={index}
                      component={Link}
                      to={`/u/${item._id}`}
                      style={{ fontSize: 14, fontWeight: 500, color: 'black' }}
                    >
                      {item.fullname}
                    </Typography>
                  ))}
              </p>
            </div>
            <div className={classes.socialCount}>
              <div className={classes.likeCount}>
                <Favorite style={{ height: 18, width: 18, color: '#888da8' }} />
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    color: '#888da8',
                    margin: '0 5px'
                  }}
                >
                  {post.likes.length}
                </span>
              </div>
              <div className={classes.likeCount}>
                <ChatBubbleOutlineSharp
                  style={{ height: 18, width: 18, color: '#888da8' }}
                />
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    color: '#888da8',
                    margin: '0 5px'
                  }}
                >
                  {post.comments.length}
                </span>
              </div>
              <div className={classes.likeCount}>
                <InsertLink
                  style={{ height: 18, width: 18, color: '#888da8' }}
                />
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    color: '#888da8',
                    margin: '0 5px'
                  }}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
          </div>
          {showCmt && <InputComment type="post" id={post._id} />}
        </>
      )}
    </Card>
  );
}
