
import React from 'react';
import { Box, Grommet, Header, Nav, grommet, Heading, Button } from 'grommet';
import { CirclePlay, Logout, Emoji } from 'grommet-icons';

class Navigation extends React.Component{


  deleteSession=()=>{
    window.sessionStorage.clear();
  }

  
	render(){
    const { onRouteChange, onLoginChange, login, user } = this.props;
	  if(login === true){
        return(
            <Grommet theme={grommet}>
                <Header background="dark-1" pad="small">
                    <Box direction="row" align="center" gap="small">
                        <Box>
                           <CirclePlay size="medium"/>
                        </Box>
                        <Box>
                          <Heading level="4">
                            <Button plain onClick={()=>onRouteChange('itemclass')}>
                              ReactTracks
                            </Button>
                          </Heading>
                        </Box>
                    </Box>
                    <Box direction="row" align="center" gap="small">
                        <Box>
                           <Emoji size="medium" color="white" />
                        </Box>
                        <Box>
                            <Button
                              plain
                              color="white" 
                              size="large" 
                              onClick={()=>onRouteChange('like')}
                            >
                              {user.name}
                            </Button>
                        </Box>
                    </Box>
                    <Nav direction="row" pad="small">
                        <Button
                          plain
                          label="SIGNOUT" 
                          icon={<Logout />} 
                          size="small" 
                          onClick={()=>{
                              onRouteChange('login');
                              onLoginChange(false);
                              this.deleteSession();
                          }}
                        />
                    </Nav>
                </Header>
            </Grommet>
        );
    }
    if(login === false){
       if(login === false){
        return(
            <Grommet theme={grommet}>
                <Header background="dark-1" pad="small">
                    <Box direction="row" align="center" gap="small">
                        <Box>
                           <CirclePlay size="medium"/>
                        </Box>
                        <Box>
                           <Heading level="4">ReactTracks</Heading>
                        </Box>
                    </Box>
                   
                    <Nav direction="row" pad="small">
                       
                    </Nav>
                </Header>
            </Grommet>
        );
    }
    }
	}
}

export default Navigation;