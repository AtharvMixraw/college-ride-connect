#!/bin/bash

# Ensure you're in your Flutter project root directory before running this script

# Create directories
mkdir -p lib/{config,models,screens/{auth,home,profile,travel_plan,messaging},widgets,services,utils}
mkdir -p test
mkdir -p assets/{images,fonts}

# Create files
touch lib/main.dart lib/app.dart
touch lib/config/{app_config.dart,theme.dart}
touch lib/models/{user.dart,travel_plan.dart}
touch lib/screens/auth/{login_screen.dart,register_screen.dart}
touch lib/screens/home/home_screen.dart
touch lib/screens/profile/profile_screen.dart
touch lib/screens/travel_plan/{create_travel_plan_screen.dart,search_travel_plan_screen.dart}
touch lib/screens/messaging/chat_screen.dart
touch lib/widgets/{custom_button.dart,travel_plan_card.dart}
touch lib/services/{auth_service.dart,database_service.dart,messaging_service.dart}
touch lib/utils/{constants.dart,helpers.dart}
touch test/widget_test.dart

echo "Directory structure created successfully!"