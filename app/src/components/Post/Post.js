import React from 'react';
import { Avatar, Button, Icon, List } from 'antd';
import './Post.less';
import { VoteButton } from '../index';
import { formatTime } from '../../utils';
import { Link } from 'react-router-dom';
import '../../index.less';
import {withDelete} from "../../hoc/withDelete";
import PopDelete from "../PopConfirm/PopDelete";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export class Post extends React.PureComponent {
  render() {
    const { data, img, ...rest } = this.props;
    const { match } = rest;
    const convertedDate = formatTime(data.timestamp);

    let urlCategory = match.url === '/' ? match.url + data.category : match.url;

    const PopDeletePostComp = withDelete(PopDelete)

    return (
      <List.Item
        className="post-item-wrapper"
        key={data.id}
        actions={[
          <span>
            <VoteButton
              dataType={'posts'}
              voteScore={data.voteScore}
              id={data.id}
              {...rest}
            />
          </span>,
          <Link to={`${urlCategory}/${data.id}`} className={'non-active-link'}>
            <IconText type="message" text={data.commentCount} />
          </Link>,
          <PopDeletePostComp
            title={"Are you sure you want to delete this post?"}
            id={data.id}
            dataType={'post'}
            uiComponent={<Icon type="delete" />}
          />
        ]}
        extra={
          <img
            width={img.width}
            height={img.height}
            alt="post-logo"
            src={data.cover}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={data.avatar} />}
          title={
            <Link to={`${urlCategory}/${data.id}`}>
              <div className="post-title">
                {data.title}{' '}
                <Button
                  size="small"
                  shape="circle"
                  icon="link"
                  className={'post-link-icon'}
                />
              </div>
            </Link>
          }
          description={
            <div className="post-author-title">
              {`posted by ${data.author} at ${convertedDate}`}
            </div>
          }
        />
        {data.body}
      </List.Item>
    );
  }
}
