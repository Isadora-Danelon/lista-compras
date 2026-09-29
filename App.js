import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';

export default function App() {
  const [produtos, setProdutos] = useState([]);

  return (
    <NavigationContainer>
      <StackNavigation produtos={produtos} setProdutos={setProdutos} />
    </NavigationContainer>
  );
}