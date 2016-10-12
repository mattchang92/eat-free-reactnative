import React from 'react';
import {
  TextInput,
  View,
  Text,
} from 'react-native';

const LabelledInput = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
}

export { LabelledInput }
