import React from 'react';
import {SafeAreaView, View} from 'react-native';
import CheckList from './CheckList.js';

export default class App extends React.Component {
  static propTypes = {}

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
          <CheckList/>
        </View>
      </SafeAreaView>
    );
  }
}
