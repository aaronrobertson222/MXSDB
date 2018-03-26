import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Divider, Grid, Header, Item, Segment } from 'semantic-ui-react';

import Navbar from 'components/navbar/navbar';
import UserStats from 'components/user-stats/user-stats';
import UploadForm from 'containers/upload-form/upload-form';
import ContentContainer from 'containers/content-container/content-container';

import styles from './dashboard.layout.scss';


class DashboardLayout extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <div styleName="wrapper">
        <Navbar user={this.props.user} />
        <div styleName="content">
          <Switch>
            <Route exact path="/dashboard">
              <div>
                <Header inverted as="h1">
                        Dashboard
                </Header>
                <Divider inverted />
                <Segment inverted>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Item>
                          <Item.Image size="large" src="http://via.placeholder.com/350x350" />

                          <Item.Content>
                            <Item.Header inverted>
                                Aaronr5
                            </Item.Header>
                          </Item.Content>
                        </Item>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <UserStats />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Link to="/dashboard/upload" href="/dashboard/upload">
                          <Button primary fluid>
                            <span>New Upload</span>
                          </Button>
                        </Link>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Header inverted>My Uploads</Header>
                <ContentContainer users={[user.username]} />
              </div>
            </Route>
            <Route path="/dashboard/upload" component={UploadForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(cssModules(DashboardLayout, styles));
