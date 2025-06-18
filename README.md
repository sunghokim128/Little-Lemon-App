# Little Lemon Restaurant App

A React Native mobile application for the Little Lemon Mediterranean restaurant, featuring menu browsing, user profiles, and a modern dining experience.

## 🍋 About

Little Lemon is a family-owned Mediterranean restaurant focused on traditional recipes served with a modern twist. This mobile app provides customers with an intuitive way to browse the menu, manage their profile, and explore the restaurant's offerings.

## ✨ Features

### 🏠 Home Screen
- **Menu Display**: Browse restaurant menu items organized by categories (Starters, Mains, Desserts)
- **Search Functionality**: Real-time search with 500ms debouncing for optimal performance
- **Category Filtering**: Filter menu items by category with visual feedback
- **Database Integration**: SQLite local storage for offline menu access
- **API Integration**: Fetches menu data from external API on first load
- **Responsive Design**: Optimized layout with proper keyboard handling

### 👤 Profile Management
- **Avatar Management**: Upload and change profile pictures using device photo library
- **Personal Information**: Edit name, email, and phone number
- **Data Persistence**: All profile data saved locally using AsyncStorage
- **Form Validation**: Real-time validation for required fields
- **Phone Number Formatting**: Automatic US phone number formatting with mask

### 🔐 User Authentication
- **Onboarding Flow**: Simple registration with first name and email
- **Input Validation**: Real-time validation with visual feedback
- **Automatic Login**: Seamless transition between screens based on login status
- **Logout Functionality**: Clear all user data and return to onboarding

### 🎨 Design & UX
- **Consistent Theme**: Unified color scheme throughout the app
- **Modern UI**: Clean, intuitive interface using React Native Paper
- **Keyboard Handling**: Proper keyboard avoidance and dismissal
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **SQLite**: Local database for menu storage
- **AsyncStorage**: Local data persistence for user information
- **React Navigation**: Screen navigation and routing
- **React Native Paper**: Material Design components
- **Expo Image Picker**: Image selection for profile avatars
- **React Native Mask Input**: Input formatting for phone numbers

## 📱 Screenshots

### Home Screen
- Restaurant header with logo and profile navigation
- Introduction section with restaurant description
- Search bar with debounced input
- Category filter buttons
- Menu items displayed in grouped sections

### Profile Screen
- Avatar display with change/remove options
- Personal information form
- Phone number input with formatting
- Save/Discard/Logout action buttons

### Onboarding Screen
- App branding and welcome message
- First name and email input fields
- Real-time validation feedback
- Login button with conditional styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LittleLemon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## 📁 Project Structure

```
LittleLemon/
├── App.js                 # Main app component with navigation
├── screens/
│   ├── Home.js           # Main menu display screen
│   ├── Profile.js        # User profile management
│   ├── Onboarding.js     # User registration/login
│   └── Splash.js         # Loading screen
├── database.js           # SQLite database operations
├── assets/               # Images and static assets
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### Environment Setup

The app uses the following external services:
- **Menu API**: Fetches menu data from Meta's sample API
- **Image Storage**: Uses device's photo library for avatars

### Database Schema

The SQLite database includes a `menuitems` table with the following structure:
- `id`: Primary key
- `name`: Menu item name
- `price`: Item price
- `description`: Item description
- `image`: Image filename
- `category`: Item category (starters, mains, desserts)

## 🎯 Key Features Explained

### Search with Debouncing
The search functionality implements a 500ms debounce to prevent excessive database queries while the user is typing, ensuring smooth performance.

### Database Integration
- **First Load**: Fetches menu data from external API and stores in SQLite
- **Subsequent Loads**: Uses cached data from local database
- **Offline Support**: Menu items available without internet connection

### Navigation Flow
1. **Splash Screen**: Shows while checking login status
2. **Onboarding**: For new users or logged out users
3. **Home Screen**: Main app interface for logged-in users
4. **Profile Screen**: Accessible from home screen header

### Data Persistence
- **User Data**: Stored in AsyncStorage (first name, email, phone, avatar)
- **Menu Data**: Stored in SQLite database
- **Login State**: Managed through AsyncStorage flags

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
