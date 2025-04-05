# GitHub User Explorer 🚀

A React Native application built with Expo that allows you to explore GitHub users, view their profiles, and manage your favorites. The app showcases modern React Native development practices, clean architecture, and a polished user interface.

## Features ✨

- Browse GitHub users
- Search users by username
- View detailed user profiles including:
  - Profile picture and bio
  - Location, email, and blog information
  - Follower and repository statistics
- Add/remove users to favorites
- Persistent favorites storage

## Tech Stack 🛠️

- **Framework**: [Expo](https://expo.dev) with React Native
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query](https://tanstack.com/query)
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper
- **Icons**: Expo Vector Icons
- **Storage**: AsyncStorage for persistence
- **API**: GitHub REST API

## Getting Started 🚀

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd github-user-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical devices

## Project Structure 📁

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen components
├── navigation/      # Navigation configuration
├── services/        # API and external services
├── hooks/           # Custom React hooks
├── store/           # Global state management
├── types/           # TypeScript type definitions
├── theme/           # Theme and styling constants
├── i18n/            # Internationalization configuration
└── __tests__/       # Test suites
```

## Code Style and Best Practices 💅

- TypeScript for type safety
- Component-based architecture
- Custom hooks for business logic
- Clean code principles

## Internationalization (i18n) 🌍

The app uses `react-i18next` for internationalization, supporting multiple languages:

- Centralized translation management
- Easy language switching
- Support for English (en) and Spanish (es)
- Dynamic translation interpolation

### Key Features
- Language-specific JSON files in `i18n/locales/`
- Automatic language detection
- Fallback language support

## Testing 🧪

The project uses a comprehensive testing strategy:

### Testing Tools
- Jest for unit and integration testing
- React Native Testing Library for component testing


### Running Tests
```bash
# Run all tests
npm test
```