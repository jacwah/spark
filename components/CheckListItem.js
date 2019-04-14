import React from 'react';
import {TouchableWithoutFeedback, TextInput, Image} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';
import icons from '../icons';
import Checkmark from './Checkmark';
import CheckListRow from './CheckListRow';

export default class CheckListItem extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheckToggle: PropTypes.func.isRequired,
    doRemove: PropTypes.func.isRequired,
    doAddItem: PropTypes.func.isRequired,
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
