# Contributing to `twilio-cli`

We'd love for you to contribute to our source code and to make `twilio-cli`
even better than it is today! Here are the guidelines we'd like you to follow:

 - [Code of Conduct](#coc)
 - [Question or Problem?](#question)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Documentation fixes](#docs)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)

## <a name="coc"></a> Code of Conduct

Help us keep `twilio-cli` open and inclusive. Please be kind to and considerate
of other developers, as we all have the same goal: make `twilio-cli` as good as
it can be.

## <a name="question"></a> Got an API/Product Question or Problem?

If you have questions about how to use `twilio-cli`, please see our
[docs][docs-link], and if you don't find the answer there, please contact
[help@twilio.com](mailto:help@twilio.com) with any issues you have.

## <a name="issue"></a> Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can
help us by submitting [an issue][issue-link]. 

**Please see the [Submission Guidelines](#submit) below.**

## <a name="feature"></a> Want a Feature?

You can request a new feature by submitting an issue to our
[GitHub Repository][github]. If you would like to implement a new feature then
consider what kind of change it is:

* **Major Changes** that you wish to contribute to the project should be
  discussed first with `twilio-cli` contributors in an issue or pull request so
  that we can develop a proper solution and better coordinate our efforts,
  prevent duplication of work, and help you to craft the change so that it is
  successfully accepted into the project.
* **Small Changes** can be crafted and submitted to the
  [GitHub Repository][github] as a Pull Request.

## <a name="docs"></a> Want a Doc Fix?

If you want to help improve the docs for the `twilio-cli`, it's a good idea to
let others know what you're working on to minimize duplication of effort. Create
a new issue (or comment on a related existing one) to let others know what
you're working on.

For large fixes, please build and test the documentation before submitting the
PR to be sure you haven't accidentally introduced layout or formatting issues.

If you want to help improve the docs at
[http://twil.io/cli][docs-link], please contact
[help@twilio.com](mailto:help@twilio.com).

## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already
answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features by not reporting duplicate issues. Providing the following information
will increase the chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack
  trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **`twilio-cli` Version(s)** - is it a regression?
* **Operating System (if relevant)** - is this a problem with all systems or
  only specific ones?
* **Reproduce the Error** - provide an isolated code snippet or an unambiguous
  set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point
  to what might be causing the problem (line of code or commit)

**If you get help, help others. Good karma rules!**

### Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

* Search [GitHub][github] for an open or closed Pull Request that relates to
  your submission. You don't want to duplicate effort.

* Setup your development environment:
  * `npm uninstall -g twilio-cli`
  * `git clone https://github.com/twilio/twilio-cli-core.git`
  * `cd twilio-cli-core`
  * `make clean install`
  * `cd ..`
  * `git clone https://github.com/twilio/twilio-cli.git`
  * `cd twilio-cli`
  * In `package.json` replace `"@twilio/cli-core": "<Version Number>"` with `"@twilio/cli-core": "file:../twilio-cli-core"`
  * `make clean install`
  * Test that everything is wired up correctly with `./bin/run`

* Understanding the code base:
  * The Twilio CLI utilizes the Open CLI Framework ([oclif](https://oclif.io/)). It may be useful to familiarize yourself with it, in particular, the [multi-command CLI](https://oclif.io/docs/multi).
  * Utilize `DEBUG =* ./bin/run` to view the code flow
  * Utilize `./bin/run <COMMAND> -l debug` to view additional information such as Twilio API request details.
  * Key concepts:
    * _domains_
      * Located here: `./src/services/twilio-api`
    * _versions_ 
      * Specified in the path, e.g. `/v1/...`
    * _action_
      * These are the HTTP verbs
    * _CLI commands_
      * Handcrafted commands are located at `./src/commands/`
      * Generated commands are created here `./src/hooks/init/twilio-api.js`
    * _hooks_
    * _topics_

* Make your changes in a new git branch:

    ```shell
    git checkout -b my-fix-branch main
    ```

* Create your patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Run the full `twilio-cli` test suite (aliased by `make test`), and ensure
  that all tests pass.
* Commit your changes using a descriptive commit message.

    ```shell
    git commit -a
    ```
  Note: the optional commit `-a` command line option will automatically "add"
  and "rm" edited files.

* Build your changes locally to ensure all the tests pass:

    ```shell
    npm test
    ```

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

In GitHub, send a pull request to `twilio-cli:main`.
If we suggest changes, then:

* Make the required updates.
* Re-run the `twilio-cli` test suite to ensure tests are still passing.
* Commit your changes to your branch (e.g. `my-fix-branch`).
* Push the changes to your GitHub repository (this will update your Pull Request).

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull
the changes from the main (upstream) repository.

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as
you are working:

* All features or bug fixes **must be tested** by one or more tests.
* All classes and methods **must be documented**.

[docs-link]: http://twil.io/cli
[issue-link]: https://github.com/twilio/twilio-cli/issues/new
[github]: https://github.com/twilio/twilio-cli
