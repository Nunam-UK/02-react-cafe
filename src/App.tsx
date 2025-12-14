import React, { useState } from 'react';
import CafeInfo from './components/CafeInfo';
import VoteOptions from './components/VoteOptions'
import css from './components/App.module.css';
import { Votes, VoteType } from './types/votes';

import VoteStats from './components/VoteStats'
import Notification from './components/Notification';

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [votes, setVotes] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes(initialVotes);
  };

  const total = votes.good + votes.neutral + votes.bad;
  const positiveRate = total
    ? Math.round((votes.good / total) * 100)
    : 0;

  const canReset = total > 0

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset} />
      
      
      {total > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={total}
          positiveRate={positiveRate}
        />) : (<Notification />)}

    </div>
  )
};

export default App;