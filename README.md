<<<<<<< HEAD
# InsideTechSoft MERN Website

React + Vite + Tailwind CSS frontend with an Express/MongoDB backend scaffold for contact and quote leads.

## Scripts

- `npm run dev` starts the Vite frontend.
- `npm run server` starts the Express API on port `5000`.
- `npm run dev:mern` starts frontend and backend together.
- `npm run build` creates the production frontend build.
- `npm run lint` checks frontend and backend JavaScript.

## Environment

Copy `.env.example` to `.env` and update values as needed:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/insidetechsoft
```

If `MONGODB_URI` is empty, the API still accepts form submissions and returns a response, but it will not persist them.

## Frontend Pages

- `/`
- `/about`
- `/services`
- `/services/software-development`
- `/our-team`
- `/faqs`
- `/contact`
- `/admin/login`
- `/admin/dashboard`

SEO-ready metadata is centralized in `src/data/siteData.js` and applied from `src/utils/seo.js`.

## Admin Panel

Start both frontend and backend:

```bash
npm run dev:mern
```

Open:

```text
http://localhost:5173/admin/login
```

Default development login:

```text
Email: admin@insidetechsoft.com
Password: admin123
```

Change these in `.env` with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

The admin panel can manage:

- Services
- Team members
- FAQs
- Stats
- Client reviews
- Recent contact leads

When `MONGODB_URI` is configured, admin changes and leads are saved to MongoDB. Without MongoDB, the API uses temporary in-memory data for development.

## MongoDB Collections

The application defines these Mongoose models in `server/src/models`:

- `users`: name, unique email, password, role, createdAt.
- `blogs`: title, unique slug, content, author reference to `users`, image, tags, createdAt, updatedAt.
- `contactQueries`: name, email, subject, message, createdAt.
- `newsletterSubscribers`: unique email, subscribedAt.
- `comments`: blogId reference to `blogs`, userName, comment, createdAt.

Relationships:

- `Blog.author` references `User`.
- `Comment.blogId` references `Blog`.
=======
# InsideTechsoft
this is general business informative website
>>>>>>> 7877383961cf3b757900d99f2bb168591f9bfaf1
