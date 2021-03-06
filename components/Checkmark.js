import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';
import icons from '../icons';

export default function Checkmark(props) {
  let icon = props.checked ? icons.checked : icons.unchecked;
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onToggle}>
      <Image style={styles.icon} source={icon}/>
    </TouchableOpacity>
  );
}

Checkmark.propTypes = {
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
