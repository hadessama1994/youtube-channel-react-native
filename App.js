import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, FlatList, Image, Linking} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import api from './api.js'
import {Button, Text, List, ListItem, Container, Header, Left, Body, Title, Subtitle, Right, Content, Card, CardItem, Thumbnail, Icon } from 'native-base';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';


export default function App() {

  const [video, setVideo] = useState([])
  const [like, setLike] = useState([])
  const [comment, setComment] = useState([])
  const [videoChange, setVideoChange] = useState([])
  const [view, setView] = useState([])

  

  async function videoAPI () {
    const {data: items} = await api.get('/playlistItems',{
      params: {
        part: "snippet",
        playlistId: 'UUvax7WLz8o2UtGS-FL8bW4g',
        maxResults:'10',
        key: 'AIzaSyDJav91NGI_di6WTHzG_kP5Y2lzCcgvPlM'
      }

    })
    
    setVideo(items.items) 
   
   
  }

  async function detailAPI(){

    const showVideoID = video.map((video)=>(video.snippet.resourceId.videoId))
    
    

    const {data: items} = await api.get('/videos',{
      params: {
        part: "statistics",
        id: `${showVideoID}`,
        key: 'AIzaSyDJav91NGI_di6WTHzG_kP5Y2lzCcgvPlM'
      }
      
    })
    
    
    setLike(items.items.map((items)=>(items.statistics.likeCount))) 
    setComment(items.items.map((items)=>(items.statistics.commentCount))) 
    setView(items.items.map((items)=>(items.statistics.viewCount)))
    
    
    
  }


  useEffect(()=>{
    
    
    detailAPI()
    videoAPI()
    
    
    
                     
  }  ,[videoChange])
    
  
  
    const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }
    

  
  
  return (

    <>

    

    <Container style={styles.container}>   

          <Header style={{height: 40}} transparent>
            
          <Left />
          <Body>
            <Title>HadesPlays</Title>
            
          </Body>
          <Right />
        </Header>

      <FlatList        
        data={video}
        keyExtractor={video => video.id}
        vertical
        showsHorizontalScrollIndicator={false}
        extraData={like, comment, view}
        renderItem={({ item, index }) => (
          <Card>
          <CardItem >
                   
          
          <Text>{setVideoChange(item.snippet.resourceId.videoId)}</Text>
        
            <Left>
              <Thumbnail  source={{uri: 'https://yt3.ggpht.com/a/AATXAJy0PyHlt8nsIWJFzztz9mdnGjkINzqeQQc3hIrgeg=s900-c-k-c0xffffffff-no-rj-mo'}} />
              <Body>
                                
                <Text  onPress={()=>{ Linking.openURL(`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`)}}>{item.snippet.title}</Text>
                <Text note><Icon active name="eye" style={{fontSize: 15, color: 'grey' }}/> {view[index]} views </Text>
                
                       
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            
            <Image  source={{uri: `${item.snippet.thumbnails.maxres.url}`}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Left>
              <Button  onPress={()=>{ Linking.openURL(`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`)}} transparent>
                <Icon active name="thumbs-up" />
             <Text  onPress={()=>{ Linking.openURL(`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`)}}>{like[index]} Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button  onPress={()=>{ Linking.openURL(`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`)}} transparent>
                <Icon active name="chatbubbles" />
        <Text>{comment[index]} Comments</Text>
              </Button>
            </Body>
            <Right>
            <TimeAgo time={item.snippet.publishedAt} />            
            </Right>
          
            </CardItem>
        </Card>

        )}

        
      />
      
      
        
      </Container>

      </>
);
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#e6e6e6',
    
  },
});
