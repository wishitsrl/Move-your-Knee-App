import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';

import Colors from '@/constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -5 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
		headerShown: false,
      }}>
      <Tabs.Screen
        name="CONOSCITI"
        options={{
            tabBarLabel: 'CONOSCITI',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../../assets/ICONE/PNG/CONOSCITISELEZIONATO.png')
                    : require('../../assets/ICONE/PNG/CONOSCITIGRIGIO.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
      />
	  <Tabs.Screen
        name="ALLENATI"
        options={{
            tabBarLabel: 'ALLENATI',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../../assets/ICONE/PNG/ALLENATISELEZIONATO.png')
                    : require('../../assets/ICONE/PNG/ALLENATIGRIGIO.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
      />
      <Tabs.Screen
        name="DATI"
        options={{
            tabBarLabel: 'DATI',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../../assets/ICONE/PNG/DATISELEZIONATO.png')
                    : require('../../assets/ICONE/PNG/DATIGRIGIO.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
      />
	  <Tabs.Screen
        name="CHAT"
        options={{
            tabBarLabel: 'CHAT',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../../assets/ICONE/PNG/CHATSELEZIONATO.png')
                    : require('../../assets/ICONE/PNG/CHATGRIGIO.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
      />
	  <Tabs.Screen
        name="PROFILO"
        options={{
            tabBarLabel: 'PROFILO',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../../assets/ICONE/PNG/PROFILOSELEZIONATO.png')
                    : require('../../assets/ICONE/PNG/PROFILOGRIGIO.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
      />
    </Tabs>
  );
}
