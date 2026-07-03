# RxAngular: netidee Funding Project Summary & Roadmap

**Background & Goal:**
We have officially secured follow-up funding from **netidee** to ensure the sustainability of RxAngular and to significantly enhance its visibility and public utility. Our core mission remains the same: solving performance and UX issues in modern web applications. However, this phase focuses on making RxAngular even faster, more standard-compliant, and much easier to adopt for new developers.

Below is a breakdown of our direction, the concrete tasks we need to deliver, and how they map to our existing codebase.

---

## 🎯 Key Project Tasks

The funding project is divided into several main tasks:

### Documentation Overhaul & Best Practice Demos

**Goal:** Eliminate entry barriers and improve developer experience (DX).

- **Documentation Polishing:** Fundamentally rewrite and restructure existing developer and user documentation to be more approachable and understandable.
- **Best Practice Demos:** Create "Public Best Practices Demos" (similar to our Virtual Scrolling demo) that clearly highlight the benefits of RxAngular in real-world, practical scenarios.
- **Public API Refinement:** Continuously maintain and refine our API. This includes ongoing adaptations to new Angular versions and ensuring smooth integrations.

### "Instant Navigations" via Soft-LCP Optimization

**Goal:** Eliminate the noticeable delay when navigating between views in Single Page Applications.

- **Task:** Develop novel algorithms to intelligently preload content and orchestrate view transitions, minimizing load times and drastically improving runtime UX.

### Intelligent `esbuild` Bundle Optimizer

**Goal:** Address the code-splitting limitations of modern, fast build tools like `esbuild`.

- **Task:** Build an intelligent bundle-optimization algorithm that significantly improves code-splitting to reduce the size of the initial JavaScript payloads, thereby improving overall load times.

### Integration of Native Scheduling Techniques

**Goal:** Reduce RxAngular's code footprint and embrace web standards.

- **Task:** Modern browsers now offer highly efficient, native APIs for task prioritization (e.g., `scheduler.postTask`). We will refactor the core of RxAngular to leverage these native standards instead of relying purely on our custom runtime implementations.

### Visibility, Community & Advocacy

**Goal:** Grow the community and increase adoption.

- **Task:** Deliver talks and workshops at international conferences. Publish regular technical blog posts, practical use-cases, and maintain an active presence on X/Twitter and LinkedIn.
