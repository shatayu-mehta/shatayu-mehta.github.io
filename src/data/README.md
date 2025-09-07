# Portfolio Data Management

This directory contains all the portfolio data in JSON format, making it easy to update content without touching component code.

## 📁 File Structure

```
src/data/
├── about.json          # Personal info, skills, achievements, bio
├── projects.json       # All projects with details, tech stack, achievements
├── skills.json         # Technical skills and certifications
├── experience.json     # Work experience and achievements
├── education.json      # Academic background and goals
├── contact.json        # Contact methods and form configuration
├── hero.json          # Hero section content and personal details
├── index.ts           # TypeScript exports and type definitions
└── README.md          # This file
```

## 🎯 How to Update Content

### Adding a New Project
1. Open `projects.json`
2. Add new project object to the `projects` array
3. Include all required fields: `id`, `title`, `category`, `description`, etc.
4. Set `featured: true` if you want it in the featured section

### Updating Skills
1. Open `skills.json`
2. Modify `skillCategories` array to add/remove skills
3. Update skill levels (0-100 scale)
4. Add new certifications to `certifications` array

### Changing Personal Information
1. Open `hero.json` for main profile info
2. Open `about.json` for detailed bio and achievements
3. Open `contact.json` for contact methods

### Updating Experience
1. Open `experience.json`
2. Add new positions to `experiences` array
3. Update achievements and technologies used

### Modifying Education
1. Open `education.json`
2. Update current education status
3. Add new courses to coursework arrays
4. Modify future goals as needed

## 🔧 Technical Details

### JSON Structure Guidelines
- All arrays should maintain consistent object structures
- Use descriptive field names
- Include all required fields for each object type
- Maintain proper JSON formatting

### Field Descriptions

#### Projects
- `id`: Unique identifier (integer)
- `title`: Project name (string)
- `category`: Project type ('aerospace', 'robotics', 'wearables', etc.)
- `featured`: Whether to show in featured section (boolean)
- `technologies`: Array of tech stack items
- `achievements`: Array of bullet points describing accomplishments

#### Skills
- `level`: Proficiency level (0-100 integer)
- `skills`: Array of skill objects with name and level
- `status`: For certifications ('Certified', 'Current', 'In Progress')

#### Contact
- `link`: URL or null for non-clickable items
- `icon`: Emoji or icon identifier
- `formSubjects`: Predefined options for contact form

## 📝 Best Practices

### When Adding Content
1. **Consistency**: Follow existing patterns and structures
2. **Completeness**: Fill all required fields
3. **Accuracy**: Double-check dates, GPAs, and technical details
4. **Professional Tone**: Maintain professional language throughout

### Data Validation
- Ensure all JSON files are valid (use JSON validator)
- Check that referenced files (PDFs, images) exist
- Verify all URLs are working
- Test new content by viewing the live site

## 🚀 Quick Updates

### Most Common Updates:
- **New Project**: Add to `projects.json`
- **Skill Level**: Update in `skills.json`
- **Contact Info**: Modify in `contact.json` and `hero.json`
- **Job Experience**: Add to `experience.json`
- **Course Completion**: Update status in `skills.json` certifications

### Emergency Contact Updates:
1. `hero.json` → `personal.email`
2. `contact.json` → `contactMethods` array
3. Commit and push changes

## 🔍 Finding What to Change

### "Where do I update...?"
- **Name/Title**: `hero.json` → `personal`
- **Bio/Description**: `about.json` → `bio`
- **Project Details**: `projects.json` → find by project name
- **Skills/Tech**: `skills.json` → `skillCategories`
- **Work History**: `experience.json` → `experiences`
- **Education**: `education.json` → `education`
- **Contact Methods**: `contact.json` → `contactMethods`
- **Certifications**: `skills.json` → `certifications`

## 💡 Tips
- Always test changes locally before committing
- Keep backup copies when making major changes
- Use proper JSON formatting tools/validators
- Update multiple related fields when making changes (e.g., if you change email, update both hero and contact files)
