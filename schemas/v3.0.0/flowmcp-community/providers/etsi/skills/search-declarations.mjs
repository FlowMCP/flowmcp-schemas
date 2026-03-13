const content = `
## Step 1: Navigate to search page

Open https://ipr.etsi.org/ in the browser.
Wait for the search form to fully load (look for the "Declaring Companies" multi-select list).
Accept any disclaimer dialog if shown.

## Step 2: Fill search criteria

**By company:** Select {{input:companyName}} from the "Declaring Companies" multi-select list (432 companies).
Hold CTRL to select multiple companies.

**By standard:** If {{input:standard}} is provided, first select the ETSI Project from the "ETSI Projects" list (272 projects, loaded via AJAX). Then select the specific work item from the dependent "Work Item / Standard / Specification No." list (updates dynamically based on project selection).

**By date range:** If date filtering is needed, use the date pickers (format: dd/MM/yyyy).

**By licensing position:** Select "Prepared" or "Not prepared" from the dropdown if relevant.

## Step 3: Execute search

Click the search/submit button.
Wait for results to load — the interface uses AJAX and may take several seconds.

## Step 4: Parse results

Results appear in a paginated grid (20 results per page).
Each row shows: declaration reference, company, project, standard, declaration type, date, licensing position.
Column headers have text boxes for additional filtering within results.

Use pagination controls (dropdown with 20-element slices, arrow buttons) to navigate through all results.

## Step 5: View declaration details (optional)

Click on a declaration row to open the detail view.
For IS&LD declarations, two tabs are available:
- Tab 1: Company info + licensing conditions
- Tab 2: IPR Information Statement Annex with patent families and standards

Patent families show links to EPO Espacenet for normalized patents.

## Step 6: Export results as CSV

Look for the CSV export button/link in the results view.
Direct download works for up to ~20,000 rows.
For larger result sets, the system sends the CSV via email.

## Alternative: Dynamic Reporting

Navigate to the Reporting section for pivot-style analysis.
Select criteria in order: projects, standards, companies, patent offices, applicants, families, patents.
Drill down through the hierarchy and export to CSV.

## Error handling

- If the page shows a maintenance message, try again later (typically Monday evenings CET)
- If AJAX calls fail, reload the page to reset the ViewState
- If the company list does not load, wait for the AJAX request to complete

## Output format

Present results as a markdown table:
| Reference | Company | Project | Standard | Type | Date | Licensing |

For patent family details, include patent numbers with EPO Espacenet links where available.
`


export const skill = {
    name: 'search-declarations',
    version: 'flowmcp-skill/1.0.0',
    description: 'Search Standard Essential Patent (SEP) declarations in the ETSI IPR database and export results as CSV using Playwright. Covers 134K+ patent families from 432 companies.',
    requires: {
        tools: [],
        resources: [],
        external: ['playwright']
    },
    input: [
        {
            key: 'companyName',
            type: 'string',
            description: 'Declaring company name to search for (e.g. Qualcomm, Samsung, Huawei)',
            required: true
        },
        {
            key: 'standard',
            type: 'string',
            description: 'ETSI standard or project to filter by (e.g. 3GPP LTE, 5G NR, WLAN)',
            required: false
        }
    ],
    output: 'Markdown table with declaration reference, company, project, standard, type, date, and licensing position. Optional CSV export link.',
    content
}
