export const list = {
    meta: {
        name: 'tradingTimeframes',
        version: '2.0.0',
        description: 'Trading timeframes with provider-specific slug mappings.',
        fields: [
            { key: 'alias', type: 'string', optional: false },
            { key: 'seconds', type: 'number', optional: false },
            { key: 'moralisSlug', type: 'string', optional: true },
            { key: 'solanaTrackerSlug', type: 'string', optional: true },
            { key: 'taapiSlug', type: 'string', optional: true },
            { key: 'cryptoWizardsSlug', type: 'string', optional: true }
        ]
    },
    entries: [
        { alias: '1s', seconds: 1, moralisSlug: '1s', solanaTrackerSlug: '1s' },
        { alias: '5s', seconds: 5, solanaTrackerSlug: '5s' },
        { alias: '10s', seconds: 10, moralisSlug: '10s' },
        { alias: '15s', seconds: 15, solanaTrackerSlug: '15s' },
        { alias: '30s', seconds: 30, moralisSlug: '30s' },
        { alias: '1m', seconds: 60, moralisSlug: '1min', taapiSlug: '1m', solanaTrackerSlug: '1m' },
        { alias: '3m', seconds: 180, solanaTrackerSlug: '3m' },
        { alias: '5m', seconds: 300, moralisSlug: '5min', taapiSlug: '5m', solanaTrackerSlug: '5m', cryptoWizardsSlug: 'Min5' },
        { alias: '10m', seconds: 600, moralisSlug: '10min' },
        { alias: '15m', seconds: 900, taapiSlug: '15m', solanaTrackerSlug: '15m' },
        { alias: '30m', seconds: 1800, moralisSlug: '30min', taapiSlug: '30m', solanaTrackerSlug: '30m' },
        { alias: '1h', seconds: 3600, moralisSlug: '1h', taapiSlug: '1h', solanaTrackerSlug: '1h', cryptoWizardsSlug: 'Hourly' },
        { alias: '2h', seconds: 7200, taapiSlug: '2h', solanaTrackerSlug: '2h' },
        { alias: '4h', seconds: 14400, moralisSlug: '4h', taapiSlug: '4h', solanaTrackerSlug: '4h' },
        { alias: '6h', seconds: 21600, solanaTrackerSlug: '6h' },
        { alias: '8h', seconds: 28800, solanaTrackerSlug: '8h' },
        { alias: '12h', seconds: 43200, moralisSlug: '12h', taapiSlug: '12h', solanaTrackerSlug: '12h' },
        { alias: '1d', seconds: 86400, moralisSlug: '1d', taapiSlug: '1d', solanaTrackerSlug: '1d', cryptoWizardsSlug: 'Daily' },
        { alias: '3d', seconds: 259200, solanaTrackerSlug: '3d' },
        { alias: '1w', seconds: 604800, moralisSlug: '1w', taapiSlug: '1w', solanaTrackerSlug: '1w' },
        { alias: '1M', seconds: 2592000, moralisSlug: '1M', solanaTrackerSlug: '1mn' }
    ]
}
