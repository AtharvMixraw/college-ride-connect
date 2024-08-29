import 'package:flutter/material.dart';
import 'edit_profile_screen.dart';
import 'package:college_ride_connect/screens/travel_plan/create_travel_plan_screen.dart';
import 'package:college_ride_connect/screens/travel_plan/search_travel_plan_screen.dart';

class ProfileScreen extends StatefulWidget {
  ProfileScreen({Key? key}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic> userProfile = {
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'college': 'Example University',
    'major': 'Computer Science',
    'year': 'Junior',
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Profile'),
        backgroundColor: Color(0xFFFF69B4),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('assets/images/default_avatar.png'),
            ),
            SizedBox(height: 16),
            Text(
              userProfile['name'],
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              userProfile['email'],
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            SizedBox(height: 24),
            ProfileInfoCard(title: 'College', value: userProfile['college']),
            ProfileInfoCard(title: 'Major', value: userProfile['major']),
            ProfileInfoCard(title: 'Year', value: userProfile['year']),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _navigateToEditProfile,
              child: Text('Edit Profile'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFFF69B4),
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _navigateToCreateTravelPlan,
              child: Text('Create Travel Plan'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFFF69B4),
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _navigateToSearchTravelPlan,
              child: Text('Search Travel Plans'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFFF69B4),
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _navigateToEditProfile() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => EditProfileScreen(userProfile: userProfile),
      ),
    );

    if (result != null && result is Map<String, dynamic>) {
      setState(() {
        userProfile = result;
      });
    }
  }

  void _navigateToCreateTravelPlan() {
    Navigator.pushNamed(context, '/create_travel_plan');
  }

  void _navigateToSearchTravelPlan() {
    Navigator.pushNamed(context, '/search_travel_plan');
  }
}

class ProfileInfoCard extends StatelessWidget {
  final String title;
  final String value;

  const ProfileInfoCard({Key? key, required this.title, required this.value}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text(value, style: TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }
}