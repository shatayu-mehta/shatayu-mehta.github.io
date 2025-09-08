# Portfolio Editing Guide

This guide will help you update your portfolio content, manage PDF files, and modify links without requiring developer assistance.

## Table of Contents
1. [Project Data Management](#project-data-management)
2. [Resume and PDF Management](#resume-and-pdf-management)
3. [Personal Information Updates](#personal-information-updates)
4. [Images and Media](#images-and-media)
5. [Links and URLs](#links-and-urls)
6. [Quick Reference](#quick-reference)

---

## Project Data Management

### Main Projects File
**Location**: `src/data/projects.json`

This file contains all your project information. Here's how to edit it:

### Adding a New Project

```json
{
  "id": 8,
  "title": "Your New Project Title",
  "category": "robotics", // Options: "robotics", "aerospace", "wearables"
  "description": "Brief description of your project in 1-2 sentences.",
  "image": "/api/placeholder/400/300", // Or path to your image
  "technologies": ["Tech1", "Tech2", "Tech3", "Tech4"],
  "achievements": [
    "First key achievement or result",
    "Second important accomplishment",
    "Third notable outcome",
    "Fourth achievement if applicable"
  ],
  "status": "completed", // Options: "completed", "in-progress", "planned"
  "timeline": "Month YYYY - Month YYYY",
  "github": "https://github.com/yourusername/repo-name", // Or null if no repo
  "demo": "/projects/your-demo.html", // Or null if no demo
  "featured": true // true for featured projects, false for regular ones
}
```

### Editing Existing Projects

1. Open `src/data/projects.json`
2. Find the project by searching for its title
3. Modify any field you want to update
4. Save the file

### Project Categories
- `"robotics"` - Shows robotic arm illustration
- `"aerospace"` - Shows aircraft illustration  
- `"wearables"` - Shows smart ring illustration

### Featured vs Regular Projects
- `"featured": true` - Appears in the main showcase with large cards
- `"featured": false` - Appears only in the "All Projects" grid

---

## Resume and PDF Management

### Current Resume File
**Location**: `public/SHATAYU_RESUME_DESIGN.pdf`

### Updating Your Resume

1. **Replace the file**:
   - Place your new resume PDF in the `public/` folder
   - Name it `SHATAYU_RESUME_DESIGN.pdf` (exact same name)
   - The old file will be automatically replaced

2. **Or use a different filename**:
   - Place your new PDF in `public/` folder with any name
   - Update the link in `src/components/sections/Projects/Projects.tsx`
   - Find this line: `<a href="/SHATAYU_RESUME_DESIGN.pdf"`
   - Change to: `<a href="/YOUR_NEW_FILENAME.pdf"`

### Other PDF Files
You can add any PDF files to the `public/` folder and link to them using `/filename.pdf` in your project data.

**Examples of PDFs in your public folder**:
- `RESUME_S_A_M.pdf`
- `Resume_Shatayu_Mehta__Copy_.pdf`
- `Solidworks Professional shatayu mehta.pdf`
- `SHATAYU_RESUME_DESIGN.pdf` (current active resume)

---

## Personal Information Updates

### About Section
**Location**: `src/data/about.json`

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "description": "Your professional summary...",
  "highlights": [
    "Key highlight 1",
    "Key highlight 2"
  ]
}
```

### Contact Information
**Location**: `src/data/contact.json`

```json
{
  "email": "your.email@domain.com",
  "phone": "+1 (XXX) XXX-XXXX",
  "location": "City, State, Country",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername"
}
```

### Skills
**Location**: `src/data/skills.json`

```json
{
  "categories": [
    {
      "name": "Programming",
      "skills": ["Python", "JavaScript", "C++"]
    },
    {
      "name": "Software",
      "skills": ["SOLIDWORKS", "MATLAB", "AutoCAD"]
    }
  ]
}
```

### Education
**Location**: `src/data/education.json`

### Experience
**Location**: `src/data/experience.json`

---

## Images and Media

### Project Images
- Place images in the `public/` folder
- Reference them in projects.json as: `"image": "/your-image.jpg"`
- Supported formats: `.jpg`, `.png`, `.gif`, `.svg`

### Background Images
Current background images in `public/`:
- `cyberpunk_city_bg.jpg`
- `Establish_contact_bg.jpg`

### 3D Models
Current 3D files in `public/`:
- `FUJIN.glb` - FUJIN aircraft model
- `UR5.glb` - UR5 robot model
- `FUJIN.stl` - FUJIN STL file

---

## Links and URLs

### Project Demo Links
In `projects.json`, the `demo` field can point to:
- Local HTML files: `"/projects/demo.html"`
- External websites: `"https://your-demo-site.com"`
- Set to `null` if no demo available

### GitHub Repository Links
In `projects.json`, the `github` field can be:
- Single repo: `"https://github.com/username/repo"`
- Multiple repos: `["https://github.com/user/repo1", "https://github.com/user/repo2"]`
- No repo: `null`

### Social Media Links
Update in `src/data/contact.json`:
```json
{
  "social": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourhandle"
  }
}
```

---

## Quick Reference

### Common Tasks

#### Add a New Project
1. Open `src/data/projects.json`
2. Add new project object to the `projects` array
3. Use the template from "Adding a New Project" section
4. Save file

#### Update Resume
1. Replace `public/SHATAYU_RESUME_DESIGN.pdf` with new file
2. Keep the same filename, or update the link in Projects.tsx

#### Change Project Status
1. Open `src/data/projects.json`
2. Find your project
3. Change `"status": "completed"` to `"in-progress"` or `"planned"`
4. Save file

#### Make Project Featured
1. Open `src/data/projects.json`
2. Find your project
3. Change `"featured": false` to `"featured": true`
4. Save file

#### Update Contact Info
1. Open `src/data/contact.json`
2. Update any field
3. Save file

### File Locations Quick List
```
Portfolio Data:
├── src/data/
│   ├── projects.json        # All project information
│   ├── about.json          # Personal information
│   ├── contact.json        # Contact details
│   ├── skills.json         # Technical skills
│   ├── education.json      # Educational background
│   └── experience.json     # Work experience

Media Files:
├── public/
│   ├── SHATAYU_RESUME_DESIGN.pdf  # Current resume
│   ├── *.jpg, *.png               # Images
│   └── *.glb, *.stl              # 3D models

Project Demos:
└── public/projects/
    ├── fujin-vtol.html
    ├── ur5-robot.html
    └── wearable-ring.html
```

### JSON Formatting Tips
- Always use double quotes `"` around strings
- Separate array items with commas
- No comma after the last item in an array or object
- Use `null` for empty values (not `"null"`)
- Test your JSON at [jsonlint.com](https://jsonlint.com) if unsure

### Development Commands
After making changes, run:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Troubleshooting

### Common Issues

1. **Project not showing**: Check JSON syntax in projects.json
2. **Image not loading**: Ensure image is in `public/` folder
3. **Resume link broken**: Verify PDF filename matches link
4. **Demo not working**: Check demo file exists in `public/projects/`

### Getting Help
If you encounter issues:
1. Check browser console for errors (F12 → Console)
2. Validate JSON syntax at jsonlint.com
3. Ensure file paths are correct
4. Check that files exist in specified locations

---

*Last updated: January 2025*
