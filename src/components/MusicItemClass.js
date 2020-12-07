
import React from 'react';
import SearchTrack from './SearchTrack';
import MusicItemList from './MusicItemList';


class MusicItemClass extends React.Component{

	constructor(props){
		super(props);
		this.state={
		   searchfield: '',
		   tracklist: []
		}
	}

	onSearchChange=(event)=>{
	   this.setState({searchfield: event.target.value});
	}

	componentDidMount(){
		fetch('http://localhost:3001/',{
			method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
             this.setState({tracklist: data})
        })
    }

    updatedTracks=()=>{
    	fetch('http://localhost:3001/',{
			method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
             this.setState({tracklist: data})
        })
    }

	render(){
		const {searchfield, tracklist} = this.state;
		const {user} = this.props;
		const filteredTracks = tracklist.filter(track =>{ 
			return track.artistname.toLowerCase().includes(searchfield.toLowerCase())
		})
		return(
		    <div>
		        <SearchTrack 
		           onSearchChange={this.onSearchChange}/>
                <MusicItemList 
                   filteredTracks={filteredTracks} 
                   user={user}  
                   updatedTracks={this.updatedTracks}
                />
            </div>
		);
	}
}

export default MusicItemClass;