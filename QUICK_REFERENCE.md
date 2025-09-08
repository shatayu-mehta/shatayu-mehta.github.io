# Quick Portfolio Edit Reference

## 🚀 Most Common Tasks

### Add New Project
1. Edit: `src/data/projects.json`
2. Copy this template and add to projects array:

```json
{
  "id": 8,
  "title": "Project Name",
  "category": "robotics",
  "description": "Brief description",
  "image": "/your-image.jpg",
  "technologies": ["Tech1", "Tech2"],
  "achievements": ["Achievement 1", "Achievement 2"],
  "status": "completed",
  "timeline": "Month YYYY",
  "github": "https://github.com/user/repo",
  "demo": null,
  "featured": true
}
```

### Update Resume
Replace: `public/SHATAYU_RESUME_DESIGN.pdf`

### Update Contact Info
Edit: `src/data/contact.json`

## 📁 Key File Locations

```
src/data/
├── projects.json     ← Main project data
├── about.json       ← Personal info
├── contact.json     ← Contact details
├── skills.json      ← Technical skills
├── education.json   ← Education
└── experience.json  ← Work experience

public/
├── SHATAYU_RESUME_DESIGN.pdf  ← Current resume
├── *.jpg, *.png              ← Images
└── projects/*.html           ← Demo files
```

## ⚡ Quick Commands

```bash
npm run dev      # Start development
npm run build    # Build for production
```

## 🔧 Project Categories
- `"robotics"` → Robot arm icon
- `"aerospace"` → Aircraft icon  
- `"wearables"` → Smart ring icon

## ✅ Validation
Test JSON: [jsonlint.com](https://jsonlint.com)

---
*See PORTFOLIO_EDITING_GUIDE.md for complete instructions*
