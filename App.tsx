import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const App = () => {
  const [oldValue, setOldValue] = useState('0');
  const [newValue, setNewValue] = useState('0');
  const [operator, setOperator] = useState('');

  useEffect(() => {
    setNewValue(parseFloat(newValue).toString());
    setOldValue(parseFloat(oldValue).toString());
  }, [newValue, oldValue]);

  const handleButtonPress = (value: string, isOperator: boolean) => {
    if (newValue == 'Infinity' || newValue === 'NaN') {
      setNewValue('0');
      setOldValue('0');
      setOperator('');
    } else if (isOperator) {
      setOperator(value);
      if (newValue !== '0') {
        setOldValue(
          oldValue === '0' ? newValue : eval(oldValue + operator + newValue),
        );
        setNewValue('0');
      }
    } else if (value === 'C') {
      setOldValue('0');
      setOperator('');
      setNewValue('0');
    } else if (value === 'CE') {
      setNewValue('0');
    } else if (value === 'DEL') {
      setNewValue(
        newValue.length > 1 ? newValue.substring(0, newValue.length - 1) : '0',
      );
    } else if (value === '+/-') {
      setNewValue((parseFloat(newValue) * -1).toString());
    } else if (value === '.') {
      setNewValue(!newValue.includes('.') ? newValue + value : newValue);
    } else if (value === '=') {
      if (oldValue === '0' && newValue === '0') {
        setOldValue(newValue);
        setNewValue('0');
      } else if (operator) {
        setOldValue('0');
        setNewValue(eval(oldValue + operator + newValue));
        setOperator('');
      }
    } else {
      setNewValue(
        newValue === '0' || newValue == 'Infinity' || newValue == 'NaN'
          ? value
          : newValue + value,
      );
    }
  };

  const renderButton = (value: string, isOperator = false) => (
    <TouchableOpacity
      style={[styles.button, isOperator ? styles.operatorButton : null]}
      onPress={() => handleButtonPress(value, isOperator)}>
      <Text style={[styles.buttonText, isOperator && {color: '#fff'}]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>
          {oldValue !== '0' && oldValue + operator}
        </Text>
        <Text style={styles.displayText}>{newValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {renderButton('C')}
          {renderButton('CE')}
          {renderButton('DEL')}
          {renderButton('/', true)}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('*', true)}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('-', true)}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('+', true)}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('+/-')}
          {renderButton('=')}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 30,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  operatorButton: {
    backgroundColor: '#2C2BAB',
  },
  buttonText: {
    fontSize: 24,
    fontWeight:'bold'
  },
});

export default App;
