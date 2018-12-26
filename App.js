/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, ScrollView, StyleSheet, Text, View, Image, RefreshControl, Linking, TouchableOpacity} from 'react-native';
import api from './utilities/api';
import Moment from 'moment';
import { iOSUIKit, iOSColors } from 'react-native-typography'

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
    Moment.locale('en');
    console.log("News:", this.state.articles);
    const shuffledPosts = shuffleArray(this.state.articles);
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
          <View style={styles.header}>
            <Text style={styles.date}>
              {new Moment().format("dddd, D MMM")}
            </Text>
            <Text style={iOSUIKit.largeTitleEmphasized}>News</Text>
          </View>
          
          {shuffledPosts.map((post, idx) => {
              return (
                <TouchableOpacity 
                  key={idx} 
                  onPress={() => Linking.openURL(post.url)}>
                <View style={styles.newsRow}>
                    <Image
                      style={{width: 80, height: 80, borderRadius: 4}}
                      source={{uri: post.urlToImage === null ? 'https://images.unsplash.com/photo-1502772066658-3006ff41449b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2656&q=80' : post.urlToImage }}
                      resizeMode="cover"
                    />
                    <View style={{flex: 1}}>
                      <Text style={styles.newsRowDate}>
                        {Moment(post.publishedAt).fromNow()}
                      </Text>
                        <Text style={styles.title}>
                          {post.title}
                        </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            <Text style={styles.footer}>News from News API</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  footer: {
    ...iOSUIKit.caption2Emphasized,
    color: iOSColors.midGray,
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 8
  },
  date: {
    ...iOSUIKit.caption2Emphasized,
    color: iOSColors.blue,
    textTransform: 'uppercase',
  },
  newsRowDate: {
    marginLeft: 16,
    marginBottom: 2,
    ...iOSUIKit.caption2Emphasized,
    color: iOSColors.midGray,
    textTransform: 'uppercase',
  },
  header: {
    marginTop: 72,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 24,
    paddingBottom: 8
  },
  title: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
    lineHeight: 22
  },
  newsRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 16
  }
});
