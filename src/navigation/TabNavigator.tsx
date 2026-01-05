import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CalendarScreen } from "../screens/CalendarScreen";
import { TasksScreen } from "../screens/TasksScreen";
import { ListsScreen } from "../screens/ListsScreen";
import { MoreScreen } from "../screens/MoreScreen";
import { BottomNavigation } from "../components/layout/BottomNavigation";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => (
      <BottomNavigation
        activeRoute={props.state.routeNames[props.state.index]}
        onNavigate={(route) => props.navigation.navigate(route)}
      />
    )}
  >
    <Tab.Screen name="home" component={HomeScreen} />
    <Tab.Screen name="calendar" component={CalendarScreen} />
    <Tab.Screen name="tasks" component={TasksScreen} />
    <Tab.Screen name="lists" component={ListsScreen} />
    <Tab.Screen name="more" component={MoreScreen} />
  </Tab.Navigator>
);
