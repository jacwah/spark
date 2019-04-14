import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, Image, TextInput, SafeAreaView, Text, View, FlatList} from 'react-native';
import icons from './icons';
import {styles, colors} from './styles';
import PropTypes from 'prop-types';

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.nextKey = 1;
    this.state = {items: [], title: ''};
    this.inputRefs = {};
  }

  componentDidMount() {
    this.addItemAfter(null);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.items}
          // Without this remove taps are ignored
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          ListHeaderComponent={
            <ListTitle
              value={this.state.title}
              onChangeText={(title) => this.setState({title: title})}/>
          }
          ListFooterComponent={
            <AddItemRow onAddItem={this.addItemAfter.bind(this, null)}/>
          }
          renderItem={({item}) =>
            <CheckListItem
              key={item.key}
              text={item.text}
              inputRef={this.inputRefs[item.key]}
              checked={item.checked}
              doRemove={this.removeItemAndFocusPrevious.bind(this, item.key)}
              doAddItem={this.addItemAfter.bind(this, item.key)}
              onChangeText={this.setText.bind(this, item.key)}
              onCheckToggle={this.toggleChecked.bind(this, item.key)}/>
          }/>
      </View>
    );
  }

  createItem() {
    let key = this.nextKey++;
    key = key.toString();
    this.inputRefs[key] = React.createRef();
    return {key: key, text: '', checked: false};
  }

  // null to add at end
  addItemAfter(keyOrNull) {
    this.setState(({items}) => {
      const item = this.createItem();
      items = items.slice();
      const afterIndex = items.findIndex((item) => item.key === keyOrNull);
      if (afterIndex < 0)
        items.push(item);
      else
        items.splice(afterIndex + 1, 0, item);
      return {items: items};
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

  toggleChecked(key) {
    this.mapCopiedItem(key, (item) => {
      item.checked = !item.checked;
      return item;
    });
  }

  removeItemAndFocusPrevious(key) {
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
        const ref = this.inputRefs[this.state.items[nextFocus].key];
        ref.current.focus();
      }
    });
  }
}

function ListTitle(props) {
  return (
    <TextInput
      style={{marginBottom: 20, marginTop: 20, ...styles.titleText}}
      placeholder={'Title'}
      placeholderTextColor={'#b1b1b1'}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
}

ListTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

function CheckListRow(props) {
  return (
    <View style={styles.checkListRow}>
        <View style={{width: 32, height: 32, flex: 0, justifyContent: 'center', alignItems: 'center'}}>
          {props.before}
        </View>
        <View style={{flex: 1, marginLeft: 15}}>
          {props.children}
        </View>
        {props.after &&
          <View style={{width: 32, height: 32, flex: 0, justifyContent: 'center', alignItems: 'center'}}>
            {props.after}
          </View>
        }
    </View>
  );
}

CheckListRow.propTypes = {
  children: PropTypes.node.isRequired,
  before: PropTypes.node.isRequired,
  after: PropTypes.node,
};

function AddItemRow(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onAddItem}>
      <CheckListRow before={<Image source={icons.add}/>}>
        <Text style={{color: colors.subdued, ...styles.defaultText}}>Add item</Text>
      </CheckListRow>
    </TouchableWithoutFeedback>
  );
}

AddItemRow.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

class CheckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {removable: false};
  }

  render() {
    let remove = null;
    if (this.state.removable)
      remove = (
        <TouchableWithoutFeedback onPress={this.props.doRemove}>
          <Image source={icons.remove}/>
        </TouchableWithoutFeedback>
      );
    const check = (
      <Checkmark
        style={{flex:1}}
        onToggle={this.props.onCheckToggle}
        checked={this.props.checked}/>
    );

    return (
      <CheckListRow before={check} after={remove}>
        <TextInput
          style={styles.defaultText}
          value={this.props.text}
          autoFocus={true}
          ref={this.props.inputRef}
          // Avoid keyboard flashing, we will blur by changing focus anyway
          blurOnSubmit={false}
          onSubmitEditing={this.props.doAddItem}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChangeText={this.props.onChangeText}
          onFocus={() => this.setState({removable: true})}
          onBlur={() => this.setState({removable: false})}/>
      </CheckListRow>
    );
  }

  handleKeyPress({nativeEvent}) {
    if (nativeEvent.key === 'Backspace' && this.props.text.length === 0)
      this.props.doRemove();
  }
}

CheckListItem.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckToggle: PropTypes.func.isRequired,
  doRemove: PropTypes.func.isRequired,
  doAddItem: PropTypes.func.isRequired,
  inputRef: PropTypes.any.isRequired,
};


function Checkmark(props) {
  let icon = props.checked ? icons.checked : icons.unchecked;
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onToggle}>
      <Image source={icon}/>
    </TouchableOpacity>
  );
}

Checkmark.propTypes = {
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

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
