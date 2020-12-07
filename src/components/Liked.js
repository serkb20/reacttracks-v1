
import React from 'react';
import { Box, Grommet, grommet, Heading } from 'grommet';
import LikedMusicItem from './LikedMusicItem';

class Liked extends React.Component{

	constructor(props){
		super(props);
		this.state={
			tracks: []
		}
	}

    onUpdateLiked=()=>{
        const {user} = this.props;
        fetch('http://localhost:3001/userliked', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                email: user.email,
            })
        })
        .then(response => response.json())
        .then(data => {this.setState({tracks: data})});
    }

	componentDidMount(){
		const {user} = this.props;
	    fetch('http://localhost:3001/userliked', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                email: user.email,
            })
        })
        .then(response => response.json())
        .then(data => {this.setState({tracks: data})});
	}

	render(){
		const {tracks} = this.state;
        const {user} = this.props;
		console.log(tracks);
		if(tracks.length > 0){
			return(
                <Grommet theme={grommet}>
                    <Box margin={{ top: "large" }}>
                        <div>
                            {
                                tracks.map((item, i) => {
                                    return (
                                        <LikedMusicItem
                                            key={i}
                                            id={tracks[i].id}
                                            likeCount={tracks[i].likecount}
                                            songName={tracks[i].songname}
                                            artistName={tracks[i].artistname}
                                            songSource={tracks[i].songsource}
                                            user={user}
                                            track_id={tracks[i].track_id}
                                            onUpdateLiked={this.onUpdateLiked}
                                        />
                                    );
                                })
                            }
                        </div>
                    </Box>
                </Grommet>    
		    );
		}
		if(tracks.length <= 0){
			return(
                <Grommet theme={grommet}>
                    <Box align="center" margin={{ top: "xlarge"}}>
                        <Heading level="4">No Liked Record </Heading>
                    </Box>
                </Grommet>    
		    );
		}
	}
}

export default Liked;