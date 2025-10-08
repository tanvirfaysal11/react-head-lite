# 🧠 React Head Lite

A **lightweight alternative to React Helmet** — manage your document `<head>` tags declaratively in React, with no extra dependencies or overhead.

---

## 🚀 Features

✅ Supports all valid `<head>` tags:
- `<title>`
- `<base>`
- `<meta>`
- `<link>`
- `<script>`
- `<noscript>`
- `<style>`

✅ Supports attributes for `<html>`, `<body>`, and `<title>`  
✅ Tiny (~1 KB gzipped)  
✅ No runtime overhead  
✅ Compatible with React 17–19  

---

## 📦 Installation

```bash
npm install react-head-lite
# or
yarn add react-head-lite
```

---

## 🪄 Basic Example

```bash
import { ReactHead } from "react-head-lite";

export default function HomePage() {
  return (
    <>
      <ReactHead
        htmlAttributes={{ lang: "en" }}
        bodyAttributes={{ class: "dashboard-page" }}
        titleAttributes={{ id: "main-title" }}
      >
        <title>Home | MyApp</title>
        <meta name="description" content="Welcome to MyApp homepage" />
        <link rel="icon" href="/favicon.ico" />
      </ReactHead>

      <main>
        <h1>Welcome to MyApp</h1>
      </main>
    </>
  );
}

```

---

## 🧩 Result in Browser

```bash 
<html lang="en">
  <head>
    <title id="main-title">Home | MyApp</title>
    <meta name="description" content="Welcome to MyApp homepage" />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="dashboard-page">
    <h1>Welcome to MyApp</h1>
  </body>
</html>

```

---

## ⚙️ With React Router Example

```bash
import { ReactHead } from "react-head-lite";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <ReactHead>
      <title>{MyApp - ${location.pathname}}</title>
      <meta name="description" content="Dynamic SEO per route" />
    </ReactHead>
  );
}

```