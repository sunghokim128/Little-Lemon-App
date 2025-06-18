# Little Lemon Restaurant App

A cross-platform React Native mobile application for Little Lemon, a family-owned Mediterranean restaurant. This app allows users to browse menu items, manage their profiles, and enjoy a seamless dining experience.

## 🍋 About

Little Lemon specializes in traditional Mediterranean recipes served with a modern twist. This mobile app provides customers with a smooth, responsive interface to explore the menu, manage their personal data, and access restaurant features—all with or without internet access.

## ✨ Features

### 🏠 Home Screen
- Browse menu items grouped by categories: Starters, Mains, Desserts
- Real-time search with 500ms debouncing
- Filter menu items by category with visual selection feedback
- Local caching using SQLite for offline access
- First-time fetch from remote API
- Clean layout with responsive design

### 👤 Profile Management
- Upload/change profile avatar using device image picker
- Edit name, email, and phone number with live validation
- Automatic US phone number formatting with input mask
- Data persistence via AsyncStorage

### 🔐 Onboarding & Authentication
- Lightweight onboarding flow with name and email input
- Real-time form validation with feedback
- Auto-login and logout functionality using local flags

### 🎨 Design & UX
- Unified color theme with React Native Paper
- Optimized keyboard handling and screen transitions
- Graceful error handling and loading indicators

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React Native | Cross-platform app development |
| Expo SDK | App runtime and development tooling |
| SQLite (via expo-sqlite) | Local database for menu items |
| AsyncStorage | Persistent local storage (profile info) |
| React Navigation | Navigation between screens |
| React Native Paper | Material Design components |
| Expo Image Picker | Avatar photo selection from gallery |
| react-native-mask-input | Phone number formatting |

## 🖼️ Screens Overview

### ✅ Home Screen
- Restaurant header
- Search bar
- Menu sections grouped by category

### ✅ Profile Screen
- Avatar selection
- Form with validation for personal info
- Logout and save options

### ✅ Onboarding Screen
- First-time setup for name/email
- Navigation into main app after login

## ⚙️ Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator

### Installation

```bash
# 1. Clone the repo
git clone <repository-url>
cd LittleLemon

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run the app
npx expo start
```

## 📦 Project Structure

```
LittleLemon/
├── App.js                  # App entry and navigation container
├── screens/
│   ├── Home.js             # Menu display
│   ├── Profile.js          # Profile management
│   ├── Onboarding.js       # First-time user flow
│   └── Splash.js           # Initial loading screen
├── database.js             # SQLite logic for menu
├── assets/                 # Static images (logo, food, etc.)
└── package.json            # Dependencies and scripts
```

## 🗃️ Local Database Schema

**Table: menuitems**

| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Menu item name |
| price | TEXT | Price of item |
| description | TEXT | Item description |
| image | TEXT | Image filename |
| category | TEXT | starters / mains / desserts |

## 🔍 Key Features Explained

### 🔎 Debounced Search
- Implements a 500ms delay after typing to reduce load
- Improves performance during fast typing

### 💾 Offline Access
- Menu items fetched once from API and cached locally
- Available even without an internet connection

### 🔄 Navigation Flow
```
Splash Screen ➝ (If not onboarded) ➝ Onboarding ➝ Home ➝ Profile
```

### 📂 Data Persistence
- User profile (name, email, phone, avatar) stored in AsyncStorage
- Menu data stored in SQLite

## 🧪 Testing

To run tests (if implemented):
```bash
npm test
```

## 📦 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Little Lemon Restaurant
- **API**: Meta Mobile Developer Program

## 📞 Support

For support or questions about the app:
- Email: [your-email@example.com]
- Restaurant: [restaurant-contact-info]

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
  - Menu browsing and search
  - User profile management
  - Onboarding flow
  - Database integration

---

**Note**: This app is part of the Meta Mobile Developer Program curriculum and serves as a demonstration of React Native development best practices. 
