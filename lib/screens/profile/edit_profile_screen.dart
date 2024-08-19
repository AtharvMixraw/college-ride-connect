import 'package:flutter/material.dart';

class EditProfileScreen extends StatefulWidget {
  final Map<String, dynamic> userProfile;

  const EditProfileScreen({Key? key, required this.userProfile}) : super(key: key);

  @override
  _EditProfileScreenState createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _collegeController;
  late TextEditingController _majorController;
  late TextEditingController _yearController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.userProfile['name']);
    _emailController = TextEditingController(text: widget.userProfile['email']);
    _collegeController = TextEditingController(text: widget.userProfile['college']);
    _majorController = TextEditingController(text: widget.userProfile['major']);
    _yearController = TextEditingController(text: widget.userProfile['year']);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
        backgroundColor: Color(0xFFFF69B4),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('assets/images/default_avatar.png'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // TODO: Implement image picker functionality
              },
              child: Text('Change Profile Picture'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFFF69B4),
              ),
            ),
            SizedBox(height: 24),
            buildTextField('Name', _nameController),
            buildTextField('Email', _emailController),
            buildTextField('College', _collegeController),
            buildTextField('Major', _majorController),
            buildTextField('Year', _yearController),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _saveProfile,
              child: Text('Save Changes'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFFF69B4),
                padding: EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildTextField(String label, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(),
        ),
      ),
    );
  }

  void _saveProfile() {
    // Create an updated profile map
    Map<String, dynamic> updatedProfile = {
      'name': _nameController.text,
      'email': _emailController.text,
      'college': _collegeController.text,
      'major': _majorController.text,
      'year': _yearController.text,
    };

    // In a real app, we would save this data to a backend or local storage here

    // Return the updated profile to the previous screen
    Navigator.pop(context, updatedProfile);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _collegeController.dispose();
    _majorController.dispose();
    _yearController.dispose();
    super.dispose();
  }
}