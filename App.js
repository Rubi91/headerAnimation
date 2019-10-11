/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT);

class App extends Component {
  state = {
    scrollY: new Animated.Value(0),
  };

  renderScrollViewContent = ()=> {
    const data = Array.from({length: 30});

    return (
        <View style={styles.scrollViewContent}>
          {data.map((_, i)=> <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>)}
        </View>
    )
  }
render(): * {
  const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (

        <View style={styles.fill}>
          <Animated.View style={[styles.header, {height: headerHeight}]}>
            <Animated.Image  style={[styles.backgroundImg,  {opacity: imageOpacity, transform: [{translateY: imageTranslate}]}]} source={require('./cancun.jpg')}/>
            <View style={styles.bar}>
              <Text style={styles.title}>Cancún</Text>
            </View>
          </Animated.View>
          <ScrollView
              style={styles.fill}
              scrollEventThrottle={16}
              onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY }}}])}
          >
            {this.renderScrollViewContent()}
          </ScrollView>

        </View>

  );
}
};

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  row: {
    height: 40,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#dbdbdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00bcd1',
    overflow: 'hidden'
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  }
});

export default App;
