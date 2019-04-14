import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';

export default function CheckListRow(props) {
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

