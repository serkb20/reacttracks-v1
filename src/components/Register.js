
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

class Register extends React.Component{

	constructor(props){
		super(props);
    this.state={
      name: '',
      email: '',
      password: ''
    }
	}

  onNameChange=(event)=>{
    this.setState({name: event.target.value});
  }

  onEmailChange=(event)=>{
    this.setState({email: event.target.value});
  }

  onPasswordChange=(event)=>{
    this.setState({password: event.target.value});
  }

  onSubmit=()=>{
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
           this.props.loadUser(user);
           this.props.onRouteChange('itemclass');
           this.props.onLoginChange(true);
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
                            <FormField
                               label="Name"
                               name="name"
                            >
                                <TextInput 
                                  type="text" 
                                  onChange={this.onNameChange}
                                />
                            </FormField>
                            <FormField label="Email" name="email">
                                <TextInput 
                                  type="email" 
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
                            <Box direction="row" margin={{ top: 'large' }} justify="center" gap="large">
                                <Button 
                                  type="reset" 
                                  label="Reset"
                                />
                                <Button 
                                  type="submit" 
                                  label="Submit" 
                                  onClick={this.onSubmit}
                                  primary 
                                />
                            </Box>
                            <Box margin={{ top: "large" }}>
                                <Text>Already User? <Anchor onClick={()=>onRouteChange('login')}>Login here</Anchor></Text>
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </Grommet>
		);
	}
}

export default Register;