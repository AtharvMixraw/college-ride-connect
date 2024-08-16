import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

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
          Center(
            child: Card(
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'College Ride Connect',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 20),
                    Text(
                      'Welcome to College Ride Connect!',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.black54,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 30),
                    ElevatedButton(
                      onPressed: () => Navigator.pushNamed(context, '/login'),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                        child: Text(
                          '  Login  ',
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
                    SizedBox(height: 15),
                    ElevatedButton(
                      onPressed: () => Navigator.pushNamed(context, '/register'),
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Color(0xFFFF69B4), backgroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                          side: BorderSide(color: Color(0xFFFF69B4)),
                        ),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                        child: Text(
                          'Register',
                          style: TextStyle(fontSize: 18),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
