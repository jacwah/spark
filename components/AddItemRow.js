import React from 'react';
import {View, TouchableWithoutFeedback, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import icons from '../icons';
import {styles, colors} from '../styles';
import CheckListRow from './CheckListRow';

export default function AddItemRow(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onAddItem}>
      <View>
        <CheckListRow before={<Image style={styles.icon} source={icons.add}/>}>
          <Text style={{color: colors.subdued, ...styles.defaultText}}>Add item</Text>
        </CheckListRow>
      </View>
    </TouchableWithoutFeedback>
  );
}

AddItemRow.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

