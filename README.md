# SvelteKit Application with WordPress Integration

## Overview
This project is a SvelteKit application built with Svelte 5, integrating with a WordPress backend via GraphQL. The goal is to demonstrate modern front-end development skills combined with robust API integration. The application follows the provided Figma design and connects to a WordPress instance for content management.


**Completed By:** Riteek Rakesh  
**Date:** March 28, 2025  

## Project Deliverables
- **SvelteKit Application**: Built using Svelte 5.
- **Backend Integration**: Integrated with WordPress via GraphQL using WPGraphQL.
- **Git Repository**: Includes a clear commit history (available in this repository).
- **Bonus (Multi-language Support)**: Implemented for blogs

## Design & Pages
The application is based on the Figma design provided at:  
[Chargeeasy Hiring Project Figma](https://www.figma.com/design/YSm7S0j9lLYvSn7RIToYks/Chargeeasy-hiring-project?node-id=0-1&t=WqSZX3Ti3rKYn9on-1)

The following pages are implemented:
1. **Home Page**: Pre-rendered at build time with editable content from WordPress.
2. **Blog/Posts Listing**: Fetches and displays blog posts from WordPress.
3. **Single Post Detail**: Displays individual post details, including title, content, and featured image.
4. **Contact Page**: Pre-rendered with a non-functional contact form layout.

The design is not pixel-perfect, as the focus was on robust integration rather than exact UI replication.

## WordPress Integration
- **Editable Content**:  
  - Homepage content (text, images, etc.) is fetched from WordPress and editable via the admin dashboard.
  - Header and footer are hardcoded in the SvelteKit app and not editable from WordPress.
- **GraphQL Integration**:  
  - Uses [WPGraphQL](https://www.wpgraphql.com/) to fetch page content and blog posts.
  - Core WordPress blocks are parsed into Svelte components.
- **Static Rendering**:  
  - Homepage and Contact Page are pre-rendered at build time using SvelteKit's static adapter.
- **Blog Posts**:  
  - Fetches titles, content, and featured images from WordPress posts.
  - Uses "auto" pre-rendering for blog pages.
- **Contact Form**:  
  - Form fields are retrieved from [Contact Form 7 or Gravity Forms] (specify which you used).
  - The form layout is implemented but not functional (no email sending).

## Technical Details
- **Framework**: SvelteKit with Svelte 5.
- **UI Tools**: Tailwind CSS
- **Version Control**: Git with a clear commit history.
- **WordPress Environment**: Connected to the provided sandbox WordPress instance.

