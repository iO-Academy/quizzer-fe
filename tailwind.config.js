/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'bg-red-300',
        'hover:bg-red-400',
        'bg-green-300',
        'hover:bg-green-400',
        'brightness-75'
    ]
}