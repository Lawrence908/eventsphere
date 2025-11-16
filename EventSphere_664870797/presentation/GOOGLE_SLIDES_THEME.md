# EventSphere Google Slides Theme Configuration
## Complete Color Palette & Styling Guide

**Last Updated:** November 2025  
**Purpose:** Manual theme configuration for Google Slides

---

## 🎨 Complete Color Palette

### Primary Colors (MongoDB Brand)

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **MongoDB Green** (Accent) | `#00ED64` | rgb(0, 237, 100) | Primary accent, buttons, highlights |
| **Forest Green** | `#00684A` | rgb(0, 104, 74) | Secondary accent, hover states |
| **Evergreen** | `#023430` | rgb(2, 52, 48) | Dark backgrounds, cards |
| **Slate Blue** (Background) | `#001E2B` | rgb(0, 30, 43) | Main slide background |

### Text Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Primary Text** | `#FFFFFF` | rgb(255, 255, 255) | Main headings, important text |
| **Secondary Text** | `#E2E8F0` | rgb(226, 232, 240) | Body text, descriptions |
| **Tertiary Text** | `#CBD5E1` | rgb(203, 213, 225) | Muted text, captions |
| **Muted Text** | `#94A3B8` | rgb(148, 163, 184) | Less important text |

### Accent & Status Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Success/Checkmark** | `#00ED64` | rgb(0, 237, 100) | Success states, checkmarks |
| **Warning** | `#F59E0B` | rgb(245, 158, 11) | Warnings, alerts |
| **Error** | `#EF4444` | rgb(239, 68, 68) | Errors, important alerts |
| **Info** | `#3B82F6` | rgb(59, 130, 246) | Information, links |

### Code Block Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Code Background** | `#0F151B` | rgb(15, 21, 27) | Code block background |
| **Code Text** | `#E2E8F0` | rgb(226, 232, 240) | Code text |
| **Code Accent** | `#00ED64` | rgb(0, 237, 100) | Syntax highlighting |
| **Code Border** | `rgba(0, 237, 100, 0.2)` | rgba(0, 237, 100, 0.2) | Code block border |

---

## 📐 Google Slides Theme Color Mapping

### How to Configure in Google Slides

1. **Open Google Slides** → Click **Slide** → **Theme** → **Theme colors** (or use the paint palette icon)
2. **Edit the color palette** using the hex codes below

### Recommended Theme Color Assignments

**For Google Slides "Theme colors" interface:**

```
Text and background 1:  #001E2B  (Slate Blue - Main background)
Text and background 2:  #FFFFFF  (White - Contrast background)
Text and background 3:  #0F151B  (Code background - Dark cards)
Text and background 4:  #023430  (Evergreen - Secondary background)

Accent 1:  #00ED64  (MongoDB Green - Primary accent)
Accent 2:  #00684A  (Forest Green - Secondary accent)
Accent 3:  #3B82F6  (Info Blue - Links, info)
Accent 4:  #F59E0B  (Warning - Alerts)
Accent 5:  #E2E8F0  (Secondary Text - Light text)
Accent 6:  #CBD5E1  (Tertiary Text - Muted text)

Link:  #00ED64  (MongoDB Green - Hyperlinks)
```

### Alternative Theme Color Mapping (If Limited Slots)

If you have fewer color slots, prioritize:

```
Text and background 1:  #001E2B  (Main background)
Text and background 2:  #FFFFFF  (White)
Text and background 3:  #0F151B  (Dark cards)

Accent 1:  #00ED64  (MongoDB Green - PRIMARY)
Accent 2:  #00684A  (Forest Green)
Accent 3:  #023430  (Evergreen)
Accent 4:  #E2E8F0  (Light text)
Accent 5:  #3B82F6  (Info/Links)
Accent 6:  #F59E0B  (Warning)

Link:  #00ED64  (MongoDB Green)
```

---

## 🔤 Typography & Fonts

### Recommended Font Stack

**Primary Font (Headings):**
- **First Choice:** Montserrat (Google Fonts)
- **Second Choice:** Roboto (Google Fonts)
- **Third Choice:** Inter (Google Fonts)
- **Fallback:** Arial, sans-serif

**Body Font:**
- **First Choice:** Open Sans (Google Fonts)
- **Second Choice:** Roboto (Google Fonts)
- **Third Choice:** Lato (Google Fonts)
- **Fallback:** Arial, sans-serif

**Code Font:**
- **First Choice:** Fira Code (if available)
- **Second Choice:** Consolas
- **Third Choice:** Courier New
- **Fallback:** monospace

### Font Sizes & Hierarchy

```
Title Slide Title:     72pt (Bold)
Section Headings:      48pt (Bold)
Slide Titles:          36pt (Bold)
Subheadings:           24pt (Semi-bold)
Body Text:             18pt (Regular)
Small Text:            14pt (Regular)
Code Text:             14pt (Monospace)
Captions:              12pt (Regular)
```

### Font Weights

- **Headings:** Bold (700)
- **Subheadings:** Semi-bold (600)
- **Body Text:** Regular (400)
- **Emphasis:** Medium (500)

---

## 🎨 Slide Layout Styles

### Title Slide

**Background:**
- Color: `#001E2B` (Slate Blue)
- Optional: Subtle gradient from `#001E2B` to `#023430`

**Title:**
- Font: Montserrat Bold, 72pt
- Color: `#FFFFFF` (White)
- Accent word: `#00ED64` (MongoDB Green)

**Subtitle/Info:**
- Font: Open Sans Regular, 18pt
- Color: `#E2E8F0` (Secondary Text)

### Content Slides

**Background:**
- Color: `#001E2B` (Slate Blue)
- Optional: Subtle pattern or texture (very light)

**Slide Title:**
- Font: Montserrat Bold, 36pt
- Color: `#FFFFFF` (White)
- Underline accent: `#00ED64` (MongoDB Green, 3px)

**Body Text:**
- Font: Open Sans Regular, 18pt
- Color: `#E2E8F0` (Secondary Text)
- Line Height: 1.6

**Bullet Points:**
- Color: `#00ED64` (MongoDB Green) for bullets
- Text: `#E2E8F0` (Secondary Text)
- Spacing: 0.5em between items

### Code Blocks

**Background:**
- Color: `#0F151B` (Code Background)
- Border: 1px solid `rgba(0, 237, 100, 0.2)`
- Border Radius: 4px
- Padding: 16px

**Code Text:**
- Font: Consolas or Fira Code, 14pt
- Color: `#E2E8F0` (Code Text)
- Line Height: 1.5

**Syntax Highlighting:**
- Keywords: `#00ED64` (MongoDB Green)
- Strings: `#3B82F6` (Info Blue)
- Numbers: `#F59E0B` (Warning)

### Tables

**Header:**
- Background: `#023430` (Evergreen)
- Text: `#FFFFFF` (White)
- Font: Open Sans Semi-bold, 16pt

**Cells:**
- Background: `#0F151B` (Code Background)
- Text: `#E2E8F0` (Secondary Text)
- Border: 1px solid `rgba(0, 237, 100, 0.1)`

**Alternate Rows:**
- Background: `rgba(0, 237, 100, 0.05)` (Very light green tint)

### Buttons & Callouts

**Primary Button:**
- Background: `#00ED64` (MongoDB Green)
- Text: `#001E2B` (Dark text for contrast)
- Font: Open Sans Semi-bold, 16pt
- Border Radius: 8px
- Padding: 12px 24px

**Secondary Button:**
- Background: Transparent
- Border: 2px solid `#00ED64` (MongoDB Green)
- Text: `#00ED64` (MongoDB Green)
- Font: Open Sans Semi-bold, 16pt

**Callout Box:**
- Background: `rgba(0, 237, 100, 0.1)` (Light green tint)
- Border: 2px solid `#00ED64` (MongoDB Green)
- Border Radius: 8px
- Padding: 16px

---

## 📊 Chart & Graph Colors

### Color Sequence for Charts

When creating charts/graphs, use this color sequence:

1. **Primary:** `#00ED64` (MongoDB Green)
2. **Secondary:** `#00684A` (Forest Green)
3. **Tertiary:** `#3B82F6` (Info Blue)
4. **Quaternary:** `#F59E0B` (Warning)
5. **Quinary:** `#EF4444` (Error)
6. **Senary:** `#023430` (Evergreen)

### Chart Background

- **Background:** `#0F151B` (Code Background)
- **Grid Lines:** `rgba(226, 232, 240, 0.1)` (Very light)
- **Axis Labels:** `#E2E8F0` (Secondary Text)

---

## 🖼️ Image & Screenshot Styling

### Screenshot Frames

**Border:**
- Color: `#00ED64` (MongoDB Green)
- Width: 2px
- Border Radius: 4px

**Shadow:**
- Color: `rgba(0, 0, 0, 0.3)`
- Blur: 8px
- Offset: 0px 4px

### Image Overlays

**Dark Overlay (for text on images):**
- Color: `rgba(0, 30, 43, 0.7)` (Semi-transparent slate)
- Use when placing text over screenshots

---

## ✅ Status Indicators

### Checkmarks & Icons

**Success/Complete:**
- Color: `#00ED64` (MongoDB Green)
- Icon: ✓ or ✅

**In Progress:**
- Color: `#F59E0B` (Warning)
- Icon: ⟳ or 🔄

**Pending:**
- Color: `#CBD5E1` (Tertiary Text)
- Icon: ○ or ⭕

**Error/Issue:**
- Color: `#EF4444` (Error)
- Icon: ✗ or ❌

---

## 🎯 Slide-Specific Styling

### Title Slide

```
Background: #001E2B
Title: Montserrat Bold, 72pt, #FFFFFF
Accent: #00ED64 for "EventSphere"
Subtitle: Open Sans, 18pt, #E2E8F0
```

### Section Dividers

```
Background: #023430 with subtle gradient
Title: Montserrat Bold, 48pt, #FFFFFF
Subtitle: Open Sans, 20pt, #E2E8F0
Accent Line: 4px solid #00ED64 at bottom
```

### Content Slides

```
Background: #001E2B
Title: Montserrat Bold, 36pt, #FFFFFF
Body: Open Sans, 18pt, #E2E8F0
Bullets: #00ED64 for bullet points
```

### Code/Technical Slides

```
Background: #001E2B
Title: Montserrat Bold, 36pt, #FFFFFF
Code Block: #0F151B background, Consolas 14pt
Border: rgba(0, 237, 100, 0.2)
```

### Demo/Visual Slides

```
Background: #001E2B
Title: Montserrat Bold, 36pt, #FFFFFF
Screenshot: 2px #00ED64 border, shadow
Caption: Open Sans, 14pt, #CBD5E1
```

---

## 🔧 Quick Setup Steps

### Step 1: Set Theme Colors

1. Open Google Slides
2. Click **Slide** → **Theme** → **Theme colors** (paint palette icon)
3. Click **Customize** or edit existing theme
4. Set colors according to the mapping above

### Step 2: Set Default Fonts

1. Click **Format** → **Paragraph styles** → **Title**
   - Font: Montserrat Bold, 36pt
   - Color: #FFFFFF
2. Click **Format** → **Paragraph styles** → **Subtitle**
   - Font: Open Sans, 18pt
   - Color: #E2E8F0
3. Click **Format** → **Paragraph styles** → **Body text**
   - Font: Open Sans, 18pt
   - Color: #E2E8F0

### Step 3: Create Master Slides

1. Click **Slide** → **Edit master**
2. Set default background: `#001E2B`
3. Set default title style: Montserrat Bold, 36pt, #FFFFFF
4. Set default text style: Open Sans, 18pt, #E2E8F0
5. Add accent line at bottom: 3px solid `#00ED64` (optional)

### Step 4: Import Fonts (If Needed)

1. Click **Format** → **Font** → **More fonts**
2. Search and add:
   - Montserrat (Bold, Semi-bold, Regular)
   - Open Sans (Regular, Semi-bold)
   - Consolas or Fira Code (for code)

---

## 📋 Color Reference Card

### Quick Copy-Paste Hex Codes

```
Primary Colors:
#00ED64  - MongoDB Green (Accent)
#00684A  - Forest Green
#023430  - Evergreen
#001E2B  - Slate Blue (Background)

Text Colors:
#FFFFFF  - Primary Text (White)
#E2E8F0  - Secondary Text
#CBD5E1  - Tertiary Text
#94A3B8  - Muted Text

Backgrounds:
#001E2B  - Main Background
#0F151B  - Code/Card Background
#023430  - Section Background

Status Colors:
#00ED64  - Success
#3B82F6  - Info
#F59E0B  - Warning
#EF4444  - Error
```

---

## 🎨 Visual Examples

### Color Combinations

**High Contrast (Best for readability):**
- Background: `#001E2B`
- Text: `#FFFFFF`
- Accent: `#00ED64`

**Subtle (For secondary content):**
- Background: `#0F151B`
- Text: `#E2E8F0`
- Accent: `#00ED64`

**Muted (For less important info):**
- Background: `#001E2B`
- Text: `#CBD5E1`
- Accent: `rgba(0, 237, 100, 0.5)`

---

## 💡 Pro Tips

1. **Consistency:** Use the same color for the same purpose throughout
2. **Contrast:** Ensure text is readable (minimum 4.5:1 ratio)
3. **Accent Sparingly:** Use MongoDB green for emphasis, not everywhere
4. **White Space:** Don't overcrowd - use padding and margins
5. **Test:** View slides in presentation mode to check readability

---

## 🔄 Alternative: Starting from Existing Theme

If you prefer to start from an existing Google Slides theme and modify it:

1. **Choose a dark theme** (like "Focus" or "Simple Dark")
2. **Edit Theme Colors:**
   - Replace dark background with `#001E2B`
   - Replace accent color with `#00ED64`
   - Replace text colors with `#FFFFFF` and `#E2E8F0`
3. **Update Fonts:**
   - Change heading font to Montserrat
   - Change body font to Open Sans
4. **Save as custom theme** for reuse

---

## 📱 Export Settings

When exporting to PDF:

1. **File** → **Download** → **PDF**
2. **Settings:**
   - Size: Standard (4:3) or Widescreen (16:9)
   - Quality: High
   - Include speaker notes: Optional
3. **Filename:** `EventSphere_664870797_Presentation.pdf`

---

## ✅ Final Checklist

Before finalizing your theme:

- [ ] All theme colors set correctly
- [ ] Fonts imported and applied
- [ ] Master slide background set to `#001E2B`
- [ ] Title style: Montserrat Bold, 36pt, #FFFFFF
- [ ] Body style: Open Sans, 18pt, #E2E8F0
- [ ] Accent color `#00ED64` used consistently
- [ ] Code blocks styled with dark background
- [ ] Tables use proper color scheme
- [ ] Tested in presentation mode
- [ ] Saved as custom theme for reuse

---

**Your EventSphere presentation will look professional and match your website perfectly!**

Use these exact color codes and fonts to create a cohesive, MongoDB-branded presentation that showcases your technical expertise.

