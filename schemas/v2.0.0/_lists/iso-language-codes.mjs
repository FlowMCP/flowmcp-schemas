export const list = {
    meta: {
        name: 'isoLanguageCodes',
        version: '2.0.0',
        description: 'ISO 639-1 language codes.',
        fields: [
            { key: 'code', type: 'string', optional: false },
            { key: 'name', type: 'string', optional: false }
        ]
    },
    entries: [
        { code: 'ar', name: 'Arabic' },
        { code: 'de', name: 'German' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'he', name: 'Hebrew' },
        { code: 'it', name: 'Italian' },
        { code: 'nl', name: 'Dutch' },
        { code: 'no', name: 'Norwegian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'sv', name: 'Swedish' },
        { code: 'ud', name: 'Urdu' },
        { code: 'zh', name: 'Chinese' }
    ]
}
