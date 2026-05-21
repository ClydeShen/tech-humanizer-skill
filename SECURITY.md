# Security Policy

## Supported Versions

The latest `main` branch and the latest tagged release receive security fixes.

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability

Please do not open a public issue for security problems.

Use GitHub's private vulnerability reporting for this repository if it is enabled. If private reporting is unavailable, open a minimal public issue asking for a private contact path without including exploit details.

Useful details include:

- affected file or workflow;
- agent/client environment;
- steps to reproduce;
- example input text or profile data, with secrets removed;
- expected impact.

## Scope

This repository is a plain Agent Skill. Security-sensitive areas include:

- instructions that could leak or persist private writing-profile data;
- malicious or surprising scripts;
- prompt-injection patterns in examples or references;
- generated files that should remain ignored by Git.
