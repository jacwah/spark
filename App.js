import React, {Component} from 'react';
import {TouchableOpacity, Image, Switch, TextInput,SafeAreaView, Platform, StyleSheet, Text, View, FlatList} from 'react-native';

const checkImage = require('./check.jpeg');
const uncheckImage = require('./uncheck.jpeg');

class Checkmark extends Component {
  state = {checked: false, focused: false}

  onPress = () => {
      this.setState(function(state) {
        return {checked: state.checked ? false : true};
      });
  }

  render() {
    let image = this.state.checked ? checkImage : uncheckImage;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={this.onPress}>
        <Image source={image}/>
      </TouchableOpacity>
    );
  }
}

const crossImage = require('./x.jpeg');

class Item extends Component {
  state = {text: '', checked: false}
  
  getOnFocus(focused) {
    return function() {
      this.setState(function(state) {
        return {focused: focused};
      });
    }.bind(this);
  }

  render() {
    cross = null;
    if (this.state.focused)
      cross = (<Image source={crossImage} onPress={this.props.remove}/>);
    return (
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
        <Checkmark style={{flex:1}}/>
        <TextInput style={{flex: 1, marginLeft: 15, fontSize: 20}} placeholder={'hej'} onFocus={this.getOnFocus(true)} onBlur={this.getOnFocus(false)}/>
        {cross}
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, margin: 20}}>
          <TextInput style={{fontWeight: 'bold', marginBottom: 20, fontSize: 30}} placeholder={'Title'} placeholderTextColor={'gray'}/>
          <Item/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 30
  },
});
