import 'package:flutter/material.dart';
import 'package:college_ride_connect/services/auth_service.dart';
import 'package:college_ride_connect/screens/home/home_screen.dart';
import 'package:college_ride_connect/screens/profile/profile_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final AuthService _authService = AuthService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFFF9D9EB), Color(0xFFE6E6FA)],
              ),
            ),
          ),
          Positioned(
            top: 20,
            left: 20,
            child: Image.asset('assets/images/signup_top.png', width: 100, height: 100),
          ),
          // Positioned(
          //   top: 20,
          //   right: 20,
          //   child: Image.asset('assets/images/main_top.png', width: 100, height: 100),
          // ),
          Positioned(
            bottom: 20,
            left: 20,
            child: Image.asset('assets/images/login_bottom.png', width: 100, height: 100),
          ),
          Positioned(
            bottom: 20,
            right: 20,
            child: Image.asset('assets/images/main_bottom.png', width: 100, height: 100),
          ),
          Positioned(
            top: 40,
            left: 20,
            child: IconButton(
              icon: Icon(Icons.arrow_back, color: Colors.black87),
              onPressed: () {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => HomeScreen()),
                );
              },
            ),
          ),
          Center(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Card(
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          const Text(
                            'Create Account',
                            style: TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 24),
                          TextFormField(
                            controller: _emailController,
                            decoration: InputDecoration(
                              labelText: 'Email',
                              prefixIcon: Icon(Icons.email),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter your email';
                              }
                              return null;
                            },
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            controller: _passwordController,
                            decoration: InputDecoration(
                              labelText: 'Password',
                              prefixIcon: Icon(Icons.lock),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            obscureText: true,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a password';
                              }
                              return null;
                            },
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            controller: _confirmPasswordController,
                            decoration: InputDecoration(
                              labelText: 'Confirm Password',
                              prefixIcon: Icon(Icons.lock_outline),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            obscureText: true,
                            validator: (value) {
                              if (value != _passwordController.text) {
                                return 'Passwords do not match';
                              }
                              return null;
                            },
                          ),
                          SizedBox(height: 24),
                          ElevatedButton(
                            onPressed: _mockRegister,
                            child: Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: Text(
                                'Register',
                                style: TextStyle(fontSize: 18),
                              ),
                            ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Color(0xFFFF69B4),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

//   void _register() async {
//     if (_formKey.currentState!.validate()) {
//       try {
//         final token = await _authService.register(
//           _emailController.text,
//           _passwordController.text,
//         );
//         // TODO: Save the token securely
//         ScaffoldMessenger.of(context).showSnackBar(
//           const SnackBar(content: Text('Registration successful')),
//         );
//         Navigator.of(context).pushReplacement(
//           MaterialPageRoute(builder: (context) => HomeScreen()),
//         );
//       } catch (e) {
//         ScaffoldMessenger.of(context).showSnackBar(
//           SnackBar(content: Text('Registration failed: $e')),
//         );
//       }
//     }
//   }
//
//   @override
//   void dispose() {
//     _emailController.dispose();
//     _passwordController.dispose();
//     _confirmPasswordController.dispose();
//     super.dispose();
//   }
// }
  void _mockRegister() {
    if (_formKey.currentState!.validate()) {
      // Simulate a delay to mimic network request
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return Center(child: CircularProgressIndicator());
        },
      );

      Future.delayed(Duration(seconds: 2), () {
        Navigator.of(context).pop(); // Dismiss the loading dialog

        // Show success message
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registration successful')),
        );

        // Navigate to the profile screen
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => ProfileScreen()),
        );
      });
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
}