export const content = `The ETSI IPR Database at ipr.etsi.org contains Standard Essential Patent (SEP) declarations made to ETSI standards.

## Scale
- 272 ETSI Projects
- 18,611 Standards
- 432 Declaring Companies (Apple, Cisco, Ericsson, Google, Huawei, Intel, Qualcomm, Samsung, etc.)
- 134,191 Patent families
- 6,473 Declarations

## What is available
- SEP declarations by company, standard, project, and date range
- Patent family details with links to EPO Espacenet
- Licensing position (prepared / not prepared per ETSI IPR Policy clause 6.1)
- Declaration types: General Declaration and Information Statement & Licensing Declaration (IS&LD)

## Access
- No registration required for read-only search
- No CAPTCHA documented
- AJAX-based interface with slice-based pagination (20 results per page)
- CSV export available (up to ~20,000 rows direct download, larger sets sent via email)
- Dynamic Reporting with pivot-style analysis and CSV export
- Power BI report available under Reporting tab

## Patent family display
- Basis patent shown in bold black
- Auto-imported patents (from EPO via priority numbers) in grey
- Explicitly declared patents in black
- Un-normalized patents in purple (no EPO match)

## Limitations
- Web interface only — no REST API
- ASP.NET + Telerik AJAX application — requires Playwright for automation
- Session-based with ViewState — maintain session during navigation
- Scheduled maintenance windows (typically Monday evenings CET)
- Signed declaration forms prevail over database entries
`
