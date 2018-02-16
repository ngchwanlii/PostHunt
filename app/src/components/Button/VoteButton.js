import React from 'react';
import './VoteButton.less';
import { Icon } from 'antd';

export class VoteButton extends React.PureComponent {
  handleVoteClick = params => e => {
    this.props.onVoting(params);
  };

  render() {
    const { voteScore, id, dataType } = this.props;
    return (
      <div className="vote-button-wrapper">
        <div className="vote-button-icon">
          <Icon
            onClick={this.handleVoteClick({ dataType, id, option: 'upVote' })}
            className="vote-button-icon-up"
            type="caret-up"
          />
          <Icon
            onClick={this.handleVoteClick({ dataType, id, option: 'downVote' })}
            className="vote-button-icon-up"
            type="caret-down"
          />
        </div>
        <div className="vote-button-number">
          <span>{voteScore}</span>
        </div>
      </div>
    );
  }
}
