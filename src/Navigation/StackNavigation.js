import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProductsScreen from '../Screens/ProductsScreen';

const Stack = createStackNavigator();

const StackNavigation = ({ produtos, setProdutos }) => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="Produtos"
      options={{
        title: 'Carrinho de Compras',
        headerStyle: { backgroundColor: '#1C3426' },
        headerTintColor: '#fff',
      }}
    >
      {(props) => (
        <ProductsScreen
          {...props}
          produtos={produtos}
          setProdutos={setProdutos}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);


export default StackNavigation;