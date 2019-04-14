import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';

export default function ListTitle(props) {
  return (
    <TextInput
      style={{marginVertical: 16, padding: 0, ...styles.titleText}}
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

