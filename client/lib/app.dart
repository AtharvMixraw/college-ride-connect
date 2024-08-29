import 'package:flutter/material.dart';
import 'screens/home/home_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/profile/profile_screen.dart';
import 'screens/profile/edit_profile_screen.dart'; // Add this new import
import 'screens/travel_plan/create_travel_plan_screen.dart';
import 'screens/travel_plan/search_travel_plan_screen.dart';


class CollegeRideConnectApp extends StatelessWidget {
  const CollegeRideConnectApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'College Ride Connect',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/profile': (context) =>  ProfileScreen(),
        '/edit_profile': (context) => EditProfileScreen(userProfile: {}), // Add this new route
        '/create_travel_plan': (context) => CreateTravelPlanScreen(),
        '/search_travel_plan': (context) => SearchTravelPlanScreen(),
      },
    );
  }
}