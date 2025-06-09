# Fetch a Friend

A web app for finding dogs to adopt, built for the Fetch Frontend Challenge.

## What it does

This is basically a search interface for browsing adoptable dogs. You can filter by breed and age, save favorites, and get matched with a dog based on your preferences. The matching feature uses Fetch's algorithm to pick from your favorited dogs.

The main features:
- Login with name/email (for the API)
- Search and filter dogs by breed, age range, and sort order
- Paginated results (25 dogs per page)
- Heart dogs to add them to favorites
- Generate a match from your favorites
- Works on mobile

Extra features:
- Search for dogs near you
- Dark/light mode through sun/moon button
- Custom hooks for efficient state management
- Memoized filtering to prevent unnecessary re-renders
- Optimized pagination with smooth scrolling
- Loading states with toast notifications for user feedback
- Real-time favorites counter in sidebar & persistent favorites during session


## Running it locally

You'll need Node.js (18 or newer) and your preferred package manager.

```bash
# Clone and install
git clone [your-repo-url]
cd fetch-frontend-exercise
npm install

# Start dev server
npm run dev
```

Then go to http://localhost:3000

## How to use it

1. **Login** - Just enter any name and email, it's not doing real authentication
2. **Search** - Use the sidebar to filter by breed (type to search), age range, and sorting
3. **Browse** - Click through pages to see more dogs
4. **Favorite** - Click the heart on any dog card to save them
5. **Match** - Once you have some favorites, hit "Generate Match" to get your perfect dog

## Testing

This project includes proof of concept unit tests for BreedFilter component and useFilter custom hook:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Tech Stack
**Frontend:**
- Next.js 15 (with App Router)
- React 19
- TypeScript
- Tailwind CSS

**Components:**
- Radix UI for accessible primitives
- shadcn/ui for the component library
- Lucide for icons

**State:**
- React Context for auth
- Custom hooks for search/filters/favorites
- No external state management (kept it simple)

## Project structure

```
src/
├── app/                   # Next.js pages
├── components/
│   ├── search/           # Main search interface
│   │   └── filters/      # Broke down the filter sidebar into smaller components
│   ├── ui/               # Reusable UI components
│   └── auth/             # Login stuff
├── hooks/                # Custom hooks for business logic
├── services/             # API calls
├── types/                # TypeScript interfaces
└── contexts/             # React contexts
```

## Architecture decisions

**Custom hooks:** Pulled business logic out of components into hooks like `useSearch`, `useFilters`, and `useFavorites`. Makes testing easier and keeps components focused on rendering.

**API layer:** All the Fetch API calls are in a single service file. The API is pretty straightforward but I wanted to centralize the error handling and request setup.

**State management:** React state and context.

## Things I'd improve with more time

- **Interactive onboarding** - A guided tour for new users showing how to use the filters and favorites
- **Dog profile pages** - Click on a dog card to see a detailed view with more photos, personality traits, medical history, etc.
- **Location filtering** - Zip code filtering to find dogs near you
- **Post-match features** - After getting matched, add contact info for the shelter, save your matches, maybe even schedule visits
- **Additional accessibility** - Additional ARIA labels, reduced motion preferences
- **Testing coverage** - Additional extensive unit tests for hooks, integration tests for user flows, visual regression testing

