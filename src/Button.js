import React from 'react';
import  {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Button = ({text, onPress, addStyle}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, addStyle]} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    margin: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  }
})


export default Button