import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import SplashScreen from './screens/Splash';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

// Custom hook to listen to AsyncStorage changes
function useAsyncStorageListener(key, defaultValue) {
  const [value, setValue] = React.useState(defaultValue);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        setValue(storedValue === 'true');
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();

    // Set up an interval to check for changes
    const interval = setInterval(loadValue, 100);
    
    return () => clearInterval(interval);
  }, [key]);

  return [value, isLoading];
}

export default function App() {
  const [isLoggedIn, isLoading] = useAsyncStorageListener('isLoggedIn', false);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Logged in screens
          <>
            <Stack.Screen 
              name="Home" 
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Not logged in screens
          <Stack.Screen 
            name="Onboarding" 
            component={Onboarding}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}