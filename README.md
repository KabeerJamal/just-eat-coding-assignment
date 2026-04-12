# Just-eat-coding-assignment


## Tech Stack

- **React** + **TypeScript** — UI and type safety
- **Vite** — development server and production builds
- **SCSS** — styling with CSS variables
- **Jest** + **React Testing Library** — unit and UI tests
- **Docker** + **Nginx** — containerised production build


## How To install and test

### Prerequisites

- **Local dev:** [Node.js LTS](https://nodejs.org) — installing Node also installs npm
- **Docker:** [https://docs.docker.com/desktop/install/](https://docs.docker.com/desktop/install/) (Mac, Windows, and Linux)

---

### 1. Clone the repo

```bash
git clone https://github.com/KabeerJamal/just-eat-coding-assignment.git
```

---

### 2. Run with Docker Compose *(recommended)*

From the project root:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). To stop:

```bash
docker compose down
```

---

### 3. Alternative: `docker run`

```bash
docker build -t just-eat-app .
docker run -d --name just-eat -p 3000:80 just-eat-app
```

Open [http://localhost:3000](http://localhost:3000). To stop:

```bash
docker stop just-eat && docker rm just-eat
```

---

### 4. Alternative: Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Hot reload is enabled.

---

### 5. Tests

```bash
npm install   # if not already done
npm test
```


## Tools used:


**TypeScript & React**:I chose **TypeScript** for its strict type safety, allowing me to define clear data contracts between the Just Eat API and my components, catching mismatches at compile time rather than runtime. I chose **React** over **Vanilla JS** because both plain approaches have drawbacks, directly manipulating the DOM is slow and gets messy fast, while re-rendering the entire page for every small change is wasteful. React solves both problems with its Virtual DOM, which figures out exactly what changed and updates only that part of the real DOM.

**Build and Test**:I used **Vite** for its fast build speeds and smooth developer experience. For testing, I chose **Jest and React Testing Library**, the industry standard for testing component behaviour over implementation details, giving confidence that the core requirements are working correctly.

**Containerization and Deployment**: To ensure reviewer can run the app instantly, I containerized the application using **Docker**. I implemented a multi-stage build to optimize the final image size by separating the build environment from the production runtime. The final stage utilizes **Nginx** to serve the production assets efficiently, ensuring a stable and performant environment that runs with a single `docker-compose up --build` command.

## Architecture and design choices:

I adopted a modular directory structure to enforce **Separation of Concerns**. By isolating the API layer, business logic (Services), and UI components, the codebase remains organized and easier to scale.

For data fetching, I implemented a centralized error-handling strategy using a custom **APIError class**. Moving away from returning plain objects to throwing class instances allows for more robust error catching and type-safety. 

Furthermore, I implemented a **request timeout** using an AbortController. This ensures the application remains resilient and provides immediate feedback to the user if the external API becomes unresponsive, rather than hanging the UI indefinitely.

<!-- **Data Safety**:The raw API response can contain missing or unexpected data. To protect against this, I created a clean data model (**RestaurantUI**) and mapped the API response through it before it ever reaches the UI, filling in safe fallbacks for anything missing. This means the UI always gets predictable, well-defined data and will never crash due to an undefined value. -->

**Rendering Optimisation**:I wrapped the static Header component in `React.memo` so it only renders once, since it has no props or state, re-rendering it every time App updates is unnecessary.

**Testing Strategy**:I used a **TDD** approach for the core data mapping logic. I first defined the data contracts (RestaurantAPIResponse and RestaurantUI) as TypeScript interfaces, then wrote tests against what the mapper should do,. covering edge cases like malformed responses, missing fields, and the 10-item limit; before writing the implementation itself. For the UI layer, I tested after building; since UI is iterative and visual, I waited until components were stable then added tests to verify each state (loading, success, error) renders correctly.

**Component Architecture**:I started with a single-file implementation for the UI to validate the core logic, then refactored into small, reusable components and a custom React hook. This keeps the codebase clean, modular, and easy to extend.

**Styling & User Experience**:I used **SCSS** with **CSS** Variables to keep colors and spacing consistent across the app, any global change requires updating a single value. I also added clear feedback states for loading, error, and empty results so the user always knows what's happening.

**Accessibility**:I used high-contrast colors for readability, ARIA labels for screen reader support, and ensured the layout is fully responsive across both desktop and mobile.


## Testing Strategy

I focused on real-world reliability, ensuring the app handles dirty or incomplete API data without crashing.

**Unit Testing, Data Logic**: I tested the mapping logic against the three most common API failure modes: missing fields (undefined), null values, and blank/empty data. I don not assume the API is perfect, the mapper is built to handle all of these gracefully.
**Service Integration**: I tested the service layer using `jest.fn()` to mock API calls, keeping tests fast and independent of a real network connection. This layer is the glue between the raw API and the UI, so verifying it end-to-end was important.

**UI Testing**: I covered three core scenarios:

- Happy path — 10 restaurant cards render correctly when data is returned
- Loading state — the loading message appears while the fetch is in progress
- Error state — a clear error message is shown if the API fails

## Assumptions and Clarifications


**Future Scalability**:I built the project assuming it should be easy to extend, using modular folders, reusable components, and centralised variables rather than hardcoded values. The goal was a professional, scalable structure without over-engineering for the current scope.

**API Data Reliability**:I assumed the API generally follows its documented format. While the mapper handles missing fields, nulls, and empty strings defensively, I trusted that basic data types (e.g. a name being a string and not some random object) would remain consistent.

**UK Postcode Validation**:Since the API only works for UK postcodes, I added frontend Regex validation before making any API call. This improves UX by giving instant feedback and avoids unnecessary network requests for invalid inputs.

**Professional Workflow**:I used a Git feature-branch workflow throughout. While unnecessary for a solo project, it reflects how I would work in a team, keeping a clean commit history and an organised approach to adding features.


## Trade Offs, Challeneges and Lesson learned


**Clarifying Requirements**:Working without a team meant making solo decisions on details like address formatting or zero-rating fallbacks. In a real project these would be answered by a Product Manager or Designer, here I made choices myself and moved forward.
**Handling Data Consistency**: One of the challenge was handling missing or null API data without polluting the UI with defensive checks. I solved this by centralising all the fallback logic in the data mapper, so React components always receive clean, predictable data. The trade-off was investing more time upfront in the data layer to keep the UI simple and crash-proof.
```typescript
export interface RestaurantUI {
    name: string;
    cuisines: string[];
    rating: number;
    address: {
        city: string;
        firstLine: string;
        postalCode: string;
    };
}
```

**Data Structure: Flattening vs. Flexibility**: I had to decide how much to flatten the API response. A fully flat structure (e.g. one combined address string) leads to very readable UI code but inflexible. I chose a balanced approach , removing deep nesting for safety while keeping key fields like city and postcode separate, preserving the flexibility to style them independently in the UI.

**Lessons Learnedm, Accessibility-First Design**: I initially used generic tags like <div> and focused on visual layout first, while I should have started with adding semantic HTML (<main>, <section>, <header>) and focusing on Accesbility from the start. Going forward I would plan the HTML structure for screen readers and keyboard users from the start, it leads to a cleaner, more inclusive codebase and is much easier than partly retrofitting accessibility at the end.


## Future improvements


**Reliability & Performance**: I would add retry logic for failed requests and a circuit breaker to protect the server under load. Caching popular postcode results would speed up repeat searches. If the 10-item limit were removed, list virtualization would ensure smooth rendering even with thousands of results.

**API Documentation**: I would use a tool like Swagger to create clear documentation for the API. This makes it much easier for other developers to understand and connect to the service in the future.

**Multi Language Suppport**: I would include Multi Language support to support Just eat global Customers

**Postcode Validation Tests**:I would add unit tests for the postcode regex, covering valid formats, invalid inputs, and edge cases like lowercase or extra spaces


## AI Usage & Learning

I used AI as a **technical mentor** during this project. Instead of asking for full solutions, I used it to:

- Get feedback on my architectural ideas and project structure.
- Clarify specific TypeScript syntax and best practices.
- Ask for 1-2 lines of code max if I was stuch somewhere.

This helped me learn modern standards while ensuring that 100% of the project's logic and structure are my own.

## Beyond the Code

While everyone uses `npm start`, I wanted to know the 'magic' inside it. I love making content and I am passionate about understanding how our tools work behind the scenes.  Hence I had created a deep-dive video explaining the mechanics of the npm start process: [Watch the deep-dive video](https://www.linkedin.com/posts/kabeer-jamal10a3b5229_npm-javascript-nodejs-activity-7411504795322048512-SS0l?utm_source=share&utm_medium=member_desktop&rcm=ACoAADkwkVoBbecfDIwfZRoDbI0irJ08w4eSSwU)

