import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, Image, Switch, TextInput,SafeAreaView, Platform, StyleSheet, Text, View, FlatList} from 'react-native';

const checkImage = require('./check.jpeg');
const uncheckImage = require('./uncheck.jpeg');
const crossImage = require('./x.jpeg');

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [{key: "1", text: "Hej", checked: true}, {key: "2", text: "Yo", checked: false}]};
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.items}
          keyboardShouldPersistTaps="handled"
          renderItem={({item}) =>
            <CheckListItem
              key={item.key}
              text={item.text}
              checked={item.checked}
              onChangeText={this.setText.bind(this, item.key)}
              onRemove={this.removeItem.bind(this, item.key)}
              onCheckToggle={this.toggleChecked.bind(this, item.key)}
            />
          }
        />
      </View>
    );
  }

  mapCopiedItem(key, fn) {
    this.setState(({items}) => ({items:
      items.map((item) => {
        if (item.key === key)
          return fn({...item});
        return item;
      })
    }));
  }

  setText(key, text) {
    this.mapCopiedItem(key, (item) => {
      item.text = text;
      return item;
    });
  }

  removeItem(key) {
    this.setState(({items}) => ({items:
      items.filter((item) => {
        return item.key !== key;
      })
    }));
  }

  toggleChecked(key) {
    this.mapCopiedItem(key, (item) => {
      item.checked = !item.checked;
      return item;
    });
  }
}

class CheckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {removable: false};
  }

  render() {
    let cross = null;
    if (this.state.removable)
      cross = (
        <TouchableWithoutFeedback onPress={this.props.onRemove}>
          <Image source={crossImage}/>
        </TouchableWithoutFeedback>
      );

    return (
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
        <Checkmark style={{flex:1}} onToggle={this.props.onCheckToggle} checked={this.props.checked}/>
        <TextInput
          style={{flex: 1, marginLeft: 15, fontSize: 20}}
          value={this.props.text}
          onChangeText={this.props.onChangeText}
          onFocus={() => this.setState({removable: true})}
          onBlur={() => this.setState({removable: false})}
        />
        {cross}
      </View>
    );
  }
}

function Checkmark(props) {
  let image = props.checked ? checkImage : uncheckImage;
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onToggle}>
      <Image source={image}/>
    </TouchableOpacity>
  );
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, margin: 20}}>
          <TextInput style={{fontWeight: 'bold', marginBottom: 20, fontSize: 30}} placeholder={'Title'} placeholderTextColor={'gray'}/>
          <CheckList/>
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
