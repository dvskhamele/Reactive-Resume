# Contributing to Reactive Resume

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Reactive Resume, which is hosted in the [Signimus Technologies Organization](https://github.com/signimus-tech) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [support@signimus.com](mailto:support@signimus.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Reactive Resume. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/signimus-tech/Signimus-Resume-Creator/issues/new?assignees=&labels=bug&template=bug_report.md&title=), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Check the [documentation](https://readylaunch.signimus.com/docs)** for a list of common questions and problems.
* **Perform a [cursory search](https://github.com/signimus-tech/Reactive-Resume/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined the repository your bug is related to, create an issue on that repository and provide the following information by filling in [the template](https://github.com/signimus-tech/Reactive-Resume/issues/new?assignees=&labels=bug&template=bug_report.md&title=).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started Reactive Resume, e.g. which command exactly you used in the terminal, or how you started Reactive Resume otherwise. When listing steps, **don't just say what you did, but explain how you did it**.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version of Reactive Resume) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of Reactive Resume?** What's the most recent version in which the problem doesn't happen? You can download older versions of Reactive Resume from [the releases page](https://github.com/signimus-tech/Reactive-Resume/releases).
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of Reactive Resume are you using?** You can get the exact version by looking at the bottom of the settings page in the app.
* **What's the name and version of the OS you're using**?
* **Are you running Reactive Resume in a virtual machine?** If so, which VM software are you using and which operating systems and versions are used for the host and the guest?
* **Which [packages](https://readylaunch.signimus.com/docs/overview/packages) are you using?**

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Reactive Resume, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/signimus-tech/Reactive-Resume/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

* **Check the [documentation](https://readylaunch.signimus.com/docs)** for a list of common questions and problems.
* **Perform a [cursory search](https://github.com/signimus-tech/Reactive-Resume/issues)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined the repository your enhancement suggestion is related to, create an issue on that repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Reactive Resume which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most Reactive Resume users and isn't something that can or should be implemented as a community package.
* **Specify which version of Reactive Resume you're using.** You can get the exact version by looking at the bottom of the settings page in the app.
* **Specify the name and version of the OS you're using.**

### Your First Code Contribution

Unsure where to begin contributing to Reactive Resume? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

Reactive Resume can be developed locally. For instructions on how to do this, see the [documentation](https://readylaunch.signimus.com/docs/self-hosting/installation).

### Pull Requests

The process described here has several goals:

- Maintain Reactive Resume's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible Reactive Resume
- Enable a sustainable system for Reactive Resume's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript/TypeScript Styleguide

All JavaScript/TypeScript must adhere to [JavaScript Standard Style](https://standardjs.com/) and [TypeScript ESLint](https://typescript-eslint.io/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export { ClassName }
  ```
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
    * Local Modules (using relative paths)
* Place class properties in the following order:
    * Class methods and properties (methods starting with `static`)
    * Instance methods and properties
* [Avoid platform-dependent code](https://flight-manual.atom.io/hacking-atom/sections/cross-platform-compatibility/)

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown).
* Reference methods and classes in markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName.methodName}`
    * Reference class methods with `{ClassName#methodName}`

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests on all of the Reactive Resume repositories.

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in. For example, you might be interested in [open issues across all Reactive Resume repositories which are labeled as bugs, but still need to be reliably reproduced](https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Asignimus-tech+label%3Abug+label%3Aneeds-reproduction) or perhaps [open pull requests in the main repository which haven't been reviewed yet](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+comments%3A0). To help you find issues and pull requests, each label is listed with search links for finding open items with that label in the main repository. We encourage you to read about [other search filters](https://help.github.com/articles/searching-issues/) which will help you write more focused queries.

The labels are loosely grouped by their purpose, but it's not required that every issue have a label from every group or that an issue can't have more than one label from the same group.

Please open an issue on the main repository if you have suggestions for new labels, and if you notice some labels are missing on some repositories, please open an issue on that repository.

#### Type of Issue and Issue State

| Label name | Description | Search issues |
| --- | --- | --- |
| `enhancement` | Feature requests. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aenhancement) |
| `bug` | Confirmed bugs or reports that are very likely to be bugs. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Abug) |
| `question` | Questions more than bug reports or feature requests (e.g. how do I do X). | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aquestion) |
| `feedback` | General feedback more than bug reports or feature requests. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Afeedback) |
| `help-wanted` | The Reactive Resume core team would appreciate help from the community in resolving these issues. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Ahelp-wanted) |
| `beginner` | Less complex issues which would be good first issues to work on for users who want to contribute to Reactive Resume. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Abeginner) |
| `duplicate` | Issues which are duplicates of other issues, i.e. they have been reported before. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aduplicate) |
| `wontfix` | The Reactive Resume core team has decided not to fix these issues for now, either because they're working as intended or for some other reason. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Awontfix) |
| `invalid` | Issues which aren't valid (e.g. user errors). | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Ainvalid) |
| `needs-reproduction` | Bug reports that don't have enough information to be reproduced. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aneeds-reproduction) |

#### Topic Categories

| Label name | Description | Search issues |
| --- | --- | --- |
| `ui` | Related to visual design. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aui) |
| `api` | Related to the REST API. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aapi) |
| `performance` | Related to performance. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aperformance) |
| `security` | Related to security. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Asecurity) |
| `documentation` | Related to documentation. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Adocumentation) |
| `i18n` | Related to internationalization and localization. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Ai18n) |
| `accessibility` | Related to accessibility. | [Search](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Asignimus-tech%2FReactive-Resume+label%3Aaccessibility) |

#### Pull Request Labels

| Label name | Description | Search issues |
| --- | --- | --- |
| `work-in-progress` | Pull requests which are still being worked on, more changes will follow. | [Search](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+label%3Awork-in-progress) |
| `needs-review` | Pull requests which need code review, and approval from maintainers or Reactive Resume core team. | [Search](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+label%3Aneeds-review) |
| `under-review` | Pull requests being reviewed by maintainers or Reactive Resume core team. | [Search](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+label%3Aunder-review) |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again. | [Search](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+label%3Arequires-changes) |
| `needs-testing` | Pull requests which need manual testing. | [Search](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Asignimus-tech%2FReactive-Resume+label%3Aneeds-testing) |

[beginner]:https://github.com/search?q=is%3Aopen+is%3Aissue+label%3Abeginner+user%3Asignimus-tech+sort%3Acomments-desc
[help-wanted]:https://github.com/search?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+user%3Asignimus-tech+sort%3Acomments-desc