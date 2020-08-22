import React from 'react';
import Container from "react-bootstrap/Container"

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Container>
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
      </Container>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);