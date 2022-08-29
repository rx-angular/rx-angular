# Contributing to RxAngular

We would love for you to contribute to RxAngular and help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow:

- [Developing](#developing)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Coding Rules](#rules)

## <a name="developing"></a> Developing

Start by installing all dependencies (we're using Yarn):

```sh
yarn
```

You can start developing and then run tests for the affected target:

```sh
yarn nx affected:test
```

Either you can run all tests for all targets:

```sh
yarn nx run-many --all --target=test
```

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by submitting an issue to our [GitHub Repository](https://github.com/rx-angular/rx-angular).
Even better, you can submit a Pull Request with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by submitting an issue to our GitHub Repository.
If you would like to _implement_ a new feature, please consider the size of the change in order to determine the right steps to proceed:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

- **Small Features** can be crafted and directly submitted as a Pull Request.

## <a name="commit"></a> Commit Message Format

We have very precise rules over how our Git commit messages must be formatted.
This format leads to **easier to read commit history**.

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-header) format.

The `body` is mandatory for all commits except for those of type "docs".
When the body is present it must be at least 20 characters long and must conform to the [Commit Message Body](#commit-body) format.

The `footer` is optional. The [Commit Message Footer](#commit-footer) format describes what the footer is used for and the structure it must have.

Any line of the commit message cannot be longer than 100 characters.

#### <a name="commit-header"></a>Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: cdk|template|state|docs|demos|schematics|ci
  │
  └─⫸ Commit Type: fix|feat|perf|docs|refactor|test|chore
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

##### Type

Must be one of the following:

- **fix**: A bug fix
- **feat**: A new feature
- **perf**: A code change that improves performance
- **docs**: Documentation only changes
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to our CI configuration files and scripts

##### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- `cdk`
- `template`
- `state`
- `docs`
- `demos`
- `schematics`
- `ci`
