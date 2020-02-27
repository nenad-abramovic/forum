import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './content.module.css';
import Registration from '../components/registration';
import Login from '../components/login';
import TopicList from '../components/topic-list';
import NewTopic from '../components/new-topic';
import ProtectedRoute from '../components/protected-route';
import Profile from '../components/profile';
import Topic from '../components/topic';
import WelcomeMessage from '../components/welcome-message';

export default () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          <div className={styles.container}>
            <Registration />
            <WelcomeMessage />
          </div>
          <div>
            <TopicList />
          </div>
        </Route>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:user_id" component={Profile} />
        <Route path="/topic/:topic_id" component={Topic} />
        <ProtectedRoute path="/topiclist" render={(props) => {
          return (
            <>
              <TopicList {...props} />
              <NewTopic {...props} />
            </>
          );
        }} />
      </Switch>
    </main>
  );
};