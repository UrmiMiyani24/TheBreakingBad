import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { Home, Search, Favourites, Detail } from './src/screens/';
import { Provider } from 'react-redux';
import store from './src/redux/store/Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'Home'}>
            {/* Screens */}
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false}}/>
            <Stack.Screen name='Search' component={Search} options={{ headerShown: false}}/>
            <Stack.Screen name='Favourites' component={Favourites} options={{ headerShown: false}}/>
            <Stack.Screen name='Detail' component={Detail} options={{ headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
