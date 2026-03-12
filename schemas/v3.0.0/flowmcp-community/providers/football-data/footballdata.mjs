export const main = {
    namespace: 'footballdata',
    name: 'football-data.org',
    description: 'RESTful API covering 183 football competitions worldwide with matches, standings, teams, scorers, and player data.',
    version: '3.0.0',
    docs: ['https://docs.football-data.org/general/v4/index.html'],
    tags: ['sports', 'football', 'soccer', 'competitions', 'worldwide', 'cacheTtlFrequent'],
    root: 'https://api.football-data.org/v4',
    requiredServerParams: ['FOOTBALLDATA_API_KEY'],
    headers: {
        'X-Auth-Token': '{{FOOTBALLDATA_API_KEY}}'
    },
    tools: {
        listCompetitions: {
            method: 'GET',
            path: '/competitions',
            description: 'Returns all available football competitions worldwide with season info and metadata.',
            parameters: [],
            tests: [
                { _description: 'List all competitions' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        filters: { type: 'object' },
                        competitions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    name: { type: 'string' },
                                    code: { type: 'string' },
                                    type: { type: 'string' },
                                    emblem: { type: 'string' },
                                    plan: { type: 'string' },
                                    area: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            code: { type: 'string' },
                                            flag: { type: 'string' }
                                        }
                                    },
                                    currentSeason: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            startDate: { type: 'string' },
                                            endDate: { type: 'string' },
                                            currentMatchday: { type: 'integer' }
                                        }
                                    },
                                    numberOfAvailableSeasons: { type: 'integer' },
                                    lastUpdated: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getCompetition: {
            method: 'GET',
            path: '/competitions/:competitionId',
            description: 'Returns details for a specific competition including current season and available seasons.',
            parameters: [
                { position: { key: 'competitionId', value: '{{COMPETITION_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Bundesliga competition details', COMPETITION_ID: 'BL1' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        code: { type: 'string' },
                        type: { type: 'string' },
                        emblem: { type: 'string' },
                        area: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                code: { type: 'string' },
                                flag: { type: 'string' }
                            }
                        },
                        currentSeason: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                startDate: { type: 'string' },
                                endDate: { type: 'string' },
                                currentMatchday: { type: 'integer' }
                            }
                        },
                        seasons: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    startDate: { type: 'string' },
                                    endDate: { type: 'string' },
                                    currentMatchday: { type: 'integer' }
                                }
                            }
                        },
                        lastUpdated: { type: 'string' }
                    }
                }
            }
        },
        getCompetitionMatches: {
            method: 'GET',
            path: '/competitions/:competitionId/matches',
            description: 'Returns matches for a competition with optional season and matchday filters.',
            parameters: [
                { position: { key: 'competitionId', value: '{{COMPETITION_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'season', value: '{{SEASON}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'matchday', value: '{{MATCHDAY}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get Bundesliga matches for matchday 1 of 2024', COMPETITION_ID: 'BL1', SEASON: 2024, MATCHDAY: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        filters: { type: 'object' },
                        competition: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                code: { type: 'string' }
                            }
                        },
                        matches: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    utcDate: { type: 'string' },
                                    status: { type: 'string' },
                                    matchday: { type: 'integer' },
                                    homeTeam: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            shortName: { type: 'string' },
                                            crest: { type: 'string' }
                                        }
                                    },
                                    awayTeam: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            shortName: { type: 'string' },
                                            crest: { type: 'string' }
                                        }
                                    },
                                    score: {
                                        type: 'object',
                                        properties: {
                                            winner: { type: 'string' },
                                            fullTime: {
                                                type: 'object',
                                                properties: {
                                                    home: { type: 'integer' },
                                                    away: { type: 'integer' }
                                                }
                                            },
                                            halfTime: {
                                                type: 'object',
                                                properties: {
                                                    home: { type: 'integer' },
                                                    away: { type: 'integer' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getCompetitionStandings: {
            method: 'GET',
            path: '/competitions/:competitionId/standings',
            description: 'Returns league standings including total, home, and away tables.',
            parameters: [
                { position: { key: 'competitionId', value: '{{COMPETITION_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'season', value: '{{SEASON}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get Premier League standings for 2024 season', COMPETITION_ID: 'PL', SEASON: 2024 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        competition: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                code: { type: 'string' }
                            }
                        },
                        season: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                startDate: { type: 'string' },
                                endDate: { type: 'string' },
                                currentMatchday: { type: 'integer' }
                            }
                        },
                        standings: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    stage: { type: 'string' },
                                    type: { type: 'string' },
                                    table: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                position: { type: 'integer' },
                                                team: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'integer' },
                                                        name: { type: 'string' },
                                                        shortName: { type: 'string' },
                                                        crest: { type: 'string' }
                                                    }
                                                },
                                                playedGames: { type: 'integer' },
                                                won: { type: 'integer' },
                                                draw: { type: 'integer' },
                                                lost: { type: 'integer' },
                                                points: { type: 'integer' },
                                                goalsFor: { type: 'integer' },
                                                goalsAgainst: { type: 'integer' },
                                                goalDifference: { type: 'integer' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getCompetitionTopScorers: {
            method: 'GET',
            path: '/competitions/:competitionId/scorers',
            description: 'Returns top scorers for a competition ranked by goals.',
            parameters: [
                { position: { key: 'competitionId', value: '{{COMPETITION_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'season', value: '{{SEASON}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get Bundesliga top 10 scorers for 2024 season', COMPETITION_ID: 'BL1', SEASON: 2024, LIMIT: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        competition: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                code: { type: 'string' }
                            }
                        },
                        season: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                startDate: { type: 'string' },
                                endDate: { type: 'string' }
                            }
                        },
                        scorers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    player: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            nationality: { type: 'string' }
                                        }
                                    },
                                    team: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            shortName: { type: 'string' },
                                            crest: { type: 'string' }
                                        }
                                    },
                                    goals: { type: 'integer' },
                                    assists: { type: 'integer' },
                                    penalties: { type: 'integer' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getCompetitionTeams: {
            method: 'GET',
            path: '/competitions/:competitionId/teams',
            description: 'Returns all teams for a competition season.',
            parameters: [
                { position: { key: 'competitionId', value: '{{COMPETITION_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'season', value: '{{SEASON}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all Bundesliga teams for 2024 season', COMPETITION_ID: 'BL1', SEASON: 2024 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        competition: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                code: { type: 'string' }
                            }
                        },
                        season: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                startDate: { type: 'string' },
                                endDate: { type: 'string' },
                                currentMatchday: { type: 'integer' }
                            }
                        },
                        teams: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    name: { type: 'string' },
                                    shortName: { type: 'string' },
                                    tla: { type: 'string' },
                                    crest: { type: 'string' },
                                    address: { type: 'string' },
                                    website: { type: 'string' },
                                    founded: { type: 'integer' },
                                    venue: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getTeam: {
            method: 'GET',
            path: '/teams/:teamId',
            description: 'Returns detailed team information including squad and coaching staff.',
            parameters: [
                { position: { key: 'teamId', value: '{{TEAM_ID}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get FC Bayern Munich team details', TEAM_ID: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        shortName: { type: 'string' },
                        tla: { type: 'string' },
                        crest: { type: 'string' },
                        address: { type: 'string' },
                        website: { type: 'string' },
                        founded: { type: 'integer' },
                        clubColors: { type: 'string' },
                        venue: { type: 'string' },
                        squad: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    name: { type: 'string' },
                                    position: { type: 'string' },
                                    nationality: { type: 'string' }
                                }
                            }
                        },
                        coach: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                nationality: { type: 'string' }
                            }
                        },
                        lastUpdated: { type: 'string' }
                    }
                }
            }
        },
        getTodaysMatches: {
            method: 'GET',
            path: '/matches',
            description: 'Returns all matches scheduled for today across all competitions.',
            parameters: [],
            tests: [
                { _description: 'Get all matches scheduled for today' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'integer' },
                        filters: { type: 'object' },
                        matches: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    utcDate: { type: 'string' },
                                    status: { type: 'string' },
                                    competition: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            code: { type: 'string' }
                                        }
                                    },
                                    homeTeam: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            shortName: { type: 'string' }
                                        }
                                    },
                                    awayTeam: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            shortName: { type: 'string' }
                                        }
                                    },
                                    score: {
                                        type: 'object',
                                        properties: {
                                            winner: { type: 'string' },
                                            fullTime: {
                                                type: 'object',
                                                properties: {
                                                    home: { type: 'integer' },
                                                    away: { type: 'integer' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
