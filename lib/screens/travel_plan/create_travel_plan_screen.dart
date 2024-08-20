import 'package:flutter/material.dart';
import 'package:college_ride_connect/widgets/travel_plan_list.dart';
import 'package:college_ride_connect/widgets/travel_plan_form.dart';

class CreateTravelPlanScreen extends StatefulWidget {
  @override
  _CreateTravelPlanScreenState createState() => _CreateTravelPlanScreenState();
}

class _CreateTravelPlanScreenState extends State<CreateTravelPlanScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Travel Plan'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: TravelPlanForm(),
      ),
    );
  }
}