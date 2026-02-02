import { EVM_CHAINS } from './evmChains.mjs'


const INFURA_URL_TEMPLATE = 'https://{{subdomain}}.infura.io/v3/{{INFURA_API_KEY}}'

const INFURA_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.infuraSubdomain !== undefined )

const getInfuraUrl = ( { chainAlias, apiKey } ) => {
    const chain = EVM_CHAINS.find( ( c ) => c.alias === chainAlias )
    if( !chain?.infuraSubdomain ) { return null }

    const url = INFURA_URL_TEMPLATE
        .replace( '{{subdomain}}', chain.infuraSubdomain )
        .replace( '{{INFURA_API_KEY}}', apiKey )

    return url
}


export { INFURA_URL_TEMPLATE, INFURA_CHAINS, getInfuraUrl }
