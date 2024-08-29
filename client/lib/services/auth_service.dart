import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService{
  static const String baseUrl = 'http://10.0.2.2:3000/api/auth';
  Future<String> register(String email, String password) async{
    final response = await http.post(
      Uri.parse('$baseUrl/register'),
      headers: <String,String>{
        'Content-Type' : 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String,String>{
        'email' : email,
        'password' : password,
      }),
    );

    if(response.statusCode == 201){
      return jsonDecode(response.body)['token'];
    }else{
      throw Exception('Failed to register user');
    }
  }

  Future<String> login(String email, String password) async{
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: <String,String>{
        'Content-Type' : 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String,String>{
        'email' : email,
        'password' : password,
      }),
    );

    if(response.statusCode == 200){
      return jsonDecode(response.body)['token'];
    }else{
      throw Exception('Failed to login user');
    }
  }

}