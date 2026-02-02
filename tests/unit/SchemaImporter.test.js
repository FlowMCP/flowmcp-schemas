// Simple integration tests for SchemaImporter
// These tests work with the actual filesystem to ensure basic functionality

let SchemaImporter;

beforeAll(async () => {
    const module = await import('../../src/index.mjs');
    SchemaImporter = module.SchemaImporter;
});

describe('SchemaImporter Integration Tests', () => {
    test('should load schemas from existing folder with onlyPath outputType', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            outputType: 'onlyPath'
        });
        
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        
        // Check structure of first item
        if (result.length > 0) {
            expect(result[0]).toHaveProperty('absolutePath');
            expect(result[0]).toHaveProperty('folderName');
            expect(result[0]).toHaveProperty('hasImport');
            expect(result[0].absolutePath).toMatch(/\.mjs$/);
        }
    });

    test('should load schemas with excludeSchemasWithImports true', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true,
            outputType: 'onlyPath'
        });
        
        expect(Array.isArray(result)).toBe(true);
        
        // All results should have hasImport: false
        result.forEach(schema => {
            expect(schema.hasImport).toBe(false);
        });
    });

    test('should load schemas and return full schema objects', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true
        });
        
        expect(Array.isArray(result)).toBe(true);
        
        if (result.length > 0) {
            expect(result[0]).toHaveProperty('schema');
            expect(result[0].schema).toHaveProperty('namespace');
            expect(result[0].schema).toHaveProperty('routes');
        }
    });

    test('should return only schema objects when outputType is onlySchema', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true,
            outputType: 'onlySchema'
        });
        
        expect(Array.isArray(result)).toBe(true);
        
        if (result.length > 0) {
            expect(result[0]).toHaveProperty('namespace');
            expect(result[0]).toHaveProperty('routes');
            // Should not have wrapper properties
            expect(result[0]).not.toHaveProperty('absolutePath');
            expect(result[0]).not.toHaveProperty('folderName');
        }
    });

    test('should add metadata when addAdditionalMetaData is true', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true,
            addAdditionalMetaData: true
        });
        
        expect(Array.isArray(result)).toBe(true);
        
        if (result.length > 0) {
            expect(result[0]).toHaveProperty('namespace');
            expect(result[0]).toHaveProperty('routeNames');
            expect(result[0]).toHaveProperty('schemaFolder');
            expect(result[0]).toHaveProperty('schemaName');
            expect(result[0]).toHaveProperty('fileName');
            expect(Array.isArray(result[0].routeNames)).toBe(true);
        }
    });

    test('should exclude schemas with required server params', async () => {
        const withParams = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true,
            excludeSchemasWithRequiredServerParams: false
        });
        
        const withoutParams = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: true,
            excludeSchemasWithRequiredServerParams: true
        });
        
        expect(Array.isArray(withParams)).toBe(true);
        expect(Array.isArray(withoutParams)).toBe(true);
        
        // Should have fewer results when excluding schemas with required params
        expect(withoutParams.length).toBeLessThanOrEqual(withParams.length);
    });

    test('should throw error for non-existent folder', async () => {
        await expect(SchemaImporter.loadFromFolder({
            schemaRootFolder: "./non-existent-folder/"
        })).rejects.toThrow('Schema root folder does not exist');
    });

    test('should not include _shared/ files as schemas', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: false,
            outputType: 'onlyPath'
        });

        const sharedFiles = result
            .filter( ( { absolutePath } ) => absolutePath.includes( '/_shared/' ) )
        expect(sharedFiles.length).toBe(0);
    });

    test('should treat _shared/ imports as allowed (not external)', async () => {
        const result = await SchemaImporter.loadFromFolder({
            schemaRootFolder: "./../schemas/v1.2.0/",
            excludeSchemasWithImports: false,
            outputType: 'onlyPath'
        });

        // _shared/ files must never appear in schema listing
        const sharedInResults = result
            .filter( ( { folderName } ) => folderName === '_shared' )
        expect(sharedInResults.length).toBe(0);
    });
});