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
@import 'tailwindcss';
```

Another small challenge was understanding how React, Vite, and Tailwind work together. React is responsible for building the UI using components, Vite handles the development server and build process, and Tailwind provides utility classes for styling.

To verify that everything was configured correctly, I added some Tailwind utility classes such as `text-3xl`, `font-bold`, `bg-slate-100`, and `text-blue-600` to a React component. After running:

```bash
npm run dev
```

I could see the styles applied in the browser, which confirmed that Tailwind was working correctly.

Overall, the setup was straightforward once I followed the documentation for the current versions. The main lesson for me was to check the official documentation instead of relying on older tutorials, especially for tools like Tailwind CSS where the setup process can change between major versions.

## What happens if we modify directly instead of using setState ?

In React, state should not be modified directly.

For example, if I have:

```js
const [count, setCount] = useState(0);
```

I should update it using:

```js
setCount(count + 1);
```

instead of trying to change the value directly.

React uses the state update function to know that the state has changed and that the component may need to render again. If state is changed directly, React may not detect the update correctly, so the UI may not display the latest value.

This becomes even more important when the state contains objects or arrays. Mutating them directly can lead to unexpected behavior because React often relies on changes in references to detect updates.

For example, instead of modifying an object directly:

```js
user.name = 'John';
```

it is better to create a new object through the state setter:

```js
setUser({
  ...user,
  name: 'John',
});
```

From this exercise, I learned that React state should be treated as read-only. I should always use the setter function provided by `useState` when I want to update a state value.

## Why are components important in React?

Components are important in React because they allow the user interface to be divided into smaller and reusable parts.

Instead of writing the whole UI in one large file, I can separate different parts of the application into components. For example, a button, navigation bar, form, or profile card can each have their own component.

This makes the code easier to read, maintain, and reuse. If the same UI element is needed in multiple places, I can use the same component instead of rewriting the same code.

Components can also receive data through props. In this exercise, the `HelloWorld` component receives a `name` prop, which allows the displayed value to change depending on what is passed to the component.

For example:

````jsx
<HelloWorld name="Cliff" />

## What are the advantages of using Tailwind CSS?

One advantage of Tailwind CSS is that it allows me to style components directly using utility classes without having to create a separate CSS class for every element.

For example, instead of creating custom CSS for a button, I can write:

```jsx
<button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
  Increment
</button>

````

## What are the advantages of using Tailwind CSS?

One advantage of Tailwind CSS is that it allows me to style components directly using utility classes without having to create a separate CSS class for every element.

For example, instead of creating custom CSS for a button, I can write:

```jsx
<button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
  Increment
</button>
```

## What are some potential pitfalls of using Tailwind CSS?

One potential pitfall of Tailwind CSS is that the `className` can become very long when a component has many styles. This can make JSX harder to read and maintain.

For example:

```jsx
className =
  'rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95 active:bg-blue-800';
```

## What are some common issues when working with lists in React?

One common issue when working with lists in React is forgetting to provide a unique `key` for each item rendered using `.map()`.

For example:

```jsx
items.map((item) => <li key={item.id}>{item.text}</li>);
```

## What are the advantages of client-side routing ?

The fundamentals of client-side routing are about letting a web application change pages or views without requesting a completely new HTML document from the server each time. This results in faster navigation and less full page reloads. While technically better for resources it is also beneficial for user experience having lower wait times and more responsive application

# Optimizing Performance with useMemo

# Why is useMemo useful ?
because it caches the result of an expensive calculation and process and only recalculates the process when a certain variable changes, reducing unecessary load during component rerendering
# How does useMemo improve performance?
useMemo caches the result of an expensive calculation and only recalculates it when its dependencies change, reducing unnecessary work during re-renders.
# When should you avoid using useMemo?
Avoid useMemo for simple or inexpensive calculations because memoization adds extra complexity and has its own small overhead.
# What happens if you remove useMemo from your implementation?
Without useMemo, the expensive calculation runs every time the component re-renders, even when the values it depends on have not changed.