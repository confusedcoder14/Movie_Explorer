# Movie Explorer (React)

A modern React application for exploring movies using the OMDB API. Search for movies, view detailed information, and save your favorites.

## Features

- 🔍 Search movies by title
- 📱 Responsive design
- ❤️ Save favorite movies
- 🎬 Detailed movie information
- 🌙 Dark theme
- ⚡ Fast and modern UI

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Firebase** - Favorites storage
- **OMDB API** - Movie data

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Movie_Explorer
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Get an OMDB API key:

   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Sign up for a free API key
   - Add your API key to the `.env` file:

   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API
├── types/         # TypeScript type definitions
└── app/           # Global styles and assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
