export const content = `Download vehicle statistics from KBA using Playwright browser automation.

## Prerequisites
- Playwright MCP server must be available
- User should specify which statistics they need (e.g., new registrations by manufacturer, fleet by fuel type)

## Option A: KBA Website (Excel downloads)

### Step 1: Navigate to statistics overview
Open https://www.kba.de/DE/Statistik/Fahrzeuge/fahrzeuge_node.html in the browser.
Wait for the navigation tree to load.

### Step 2: Select category
The main categories are:
- **Neuzulassungen** — new vehicle registrations (monthly/annual)
- **Bestand** — current vehicle fleet
- **Umschreibungen** — ownership transfers
- **Ausserdienststellungen** — deregistrations
- **Hauptuntersuchungen** — vehicle inspections

Click the category matching [[statisticType]].

### Step 3: Navigate to sub-category
Sub-categories include: vehicle class, manufacturer/brand, region, fuel type, emissions, owner type.
Select the sub-category matching [[subCategory]] if provided.

### Step 4: Download Excel file
Look for download links (Excel icon or "Download" text).
Click to download the Excel file.
Note the file name and date for reference.

## Option B: ArcGIS Statistikportal (CSV/GeoJSON)

### Step 1: Navigate to portal
Open https://das-kba-statistikportal.hub.arcgis.com/search in the browser.

### Step 2: Search or browse
Use the search bar to find datasets matching [[statisticType]].
Or browse by category: Fahrzeuge, Kraftfahrende, Kraftverkehr.

### Step 3: Select dataset
Click on the dataset card to open the detail view.
Review the dataset description and available fields.

### Step 4: Download data
Look for download options: CSV, KML, ZIP, GeoJSON.
Select [[exportFormat]] (default: CSV) and download.

## Output
Report the downloaded file name, format, and a preview of the first few rows.
If the data contains regional breakdowns, note the geographic coverage.
`
