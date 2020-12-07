
import React from 'react';
import { Box, Grommet, grommet } from 'grommet';
import MusicItem from './MusicItem';



class MusicItemList extends React.Component{

	render(){
		const {filteredTracks, user, updatedTracks} = this.props;
		return(
            <Grommet theme={grommet}>
                <Box responsive>
                    
                        {
                            filteredTracks.map((item, i) => {
                                return (
                                    <MusicItem
                                        key={i}
                                        id={filteredTracks[i].id}
                                        likeCount={filteredTracks[i].likecount}
                                        songName={filteredTracks[i].songname}
                                        artistName={filteredTracks[i].artistname}
                                        songSource={filteredTracks[i].songsource}
                                        user={user}
                                        updatedTracks={updatedTracks}
                                    />
                                );
                            })
                        }
                    
                </Box>
            </Grommet>    
		);
	}
}

export default MusicItemList;