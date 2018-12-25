/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Image, RefreshControl} from 'react-native';

import api from './utilities/api';

type Props = {};

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount(){
    api.getNews().then((res => {
      this.setState({
        articles: res.articles
      })
    }))
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    api.getNews().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  render() {
    console.log("News:", this.state.articles);
    const shuffledPosts = shuffleArray(this.state.articles);
    const SinglePost = shuffledPosts.slice(0,1);
    console.log("Spliced:", SinglePost);
    return (
        <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
        <View style={styles.container}>
          {SinglePost.map((post, idx) => {
              return (
                <View key={idx}>
                  <Image
                    style={{width: 375, height: 240, marginBottom: 16}}
                    source={{uri: post.urlToImage}}
                    resizeMode="cover"
                  />
                  <Text style={styles.title}>
                    {post.title}
                  </Text>
                  <Text style={styles.content}>
                    {post.content}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 16,
    paddingRight: 16
  }
});
