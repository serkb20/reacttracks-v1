
import React from 'react';
import { Box, Grommet, grommet, Text } from 'grommet';
import { Like } from 'grommet-icons';

class MusicItem extends React.Component{

	constructor(props){
		super(props);
		this.state={
            likedcheck: true
        }
	}

    onLikeSubmit=(data)=>{
        const {id, user, songName, artistName, songSource} = this.props;
            fetch('http://localhost:3001/liked', {
               method: 'post',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': window.sessionStorage.getItem('token')
               },
               body: JSON.stringify({
                   id: id,
                   useremail: user.email,
                   likeCount: data,
                   songName: songName,
                   artistName: artistName,
                   songSource: songSource
                })
            })
            .then(response => response.json())
            .then(data => {
               if(data.id){
                  this.refreshComponentDidMount();
               }
            })  
    }

     refreshComponentDidMount=()=>{
        const {id, user} = this.props;
        fetch('http://localhost:3001/likedcheck', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: id,
                useremail: user.email
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({likedcheck: data});  
        })
    }

    onTracksCountUpdate=()=>{
        const {id, updatedTracks} = this.props;
        fetch('http://localhost:3001/tracksupdate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(response=>response.json())
        .then(data=> {
           if(data > 0){
               this.onLikeSubmit(data);
               updatedTracks();
           }
        })
    }


    onLikedChange=(route)=>{
        this.setState({liked: route});
    }


    componentDidMount(){
        const {id, user} = this.props;
        fetch('http://localhost:3001/likedcheck', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: id,
                useremail: user.email
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({likedcheck: data});  
        })
    }

	render(){
		const {likedcheck}= this.state;
        const {likeCount, songName, artistName, songSource} = this.props;
	    if(likedcheck === true){
	   	   	return(
                <Grommet theme={grommet}>
                    <Box direction="row" pad="small" gap="small" justify="center" wrap overflow="auto" responsive>
                        <Box direction="row" width="250px" align="center" gap="medium" responsive>
                            <Box direction="row" gap="small" responsive>
                                <Text size="xlarge" color="accent-2">{likeCount}</Text>
                                <Box onClick={()=>this.onTracksCountUpdate()}>
                                    <Like color="accent-2"/>
                                </Box>
                            </Box>
                            <Box responsive>
                                <Text color="blue">{songName}</Text>
                                <Text size="small">{artistName}</Text>
                            </Box>
                        </Box>
                        <Box responsive>
                            <audio 
                                src= {songSource}
                                controls  
                            />
                        </Box>
                    </Box>
                </Grommet>
		    );
	    }
	    if(likedcheck === false){
	    	return(
                <Grommet theme={grommet}>
                    <Box direction="row"  pad="small" gap="small" justify="center" wrap overflow="auto" responsive>
                        <Box direction="row" width="250px" align="center" gap="medium" responsive>
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
                    </Box>
                </Grommet>
		    );
	    }
	}
}

export default MusicItem;