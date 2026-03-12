export const main = {
    namespace: 'esagaia',
    name: 'ESA Gaia Archive',
    description: 'Query the ESA Gaia DR3 stellar catalog via TAP/ADQL — access astrometry, photometry, and radial velocities for billions of stars from the Gaia space mission.',
    version: '3.0.0',
    docs: ['https://gea.esac.esa.int/tap-server/tap', 'https://www.cosmos.esa.int/web/gaia-users/archive/writing-queries'],
    tags: ['astronomy', 'stars', 'esa', 'opendata', 'cacheTtlStatic'],
    root: 'https://gea.esac.esa.int',
    requiredServerParams: [],
    headers: {},
    tools: {
        coneSearch: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Search stars within a circular sky region by right ascension, declination, and angular radius in arcminutes. Returns astrometric and photometric parameters from Gaia DR3.',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} source_id,ra,dec,parallax,pmra,pmdec,phot_g_mean_mag,phot_bp_mean_mag,phot_rp_mean_mag,bp_rp,radial_velocity,DISTANCE({{RA}},{{DEC}},ra,dec) AS ang_sep FROM gaiadr3.gaia_source WHERE DISTANCE({{RA}},{{DEC}},ra,dec) < {{RADIUS_ARCMIN}}/60.0 AND phot_g_mean_mag < {{MAG_LIMIT}} ORDER BY ang_sep ASC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Cone search around LMC center (5 arcmin, mag < 18)', RA: '81.28', DEC: '-69.78', RADIUS_ARCMIN: '5', MAG_LIMIT: '18', LIMIT: '100' },
                { _description: 'Cone search around Pleiades (10 arcmin, mag < 15)', RA: '56.75', DEC: '24.12', RADIUS_ARCMIN: '10', MAG_LIMIT: '15', LIMIT: '100' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of Gaia DR3 source records sorted by angular separation',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees (J2016.0)' },
                            dec: { type: 'number', description: 'Declination in degrees (J2016.0)' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds' },
                            pmra: { type: 'number', description: 'Proper motion in RA in mas/yr' },
                            pmdec: { type: 'number', description: 'Proper motion in Dec in mas/yr' },
                            phot_g_mean_mag: { type: 'number', description: 'G-band mean magnitude' },
                            phot_bp_mean_mag: { type: 'number', description: 'BP-band mean magnitude' },
                            phot_rp_mean_mag: { type: 'number', description: 'RP-band mean magnitude' },
                            bp_rp: { type: 'number', description: 'BP-RP color index' },
                            radial_velocity: { type: 'number', description: 'Radial velocity in km/s' },
                            ang_sep: { type: 'number', description: 'Angular separation from search center in degrees' }
                        }
                    }
                }
            }
        },
        brightStars: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Get the brightest stars from Gaia DR3 catalog up to a given magnitude limit. Returns astrometric parameters, photometry, and radial velocities.',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} source_id,ra,dec,parallax,pmra,pmdec,phot_g_mean_mag,bp_rp,radial_velocity,teff_gspphot,logg_gspphot FROM gaiadr3.gaia_source WHERE phot_g_mean_mag < {{MAG_LIMIT}} AND parallax IS NOT NULL ORDER BY phot_g_mean_mag ASC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get 50 brightest stars (mag < 3)', MAG_LIMIT: '3', LIMIT: '50' },
                { _description: 'Get 100 bright stars (mag < 5)', MAG_LIMIT: '5', LIMIT: '100' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of bright Gaia DR3 sources sorted by magnitude',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees' },
                            dec: { type: 'number', description: 'Declination in degrees' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds' },
                            pmra: { type: 'number', description: 'Proper motion in RA in mas/yr' },
                            pmdec: { type: 'number', description: 'Proper motion in Dec in mas/yr' },
                            phot_g_mean_mag: { type: 'number', description: 'G-band mean magnitude' },
                            bp_rp: { type: 'number', description: 'BP-RP color index' },
                            radial_velocity: { type: 'number', description: 'Radial velocity in km/s' },
                            teff_gspphot: { type: 'number', description: 'Effective temperature from GSP-Phot in Kelvin' },
                            logg_gspphot: { type: 'number', description: 'Surface gravity from GSP-Phot in log(cm/s2)' }
                        }
                    }
                }
            }
        },
        nearbyStars: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Find the nearest stars to the Sun by selecting sources with the largest parallax values. Returns full astrometric and astrophysical parameters.',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} source_id,ra,dec,parallax,parallax_error,pmra,pmdec,phot_g_mean_mag,bp_rp,radial_velocity,teff_gspphot FROM gaiadr3.gaia_source WHERE parallax > {{MIN_PARALLAX}} AND parallax_error/parallax < 0.1 ORDER BY parallax DESC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get 50 nearest stars (parallax > 100 mas = within ~10 pc)', MIN_PARALLAX: '100', LIMIT: '50' },
                { _description: 'Get 100 nearby stars (parallax > 50 mas = within ~20 pc)', MIN_PARALLAX: '50', LIMIT: '100' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of nearby stars sorted by distance (largest parallax first)',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees' },
                            dec: { type: 'number', description: 'Declination in degrees' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds (1000/parallax = distance in pc)' },
                            parallax_error: { type: 'number', description: 'Parallax uncertainty in milliarcseconds' },
                            pmra: { type: 'number', description: 'Proper motion in RA in mas/yr' },
                            pmdec: { type: 'number', description: 'Proper motion in Dec in mas/yr' },
                            phot_g_mean_mag: { type: 'number', description: 'G-band mean magnitude' },
                            bp_rp: { type: 'number', description: 'BP-RP color index' },
                            radial_velocity: { type: 'number', description: 'Radial velocity in km/s' },
                            teff_gspphot: { type: 'number', description: 'Effective temperature in Kelvin' }
                        }
                    }
                }
            }
        },
        highProperMotion: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Find stars with high proper motion, indicating nearby or fast-moving stars. Useful for studying stellar kinematics and local stellar populations.',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} source_id,ra,dec,parallax,pmra,pmdec,SQRT(pmra*pmra+pmdec*pmdec) AS total_pm,phot_g_mean_mag,bp_rp,radial_velocity FROM gaiadr3.gaia_source WHERE SQRT(pmra*pmra+pmdec*pmdec) > {{MIN_PM}} AND parallax IS NOT NULL ORDER BY total_pm DESC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get 50 stars with proper motion > 1000 mas/yr', MIN_PM: '1000', LIMIT: '50' },
                { _description: 'Get 100 stars with proper motion > 500 mas/yr', MIN_PM: '500', LIMIT: '100' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of high proper motion stars sorted by total proper motion',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees' },
                            dec: { type: 'number', description: 'Declination in degrees' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds' },
                            pmra: { type: 'number', description: 'Proper motion in RA in mas/yr' },
                            pmdec: { type: 'number', description: 'Proper motion in Dec in mas/yr' },
                            total_pm: { type: 'number', description: 'Total proper motion in mas/yr' },
                            phot_g_mean_mag: { type: 'number', description: 'G-band mean magnitude' },
                            bp_rp: { type: 'number', description: 'BP-RP color index' },
                            radial_velocity: { type: 'number', description: 'Radial velocity in km/s' }
                        }
                    }
                }
            }
        },
        colorMagnitudeDiagram: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Get data for a Hertzsprung-Russell (color-magnitude) diagram by querying stars with good parallax in a sky region. Returns BP-RP color and absolute G magnitude.',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} source_id,ra,dec,parallax,bp_rp,phot_g_mean_mag,phot_g_mean_mag+5*LOG10(parallax/1000)+5 AS abs_g_mag FROM gaiadr3.gaia_source WHERE DISTANCE({{RA}},{{DEC}},ra,dec) < {{RADIUS_ARCMIN}}/60.0 AND parallax > 0 AND parallax_error/parallax < 0.1 AND bp_rp IS NOT NULL ORDER BY phot_g_mean_mag ASC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'HR diagram data for Pleiades cluster (10 arcmin radius)', RA: '56.75', DEC: '24.12', RADIUS_ARCMIN: '30', LIMIT: '500' },
                { _description: 'HR diagram data for Hyades cluster', RA: '66.75', DEC: '15.87', RADIUS_ARCMIN: '120', LIMIT: '500' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of sources with color and magnitude data for HR diagram plotting',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees' },
                            dec: { type: 'number', description: 'Declination in degrees' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds' },
                            bp_rp: { type: 'number', description: 'BP-RP color index (x-axis for HR diagram)' },
                            phot_g_mean_mag: { type: 'number', description: 'Apparent G-band magnitude' },
                            abs_g_mag: { type: 'number', description: 'Absolute G-band magnitude (y-axis for HR diagram)' }
                        }
                    }
                }
            }
        },
        variableStars: {
            method: 'GET',
            path: '/tap-server/tap/sync',
            description: 'Query the Gaia DR3 variable star summary table to find variable stars classified by variability type (RR Lyrae, Cepheids, eclipsing binaries, etc.).',
            parameters: [
                { position: { key: 'REQUEST', value: 'doQuery', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'LANG', value: 'ADQL', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'FORMAT', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'QUERY', value: 'SELECT TOP {{LIMIT}} v.source_id,g.ra,g.dec,g.phot_g_mean_mag,g.bp_rp,g.parallax,v.best_class_name,v.best_class_score,v.num_selected_g_fov FROM gaiadr3.vari_summary AS v JOIN gaiadr3.gaia_source AS g ON v.source_id=g.source_id WHERE v.best_class_name=\'{{VAR_TYPE}}\' AND v.best_class_score > 0.5 ORDER BY g.phot_g_mean_mag ASC', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get 100 brightest RR Lyrae variable stars', VAR_TYPE: 'RR_LYRAE', LIMIT: '100' },
                { _description: 'Get 50 brightest Cepheid variable stars', VAR_TYPE: 'CEPHEID', LIMIT: '50' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    description: 'Array of variable stars with classification and photometric data',
                    items: {
                        type: 'object',
                        properties: {
                            source_id: { type: 'number', description: 'Unique Gaia source identifier' },
                            ra: { type: 'number', description: 'Right ascension in degrees' },
                            dec: { type: 'number', description: 'Declination in degrees' },
                            phot_g_mean_mag: { type: 'number', description: 'G-band mean magnitude' },
                            bp_rp: { type: 'number', description: 'BP-RP color index' },
                            parallax: { type: 'number', description: 'Parallax in milliarcseconds' },
                            best_class_name: { type: 'string', description: 'Best variability classification' },
                            best_class_score: { type: 'number', description: 'Classification confidence score (0-1)' },
                            num_selected_g_fov: { type: 'number', description: 'Number of selected G-band field-of-view transits' }
                        }
                    }
                }
            }
        }
    }
}
