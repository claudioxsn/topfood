
import React from 'react';
import PesquisaProdutos from './src/screens/PesquisaProdutos';
import { StyleSheet } from 'react-native';
import CadastroProduto from './src/screens/CadastroProduto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='PesquisaProdutos' component={PesquisaProdutos} options={{ headerShown: false}}/>
        <Stack.Screen name='CadastroProduto' component={CadastroProduto} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
