import React from 'react';
import {FlatList, View} from 'react-native';
import ListTitle from './ListTitle';
import AddItemRow from './AddItemRow';
import CheckListItem from './CheckListItem';

export default class CheckList extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props);

    this.state = {
      /**
       * List of items in the list.
       * {key: string, text: string, checked: bool}
       */

      items: [],
      /**
       * The list's title.
       */
      title: ''
    };

    // Used to give items monotonically increasing keys.
    this.nextKey = 1;
    this.inputRefs = {};

    this.addItemLast = this.addItemAfter.bind(this, null);
    this.setTitle = this.setTitle.bind(this);
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
              onChangeText={this.setTitle}/>
          }
          ListFooterComponent={
            <AddItemRow onAddItem={this.addItemLast}/>
          }
          renderItem={({item}) =>
            <CheckListItem
              key={item.key}
              text={item.text}
              inputRef={this.inputRefs[item.key]}
              checked={item.checked}
              // I would like to remove these binds, but none of the
              // alternatives seem as nice.
              onRemove={this.removeItemAndFocusPrevious.bind(this, item.key)}
              onAddItem={this.addItemAfter.bind(this, item.key)}
              onCheckToggle={this.toggleChecked.bind(this, item.key)}
              onChangeText={this.setText.bind(this, item.key)}/>
          }/>
      </View>
    );
  }

  setTitle(title) {
    this.setState({title: title});
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
