import 'package:flutter/material.dart';

class TravelPlanCard extends StatelessWidget {
  final String from;
  final String to;
  final String date;
  final String time;
  final int seats;
  final List<String> passengers;

  TravelPlanCard({
    required this.from,
    required this.to,
    required this.date,
    required this.time,
    required this.seats,
    required this.passengers,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '$from -> $to',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text('Date: $date'),
            SizedBox(height: 4),
            Text('Time: $time'),
            SizedBox(height: 4),
            Text('Seats: $seats'),
            SizedBox(height: 8),
            Text('Passengers: ${passengers.join(', ')}'),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Handle join ride button press
                  },
                  child: Text('Join Ride'),
                ),
                SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {
                    // Handle request ride button press
                  },
                  child: Text('Request Ride'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}