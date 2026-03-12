export const main = {
    namespace: 'nhtsavpic',
    name: 'NhtsaVpic',
    description: 'Decode US vehicle VINs and look up vehicle make, model, and manufacturer data via the NHTSA vPIC (Vehicle Product Information Catalog) API. Provides official US government vehicle identification data with no API key required.',
    version: '3.0.0',
    docs: ['https://vpic.nhtsa.dot.gov/api/'],
    tags: ['vehicles', 'automotive', 'vin', 'usa', 'government', 'cacheTtlStatic'],
    root: 'https://vpic.nhtsa.dot.gov/api/vehicles',
    requiredServerParams: [],
    headers: {},
    tools: {
        decodeVinValues: {
            method: 'GET',
            path: '/DecodeVinValues/:vin',
            description: 'Decode a VIN and return all vehicle attributes as flat key-value pairs. Returns make, model, model year, vehicle type, body class, manufacturer, plant location, engine specs, and 50+ other fields.',
            parameters: [
                { position: { key: 'vin', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'modelyear', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Decode a Honda Civic VIN', vin: '1HGBH41JXMN109186' },
                { _description: 'Decode a Ford F-150 VIN', vin: '1FTFW1ET5DFA77788' },
                { _description: 'Decode a Tesla Model 3 VIN', vin: '5YJ3E1EA7JF000316' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Number of result records' },
                        Message: { type: 'string', description: 'API response message' },
                        SearchCriteria: { type: 'string', description: 'The VIN searched' },
                        Results: {
                            type: 'array',
                            description: 'Array with one decoded VIN result object',
                            items: {
                                type: 'object',
                                properties: {
                                    VIN: { type: 'string', description: 'The decoded VIN' },
                                    Make: { type: 'string', description: 'Vehicle make (e.g. HONDA)' },
                                    MakeId: { type: 'string', description: 'Make identifier' },
                                    Model: { type: 'string', description: 'Vehicle model (e.g. Civic)' },
                                    ModelId: { type: 'string', description: 'Model identifier' },
                                    ModelYear: { type: 'string', description: 'Model year (e.g. 2021)' },
                                    VehicleType: { type: 'string', description: 'Type of vehicle (e.g. PASSENGER CAR)' },
                                    BodyClass: { type: 'string', description: 'Body style (e.g. Sedan/Saloon)' },
                                    Manufacturer: { type: 'string', description: 'Full manufacturer name' },
                                    ManufacturerId: { type: 'string', description: 'Manufacturer identifier' },
                                    PlantCity: { type: 'string', description: 'Assembly plant city' },
                                    PlantCountry: { type: 'string', description: 'Assembly plant country' },
                                    PlantState: { type: 'string', description: 'Assembly plant state' },
                                    ErrorCode: { type: 'string', description: 'Error code (0 = no error)' },
                                    ErrorText: { type: 'string', description: 'Error description if any' }
                                }
                            }
                        }
                    }
                }
            }
        },
        decodeWmi: {
            method: 'GET',
            path: '/DecodeWMI/:wmi',
            description: 'Decode a 3 or 6-character World Manufacturer Identifier (WMI — first 3 or 6 digits of a VIN) to identify the manufacturer, vehicle type, and country of origin.',
            parameters: [
                { position: { key: 'wmi', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Decode WMI for Toyota (JTD)', wmi: 'JTD' },
                { _description: 'Decode WMI for Ford (1FT)', wmi: '1FT' },
                { _description: 'Decode WMI for BMW (WBA)', wmi: 'WBA' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Number of results' },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    CommonName: { type: 'string', description: 'Common manufacturer name' },
                                    Country: { type: 'string', description: 'Country of manufacturer' },
                                    CreatedOn: { type: 'string', description: 'WMI registration date' },
                                    DateAvailableToRSA: { type: 'string', description: 'Date available to road safety authorities' },
                                    Name: { type: 'string', description: 'Full manufacturer name' },
                                    VehicleType: { type: 'string', description: 'Type of vehicle for this WMI' },
                                    WMI: { type: 'string', description: 'The WMI code' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getModelsForMakeYear: {
            method: 'GET',
            path: '/GetModelsForMakeYear/make/:make/modelyear/:year/vehicleType/:vehicleType',
            description: 'Get all models for a specific vehicle make, model year, and vehicle type. Returns a list of model names and IDs.',
            parameters: [
                { position: { key: 'make', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'vehicleType', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all Toyota car models for 2022', make: 'toyota', year: 2022, vehicleType: 'car' },
                { _description: 'Get all Ford truck models for 2023', make: 'ford', year: 2023, vehicleType: 'truck' },
                { _description: 'Get all Honda car models for 2021', make: 'honda', year: 2021, vehicleType: 'car' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Number of models found' },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Make_ID: { type: 'number', description: 'Make identifier' },
                                    Make_Name: { type: 'string', description: 'Make name' },
                                    Model_ID: { type: 'number', description: 'Model identifier' },
                                    Model_Name: { type: 'string', description: 'Model name' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getModelsForMake: {
            method: 'GET',
            path: '/GetModelsForMake/:make',
            description: 'Get all vehicle models for a specific make name. Returns all models ever produced by that manufacturer.',
            parameters: [
                { position: { key: 'make', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all Honda models', make: 'honda' },
                { _description: 'Get all Tesla models', make: 'tesla' },
                { _description: 'Get all Ford models', make: 'ford' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Total number of models' },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Make_ID: { type: 'number', description: 'Make identifier' },
                                    Make_Name: { type: 'string', description: 'Make name' },
                                    Model_ID: { type: 'number', description: 'Model identifier' },
                                    Model_Name: { type: 'string', description: 'Model name' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getAllMakes: {
            method: 'GET',
            path: '/GetAllMakes',
            description: 'Get a complete list of all vehicle makes registered in the NHTSA database. Returns thousands of makes with their IDs.',
            parameters: [
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all registered vehicle makes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Total number of makes' },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Make_ID: { type: 'number', description: 'Make identifier' },
                                    Make_Name: { type: 'string', description: 'Make name' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getVehicleTypesForMake: {
            method: 'GET',
            path: '/GetVehicleTypesForMake/:make',
            description: 'Get all vehicle types associated with a specific make name. Useful for determining what categories a manufacturer produces (cars, trucks, motorcycles, etc.).',
            parameters: [
                { position: { key: 'make', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get vehicle types for Toyota', make: 'toyota' },
                { _description: 'Get vehicle types for Harley-Davidson', make: 'harley-davidson' },
                { _description: 'Get vehicle types for Mercedes-Benz', make: 'mercedes-benz' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Count: { type: 'number', description: 'Number of vehicle types' },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    MakeId: { type: 'number', description: 'Make identifier' },
                                    MakeName: { type: 'string', description: 'Make name' },
                                    VehicleTypeId: { type: 'number', description: 'Vehicle type identifier' },
                                    VehicleTypeName: { type: 'string', description: 'Vehicle type name (e.g. Passenger Car, Truck)' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
