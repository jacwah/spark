import React from 'react';
import {TouchableWithoutFeedback, TextInput, Image} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';
import icons from '../icons';
import Checkmark from './Checkmark';
import CheckListRow from './CheckListRow';

export default class CheckListItem extends React.Component {
  static propTypes = {
    /**
     * Item text.
     */
    text: PropTypes.string.isRequired,

    /**
     * Called with new text on change.
     */
    onChangeText: PropTypes.func.isRequired,

    /**
     * Whether this item is checked or not.
     */
    checked: PropTypes.bool.isRequired,

    /**
     * Called to toggle the checked state of this item.
     */
    onCheckToggle: PropTypes.func.isRequired,

    /**
     * Called to remove this item.
     */
    onRemove: PropTypes.func.isRequired,

    /**
     * Called to add a new item to the same list.
     */
    onAddItem: PropTypes.func.isRequired,

    /**
     * A ref to this item's TextInput.
     */
    inputRef: PropTypes.any.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {removable: false};
  }

  render() {
    let remove = null;
    if (this.state.removable)
      remove = (
        <TouchableWithoutFeedback onPress={this.props.onRemove}>
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
          onSubmitEditing={this.props.onAddItem}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChangeText={this.props.onChangeText}
          onFocus={() => this.setState({removable: true})}
          onBlur={() => this.setState({removable: false})}/>
      </CheckListRow>
    );
  }

  handleKeyPress({nativeEvent}) {
    if (nativeEvent.key === 'Backspace' && this.props.text.length === 0)
      this.props.onRemove();
  }
}
