const content = `
## Step 1: Navigate to search page

Open https://handelsregister.de/rp_web/normalesuche/welcome.xhtml in the browser.
Wait for the page to fully load (look for the search form with "Firma oder Schlagwoerter" textarea).

## Step 2: Fill search form

Enter {{input:companyName}} into the "Firma oder Schlagwoerter" textarea.
If {{input:location}} is provided, enter it into the "Niederlassung / Sitz" field (max 30 characters).
If {{input:registerType}} is provided, select from the "Registerart" dropdown.
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

- If "keine Treffer" appears, try broader search terms or enable fuzzy matching checkbox
- If session expires, reload the page and repeat the search
- If the page does not load, check if handelsregister.de is reachable

## Output format

Present results as a markdown table:
| Company | Court | State | Type | Number | Office | Status |
`


export const skill = {
    name: 'search-company',
    version: 'flowmcp-skill/1.0.0',
    description: 'Search for a company in the German commercial register (handelsregister.de) using Playwright browser automation. Free search with up to 200 results.',
    requires: {
        tools: [],
        resources: [],
        external: ['playwright']
    },
    input: [
        {
            key: 'companyName',
            type: 'string',
            description: 'Company name or keywords to search for',
            required: true
        },
        {
            key: 'location',
            type: 'string',
            description: 'Business location (city or region, max 30 characters)',
            required: false
        },
        {
            key: 'registerType',
            type: 'enum',
            description: 'Type of register to search',
            required: false,
            values: ['HRA', 'HRB', 'GnR', 'PR', 'VR', 'GsR']
        }
    ],
    output: 'Markdown table with company name, court, state, register type, number, office, and status for each matching entry.',
    content
}
