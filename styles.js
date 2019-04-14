import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  checkListRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkListRowEnd: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  defaultText: {
    fontSize: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export const colors = {
  subdued: '#b1b1b1',
};
