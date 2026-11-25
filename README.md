# Chatllm

A cross-platform mobile and web LLM chat application built with React Native, Expo, and TypeScript.

## Features

- **Cross-Platform Support:** Runs on iOS, Android, and Web via Expo.
- **File-Based Routing:** Powered by Expo Router (`app/_layout.tsx` and `app/index.tsx`).
- **Type-Safe Codebase:** Written in TypeScript for better maintainability and developer experience.
- **Code Quality:** Configured with ESLint (`eslint.config.js`) for consistent formatting and linting.

## Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting:** [ESLint](https://eslint.org/)

## Project Structure

```text
Chatllm/
├── app/
│   ├── _layout.tsx        # Root navigation layout
│   └── index.tsx          # Main chat interface and LLM integration
├── assets/
│   └── images/            # App icons, splash screen, and logos
├── app.json               # Expo application configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS recommended)
- `npm` (comes with Node.js)
- [Expo Go](https://expo.dev/go) on your iOS/Android device, or a local Android Emulator / iOS Simulator

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ianchitdas/Chatllm.git
   cd Chatllm
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your LLM provider API key (update the variable name if your code uses a different one):

   ```env
   EXPO_PUBLIC_API_KEY=your_api_key_here
   ```

### Running the App

Start the Expo development server:

```bash
npx expo start
```

From the interactive terminal menu, you can:

- Press `a` to launch on an **Android emulator**
- Press `i` to launch on an **iOS simulator**
- Press `w` to open in a **web browser**
- Scan the QR code with the **Expo Go** app to run on a physical device

## Scripts

Commonly used commands for development:

- `npx expo start` — Start the development server
- `npx expo lint` — Run ESLint to check for code issues

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/ianchitdas/Chatllm).

## License

This project is open source and available under the [MIT License](LICENSE).
