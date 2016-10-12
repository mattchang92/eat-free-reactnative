import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={style.containerStyle}>
      {props.children}
    </View>
  );
}


const style = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    opacity: 0.9,
    backgroundColor: "transparent",
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
  }
}


export { CardSection };
