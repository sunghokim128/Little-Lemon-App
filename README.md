# Little Lemon Restaurant App
<img src="https://github.com/user-attachments/assets/4f120240-41d9-40b8-a720-5dfb1dd4b772" style="width: 300px; height: auto;" />  

<br>
<br>


## 🍋 About
This is a cross-platform React Native mobile application for Little Lemon, a family-owned Mediterranean restaurant. <br>
This mobile app provides customers with a smooth, responsive interface to explore the menu, manage their personal data, and access restaurant features—all with or without internet access.

<br>

## ✨ Features


### 🔐 Onboarding & Authentication

- Lightweight onboarding flow with name and email input  
- Real-time form validation with feedback  
- Auto-login and logout functionality using local flags  

<br>

<img src="https://github.com/user-attachments/assets/3f329ae8-37fc-407a-8ca7-5cff9a072a40" style="width: 300px; height: auto;" />  
<img src="https://github.com/user-attachments/assets/92979da5-90b1-490d-a12f-fcc0bdd98a4a" style="width: 300px; height: auto;" />  

<br>

### 🏠 Home Screen

- Browse menu items grouped by categories: Starters, Mains, Desserts  
- Real-time search with 500ms debouncing  
- Filter menu items by category with visual selection feedback  
- Local caching using SQLite for offline access  
- First-time fetch from remote API  
- Clean layout with responsive design  

<br>

<img src="https://github.com/user-attachments/assets/8597dc08-3fa4-47de-b74b-aaaea0353cd9" style="width: 300px; height: auto;" />  
<img src="https://github.com/user-attachments/assets/6b53838d-1cc8-4b0c-b618-1fe685ef798a" style="width: 300px; height: auto;" />  

<br>

### 👤 Profile Management

- Upload/change profile avatar using device image picker  
- Edit name, email, and phone number with live validation  
- Automatic US phone number formatting with input mask  
- Data persistence via AsyncStorage  

<br>

<img src="https://github.com/user-attachments/assets/5e920041-fedf-4908-ba32-e70522cab426" style="width: 300px; height: auto;" />  
<img src="https://github.com/user-attachments/assets/ed525050-595f-43b3-b7a0-e710851c34e1" style="width: 300px; height: auto;" />  

<br>

### 🔄 Navigation Flow
```
Splash Screen ➝ (If not onboarded) ➝ Onboarding ➝ Home ➝ Profile
```

### 📂 Data Persistence

- User profile (name, email, phone, avatar) stored in AsyncStorage  
- Menu data stored in SQLite  
- Initial data fetched from:  
  https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json  

<br>

## Wireframe
<img src="https://github.com/user-attachments/assets/d24f280c-0804-4f68-a8fc-fdca86f07d06" style="width: 500px; height: auto;" />  
Source: Meta React Native Course

<br>
<br>


## 🛠️ Tech Stack

| Tool                  | Purpose                             |
|-----------------------|-------------------------------------|
| React Native          | Cross-platform app development      |
| Expo SDK              | App runtime and development tooling |
| SQLite (expo-sqlite)  | Local database for menu items       |
| AsyncStorage          | Persistent local storage            |
| React Navigation      | Navigation between screens          |
| React Native Paper    | Material Design components          |
| Expo Image Picker     | Avatar photo selection              |
| react-native-mask-input | Phone number formatting           |

<br>

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
<br>

## 🗃️ Local Database Schema

**Table: menuitems**

| Field       | Type     | Description              |
|-------------|----------|--------------------------|
| id          | INTEGER  | Primary key              |
| name        | TEXT     | Menu item name           |
| price       | TEXT     | Price of item            |
| description | TEXT     | Item description         |
| image       | TEXT     | Image filename           |
| category    | TEXT     | starters / mains / desserts |

<br>

## ⚙️ Getting Started

### Prerequisites

- Node.js v16+  
- npm or yarn  
- Expo CLI (`npm install -g expo-cli`)  
- iOS Simulator or Android Emulator  

<br>

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
<br>
