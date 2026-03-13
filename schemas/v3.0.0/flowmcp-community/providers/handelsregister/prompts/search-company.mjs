export const content = `Search for a company in the German Commercial Register using Playwright browser automation.

## Prerequisites
- Playwright MCP server must be available
- User must be present (session timeouts, potential page reloads)

## Step 1: Navigate to search page
Open https://handelsregister.de/rp_web/normalesuche/welcome.xhtml in the browser.
Wait for the page to fully load (look for the search form with "Firma oder Schlagwoerter" textarea).

## Step 2: Fill search form
Enter [[companyName]] into the "Firma oder Schlagwoerter" textarea.
If [[location]] is provided, enter it into the "Niederlassung / Sitz" field (max 30 characters).
If a specific register type is needed, select from the "Registerart" dropdown (HRA, HRB, GnR, PR, VR, GsR).
Set "Ergebnisse pro Seite" to 100 for maximum results per page.

## Step 3: Submit search
Click the search button ("Suchen").
Wait for results to load — the page will show a results table or a "keine Treffer" message.

## Step 4: Parse results
The results table contains columns:
- Firma (company name)
- Gericht (court)
- Bundesland (state)
- Registerart (register type — HRA, HRB, etc.)
- Registernummer (register number)
- Sitz (registered office)
- Status

Extract all rows from the table. Each row represents one register entry.
Note: A single company may have multiple entries (main office + branches).

## Step 5: Get details (optional)
Click on a company name to view the detailed registration data.
The SI (Structured Index) document is free and shows current register contents.
The CD (Chronological Document) costs EUR 4.50 — ask the user before proceeding.

## Step 6: Handle pagination
If more than 100 results, look for pagination controls.
The page shows up to 200 results initially with a link to double the count.

## Error handling
- If "keine Treffer" appears, try broader search terms or enable fuzzy matching
- If session expires, reload the page and repeat the search
- If the page does not load, check if handelsregister.de is reachable

## Output format
Present results as a markdown table:
| Company | Court | State | Type | Number | Office | Status |
`
