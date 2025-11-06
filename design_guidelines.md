# Design Guidelines: Unified Business Management System

## Design Approach
**Reference-Based Approach**: Modern enterprise ERP systems (Zoho, Odoo, ERPNext, Linear) combined with Material Design principles for data-heavy applications. Focus on information density, workflow efficiency, and professional aesthetics.

## Core Layout Architecture

### Application Shell
- **Sidebar Navigation**: Fixed left sidebar (256px width)
  - Company logo/branding at top
  - Collapsible module groups (Customers, Sales, Inventory, Accounting, etc.)
  - Active state highlighting for current module
  - User profile and settings at bottom
  - Collapse/expand functionality (→ 64px icon-only mode)

- **Top Bar**: Full-width header bar (64px height)
  - Breadcrumb navigation (Home > Sales Orders > SO-2024-001)
  - Global search bar (center-aligned, 400px width)
  - Quick actions dropdown (+ New)
  - Notifications bell icon
  - User avatar with dropdown menu

- **Content Area**: Main workspace (remaining viewport)
  - Page header with title and primary actions (right-aligned button group)
  - Tabs for sub-sections where applicable
  - Content cards/tables with consistent padding

## Typography System

**Font Family**: Inter (Google Fonts) for UI, Roboto Mono for data/numbers

**Hierarchy**:
- Page Titles: 28px, weight 600
- Section Headers: 20px, weight 600
- Card Titles: 16px, weight 500
- Body Text: 14px, weight 400
- Table Data: 13px, weight 400
- Labels/Captions: 12px, weight 500, uppercase tracking

## Spacing System
**Tailwind Units**: Consistent use of 2, 4, 6, 8, 12, 16, 20, 24 units
- Card padding: p-6
- Section spacing: space-y-6
- Form field spacing: space-y-4
- Button padding: px-4 py-2
- Page margins: p-8
- Table cell padding: px-4 py-3

## Component Library

### Data Tables
- Sticky header row with sort indicators
- Alternating row backgrounds for readability
- Row hover state
- Checkbox column (left) for bulk actions
- Action menu column (right) with three-dot icon
- Pagination controls at bottom (rows per page selector + page navigation)
- Column resizing capability indicators
- Status badges inline (pill-shaped with subtle backgrounds)

### Forms
- Two-column layout for desktop (form groups side-by-side)
- Field labels above inputs (not floating)
- Required field indicator (asterisk)
- Helper text below inputs (12px)
- Input height: h-10 (40px)
- Grouped sections with subtle dividers
- Action buttons: Primary (right), Secondary/Cancel (left)

### Cards
- Subtle border or shadow (border preferred for enterprise feel)
- Card header with title and optional action buttons
- Consistent internal padding (p-6)
- Footer section for metadata/timestamps when needed

### Modals/Dialogs
- Centered overlay with backdrop blur
- Maximum width: max-w-2xl for forms, max-w-4xl for complex wizards
- Header with title and close (X) button
- Content area with scroll if needed
- Footer with action buttons (Cancel left, Primary right)

### Navigation Tabs
- Horizontal tabs below page header
- Underline indicator for active tab
- Consistent spacing (px-4 py-3)
- Badge count indicators where relevant

### Status Indicators
- Pill-shaped badges with semantic meanings:
  - Pending/Draft: Neutral background
  - Active/Confirmed: Success indication
  - Shipped/In Progress: Info indication  
  - Cancelled/Inactive: Subtle muted treatment
  - Overdue/Alert: Warning/danger treatment

### Buttons
- Primary: Solid background, white text
- Secondary: Outlined, transparent background
- Tertiary/Ghost: Text only with hover state
- Icon buttons: 40px × 40px touch target
- Button groups: Connected with border radius adjustments

### Dashboard Widgets
- Metric cards: Large number display with label and trend indicator
- Chart containers with header and legend
- Recent activity lists with timestamps
- Quick action tiles (icon + label, grid layout)

## Key User Flows

### List Views (Customers, Products, Orders, etc.)
- Filter bar at top (multiple dropdown filters + search)
- Bulk action toolbar appears when rows selected
- Quick view drawer slides from right on row click
- Full edit opens in new view or modal

### Create/Edit Forms
- Wizard-style for complex processes (Purchase Orders, Sales Orders)
- Auto-save draft functionality indicator
- Validation inline with field-level error messages
- Success notification toast on save

### Detail Views
- Left: Primary information panel
- Right: Activity timeline/related records sidebar (320px)
- Tabbed sections for extensive data
- Edit mode toggles inline editing capability

### Call Manager Dashboard
- Split view: Call list (left 40%) + Call details (right 60%)
- Filters: Date range, user, customer, status
- Call action buttons: Log new call, set reminder, view recording

## Specialized Module Patterns

### Accounting Module
- Debt report: Sortable table with expandable customer rows
- Payment allocation: Two-panel view (invoices left, payment right)
- Statement view: Document preview with email action

### Stock Control
- Warehouse selector dropdown (global filter)
- Stock level indicators with color coding (adequate/reorder/out of stock)
- Stock movement history table with expandable details

### E-commerce Integration
- Basket log: Timeline view of cart events
- Order source badge (Online/Manual/Import)

## Images
**No hero images needed** - This is an enterprise application focused on functionality. Use icons liberally throughout for:
- Module navigation icons (sidebar)
- Empty state illustrations (when no data exists)
- Status/action icons in tables and buttons
- Dashboard metric icons

Use icon library: Heroicons (outline for navigation, solid for status indicators)

## Responsive Considerations
- Desktop-primary (1440px+ optimized)
- Tablet: Sidebar collapses to icon-only, single-column forms
- Mobile: Hidden sidebar with hamburger menu, stacked layouts

This system prioritizes data density, workflow efficiency, and professional polish suitable for all-day enterprise use.