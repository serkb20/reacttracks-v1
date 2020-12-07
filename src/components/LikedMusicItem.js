
import React from 'react';
import { Box, Grommet, grommet, Text } from 'grommet';
import { Like , Close} from 'grommet-icons';

class LikedMusicItem extends React.Component{

    onDeleteLiked=()=>{
        const { track_id, user, onUpdateLiked } = this.props;
        console.log(1, track_id);
        fetch('http://localhost:3001/deleteliked', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: track_id,
                useremail: user.email
            })
        })
        .then(response => response.json())
        .then(data=>{
             onUpdateLiked();
        })
    }

	render(){
            const { likeCount, songName, artistName, songSource } = this.props;
            return(
                <Grommet theme={grommet}>
                    <Box direction="row" pad="small" gap="medium" justify="center" wrap overflow="auto" responsive>
                        <Box direction="row" width="250px" align="center" gap="large" responsive>
                            <Box direction="row" gap="small" responsive>
                                <Text size="xlarge" color="status-disabled">{likeCount}</Text>
                                <Like color="status-disabled"/>
                            </Box>
                            <Box responsive>
                                <Text color="blue">{songName}</Text>
                                <Text size="small">{artistName}</Text>
                            </Box>
                        </Box>
                        <Box responsive>
                            <audio  
                                src={songSource} 
                                controls 
                            />
                        </Box>
                        <Box alignSelf="center" margin={{ left: "medium" }} onClick={()=>this.onDeleteLiked()}>
                           <Close size="small" color="black" />
                        </Box>
                    </Box>
                </Grommet>
		    );
	}
}

export default LikedMusicItem;