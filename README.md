# Vocabularly

This repository contains the source code for the **Vocabularly** chrome extension project.

## Introduction

**Vocabularly** is a free chrome Extension aimed at providing a platform for learning new words and expanding your vocabulary. It utilizes modern web technologies and frameworks to create an interactive and user-friendly experience.

## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone <https://github.com/harlan-zhao/Vocabularly.git>
```

2. Navigate to the project directory:

```bash
cd vocabularly
```

3. Install the dependencies:

```bash
npm install
```

## Scripts

After installing the dependencies, you can use the following npm scripts:

- **dev**: Run the development server using Vite.
- **build**: Build the project for production.
- **lint**: Lint the project using ESLint.
- **preview**: Preview the production build locally.

## Load this chrome extension

- **Option One**: Install the extension from official[ google extensions store](https://chromewebstore.google.com/detail/vocabularly/gidmmcjapjgamldfiealojihhfeeeajg " google extensions store"): 
- **Option Two**:  Build project locally and load unpacked package in chrome browser(developer mode): 
   1.  Run `npm install`
   2. Run `npm run build`
   3. Load your `/dist` (`/dist` folder will appear at project's root after running  `npm run build` ) as as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked "unpacked extension")

## Development Dependencies

The project utilizes the following development dependencies:

- **typescript**: A superset of JavaScript that compiles to clean JavaScript output.
- **vite**: A build tool that aims to provide a faster and more efficient development experience.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.
icon
