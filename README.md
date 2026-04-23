🚀 Frontend Wizards — Stage 2 Task

Invoice Management Application (React)


---

📌 Overview

This project is a fully functional Invoice Management Application built using React.
It is designed based on the provided Figma specification and demonstrates full CRUD functionality, state persistence, theme switching, and responsive UI design.

The application allows users to create, manage, filter, and track invoices while maintaining a clean and accessible user experience across devices.


---

🎯 Core Objective

Build a responsive invoice system that supports:

Create, Read, Update, Delete (CRUD) invoices

Save invoices as drafts

Mark invoices as paid

Filter invoices by status

Toggle light and dark mode

Fully responsive design (mobile, tablet, desktop)

Persistent state using Local Storage, IndexedDB, or backend API



---

🧾 Features

1. CRUD Functionality

Create Invoice

Open invoice form

Fill required fields

Save invoice as Draft or Pending


Read Invoice

View all invoices in a list

Click an invoice to view full details


Update Invoice

Edit existing invoice data

Changes are persisted immediately


Delete Invoice

Delete invoice with confirmation modal



---

2. Form Validation

All invoice forms include strict validation:

Required fields must be filled

Email must be valid format

At least one invoice item is required

Quantity and price must be positive numbers


Error Handling:

Inline error messages

Visual error states

Submission blocked if invalid



---

3. Invoice Status Workflow

Invoices support three states:

Draft

Pending

Paid


Rules:

Draft invoices can be edited freely

Pending invoices can be marked as Paid

Paid invoices cannot revert to Draft


UI Representation:

Status badges with distinct colors

Status visible in:

List view

Detail view




---

4. Filtering

Users can filter invoices by:

All

Draft

Pending

Paid


Requirements:

Instant UI updates on filter change

Clean empty state when no results match filter



---

5. Light & Dark Mode

Global theme toggle available

Theme persists using Local Storage

All components adapt dynamically

Maintains strong color contrast in both modes



---

6. Responsive Design

Fully responsive across:

📱 Mobile (320px+)

📟 Tablet (768px+)

💻 Desktop (1024px+)


Requirements:

Adaptive layouts

No horizontal scrolling

Mobile-friendly forms

Proper spacing and visual hierarchy



---

7. Interactive States

All interactive elements include hover/focus states:

Buttons

Links

Invoice items

Filters

Form inputs



---

🧠 Recommended Architecture

Suggested React structure:

src/
 ├── components/
 │    ├── InvoiceList
 │    ├── InvoiceDetail
 │    ├── InvoiceForm
 │    ├── StatusBadge
 │    ├── FilterPanel
 │    ├── Modal
 │
 ├── context/
 │    ├── ThemeContext
 │    ├── InvoiceContext
 │
 ├── hooks/
 ├── utils/
 ├── pages/
 ├── services/
 └── App.jsx

Key Design Patterns:

Context API for global state (theme + invoices)

Component-based architecture

Reusable UI components

Controlled form inputs



---

♿ Accessibility Requirements

This project follows WCAG AA standards:

Semantic HTML structure

Proper <label> usage for inputs

Buttons use <button> elements only

Keyboard navigation supported

Modal supports:

Focus trapping

ESC key close


High contrast in both themes



---

💾 Data Persistence

At least one of the following must be used:

Local Storage (recommended for simplicity)

IndexedDB

Backend API (Node.js / Express / Next.js API routes)



---

🧪 Acceptance Criteria

Your submission will be evaluated based on:

[x] Full CRUD functionality works correctly

[x] Form validation prevents invalid submissions

[x] Invoice status logic is correct

[x] Filtering works as expected

[x] Theme toggle persists across reload

[x] Fully responsive UI

[x] Clean and maintainable component structure

[x] No console errors

[x] Accessibility best practices implemented



--
⚙️ Setup Instructions (Example)

# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build


