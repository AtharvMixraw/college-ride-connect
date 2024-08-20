import 'package:flutter/material.dart';
import 'travel_plan_card.dart';

class TravelPlanList extends StatelessWidget {
  final List<Map<String, dynamic>> travelPlans;

  TravelPlanList(this.travelPlans);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: travelPlans.length,
      itemBuilder: (context, index) {
        final travelPlan = travelPlans[index];
        return TravelPlanCard(
          from: travelPlan['from'],
          to: travelPlan['to'],
          date: travelPlan['date'],
          time: travelPlan['time'],
          seats: travelPlan['seats'],
          passengers: travelPlan['passengers'],
        );
      },
    );
  }
}