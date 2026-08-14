# React Fundamentals Reflection

## What challenges did you face during setup?

The main challenge I faced during the setup was making sure that I was following the correct Tailwind CSS installation steps for the current version.

There are many tutorials online that use older versions of Tailwind CSS. Some of them use commands such as:

```bash
npx tailwindcss init -p
```

and require a `tailwind.config.js` file with the `@tailwind base`, `@tailwind components`, and `@tailwind utilities` directives.

However, the current Tailwind CSS setup with Vite is simpler. I only needed to install `tailwindcss` and `@tailwindcss/vite`, add the Tailwind plugin to the Vite configuration, and import Tailwind using:

```css
@import "tailwindcss";
```

Another small challenge was understanding how React, Vite, and Tailwind work together. React is responsible for building the UI using components, Vite handles the development server and build process, and Tailwind provides utility classes for styling.

To verify that everything was configured correctly, I added some Tailwind utility classes such as `text-3xl`, `font-bold`, `bg-slate-100`, and `text-blue-600` to a React component. After running:

```bash
npm run dev
```

I could see the styles applied in the browser, which confirmed that Tailwind was working correctly.

Overall, the setup was straightforward once I followed the documentation for the current versions. The main lesson for me was to check the official documentation instead of relying on older tutorials, especially for tools like Tailwind CSS where the setup process can change between major versions.
