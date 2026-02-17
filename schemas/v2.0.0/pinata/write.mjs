// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Root not https: "https:..."
// requiredLibraries: pinata
// Import: import { PinataSDK } from "pinata";

export const main = {
    namespace: 'pinata',
    name: 'Pinata SDK Upload',
    description: 'Upload text content to IPFS via Pinata — creates a text file and pins it to IPFS using the Pinata SDK, returning the CID for permanent decentralized storage.',
    version: '2.0.0',
    docs: ['https://docs.pinata.cloud/sdk-pinning/pinata-upload'],
    tags: ['ipfs', 'storage', 'write', 'cacheTtlDaily'],
    root: 'https:...',
    requiredServerParams: ['PINATA_JWT', 'PINATA_GATEWAY'],
    routes: {
        upload_text_file: {
            method: 'POST',
            path: '/sdk/upload',
            description: 'Uploads a plain text file to IPFS using the new Pinata SDK via Pinata IPFS. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'filename', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'content', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    },
    requiredLibraries: ['pinata']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const PinataSDK = libraries['pinata']

    return {
        upload_text_file: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { pinata_jwt_token, pinata_gateway } = userParams['_allParams']

                const pinata = new PinataSDK( {
                pinataJwt: pinata_jwt_token,
                pinataGateway: pinata_gateway
                } )

                try {
                const file = new File( [ userParams.content ], userParams.filename, { type: "text/plain" } )
                const upload = await pinata.upload.public.file( file )
                struct['status'] = true
                struct['data'] = upload
                } catch( error ) {
                struct.status = false;
                struct.messages.push(error?.message || "Upload failed")
                }

                return { struct }
            }
        }
    }
}
