export const list = {
    meta: {
        name: 'germanBundeslaender',
        version: '2.0.0',
        description: 'German federal states (Bundeslaender) with official two-letter codes.',
        fields: [
            { key: 'code', type: 'string', optional: false },
            { key: 'name', type: 'string', optional: false }
        ]
    },
    entries: [
        { code: 'bw', name: 'Baden-Wuerttemberg' },
        { code: 'by', name: 'Bayern' },
        { code: 'be', name: 'Berlin' },
        { code: 'br', name: 'Brandenburg' },
        { code: 'hb', name: 'Bremen' },
        { code: 'hh', name: 'Hamburg' },
        { code: 'he', name: 'Hessen' },
        { code: 'mv', name: 'Mecklenburg-Vorpommern' },
        { code: 'ni', name: 'Niedersachsen' },
        { code: 'nw', name: 'Nordrhein-Westfalen' },
        { code: 'rp', name: 'Rheinland-Pfalz' },
        { code: 'sl', name: 'Saarland' },
        { code: 'sn', name: 'Sachsen' },
        { code: 'st', name: 'Sachsen-Anhalt' },
        { code: 'sh', name: 'Schleswig-Holstein' },
        { code: 'th', name: 'Thueringen' }
    ]
}
