import { EVM_CHAINS } from './evmChains.mjs'


const ALCHEMY_URL_TEMPLATE = 'https://{{slug}}.g.alchemy.com/v2/{{ALCHEMY_API_KEY}}'

const ALCHEMY_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.alchemyNetworkSlug !== undefined )

const getAlchemyUrl = ( { chainAlias, apiKey } ) => {
    const chain = EVM_CHAINS.find( ( c ) => c.alias === chainAlias )
    if( !chain?.alchemyNetworkSlug ) { return null }

    const url = ALCHEMY_URL_TEMPLATE
        .replace( '{{slug}}', chain.alchemyNetworkSlug )
        .replace( '{{ALCHEMY_API_KEY}}', apiKey )

    return url
}


export { ALCHEMY_URL_TEMPLATE, ALCHEMY_CHAINS, getAlchemyUrl }
