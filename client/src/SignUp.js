import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const SignUpForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/*<Image src='/logo.png' />*/} Sign Up
      </Header>
      <Form size='large' action='/api/Users' method='POST'>
        <Segment stacked>
          <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' />
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

export default SignUpForm;
