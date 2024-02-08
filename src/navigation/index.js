import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants/screens';
import Home from '../screens/Home';
import Login from '../screens/Login'; // Corrected import
import { getLogIn } from '../utils/storageUtils';
import Form from '../screens/Form';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLogin = await getLogIn();
        if (isLogin.email.length > 0 && isLogin.password.length > 0) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching login details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
    return null;
  }

  const initialRouteName = isLoggedIn ? SCREENS.HOME : SCREENS.LOGIN;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.HOME} component={Home} />
      <Stack.Screen name={SCREENS.FORM} component={Form} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
