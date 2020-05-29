import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Setting extends Component {
  render() {
    let {container, itemText} = styles;
    return (
      <View style={container}>
        <Text style={itemText}>Setting Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
  },
});
export default Setting;
