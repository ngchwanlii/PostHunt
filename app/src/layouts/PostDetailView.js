import React from 'react';
import { Affix, message, Button, Col, Divider, Layout, Row, Spin } from 'antd';
import { AppHeader } from '../components/Header';
import { AppFooter } from '../components/Footer';
import './PostDetailView.less';
import { connect } from 'react-redux';
import { postActions } from '../actions/post-actions';
import { delay, formatTime } from '../utils';
import { commonActions } from '../actions/common-actions';
import { commentActions } from '../actions/comment-actions';
import { AddCommentFormContainer, EditPostFormContainer } from '../containers';
import { AvatarProfile } from '../components/Avatar';
import CommentContainer from '../containers/CommentContainer';
import { SortMenuButton } from '../components/Button';
import { withDelete } from '../hoc/withDelete';
import PopDelete from '../components/PopConfirm/PopDelete';
import { Redirect } from 'react-router-dom';

const { Sider, Content } = Layout;

const ButtonGroup = Button.Group;

class PostDetailView extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    const { match, onFetchDetailPost, onFetchCommentsByPostId } = this.props;
    const { post_id } = match.params;
    onFetchDetailPost(post_id);
    onFetchCommentsByPostId(post_id);
  }

  componentDidUpdate(prevProps) {
    const { post } = this.props;
    if (post !== prevProps.post) {
      if (!post) {
        message.loading('Redirecting to homepage...', 1);
        delay(2000).then(res => {
          this.setState({ redirect: true });
        });
      }
    }
  }

  handleVoteClick = params => e => {
    this.props.onVoting(params);
  };

  render() {
    const {
      postLoading,
      addCommentLoading,
      editPostLoading,
      post,
      comments,
      sortKey,
      sortType,
      onSort,
      onAddComment,
    } = this.props;

    const { redirect } = this.state;

    const EditPostButton = props => {
      const { onClick } = props;
      return (
        <Button className="post-sider-middle-btn" icon="edit" onClick={onClick}>
          Edit Post
        </Button>
      );
    };

    const DeletePostButton = withDelete(PopDelete);

    return (
      <div className="post-detail-view-wrapper">
        {redirect && <Redirect to="/" />}
        <Layout>
          <AppHeader>Header</AppHeader>
          <Layout className="post-detail-view-container">
            {postLoading ? (
              <Spin tip="Fetching post detail..." />
            ) : post ? (
              <div>
                <Layout className="post-detail-view-heading-container">
                  <Content>
                    <Row type={'flex'}>
                      <Col xs={6}>
                        <div className="post-detail-view-heading-image">
                          <img
                            alt=""
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                        </div>
                      </Col>
                      <Col xs={18}>
                        <div className="post-detail-view-heading-content-container">
                          <h2>{post.title}</h2>
                          {post.body}
                        </div>
                      </Col>
                    </Row>
                  </Content>
                  <Sider className="sider">
                    <Row type={'flex'} align={'middle'} justify={'center'}>
                      <Col>
                        <AvatarProfile
                          width={150}
                          height={150}
                          src={post.avatar}
                        />
                      </Col>
                    </Row>
                    <Row type={'flex'} justify={'center'}>
                      <Col xs={20} className="post-sider-middle-container">
                        <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
                          {`posted by ${post.author}`}
                        </p>
                        <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
                          {`at ${formatTime(post.timestamp)}`}
                        </p>
                      </Col>
                      <Col xs={20} className="post-sider-middle-container">
                        <EditPostFormContainer
                          data={post}
                          editLoading={editPostLoading}
                          uiComponent={props => <EditPostButton {...props} />}
                        />
                      </Col>
                      <Col xs={20} className="post-sider-middle-container">
                        <DeletePostButton
                          title={'Are you sure you want to delete this post?'}
                          id={post.id}
                          dataType={'post'}
                          uiComponent={
                            <Button
                              icon="delete"
                              type="danger"
                              style={{ width: '100%' }}
                            >
                              Delete Post
                            </Button>
                          }
                        />
                      </Col>
                      <Col xs={20} className="post-sider-middle-container">
                        <ButtonGroup className="post-sider-middle-btn">
                          <Button
                            style={{ width: '33%' }}
                            type="primary"
                            icon="caret-up"
                            onClick={this.handleVoteClick({
                              dataType: 'posts',
                              id: post.id,
                              option: 'upVote',
                            })}
                          />
                          <Button style={{ cursor: 'default', width: '33%' }}>
                            {post.voteScore}
                          </Button>
                          <Button
                            style={{ width: '33%' }}
                            type="primary"
                            icon="caret-down"
                            onClick={this.handleVoteClick({
                              dataType: 'posts',
                              id: post.id,
                              option: 'downVote',
                            })}
                          />
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </Sider>
                </Layout>
                <Layout className="post-detail-comments-container">
                  <Content className="comment-container">
                    <div>
                      <h3>{`COMMENT (${comments.length})`}</h3>
                      <CommentContainer />
                    </div>
                  </Content>
                  <Sider className="post-detail-comments-sider-container">
                    <Affix>
                      <Row type={'flex'} justify={'center'}>
                        SORT BY
                        <Col xs={20} className="post-detail-comments-btn-col">
                          <SortMenuButton
                            data={comments}
                            dataType="comment"
                            size="large"
                            title={
                              sortKey === 'timestamp'
                                ? `Time Stamp (${sortType})`
                                : 'Time Stamp'
                            }
                            iconType="filter"
                            menus={['New', 'Old']}
                            onSort={onSort}
                            sortKey="timestamp"
                            className="post-comments-sider-btn"
                          />
                        </Col>
                        <Col xs={20} className="post-detail-comments-btn-col">
                          <SortMenuButton
                            data={comments}
                            dataType="comment"
                            size="large"
                            title={
                              sortKey === 'voteScore'
                                ? `Vote Score (${sortType})`
                                : 'Vote Score'
                            }
                            iconType="filter"
                            menus={['Top', 'Low']}
                            onSort={onSort}
                            sortKey="voteScore"
                            className="post-comments-sider-btn"
                          />
                        </Col>
                        <Divider dashed style={{ backgroundColor: 'black' }} />
                        <Col xs={20} className="post-detail-comments-btn-col">
                          <AddCommentFormContainer
                            buttonTitle={'Add Comment'}
                            icon="plus"
                            type="primary"
                            parentId={post.id}
                            onAddComment={onAddComment}
                            addCommentLoading={addCommentLoading}
                          />
                        </Col>
                      </Row>
                    </Affix>,
                  </Sider>
                </Layout>
              </div>
            ) : null}
          </Layout>
          <AppFooter />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { postsData, postLoading, editPostLoading } = state.postReducers;
  const {
    commentsData,
    sortKey,
    sortType,
    addCommentLoading,
  } = state.commentReducers;

  return {
    post: postsData[0],
    postLoading,
    editPostLoading,
    comments: commentsData,
    sortKey,
    sortType,
    addCommentLoading,
  };
};

export default connect(mapStateToProps, {
  onVoting: commonActions.vote,
  onSort: commonActions.sort,
  onFetchDetailPost: postActions.fetchDetailPost,
  onFetchCommentsByPostId: commentActions.fetchCommentsByPostId,
  onAddComment: commentActions.addComment
})(PostDetailView);
