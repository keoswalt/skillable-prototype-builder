
# 🧪 Nx Migration Guide: skillable-prototypes → Nx Workspace

This document outlines how to convert the standalone `skillable-prototypes` React/Next.js app into a structured **Nx workspace**, extract a design system component library, and align with the larger engineering ecosystem.

---

## 📦 Goal

Refactor the project into an Nx monorepo with:

```
my-nx-workspace/
├── apps/
│   └── skillable-prototypes/         # Your current Next.js app
├── libs/
│   └── design-system/                # Vite-based design system library
│       ├── components/               # UI components
│       ├── hooks/                    # Shared hooks
│       ├── utils/                    # Shared utilities
│       ├── types/                    # TypeScript types
│       └── tokens/                   # Design tokens
├── tools/                            # Build tools and scripts
└── docs/                             # Documentation
```

---

## 🔍 Pre-Migration Analysis & Preparation

### Step 0.1: Current State Audit

**Dependency Analysis:**
```bash
# Analyze current dependencies
npm ls --depth=0
npm audit
```

**Results:**
- Large number of extraneous packages detected in `node_modules`, indicating potential sync issues with `package.json`
- Two security vulnerabilities found: one low severity (@eslint/plugin-kit), one high severity (linkifyjs)
- Recommendation: Run `npm audit fix` before proceeding with migration

**Component Inventory:**
- [x] Identify components suitable for library extraction
  - **UI Components:** buttons, cards, inputs, navigation, dialogs, dividers, info components, content components
  - **Data Components:** DataTable, TableContent, TableFooter, TabNavigation
  - **Dashboard Components:** DashboardGrid, DashboardHeader, FilterControls, PaginationControls, SortControls
  - **Editor Components:** RichTextEditor, FormattingToolbar, InstructionsEditor components
  - **Menu Components:** AdvancedMenu, FilterMenu, UserMenu
  - **UI State Components:** EmptyState, ErrorState, LoadingState, LoadingSpinner
- [x] Document component dependencies and relationships
  - Components follow consistent pattern with Example components for documentation
  - Shared dependencies on React, TypeScript, Tailwind CSS
  - TipTap editor components for rich text editing
- [x] Map shared utilities and hooks
  - **Hooks:** useCSVData, useDashboardState, useDataTransformation, useFiltering, useLocalStorage, usePagination, useSorting, useTabManagement, useToast
  - **Utils:** csvParser, dataTransformers, sortingUtils, typeGuards
- [x] Identify TypeScript types that should be shared
  - **Types:** csv.ts, dashboard.ts, errors.ts, generic.ts, sorting.ts

**Build & Deploy Documentation:**
- [x] Document current build process
  - Standard Next.js build process with `next build` and `next dev`
  - PostCSS with Tailwind CSS and Autoprefixer
  - TypeScript compilation with strict mode enabled
- [x] Document deployment pipeline
  - Standard Next.js deployment scripts (`next start`)
  - No specific CI/CD pipeline documented
- [x] Document environment variables and configuration
  - **Next.js Config:** Basic configuration with ESLint ignored during builds
  - **Tailwind Config:** Extensive design token system using CSS variables
  - **TypeScript Config:** Path alias `@/*` pointing to `./src/*`
  - **ESLint Config:** Next.js core web vitals and TypeScript rules
  - **PostCSS Config:** Tailwind CSS and Autoprefixer plugins
- [x] Document current performance metrics
  - No performance metrics currently being tracked
  - Recommendation: Establish baseline metrics before migration

### Step 0.2: Pre-Migration Checklist

- [x] **Backup Strategy**: Create a backup branch of current working state (`backup/pre-nx-migration`)
- [x] **Dependency Audit**: Identify shared vs app-specific dependencies
  - **Shared Dependencies:** `react`, `react-dom`, `typescript`, `tailwindcss`, `lucide-react`, `react-icons`
  - **App-Specific Dependencies:** `next`, `@tiptap/*`, `papaparse`, `tippy.js`
  - **Shared Dev Dependencies:** `eslint`, `@types/node`, `@types/react`, `@types/react-dom`, `autoprefixer`, `postcss`, `typescript`
  - **App-Specific Dev Dependencies:** `eslint-config-next`, `@tailwindcss/typography`, `@types/papaparse`
- [x] **Component Categorization**: Based on the component inventory from Step 0.1, all reusable components, hooks, utils, and types will be moved to a `design-system` library. App-specific components will remain in the `skillable-prototypes` app.
- [x] **Environment Planning**: Implement a standard environment variable strategy using `.env` files for `development`, `production`, and `local` environments. All environment variables will be prefixed with `NEXT_PUBLIC_` for client-side access.
- [x] **Team Coordination**: The migration timeline and plan will be communicated to the team before starting the migration.
- [x] **Testing Strategy**: Implement a comprehensive testing strategy:
  - **Unit Testing:** Use Vitest for unit testing all components and utilities in the `design-system` library.
  - **Integration Testing:** Use Playwright for end-to-end testing of the `skillable-prototypes` application.
  - **Storybook:** Use Storybook for visual regression testing and documentation of all `design-system` components.

### Step 0.3: Workspace Naming & Structure

**Recommended Naming Convention:**
```
@skillable/design-system      # Comprehensive design system library
@skillable/prototypes         # Main app
```
**Status:** The recommended naming convention has been reviewed and accepted. We will proceed with these names for the new packages.

---

## 🛠️ Step 1: Create an Nx Workspace

### Option A (recommended): Initialize a fresh workspace and move code into it

```bash
npx create-nx-workspace@latest skillable-nx --preset=next
```

Choose:
- **Integrated Monorepo**
- **React with Next.js**
- **TypeScript** (strict mode)
- **ESLint** for linting
- **Prettier** for formatting

Once scaffolded, delete the default app (you'll replace it).

### Option B (advanced): Convert in-place

If you want to convert your current repo in-place:

```bash
npx nx init
```

> **Warning**: This approach requires more manual configuration and cleanup.

**Status:** Nx workspace initialized in-place by manually adding `nx.json`, installing Nx packages, and creating `tsconfig.base.json`. Root `package.json` scripts updated to use Nx commands.

---

## 📁 Step 2: Dependency Management Strategy

### Step 2.1: Analyze and Categorize Dependencies ✅ Completed

**Actual dependency buckets:**
```json
{
  "shared": ["react", "react-dom", "typescript", "tailwindcss", "lucide-react", "react-icons"],
  "app-specific": ["next", "@tiptap/*", "papaparse", "tippy.js"],
  "dev-shared": ["eslint", "@types/node", "@types/react", "@types/react-dom", "autoprefixer", "postcss", "typescript"],
  "dev-app": ["eslint-config-next", "@tailwindcss/typography", "@types/papaparse"]
}
```

### Step 2.2: Update Root package.json  ✅ Completed

```json
{
  "name": "skillable-nx",
  "private": true,
  "scripts": {
    "build": "nx run-many --target=build",
    "test": "nx run-many --target=test",
    "lint": "nx run-many --target=lint",
    "format": "nx format:write",
    "affected:build": "nx affected:build",
    "affected:test": "nx affected:test"
  },
  "devDependencies": {
    "@nx/next": "latest",
    "@nx/vite": "latest",
    "@nx/eslint-plugin": "latest",
    "@nx/workspace": "latest",
    "nx": "latest"
  }
}
```

### Step 2.3: Configure Nx Workspace  ✅ Completed

**nx.json configuration:**
```json
{
  "extends": "nx/presets/npm.json",
  "affected": {
    "defaultBase": "main"
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## 🏗️ Step 3: Move Your App to `apps/skillable-prototypes`

### Step 3.1: File Migration  ✅ Completed (root `src/` and `public/` moved, duplicates removed)

Move all your app files to:
```
apps/skillable-prototypes/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # App-specific components
│   ├── hooks/                  # App-specific hooks
│   ├── utils/                  # App-specific utilities
│   └── types/                  # App-specific types
├── public/                     # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── project.json               # Nx project configuration
```

### Step 3.2: Configuration Migration  ✅ Completed (project.json added, tsconfig moved & extends root, path aliases updated)

**Update `apps/skillable-prototypes/project.json`:**
```json
{
  "name": "skillable-prototypes",
  "projectType": "application",
  "sourceRoot": "apps/skillable-prototypes/src",
  "targets": {
    "build": {
      "executor": "@nx/next:build",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "root": "apps/skillable-prototypes",
        "outputPath": "dist/apps/skillable-prototypes"
      }
    },
    "serve": {
      "executor": "@nx/next:server",
      "defaultConfiguration": "development",
      "options": {
        "buildTarget": "skillable-prototypes:build",
        "dev": true
      },
      "configurations": {
        "development": {
          "buildTarget": "skillable-prototypes:build:development",
          "dev": true
        },
        "production": {
          "buildTarget": "skillable-prototypes:build:production",
          "dev": false
        }
      }
    },
    "export": {
      "executor": "@nx/next:export",
      "options": {
        "buildTarget": "skillable-prototypes:build:production"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"]
    }
  },
  "tags": ["scope:prototypes", "type:app"]
}
```

### Step 3.3: Environment Configuration  ✅ Completed (configs moved, next.config wrapped withNx)

**Create environment-specific configs:**
```bash
# apps/skillable-prototypes/
.env.local
.env.development
.env.production
```

**Update Next.js config for Nx:**
```typescript
// apps/skillable-prototypes/next.config.ts
import { withNx } from '@nx/next/plugins/with-nx';

const nextConfig = {
  nx: {
    svgr: false,
  },
  // Your existing Next.js config
};

export default withNx(nextConfig);
```

---

## 🎨 Step 4: Generate Design System Library

### Step 4.1: Create Design System Library

```bash
nx generate @nx/vite:library design-system --directory=libs/design-system --importPath=@skillable/design-system
```

**Configure the library for comprehensive design system development:**
```json
// libs/design-system/project.json
{
  "name": "design-system",
  "projectType": "library",
  "sourceRoot": "libs/design-system/src",
  "targets": {
    "build": {
      "executor": "@nx/vite:build",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/design-system"
      }
    },
    "test": {
      "executor": "@nx/vite:test",
      "outputs": ["{options.reportsDirectory}"],
      "options": {
        "reportsDirectory": "../../coverage/libs/design-system"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"]
    },
    "storybook": {
      "executor": "@nx/storybook:storybook",
      "options": {
        "port": 4400
      }
    },
    "build-storybook": {
      "executor": "@nx/storybook:build",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/storybook/design-system"
      }
    }
  },
  "tags": ["scope:shared", "type:design-system"]
}
```

### Step 4.2: Design System Structure

Create the following directory structure within the design system library:

```bash
libs/design-system/
├── src/
│   ├── components/           # UI components
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── inputs/
│   │   ├── navigation/
│   │   └── index.ts
│   ├── hooks/               # Shared React hooks
│   │   ├── useToast.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── csvParser.ts
│   │   ├── dataTransformers.ts
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── dashboard.ts
│   │   ├── csv.ts
│   │   └── index.ts
│   ├── tokens/              # Design tokens (colors, spacing, etc.)
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── index.ts             # Main export file
├── stories/                 # Storybook stories
├── tests/                   # Test files
└── README.md
```

---

## 🔄 Step 5: Component Migration Strategy

### Step 5.1: Incremental Migration Approach

**Phase 1: Foundation Components**
- [ ] Button components
- [ ] Input components
- [ ] Card components
- [ ] Basic layout components

**Phase 2: Complex Components**
- [ ] Data table components
- [ ] Navigation components
- [ ] Dialog components
- [ ] Form components

**Phase 3: Specialized Components**
- [ ] Dashboard-specific components
- [ ] Editor components
- [ ] Chart components

### Step 5.2: Component Migration Process

For each component:

1. **Analyze dependencies**
2. **Move to appropriate library**
3. **Update imports**
4. **Add to library exports**
5. **Update app imports**
6. **Test functionality**
7. **Update documentation**

**Example migration:**
```bash
# Move Button component
mv src/components/buttons/Button.tsx libs/design-system/src/components/buttons/
mv src/components/buttons/ButtonExample.tsx libs/design-system/src/components/buttons/

# Update exports
echo "export * from './components/buttons/Button';" >> libs/design-system/src/components/index.ts
echo "export * from './components';" >> libs/design-system/src/index.ts

# Update app imports
# Replace: import { Button } from '@/components/buttons/Button';
# With: import { Button } from '@skillable/design-system';
```

---

## 🧪 Step 6: Testing Strategy

### Step 6.1: Unit Testing Setup

**Configure Vitest for the design system library:**
```typescript
// libs/design-system/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  plugins: [react(), nxViteTsPaths()],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SkillableDesignSystem',
      fileName: 'skillable-design-system',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### Step 6.2: Integration Testing

**Configure Playwright for E2E:**
```bash
nx generate @nx/playwright:configuration skillable-prototypes
```

### Step 6.3: Test Data Management

**Create shared test utilities:**
```typescript
// libs/design-system/src/utils/test-utils.ts
export const createMockData = () => {
  // Shared test data creation
};

export const renderWithProviders = (ui: React.ReactElement) => {
  // Test renderer with design system providers
};
```

---

## 📚 Step 7: Documentation & Storybook

### Step 7.1: Storybook Setup

```bash
nx generate @nx/storybook:configuration design-system
```

**Configure Storybook for design system documentation:**
```typescript
// libs/design-system/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
```

### Step 7.2: Design System Documentation

**Create design system documentation structure:**
```
libs/design-system/
├── src/
│   ├── components/
│   │   ├── buttons/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.test.tsx
│   │   └── index.ts
│   ├── tokens/
│   │   ├── colors.stories.tsx
│   │   ├── typography.stories.tsx
│   │   └── spacing.stories.tsx
│   └── index.ts
├── stories/
│   ├── Introduction.stories.mdx
│   └── DesignTokens.stories.mdx
└── README.md
```

---

## 🔗 Step 8: TypeScript Configuration

### Step 8.1: Update tsconfig.base.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@skillable/design-system": ["libs/design-system/src/index.ts"]
    }
  },
  "exclude": ["node_modules", "tmp"]
}
```

### Step 8.2: Project-specific tsconfig.json

**For each library:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]
}
```

---

## 🚀 Step 9: Build & Development Optimization

### Step 9.1: Development Server Configuration

**Configure for hot reload:**
```json
// apps/skillable-prototypes/project.json
{
  "targets": {
    "serve": {
      "executor": "@nx/next:server",
      "options": {
        "buildTarget": "skillable-prototypes:build",
        "dev": true,
        "port": 4200
      }
    }
  }
}
```

### Step 9.2: Build Optimization

**Configure build caching:**
```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "parallel": 3
      }
    }
  }
}
```

---

## ✅ Step 10: Post-Migration Validation

### Step 10.1: Functional Validation

- [ ] **App Functionality**: All existing features work correctly
- [ ] **Component Library**: Components render and function properly
- [ ] **Import Resolution**: All imports resolve correctly
- [ ] **TypeScript Compilation**: No type errors
- [ ] **Build Process**: Both app and libraries build successfully
- [ ] **Development Server**: Hot reload works for both app and libraries

### Step 10.2: Performance Validation

- [ ] **Build Times**: Build times are acceptable or improved
- [ ] **Bundle Size**: Bundle sizes are optimized
- [ ] **Development Experience**: Fast refresh and hot reload work
- [ ] **Caching**: Nx caching is working effectively

### Step 10.3: Testing Validation

- [ ] **Unit Tests**: All tests pass
- [ ] **Integration Tests**: E2E tests pass
- [ ] **Storybook**: Component stories render correctly
- [ ] **Linting**: ESLint passes across all projects

### Step 10.4: Documentation Validation

- [ ] **README**: Updated with new development workflow
- [ ] **Component Docs**: Storybook documentation is complete
- [ ] **API Docs**: Library exports are documented
- [ ] **Migration Guide**: Team can follow the new workflow

---

## 🧰 Essential Nx Commands

```bash
# Development
nx serve skillable-prototypes                 # Run the Next.js app
nx serve design-system                        # Run Storybook for design system
nx build design-system                       # Build the design system library

# Testing
nx test design-system                        # Run unit tests
nx e2e skillable-prototypes                  # Run E2E tests

# Analysis
nx graph                                     # View project dependency graph
nx affected:build                            # Build only affected projects
nx affected:test                             # Test only affected projects

# Maintenance
nx format:write                              # Format all code
nx lint skillable-prototypes                 # Lint specific project
nx run-many --target=lint                    # Lint all projects
```

---

## 🔄 Rollback Strategy

### If Migration Fails:

1. **Immediate Rollback**: Switch back to backup branch
2. **Incremental Rollback**: Revert specific steps that caused issues
3. **Partial Migration**: Keep working parts, revert problematic sections

### Backup Commands:
```bash
# Create backup before starting
git checkout -b backup/pre-nx-migration
git push origin backup/pre-nx-migration

# If rollback needed
git checkout backup/pre-nx-migration
git checkout -b main
git push origin main --force
```

---

## 📈 Performance Monitoring

### Step 11.1: Before/After Metrics

**Track these metrics:**
- Build time (cold and incremental)
- Bundle size
- Development server startup time
- Hot reload performance
- Memory usage

### Step 11.2: Continuous Monitoring

**Set up monitoring:**
```bash
# Bundle analysis
nx build skillable-prototypes --analyze

# Performance profiling
nx serve skillable-prototypes --profile
```

---

## 🎯 Next Steps & Future Enhancements

### Phase 1 (Immediate):
- [ ] Set up CI/CD pipeline for Nx
- [ ] Configure nx-cloud for distributed caching
- [ ] Add code ownership and tagging
- [ ] Set up automated testing in CI

### Phase 2 (Short-term):
- [ ] Add more specialized components (forms, charts, etc.)
- [ ] Implement design tokens system within the library
- [ ] Add component testing with Testing Library
- [ ] Set up automated accessibility testing
- [ ] Create component playground and examples

### Phase 3 (Long-term):
- [ ] Micro-frontend architecture consideration
- [ ] Advanced caching strategies
- [ ] Performance optimization
- [ ] Advanced build configurations

---

## 🧠 Why This Matters

This structure provides:
- **Scalability**: Easy to add new apps and extend the design system
- **Reusability**: All design system elements (components, hooks, utils, types) in one library
- **Performance**: Incremental builds and intelligent caching
- **Developer Experience**: Fast feedback loops and hot reload
- **Maintainability**: Clear separation of concerns within a unified design system
- **Testing**: Isolated testing of design system elements
- **Documentation**: Centralized design system documentation with Storybook
- **Team Collaboration**: Clear ownership and contribution guidelines
- **Consistency**: Single source of truth for all design system elements

---

## 🆘 Troubleshooting Guide

### Common Issues:

**Import Resolution Problems:**
```bash
# Clear Nx cache
nx reset
# Rebuild
nx build skillable-prototypes
```

**TypeScript Path Issues:**
```bash
# Regenerate TypeScript config
nx generate @nx/js:library ui-components --dry-run
```

**Build Cache Issues:**
```bash
# Clear build cache
nx reset
# Rebuild everything
nx run-many --target=build --all
```

**Hot Reload Not Working:**
- Check that `dev: true` is set in serve configuration
- Verify port conflicts
- Check file watching limits on your OS

---

This comprehensive migration plan ensures a smooth transition to Nx while maintaining all existing functionality and improving the overall development experience.
