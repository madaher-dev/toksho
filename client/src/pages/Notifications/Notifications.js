import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyNotifications } from '../../store/actions/userActions';
import LikeNotification from '../../components/Notifications/LikeNotification';
import ChallengeNotification from '../../components/Notifications/ChallengeNotification';
import PickedNotification from '../../components/Notifications/PickedNotification';
import ReadyYourNotification from '../../components/Notifications/ReadyYourNotification';
import ReadyNotification from '../../components/Notifications/ReadyNotification';
import CommentNotification from '../../components/Notifications/CommentNotification';

const Notifications = ({ getMyNotifications, notifications, user }) => {
  useEffect(() => {
    getMyNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingLeft: 10, paddingRight: 30 }}>
      <h3>Notifications</h3>
      {notifications
        ? notifications.map(notification =>
            notification.notType === 'like' ? (
              <LikeNotification
                key={notification._id + 1}
                source={notification.source}
                debate={notification.debate}
              />
            ) : notification.notType === 'pick' ? (
              <PickedNotification
                key={notification._id + 1}
                source={notification.source}
                debate={notification.debate}
              />
            ) : notification.notType === 'challenge' ? (
              <ChallengeNotification
                key={notification._id + 1}
                source={notification.source}
                debate={notification.debate}
              />
            ) : notification.notType === 'ready_your' ? (
              <ReadyYourNotification
                key={notification._id + 1}
                source={user}
                debate={notification.debate}
              />
            ) : notification.notType === 'ready' ? (
              <ReadyNotification
                key={notification._id + 1}
                source={notification.source}
                debate={notification.debate}
              />
            ) : notification.notType === 'comment' ? (
              <CommentNotification
                key={notification._id + 1}
                source={notification.source}
                debate={notification.debate}
              />
            ) : null
          )
        : null}
    </div>
  );
};

Notifications.propTypes = {
  getMyNotifications: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notifications: state.users.notifications,
  pusher: state.users.pusher,
  user: state.users.user
});

export default connect(mapStateToProps, {
  getMyNotifications
})(Notifications);
