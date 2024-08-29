import 'package:flutter/material.dart';
import 'package:college_ride_connect/widgets/travel_plan_list.dart';

class SearchTravelPlanScreen extends StatefulWidget {
  @override
  _SearchTravelPlanScreenState createState() => _SearchTravelPlanScreenState();
}

class _SearchTravelPlanScreenState extends State<SearchTravelPlanScreen> {
  // Placeholder travel plan data
  final List<Map<String, dynamic>> _travelPlans = [
    {
      'from': 'Location A',
      'to': 'Location B',
      'date': '2023-06-01',
      'time': '10:00 AM',
      'seats': 3,
      'passengers': ['John', 'Jane', 'Bob'],
    },
    {
      'from': 'Location C',
      'to': 'Location D',
      'date': '2023-06-02',
      'time': '2:00 PM',
      'seats': 2,
      'passengers': ['Alice', 'Charlie'],
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search Travel Plans'),
      ),
      body: TravelPlanList(_travelPlans),
    );
  }
}