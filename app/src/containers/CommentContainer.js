import React from 'react';
import {Avatar, Col, Icon, List, Row} from 'antd';

import { connect } from 'react-redux';

import './CommentContainer.less';
import { commonActions } from '../actions/common-actions';
import { formatTime } from '../utils';
import { VoteButton } from '../components/Button';
import EditCommentFormContainer from "./EditCommentFormContainer";
import {withDelete} from "../hoc/withDelete";
import PopDelete from "../components/PopConfirm/PopDelete";


class CommentContainer extends React.Component {
  render() {
    const { loading, comments, ...rest } = this.props;

    const PopDeleteCommentComp = withDelete(PopDelete)

    return (
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={comments}
        renderItem={comment => (
          <List.Item
            actions={[
              <span>
                <VoteButton
                  dataType={'comments'}
                  voteScore={comment.voteScore}
                  id={comment.id}
                  {...rest}
                />
              </span>,
              <EditCommentFormContainer
                data={comment}
                {...rest}
              />,
              <PopDeleteCommentComp
                title={"Are you sure you want to delete this comment?"}
                id={comment.id}
                dataType={'comment'}
                uiComponent={<Icon type="delete" />}
              />
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  <Row type={'flex'} gutter={8} align={'middle'}>
                    <Col>
                      <Avatar src={comment.avatar} />
                    </Col>
                    <Col>{comment.author}</Col>
                  </Row>
                </div>
              }
              description={
                <div className="comment-date">
                  {`posted at ${formatTime(comment.timestamp)}`}
                </div>
              }
            />
            <div>{comment.body}</div>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  const {
    commentsLoading,
    commentsData,
    editCommentLoading
  } = state.commentReducers;

  return {
    loading: commentsLoading,
    comments: commentsData,
    editLoading: editCommentLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVoting: param => {
      dispatch(commonActions.vote(param));
    },
    onEditComment: (id, data, dataType) => {
      dispatch(commonActions.edit(id, data, dataType))
  }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
