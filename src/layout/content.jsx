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

export const Content = () => {
  return (
    <main className={`${styles.main} col-12 col-s-12`}>
      <Switch>
        <Route exact path="/" render={(props) => {
          return (
            <>
              <div className="col-3 col-s-4">
                <Registration {...props} />
                <Login {...props} />
              </div>
              <div className="col-9 col-s-8">
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