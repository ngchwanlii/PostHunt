import React, { Component } from 'react';
import './App.less';
import { Alert, Card, Col, Layout, Menu, Row, Spin } from 'antd';
import { Link, Redirect, Route, withRouter } from 'react-router-dom';
import {
  BookIcon,
  CategoryIcon,
  GameIcon,
  GhostIcon,
  TechIcon,
} from '../assets/svg/icon';
import { categoryActions, commonActions } from '../actions';
import { connect } from 'react-redux';
import { capitalize, sortIfNeeded } from '../utils';
import { postActions } from '../actions/post-actions';
import { errorActions } from '../actions/error-actions';
import { AddPostFormContainer, PostContainer } from '../containers';
import { SortMenuButton } from '../components/Button';
import { AppHeader } from '../components/Header';
import { AppFooter } from '../components/Footer';
import { categoriesRoutes } from '../routes/config';

const { Content, Sider } = Layout;

const AppBanner = ({ title, subtitles, icon: Icon }) => (
  <Row className="app-banner-row" type="flex" align="middle" justify="center">
    <Col xs={12} className="app-banner-title-wrapper">
      <div className="app-banner-animate-title-line-wrapper">
        <div className="app-banner-animate-title-line" />
      </div>
      <div className="app-banner-title">
        <h1>{title}</h1>
        {subtitles.map((subtitle, i) => (
          <span key={subtitle + i}>{subtitle}</span>
        ))}
      </div>
    </Col>
    <Col xs={12} className="app-banner-img-wrapper">
      <div className="app-banner-img-ghost-wrapper">
        <div className="app-banner-img-ghost">
          <Icon width="300" height="300" />
        </div>
      </div>
    </Col>
  </Row>
);

const Spinner = props => {
  const { loading, match } = props;
  const { params } = match;

  let spinnerKey = match && match.url !== '/' ? params : 'all';

  return loading ? (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="app-feed-spinner"
    >
      <Col>
        <Spin
          size="large"
          tip={
            <div className="app-feed-spinner-tip">{`Hunting ${spinnerKey} posts . . . `}</div>
          }
          spinning={loading}
        />
      </Col>
    </Row>
  ) : null;
};

const categoriesMenuData = {
  defaultKeys: ['all'],
  defaultCategory: [{ name: 'all', path: '' }],
  icon: {
    all: CategoryIcon,
    tech: TechIcon,
    games: GameIcon,
    books: BookIcon,
  },
};

const CategoriesNavMenu = props => {
  const { location, categories, match, onSelectCategory } = props;
  const Item = Menu.Item;
  let categoriesList = [...categoriesMenuData.defaultCategory, ...categories];

  let defaultKeysArray = [];
  let defaultKeys = categoriesList.filter(categoryObj => {
    return categoryObj.name === location.pathname.slice(1);
  });

  defaultKeysArray =
    defaultKeys.length !== 0
      ? defaultKeysArray.concat(defaultKeys[0].name)
      : categoriesMenuData.defaultKeys;

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={categoriesMenuData.defaultKeys}
      className="app-feeds-menu"
      selectedKeys={defaultKeysArray}
    >
      {categoriesList &&
        categoriesList.map(category => {
          const { name, path } = category;
          const Icon = categoriesMenuData.icon[name];

          return (
            <Item key={`${category.name}`}>
              <Link
                to={`${match.url}${path}`}
                onClick={() => onSelectCategory(name)}
              >
                <div className="app-feeds-menu-tab">
                  <Row align="middle" justify="center">
                    <Col xs={6} className="app-feeds-menu-icon">
                      <Icon width="16" height="16" />
                    </Col>
                    <Col xs={18}>{capitalize(name)}</Col>
                  </Row>
                </div>
              </Link>
            </Item>
          );
        })}
    </Menu>
  );
};

const AppPostContainer = props => {
  const {
    posts,
    categories,
    match,
    onSort,
    onAddPost,
    addPostLoading,
    sortType,
    sortKey,
  } = props;

  const { params } = match;

  let category =
    params && params.category ? params.category.toUpperCase() : 'ALL';

  // filter routes that does not exist!
  if (!categoriesRoutes.includes(category)) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Card className="app-feeds-post-card-wrapper">
        <div className="app-feeds-post-title">{category}</div>
      </Card>
      <div className="app-feeds-filter-bar-wrapper">
        <div className="app-feeds-filter-bar-container">
          <Row type={'flex'} gutter={8}>
            <Col xs={5}>
              <SortMenuButton
                data={posts}
                dataType="post"
                title={
                  sortKey === 'timestamp'
                    ? `Time Stamp (${sortType})`
                    : 'Time Stamp'
                }
                iconType="filter"
                buttonType="ghost"
                menus={['New', 'Old']}
                onSort={onSort}
                sortKey="timestamp"
                className="app-feeds-timestamp-sort-button"
              />
            </Col>
            <Col xs={5}>
              <SortMenuButton
                data={posts}
                dataType="post"
                title={
                  sortKey === 'voteScore'
                    ? `Vote Score (${sortType})`
                    : 'Vote Score'
                }
                iconType="filter"
                buttonType="ghost"
                menus={['Top', 'Low']}
                onSort={onSort}
                sortKey="voteScore"
                className="app-feeds-timestamp-sort-button"
              />
            </Col>
            <Col offset={12} xs={2}>
              <Row type="flex" justify="end">
                <Col>
                  <AddPostFormContainer
                    buttonTitle={'Add Post'}
                    icon="plus-circle-o"
                    type={'primary'}
                    categories={categories}
                    onAddPost={onAddPost}
                    addPostLoading={addPostLoading}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <PostContainer posts={posts} {...match} />
    </div>
  );
};

const appData = {
  logo: (
    <img
      alt=""
      src="https://png.icons8.com/nolan/96/000000/unchecked-circle.png"
    />
  ),
  title: 'PostHunt',
  subtitles: [
    'Place for posting interesting and fun articles.',
    ' Start discover new posts everyday!',
  ],
  bannerIcon: GhostIcon,
  feedsTitle: 'Feeds',
};

class App extends Component {
  componentDidMount() {
    const { onGetAllCategories } = this.props;
    onGetAllCategories();
  }

  onCloseAlert = () => {
    this.props.onCloseGlobalError();
  };

  render() {
    const { loading, categories, posts, error, ...rest } = this.props;
    const { match } = rest;

    return (
      <div className="app-wrapper">
        <Layout className="app-layout">
          <AppHeader />
          <Content className="app-banner-wrapper">
            <AppBanner
              title={appData.title}
              subtitles={appData.subtitles}
              icon={appData.bannerIcon}
            />
          </Content>
          <div className="app-feeds-wrapper">
            <div className="app-feeds-title">
              <h1>{appData.feedsTitle}</h1>
            </div>
            {error && (
              <Alert
                message="Error"
                description={`${error}`}
                type="error"
                closable
                className="app-feeds-alert"
                onClose={this.onCloseAlert}
              />
            )}
            <Spinner loading={loading} {...rest} />
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <CategoriesNavMenu categories={categories} {...rest} />
              </Sider>
              <Content className="app-post-content-wrapper">
                <Route
                  path={`${match.path}:category?`}
                  render={props => {
                    return (
                      <AppPostContainer
                        posts={posts}
                        categories={categories}
                        {...rest}
                        {...props}
                      />
                    );
                  }}
                />
              </Content>
            </Layout>
          </div>
        </Layout>
        <AppFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesLoading, categoriesData } = state.categoryReducers;
  const {
    postsLoading,
    addPostLoading,
    sortType,
    sortKey,
  } = state.postReducers;
  const { globalError } = state.errorReducers;

  return {
    loading: categoriesLoading || postsLoading,
    error: globalError,
    categories: categoriesData,
    posts: sortIfNeeded('posts', ['Top', 'New'])(state.postReducers),
    addPostLoading,
    sortType,
    sortKey,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    onSelectCategory: categoryActions.selectCategory,
    onGetAllCategories: categoryActions.getAll,
    onFetchPosts: postActions.fetchPosts,
    onCloseGlobalError: errorActions.resetGlobalError,
    onSort: commonActions.sort,
    onAddPost: postActions.addPost,
  })(App),
);
