import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Divider, Grid, Header, Image } from 'semantic-ui-react';

import Navbar from 'components/navbar/navbar';
import UserStats from 'components/user-stats/user-stats';
import UploadForm from 'containers/upload-form/upload-form';

import styles from './dashboard.layout.scss';


class DashboardLayout extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const hello = {};
    hello.hello = 2;
    return (
      <div>
        <Navbar />
        <div styleName="wrapper">
          <div styleName="content">
            <Switch>
              <Route exact path="/dashboard">
                <Grid>
                  <Grid.Row>
                    <Header inverted as="h1">
                        Dashboard
                    </Header>
                    <Divider inverted />
                  </Grid.Row>
                  <Grid.Row>
                    <Card raised inverted color="purple">
                      <Image src="http://via.placeholder.com/350x350" />
                      <Card.Content styleName="user-card">
                        <Card.Header>
                          <Header as="h2">{this.props.user.username}</Header>
                        </Card.Header>
                        <Card.Meta>
                          <span>
                              Joined {this.props.user.joinedDate}
                          </span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                    <UserStats user={this.props.user} />
                  </Grid.Row>
                </Grid>
              </Route>
              <Route path="/dashboard/upload" component={UploadForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(DashboardLayout, styles));
