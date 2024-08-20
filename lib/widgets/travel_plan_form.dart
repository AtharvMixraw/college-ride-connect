import 'package:flutter/material.dart';

class TravelPlanForm extends StatefulWidget {
  @override
  _TravelPlanFormState createState() => _TravelPlanFormState();
}

class _TravelPlanFormState extends State<TravelPlanForm> {
  final _formKey = GlobalKey<FormState>();
  final _fromController = TextEditingController();
  final _toController = TextEditingController();
  final _dateController = TextEditingController();
  final _timeController = TextEditingController();
  final _seatsController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _fromController,
            decoration: InputDecoration(
              labelText: 'From',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the starting location';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _toController,
            decoration: InputDecoration(
              labelText: 'To',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the destination';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _dateController,
            decoration: InputDecoration(
              labelText: 'Date',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the travel date';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _timeController,
            decoration: InputDecoration(
              labelText: 'Time',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the travel time';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _seatsController,
            decoration: InputDecoration(
              labelText: 'Seats',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the number of available seats';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // Handle form submission
                print('From: ${_fromController.text}');
                print('To: ${_toController.text}');
                print('Date: ${_dateController.text}');
                print('Time: ${_timeController.text}');
                print('Seats: ${_seatsController.text}');
              }
            },
            child: Text('Create Travel Plan'),
          ),
        ],
      ),
    );
  }
}