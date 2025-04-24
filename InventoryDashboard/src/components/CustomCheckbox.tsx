import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomCheckbox = ({ label, value, onChange }: any) => (
  <TouchableOpacity onPress={() => onChange(!value)} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, value && styles.checked]} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [checked, setChecked] = useState(false);

  return <CustomCheckbox label="In Stock Only" value={checked} onChange={setChecked} />;
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
});

export default App;
