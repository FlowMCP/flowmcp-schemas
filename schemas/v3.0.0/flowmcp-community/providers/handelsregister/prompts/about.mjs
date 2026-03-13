export const content = `The German Commercial Register (Handelsregister) at handelsregister.de provides official company registration data for all German businesses.

## What is available
- Company name, legal form, registered office
- Register court, register type (HRA, HRB, GnR, PR, VR), register number
- Current registration status (active/closed)
- Free: basic search results and SI (Structured Index) printout
- Paid (EUR 4.50): CD (Chronological Document) with full history, share capital, legal relationships

## Access
- No registration required for searching
- No API available — web interface only
- No CAPTCHA, but session timeouts after extended inactivity
- Maximum 200 results per query (can be doubled iteratively)

## Search options
- Normal search: company name/keywords, location, register type, register number, court
- Advanced search: adds federal state, legal form, country, postal code, street
- Search modes: all keywords, at least one keyword, exact company name
- Phonetic/fuzzy matching available via checkbox

## Limitations
- No bulk export functionality
- Full register extracts require payment
- JSF/XHTML web application — requires Playwright for automation
- User must be present for any CAPTCHA or session issues
`
