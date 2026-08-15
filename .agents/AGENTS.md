# Project Tech Stack & 2026 Standards

## Core Stack

- **Framework**: Next.js (App Router, Server Actions)
- **Database / ORM**: Prisma (PostgreSQL / Relational)
- **State / Data Fetching**: TanStack React Query (`@tanstack/react-query`)
- **Forms**: TanStack React Form (`@tanstack/react-form`)
- **Styling**: Tailwind CSS, Shadcn UI (Radix primitives)
- **Package Manager / Runtime**: Bun

## 1. Always Use Bun

- **NEVER** use `npm`, `yarn`, or `pnpm`.
- Run scripts via `bun run <script>`.
- Add packages via `bun add <pkg>`.
- Run one-off commands via `bun x <cmd>` (e.g., `bun x eslint`, `bun x tsc --noEmit`).

## 2. Next.js & Server Actions

- Use Server Actions for data mutations. Place them in `src/actions/` categorized by domain (e.g., `src/actions/products/`).
- Ensure Server Actions are wrapped with `createSafeAction` or equivalent Zod-validated action wrappers for type safety and error boundary handling.
- Prefer React Query for client-side data fetching where caching, polling, or optimistic updates are necessary.

## 3. Prisma & Database Mutations

- Use Prisma nested writes (`create`, `update`, `upsert`, `deleteMany`) extensively to reduce roundtrips when dealing with complex relational models (e.g., Products and Variants).
- When writing schema migrations, use `bunx prisma migrate dev` or `bunx prisma db push` depending on the environment context.
- Always ensure `id` fields or `@unique` constraints are appropriately passed from the client when intending to use `upsert` in nested updates.

## 4. Modern React & Forms (TanStack)

- Utilize `@tanstack/react-form` for complex stateful forms. Leverage its type-safe nested array fields (e.g., handling Variant/Image arrays) instead of raw React state.
- Keep forms uncontrolled at the DOM level and leverage TanStack form APIs (`form.handleSubmit`, `form.Subscribe`, `field.state.value`).
- When uploading files, offload to Cloudinary securely using the server actions/API where applicable, but process the files asynchronously to prevent UI blocks.

## 5. TypeScript & Code Quality

- Strictly type all action payloads, Zod schemas, and Form States. Avoid `any`.
- If an agent generates or modifies code, it should proactively verify it by running `bun x tsc --noEmit` to catch type errors across the project.
- Use `HugeiconsIcon` or standardized icon sets consistently for the UI.

## 6. Pro-Level Agentic Behaviors

- **Verify before assumptions**: Do not guess database schema constraints (`Cascade` vs `Restrict`); always read `prisma/schema/*.prisma` first when modifying relations.
- **Fail gracefully**: When deleting relational entities, catch foreign key constraint failures or proactively check if dependents (like `OrderItems`) exist.
- **Minimalist Diffing**: Only modify what is strictly requested. Preserve unrelated code, docstrings, and imports.
