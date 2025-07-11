# About

This is a private repository built for internal Skillable use by senior product designer Kim Oswalt (<kim.oswalt@skillable.com>). It's a working project with the goal of prototyping new experiences and preparing production-ready UI.

## 🎨 Design System

### Theme
- [X] Design token implementation for colors and typography in `app/theme` directory
- [X] Light / dark mode theme using Tailwind's class-based approach

### Component Library

- [X] Chip
- [X] Button
- [X] Split button
- [X] Menu
- [X] Primary navigation bar
- [X] Data table
- [X] Dashboard card
- [X] Basic dialog
- [X] Text field input
- [X] Switch
- [X] Tabs
- [X] Tooltip
- [X] Dropdown select
- [X] Checkbox item
- [X] Radio list
- [X] Stepper
- [X] Accordion
- [X] State toggle
- [X] Formatting toolbar
- [X] Advanced menu
- [X] Filter menu

> See `design-system-demo/page.tsx` for examples of completed components.

## 🖥️ Tech Stack

This project was built as a Next.js app using Tailwind and TypeScript. It's intended for use with Cursor using rules for new component creation and prototype development that live in the `.cursor/rules` directory. (Learn more about [Cursor rules here](https://docs.cursor.com/context/rules).)


## ✅ Getting Set Up

> Prereqs: Install [Cursor](https://cursor.com/en) and [GitHub Desktop](https://desktop.github.com/download/) on your local machine. If you haven't done development work before, you will need to install npm and Node.js by opening your terminal and running the command `npm install -g npm`. [Learn more](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

**Step 1. Fork repository**

Click "fork this repository" to create a copy in your own GitHub account.

**Step 2. Clone repository to your local machine**

Open GitHub Desktop and sign in to your account. Click "Add Repository" > "Clone Repository" and select the repository you cloned in Step 1. Choose the folder on your local machine where the files should be saved.

**Step 3. Install dependencies**

The repository should now appear in GitHub Desktop with an option to open in your preferred code editor (you may need to adjust the settings to change this to Cursor). Open the repository in Cursor, and from the terminal run the command `npm install` to install all necessary dependencies. You only need to do this the *first* time you open the cloned repository on your local machine.

**Step 4: Start the development server**

From your terminal, use the command `npm run dev` to start the development server. (You will do this every time you open the project.) Command + click the local host link that appears in the terminal to open the preview in your browser.

## 🛠️ Creating Prototypes

**Step 1: Add the "new prototype" rule**

In the chat panel on the right side of the screen, click the `@` symbol and choose the `.cursor/rules/new-prototype.mdc` file. (Remove any other files currently tagged in the context window.)

**Step 2: Describe your prototype**

In the chat box, tell Cursor what kind of prototype you want to build. You don't need to provide instructions on how to build it (that's already in the rules file we tagged in Step 1). Cursor will ask you a couple of clarifying questions. Once you've answered them, it will set up a new page with the prototype you requested.

**Step 3: Preview the prototype**

With your development server running, add `/` + `nameOfYourPrototypeFile` without any file extensions to your address bar. This should show you a preview of the page Cursor just created.

> If you have trouble getting the prototype to load, simply ask Cursor for help in the chat pane and it can point you in the right direction.

**Step 4: Iterate as needed!**

Feel free to continue the conversation with Cursor, tweaking as needed to achieve your intended result. If Cursor flagged the need for additional components, you can either:

1. Ask it to create something based on its best judgment
2. Create a mockup in Figma, copy it as a PNG, and paste that PNG into the chat window as a reference for Cursor to use in creating the component

**Step 5: Commit your changes**

When you're happy with your results, commit your changes in Cursor. Then, go back to GitHub Desktop and click "Push Origin" to push your commits to your GitHub repository.