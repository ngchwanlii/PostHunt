import React from 'react';
import { Post } from '../components';
import { List } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { commonActions, postActions } from '../actions';
import './PostContainer.less';

class PostContainer extends React.Component {
  componentDidMount() {
    const { match, onFetchPosts } = this.props;
    if (match.params.category) {
      onFetchPosts(match.params.category);
    } else {
      onFetchPosts();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { match, onFetchPosts } = this.props;
      if (match.params.category) {
        onFetchPosts(match.params.category);
      } else {
        onFetchPosts();
      }
    }
  }

  render() {
    const { posts, ...rest } = this.props;
    return (
      <div className="post-container-wrapper">
        <List
          itemLayout="vertical"
          size="large"
          split
          dataSource={posts}
          renderItem={postData => {
            return (
              <Post
                data={postData}
                img={{ width: 200, height: 150 }}
                {...rest}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, {
    onVoting: commonActions.vote,
    onFetchPosts: postActions.fetchPosts,
  })(PostContainer),
);
