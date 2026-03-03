# Fenrir Security UI

A frontend demo for a cybersecurity scanning workflow built with React + Vite + TailwindCSS.

It includes:
- Signup and Login screens
- Dashboard with search, filters, column presets, pagination, and loading states
- Scan detail view with live-console style logs and findings
- Dark/light theme toggle
- Reusable UI components (buttons, badges, chips, skeleton loaders)

## Tech Stack

- React
- React Router
- Tailwind CSS
- Lucide Icons
- Vite

## Run Locally using

npm install
npm run dev


Open: `http://localhost:5173`


## Project Structure (quick view)

```
src/
  app/            # routes
  components/     # layout + reusable UI
  context/        # theme context
  data/           # mock scan data
  pages/          # Signup, Login, Dashboard, ScanDetail
```

## Notes

- This project currently uses mock data from `src/data/data.js`.
- Dashboard entry loader is triggered when navigating from Signup/Login.

Webapp deployed at: https://fenrir-security.netlify.app/


