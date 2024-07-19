import React, { useState, useCallback } from 'react';
import {
  FeedbackOptions,
  Statistics,
  Section,
  Notification,
} from './feedback/Feedback.jsx';
import './feedback/feedback.css';

const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = useCallback(type => {
    setState(prevState => ({ ...prevState, [type]: prevState[type] + 1 }));
  }, []);

  const countTotalFeedback = () => {
    return Object.values(state).reduce((a, b) => a + b, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((state.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className="App">
      <Section title="PLEASE LEAVE FEEDBACK">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="STATISTICS">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            {...state}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};

export default App;
