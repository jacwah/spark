import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../styles';

export default function CheckListRow(props) {
  return (
    <View style={styles.checkListRow}>
        <View style={styles.checkListRowEnd}>
          {props.before}
        </View>
        <View style={{flex: 1, marginLeft: 12}}>
          {props.children}
        </View>
        {props.after &&
          <View style={styles.checkListRowEnd}>
            {props.after}
          </View>
        }
    </View>
  );
}

CheckListRow.propTypes = {
  /**
   * Main content of the row.
   */
  children: PropTypes.node.isRequired,

  /**
   * A small element before the main content.
   */
  before: PropTypes.node.isRequired,

  /**
   * A small element after the main content.
   */
  after: PropTypes.node,
};

