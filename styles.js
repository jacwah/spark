import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  checkListRow: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  checkListRowEnd: {
    width: 32,
    height: 32,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  defaultText: {
    fontSize: 20,
  }
});

export const colors = {
  subdued: '#b1b1b1',
};
