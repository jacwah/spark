import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, Image, Switch, TextInput,SafeAreaView, Platform, StyleSheet, Text, View, FlatList} from 'react-native';

const checkImage = require('./check.jpeg');
const uncheckImage = require('./uncheck.jpeg');
const crossImage = require('./x.jpeg');
const plusImage = require('./+.jpeg');

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.nextKey = 1;
    this.state = {items: [], title: ''};
    this.inputRefs = {};
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.items}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          ListHeaderComponent={<ListTitle value={this.state.title} onChange={(title) => this.setState({title: title})}/>}
          ListFooterComponent={<AddItemButton onAddItem={this.addItem.bind(this)}/>}
          renderItem={({item}) =>
            <CheckListItem
              key={item.key}
              text={item.text}
              inputRef={this.inputRefs[item.key]}
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

  addItem() {
    this.setState(({items}) => {
      let key = this.nextKey++;
      key = key.toString();
      this.inputRefs[key] = React.createRef();
      return {items: [...items, {key: key, text: '', checked: false}]};
    });
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
    let nextFocus = null;
    this.setState(({items}) => ({items:
      items.filter((item, index) => {
        if (item.key === key) {
          nextFocus = index - 1;
          return false;
        }
        return true;
      })
    }), () => {
      delete this.inputRefs[key];
      if (this.state.items.length > 0) {
        if (nextFocus < 0)
          nextFocus = 0;
        this.inputRefs[this.state.items[nextFocus].key].current.focus();
      }
    });
  }

  toggleChecked(key) {
    this.mapCopiedItem(key, (item) => {
      item.checked = !item.checked;
      return item;
    });
  }
}

function ListTitle(props) {
  return (
    <TextInput
      style={{fontWeight: 'bold', marginBottom: 20, marginTop: 20, fontSize: 30}}
      placeholder={'Title'}
      placeholderTextColor={'#b1b1b1'}
      value={props.value}
      onChangeText={props.onChange}
    />
  );
}

function AddItemButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onAddItem}>
      <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 10}}>
        <View style={{width: 32, height: 32, flex: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={plusImage} style={{flex: 0}}/>
        </View>
        <Text style={{flex: 1, marginLeft: 15, fontSize: 20, color: '#b1b1b1'}}>Add item</Text>
      </View>
    </TouchableWithoutFeedback>
  );
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
          autoFocus={true}
          ref={this.props.inputRef}
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
        <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
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
