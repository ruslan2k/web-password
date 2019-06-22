import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { userRegister } from './actions/index';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
// import { Image } from 'semantic-ui-react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  render() {
    if (this.props.user && this.props.user.loggedIn) {
      return <Redirect to='/' />
    }
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/*<Image src='/logo.png' />*/} Sign Up
          </Header>
          <Form size='large' action='/api/Users' method='POST' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address'
                value={this.state.email} onChange={this.handleChange} />
              <Form.Input name='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                value={this.state.password} onChange={this.handleChange} />

              <Button color='teal' fluid size='large'>Sign Up</Button>
            </Segment>
          </Form>
          <Message>
            Already registered? <Link to='/login'>Click here to login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(userRegister(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
