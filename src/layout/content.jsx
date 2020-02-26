import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './content.module.css';
import { Registration } from '../components/registration';
import { Login } from '../components/login';
import { TopicList } from '../components/topic-list';
import { NewTopic } from '../components/new-topic';
import { ProtectedRoute } from '../components/protected-route';
import { Profile } from '../components/profile';
import { Topic } from '../components/topic';
import WelcomeMessage from '../components/welcome-message';

export const Content = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/" render={(props) => {
          return (
            <>
              <div className={styles.container}>
                <Registration {...props} />
                <WelcomeMessage />
              </div>
              <div>
                <TopicList />
              </div>
            </>
          );
        }} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/topiclist" render={(props) => {
          return (
            <>
              <TopicList {...props} />
              <NewTopic {...props} />
            </>
          );
        }} />
        <Route path="/profile/:user_id" component={Profile} />
        <Route path="/topic/:topic_id" component={Topic} />
      </Switch>
    </main>
  );
}