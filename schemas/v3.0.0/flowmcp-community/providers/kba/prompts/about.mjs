export const content = `The KBA (Kraftfahrt-Bundesamt) publishes German vehicle registration statistics — new registrations, vehicle fleet, transfers, deregistrations, and inspections.

## Data sources (3 paths)

### Path 1: kba.de (Excel downloads)
- URL: https://www.kba.de/DE/Statistik/Fahrzeuge/fahrzeuge_node.html
- Navigation-based: browse by category (Neuzulassungen, Bestand, Umschreibungen, etc.)
- Publications in Excel format organized as statistical products (FZ 1, FZ 2, FZ 3, etc.)
- Sub-categories: vehicle class, manufacturer, region, fuel type, emissions, color, segments
- German only for most detailed statistics

### Path 2: ArcGIS Statistikportal (interactive)
- URL: https://das-kba-statistikportal.hub.arcgis.com/search
- Categories: Fahrzeuge (Vehicles), Kraftfahrende (Drivers), Kraftverkehr (Traffic)
- Export formats: CSV, KML, ZIP, GeoJSON, GeoTIFF, PNG
- Has ArcGIS REST API infrastructure
- No registration required

### Path 3: Open Data via Mobilithek
- URL: https://mobilithek.info/
- Machine-readable formats
- License: Datenlizenz Deutschland — Namensnennung — Version 2.0

## Limitations
- No single search form — navigation-based hierarchy with download links
- Most detailed statistics only in German
- No registration required for public statistics
- No CAPTCHA or documented rate limits
- Contact: statistikportal@kba.de or opendata@kba.de
`
