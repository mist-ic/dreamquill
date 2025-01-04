# DreamQuill - Interactive Story Creator

DreamQuill is an AI-powered interactive story generator that creates unique, branching narratives using Google's Gemini AI. Users can either generate random stories or provide custom prompts to create their own adventures.


## Features

- 🤖 AI-powered story generation using Google's Gemini API
- 🌳 Branching narrative paths with multiple choices
- 🌙 Dark/Light theme support
- 💾 Local progress saving
- 📑 PDF export functionality
- ♻️ Automatic retry mechanism for story generation
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Zustand (State Management)
- jsPDF (PDF Generation)

## Prerequisites

- Node.js 18 or higher
- A Google Gemini API key

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mist-ic/dreamquill.git
   cd dreamquill
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API and service integrations
├── stores/        # Zustand state management
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Features in Detail

### Story Generation
- Multiple retry attempts for reliable story generation
- Fallback to sample story if generation fails
- Support for both random and custom story prompts

### Story Navigation
- Branching paths with multiple choices
- Progress saving using localStorage
- Option to restart or generate new stories at endings

### Theme Support
- Dark and light mode support
- Persistent theme preference
- Smooth theme transitions

### PDF Export
- Export complete story with all paths
- Custom formatting and layout
- Includes story title and all choices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for story generation
- The React and Vite communities
- All contributors and users of DreamQuill

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.