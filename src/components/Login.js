
import React from 'react';
import {
  Box,
  Button,
  Grommet,
  Form,
  FormField,
  TextInput,
  grommet,
  Text,
  Anchor
} from 'grommet';


class Login extends React.Component{

	constructor(props){
		super(props);
    this.state={
      email: '',
      password: ''
    }
	}

  onEmailChange=(event)=>{
    this.setState({email: event.target.value});
  }

  onPasswordChange=(event)=>{
    this.setState({password: event.target.value});
  }

 saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmit=()=>{
    fetch('http://localhost:3001/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true"){
          this.saveAuthTokenInSessions(data.token)
          this.props.onRouteChange('itemclass');
          this.props.onLoginChange(true);
          this.props.loadUser(data.user);
        }
    })
  }


	render(){
    const { onRouteChange } = this.props;
		return(
      <Grommet  theme={grommet}>
        <Box align="center" justify="center" margin={{ top: "xlarge" }}>
          <Box width="medium">
            <Form
              onReset={event => console.log(event)}
            >
            <FormField label="Email" name="email">
              <TextInput 
                type="text" 
                onChange={this.onEmailChange}
              />
            </FormField>
            <FormField
              label="Password"
              name="password"
            >
              <TextInput 
                type="password" 
                onChange={this.onPasswordChange}
              />
            </FormField>
              <Box direction="row"  margin={{ top: 'large' }} justify="center" gap="large">
                <Button 
                  type="reset" 
                  label="Reset" 
                 />
                <Button 
                  type="submit" 
                  label="Submit" 
                  primary 
                  onClick={this.onSubmit}
                />
              </Box>
              <Box margin={{ top: "xlarge" }}>
                 <Text>Not User? <Anchor onClick={()=>onRouteChange('register')}>Register here</Anchor></Text>
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
		);
	}
}

export default Login;