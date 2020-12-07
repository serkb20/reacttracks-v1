
import React from 'react';
import { Search } from 'grommet-icons';
import { Box, Grommet, TextInput, grommet } from 'grommet';

class SearchTrack extends React.Component{

	render(){
		return(
            <Grommet theme={grommet}>
                <Box  align="center" pad="small" margin={{ top: "large", bottom: "medium" }} responsive>
                    <Box width="large" responsive>
                        <TextInput 
                          icon={<Search />} 
                          reverse 
                          placeholder="search ..." 
                          onChange={this.props.onSearchChange}
                        />
                    </Box>
                </Box>
            </Grommet>      
		);
	}
}

export default SearchTrack;