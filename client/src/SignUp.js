import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRegister } from './actions/index';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.login('a@b.c', '12345')
  }
  render() {
    console.log(this.props)
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/*<Image src='/logo.png' />*/} Sign Up
          </Header>
          <Form size='large' action='/api/Users' method='POST' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address'
                onChange={this.handleChange} />
              <Form.Input name='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />

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

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(userRegister(email, password)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);
