import 'package:flutter/material.dart';
import 'screens/home/home_screen.dart';

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
      home: const HomeScreen(),
    );
  }
}