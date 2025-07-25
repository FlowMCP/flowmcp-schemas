import { ethers, Interface } from 'ethers'


const multicall3Abi = [{
    name: 'aggregate3',
    inputs: [{
        components: [
            { name: 'target', type: 'address' },
            { name: 'allowFailure', type: 'bool' },
            { name: 'callData', type: 'bytes' }
        ],
        name: 'calls',
        type: 'tuple[]'
    }],
    outputs: [{
        components: [
            { name: 'success', type: 'bool' },
            { name: 'returnData', type: 'bytes' }
        ],
        name: 'returnData',
        type: 'tuple[]'
    }],
    stateMutability: 'view',
    type: 'function'
}]

const priceFeedAbi = [
    'function decimals() view returns (uint8)',
    'function description() view returns (string)',
    'function version() view returns (uint256)',
    'function getRoundData(uint80 _roundId) view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)'
]
const iface = new Interface(priceFeedAbi)

const infuraSubDomain = {
    'ARBITRUM_MAINNET': 'arbitrum-mainnet',
    'AVALANCHE_MAINNET': 'avalanche-mainnet',
    'BASE_MAINNET': 'base-mainnet',
    'BINANCE_MAINNET': 'bsc-mainnet',
    'CELO_MAINNET': 'celo-mainnet',
    'ETHEREUM_MAINNET': 'mainnet',
    'LINEA_MAINNET': 'linea-mainnet',
    'MANTLE_MAINNET': 'mantle-mainnet',
    'SCROLL_MAINNET': 'scroll-mainnet',
    'OPTIMISM_MAINNET': 'optimism-mainnet',
    'POLYGON_MAINNET': 'polygon-mainnet',
    'ZKSYNC_MAINNET': 'zksync-mainnet'
}

const multicallProviders = Object
    .entries(infuraSubDomain)
    .reduce((acc, [blockchain, value]) => {
        const rawUrl = 'https://--infura-subdomain--.infura.io/v3/f3ca3c43f47d43239a1173f115b43df0'
        const url = rawUrl.replace('--infura-subdomain--', value)
        const provider = new ethers.JsonRpcProvider(url)
        const multicall = new ethers
            .Contract('0xca11bde05977b3631167028862be2a173976ca11', multicall3Abi, provider)
        acc[blockchain] = multicall
        return acc
    }, {} )


const feeds = {
    "ETHEREUM_MAINNET": [
        {
          "name": "FIL/ETH",
          "proxyAddress": "0x0606Be69451B1C9861Ac6b3626b99093b713E801",
          "feedCategory": "medium"
        },
        {
          "name": "FDUSD/USD",
          "proxyAddress": "0xfAA9147190c2C2cc5B8387B4f49016bDB3380572",
          "feedCategory": "medium"
        },
        {
          "name": "UNI/ETH",
          "proxyAddress": "0xD6aA3D25116d8dA79Ea0246c4826EB951872e02e",
          "feedCategory": "medium"
        },
        {
          "name": "NEIRO/USD",
          "proxyAddress": "0x771cf56aE75bC907193177237b423A9DA831280A",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/ETH",
          "proxyAddress": "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
          "feedCategory": "low"
        },
        {
          "name": "CSPX/USD",
          "proxyAddress": "0xF4E1B57FB228879D057ac5AE33973e8C53e4A0e0",
          "feedCategory": "low"
        },
        {
          "name": "BAT/ETH",
          "proxyAddress": "0x0d16d4528239e9ee52fa531af613AcdB23D88c94",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
          "feedCategory": "low"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x214eD9Da11D2fbe465a6fc601a91E62EbEc1a0D6",
          "feedCategory": "low"
        },
        {
          "name": "SUSHI/ETH",
          "proxyAddress": "0xe572CeF69f43c2E488b33924AF04BDacE19079cf",
          "feedCategory": "medium"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0xf8fF43E991A81e6eC886a3D281A2C6cC19aE70Fc",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7",
          "feedCategory": "low"
        },
        {
          "name": "C3M/EUR",
          "proxyAddress": "0xD41390267Afec3fA5b4c0B3aA6c706556CCE75ec",
          "feedCategory": "custom"
        },
        {
          "name": "PERP/ETH",
          "proxyAddress": "0x3b41D5571468904D4e53b6a8d93A6BaC43f02dC9",
          "feedCategory": "medium"
        },
        {
          "name": "CBETH/ETH",
          "proxyAddress": "0xF017fcB346A1885194689bA23Eff2fE6fA5C483b",
          "feedCategory": "medium"
        },
        {
          "name": "BAT/USD",
          "proxyAddress": "0x9441D7556e7820B5ca42082cfa99487D56AcA958",
          "feedCategory": "deprecating"
        },
        {
          "name": "COMP/ETH",
          "proxyAddress": "0x1B39Ee86Ec5979ba5C322b826B3ECb8C79991699",
          "feedCategory": "medium"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5",
          "feedCategory": "medium"
        },
        {
          "name": "KRW/USD",
          "proxyAddress": "0x01435677FB11763550905594A16B645847C1d0F3",
          "feedCategory": "low"
        },
        {
          "name": "USDC/ETH",
          "proxyAddress": "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
          "feedCategory": "low"
        },
        {
          "name": "STETH/USD",
          "proxyAddress": "0xCfE54B5cD566aB89272946F602D76Ea879CAb4a8",
          "feedCategory": "medium"
        },
        {
          "name": "DPI/USD",
          "proxyAddress": "0xD2A593BF7594aCE1faD597adb697b5645d5edDB2",
          "feedCategory": "custom"
        },
        {
          "name": "BAL/USD",
          "proxyAddress": "0xdF2917806E30300537aEB49A7663062F4d1F2b5F",
          "feedCategory": "medium"
        },
        {
          "name": "1INCH/ETH",
          "proxyAddress": "0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8",
          "feedCategory": "medium"
        },
        {
          "name": "MAVIA/USD",
          "proxyAddress": "0x29d26C008e8f201eD0D864b1Fd9392D29d0C8e96",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xDC530D9457755926550b59e8ECcdaE7624181557",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/ETH",
          "proxyAddress": "0x6Df09E975c830ECae5bd4eD9d90f3A95a4f88012",
          "feedCategory": "medium"
        },
        {
          "name": "ZRX/ETH",
          "proxyAddress": "0x2Da4983a622a8498bb1a21FaE9D8F6C664939962",
          "feedCategory": "medium"
        },
        {
          "name": "LUSD/USD",
          "proxyAddress": "0x3D7aE7E594f2f2091Ad8798313450130d0Aba3a0",
          "feedCategory": "high"
        },
        {
          "name": "TAO/USD",
          "proxyAddress": "0x1c88503c9A52aE6aaE1f9bb99b3b7e9b8Ab35459",
          "feedCategory": "low"
        },
        {
          "name": "AUD/USD",
          "proxyAddress": "0x77F9710E7d0A19669A13c055F62cd80d313dF022",
          "feedCategory": "low"
        },
        {
          "name": "PYUSD/USD",
          "proxyAddress": "0x8f1dF6D7F2db73eECE86a18b4381F4707b918FB1",
          "feedCategory": "medium"
        },
        {
          "name": "XCN/USD",
          "proxyAddress": "0xeb988B77b94C186053282BfcD8B7ED55142D3cAB",
          "feedCategory": "medium"
        },
        {
          "name": "LBTC/BTC",
          "proxyAddress": "0x5c29868C58b6e15e2b962943278969Ab6a7D3212",
          "feedCategory": "medium"
        },
        {
          "name": "ZBU/USD",
          "proxyAddress": "0x617689cAB8329d57fEa64f4C086190E6797b8B5e",
          "feedCategory": "high"
        },
        {
          "name": "RSR/USD",
          "proxyAddress": "0x759bBC1be8F90eE6457C44abc7d443842a976d02",
          "feedCategory": "medium"
        },
        {
          "name": "AVAIL/USD",
          "proxyAddress": "0xEBca574f1cE4d17cd02c20F47Ef8210C08Cc4255",
          "feedCategory": "medium"
        },
        {
          "name": "ALCX/ETH",
          "proxyAddress": "0x194a9AaF2e0b67c35915cD01101585A33Fe25CAa",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
          "feedCategory": "low"
        },
        {
          "name": "SWETH/ETH",
          "proxyAddress": "0xec21B3e882CE09928cb397DcfF31B15cBBD1e1C3",
          "feedCategory": "hidden"
        },
        {
          "name": "GRT/ETH",
          "proxyAddress": "0x17D054eCac33D91F7340645341eFB5DE9009F1C1",
          "feedCategory": "medium"
        },
        {
          "name": "LRC/ETH",
          "proxyAddress": "0x160AC928A16C93eD4895C2De6f81ECcE9a7eB7b4",
          "feedCategory": "medium"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0xA027702dbb89fbd58938e4324ac03B58d812b0E1",
          "feedCategory": "medium"
        },
        {
          "name": "TUSD/ETH",
          "proxyAddress": "0x3886BA987236181D98F2401c507Fb8BeA7871dF2",
          "feedCategory": "medium"
        },
        {
          "name": "GBP/USD",
          "proxyAddress": "0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5",
          "feedCategory": "low"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0x449d117117838fFA61263B61dA6301AA2a88B13A",
          "feedCategory": "low"
        },
        {
          "name": "USDS/USD",
          "proxyAddress": "0xfF30586cD0F29eD462364C7e81375FC0C71219b1",
          "feedCategory": "medium"
        },
        {
          "name": "EIGEN/USD",
          "proxyAddress": "0xf2917e602C2dCa458937fad715bb1E465305A4A1",
          "feedCategory": "low"
        },
        {
          "name": "ENJ/ETH",
          "proxyAddress": "0x24D9aB51950F3d62E9144fdC2f3135DAA6Ce8D1B",
          "feedCategory": "medium"
        },
        {
          "name": "SKY/USD",
          "proxyAddress": "0xee10fE5E7aa92dd7b136597449c3d5813cFC5F18",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x76F8C9E423C228E83DCB11d17F0Bd8aEB0Ca01bb",
          "feedCategory": "low"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0xCc70F09A6CC17553b2E31954cD36E4A2d89501f7",
          "feedCategory": "medium"
        },
        {
          "name": "PAXG/USD",
          "proxyAddress": "0x9944D86CEB9160aF5C5feB251FD671923323f8C3",
          "feedCategory": "low"
        },
        {
          "name": "AGEUR/EUR",
          "proxyAddress": "0xb4d5289C58CE36080b0748B47F859D8F50dFAACb",
          "feedCategory": "hidden"
        },
        {
          "name": "1INCH/USD",
          "proxyAddress": "0xc929ad75B72593967DE83E7F7Cda0493458261D9",
          "feedCategory": "low"
        },
        {
          "name": "SAND/USD",
          "proxyAddress": "0x35E3f7E558C04cE7eEE1629258EcbbA03B36Ec56",
          "feedCategory": "low"
        },
        {
          "name": "ENS/USD",
          "proxyAddress": "0x5C00128d4d1c2F4f652C267d7bcdD7aC99C16E16",
          "feedCategory": "medium"
        },
        {
          "name": "MKR/ETH",
          "proxyAddress": "0x24551a8Fb2A7211A25a17B1481f043A8a8adC7f2",
          "feedCategory": "medium"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0x03c68933f7a3F76875C0bc670a58e69294cDFD01",
          "feedCategory": "high"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
          "feedCategory": "low"
        },
        {
          "name": "KNC/ETH",
          "proxyAddress": "0x656c0544eF4C98A6a98491833A89204Abb045d6b",
          "feedCategory": "medium"
        },
        {
          "name": "USR/USD",
          "proxyAddress": "0x34ad75691e25A8E9b681AAA85dbeB7ef6561B42c",
          "feedCategory": "high"
        },
        {
          "name": "BUSD/USD",
          "proxyAddress": "0x833D8Eb16D306ed1FbB5D7A2E019e106B960965A",
          "feedCategory": "medium"
        },
        {
          "name": "ETH/BTC",
          "proxyAddress": "0xAc559F25B1619171CbC396a50854A3240b6A4e99",
          "feedCategory": "medium"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x5147eA642CAEF7BD9c1265AadcA78f997AbB9649",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
          "feedCategory": "low"
        },
        {
          "name": "RLUSD/USD",
          "proxyAddress": "0x26C46B7aD0012cA71F2298ada567dC9Af14E7f2A",
          "feedCategory": "medium"
        },
        {
          "name": "SWELL/ETH",
          "proxyAddress": "0x2a638b1203a3B62FF003598B7165Fc5cd5b13B00",
          "feedCategory": "medium"
        },
        {
          "name": "FTM/ETH",
          "proxyAddress": "0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b",
          "feedCategory": "high"
        },
        {
          "name": "USDM/USD",
          "proxyAddress": "0x079674468Fee6ab45aBfE986737A440701c49BdB",
          "feedCategory": "high"
        },
        {
          "name": "DPI/ETH",
          "proxyAddress": "0x029849bbc0b1d93b85a8b6190e979fd38F5760E2",
          "feedCategory": "custom"
        },
        {
          "name": "SHV/USD",
          "proxyAddress": "0xc04611C43842220fd941515F86d1DDdB15F04e46",
          "feedCategory": "low"
        },
        {
          "name": "CNY/USD",
          "proxyAddress": "0xeF8A4aF35cd47424672E3C590aBD37FBB7A7759a",
          "feedCategory": "low"
        },
        {
          "name": "BAL/ETH",
          "proxyAddress": "0xC1438AA3823A6Ba0C159CfA8D98dF5A994bA120b",
          "feedCategory": "medium"
        },
        {
          "name": "SNX/ETH",
          "proxyAddress": "0x79291A9d692Df95334B1a0B3B4AE6bC606782f8c",
          "feedCategory": "medium"
        },
        {
          "name": "DAI/ETH",
          "proxyAddress": "0x773616E4d11A78F511299002da57A0a94577F1f4",
          "feedCategory": "low"
        },
        {
          "name": "APE/USD",
          "proxyAddress": "0xD10aBbC76679a20055E167BB80A24ac851b37056",
          "feedCategory": "low"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD",
          "feedCategory": "medium"
        },
        {
          "name": "HIGH/USD",
          "proxyAddress": "0x5C8D8AaB4ffa4652753Df94f299330Bb4479bF85",
          "feedCategory": "medium"
        },
        {
          "name": "YFI/ETH",
          "proxyAddress": "0x7c5d4F8345e66f68099581Db340cd65B078C41f4",
          "feedCategory": "medium"
        },
        {
          "name": "MANA/ETH",
          "proxyAddress": "0x82A44D92D6c329826dc557c5E1Be6ebeC5D5FeB9",
          "feedCategory": "medium"
        },
        {
          "name": "RDNT/USD",
          "proxyAddress": "0x393CC05baD439c9B36489384F11487d9C8410471",
          "feedCategory": "medium"
        },
        {
          "name": "USD0/USD",
          "proxyAddress": "0x7e891DEbD8FA0A4Cf6BE58Ddff5a8ca174FebDCB",
          "feedCategory": "medium"
        },
        {
          "name": "RPL/USD",
          "proxyAddress": "0x4E155eD98aFE9034b7A5962f6C84c86d869daA9d",
          "feedCategory": "medium"
        },
        {
          "name": "GRT/USD",
          "proxyAddress": "0x86cF33a451dE9dc61a2862FD94FF4ad4Bd65A5d2",
          "feedCategory": "medium"
        },
        {
          "name": "UST/ETH",
          "proxyAddress": "0xa20623070413d42a5C01Db2c8111640DD7A5A03a",
          "feedCategory": "medium"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0xb49f677943BC038e9857d61E7d053CaA2C1734C1",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c",
          "feedCategory": "low"
        },
        {
          "name": "MLN/ETH",
          "proxyAddress": "0xDaeA8386611A157B08829ED4997A8A62B557014C",
          "feedCategory": "medium"
        },
        {
          "name": "SUSD/ETH",
          "proxyAddress": "0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757",
          "feedCategory": "hidden"
        },
        {
          "name": "OETH/ETH",
          "proxyAddress": "0x703118C4CbccCBF2AB31913e0f8075fbbb15f563",
          "feedCategory": "high"
        },
        {
          "name": "SPELL/USD",
          "proxyAddress": "0x8c110B94C5f1d347fAcF5E1E938AB2db60E3c9a8",
          "feedCategory": "medium"
        },
        {
          "name": "FTT/ETH",
          "proxyAddress": "0xF0985f7E2CaBFf22CecC5a71282a89582c382EFE",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x7bB7bF4ca536DbC49545704BFAcaa13633D18718",
          "feedCategory": "low"
        },
        {
          "name": "BADGER/ETH",
          "proxyAddress": "0x58921Ac140522867bf50b9E009599Da0CA4A2379",
          "feedCategory": "medium"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0xBcE206caE7f0ec07b545EddE332A47C2F75bbeb3",
          "feedCategory": "low"
        },
        {
          "name": "CVX/ETH",
          "proxyAddress": "0xC9CbF687f43176B302F03f5e58470b77D07c61c6",
          "feedCategory": "medium"
        },
        {
          "name": "WBTC/BTC",
          "proxyAddress": "0xfdFD9C85aD200c506Cf9e21F1FD8dd01932FBB23",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
          "feedCategory": "medium"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0x379589227b15F1a12195D3f2d90bBc9F31f95235",
          "feedCategory": "low"
        },
        {
          "name": "TRY/USD",
          "proxyAddress": "0xB09fC5fD3f11Cf9eb5E1C5Dba43114e3C9f477b5",
          "feedCategory": "low"
        },
        {
          "name": "IDR/USD",
          "proxyAddress": "0x91b99C9b75aF469a71eE1AB528e8da994A5D7030",
          "feedCategory": "low"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676",
          "feedCategory": "medium"
        },
        {
          "name": "CVX/USD",
          "proxyAddress": "0xd962fC30A72A84cE50161031391756Bf2876Af5D",
          "feedCategory": "low"
        },
        {
          "name": "STETH/ETH",
          "proxyAddress": "0x86392dC19c0b719886221c78AB11eb8Cf5c52812",
          "feedCategory": "medium"
        },
        {
          "name": "CAD/USD",
          "proxyAddress": "0xa34317DB73e77d453b1B8d04550c44D10e981C8e",
          "feedCategory": "low"
        },
        {
          "name": "TBTC/USD",
          "proxyAddress": "0x8350b7De6a6a2C1368E7D4Bd968190e13E354297",
          "feedCategory": "medium"
        },
        {
          "name": "IB01/USD",
          "proxyAddress": "0x32d1463EB53b73C095625719Afa544D5426354cB",
          "feedCategory": "low"
        },
        {
          "name": "STG/USD",
          "proxyAddress": "0x7A9f34a0Aa917D438e9b6E630067062B7F8f6f3d",
          "feedCategory": "medium"
        },
        {
          "name": "REN/ETH",
          "proxyAddress": "0x3147D7203354Dc06D9fd350c7a2437bcA92387a4",
          "feedCategory": "high"
        },
        {
          "name": "IBTA/USD",
          "proxyAddress": "0xd27e6D02b72eB6FCe04Ad5690C419196B4EF2885",
          "feedCategory": "low"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x4ffC43a60e009B551865A93d232E33Fce9f01507",
          "feedCategory": "low"
        },
        {
          "name": "BTC/ETH",
          "proxyAddress": "0xdeb288F737066589598e9214E782fa5A8eD689e8",
          "feedCategory": "medium"
        },
        {
          "name": "CRV/ETH",
          "proxyAddress": "0x8a12Be339B0cD1829b91Adc01977caa5E9ac121e",
          "feedCategory": "medium"
        },
        {
          "name": "USDP/USD",
          "proxyAddress": "0x09023c0DA49Aaf8fc3fA3ADF34C6A7016D38D5e3",
          "feedCategory": "medium"
        },
        {
          "name": "NZD/USD",
          "proxyAddress": "0x3977CFc9e4f29C184D4675f4EB8e0013236e5f3e",
          "feedCategory": "low"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0x6Ebc52C8C1089be9eB3945C4350B68B8E4C2233f",
          "feedCategory": "low"
        },
        {
          "name": "IMX/USD",
          "proxyAddress": "0xBAEbEFc1D023c0feCcc047Bff42E75F15Ff213E6",
          "feedCategory": "medium"
        },
        {
          "name": "FRAX/ETH",
          "proxyAddress": "0x14d04Fff8D21bd62987a5cE9ce543d2F1edF5D3E",
          "feedCategory": "medium"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699",
          "feedCategory": "medium"
        },
        {
          "name": "RETH/ETH",
          "proxyAddress": "0x536218f9E9Eb48863970252233c8F271f554C2d0",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
          "feedCategory": "low"
        },
        {
          "name": "APE/ETH",
          "proxyAddress": "0xc7de7f4d4C9c991fF62a07D18b3E31e349833A18",
          "feedCategory": "medium"
        },
        {
          "name": "AMPL/ETH",
          "proxyAddress": "0x492575FDD11a0fCf2C6C719867890a7648d526eB",
          "feedCategory": "hidden"
        },
        {
          "name": "SHIB/ETH",
          "proxyAddress": "0x8dD1CD88F43aF196ae478e91b9F5E4Ac69A97C61",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0xbd7F896e60B650C01caf2d7279a1148189A68884",
          "feedCategory": "low"
        },
        {
          "name": "AMPL/USD",
          "proxyAddress": "0xe20CA8D7546932360e37E9D72c1a47334af57706",
          "feedCategory": "custom"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9",
          "feedCategory": "low"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f",
          "feedCategory": "low"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0x553303d460EE0afB37EdFf9bE42922D8FF63220e",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x85355da30ee4b35F4B30759Bd49a1EBE3fc41Bdb",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0xfB6471ACD42c91FF265344Ff73E88353521d099F",
          "feedCategory": "low"
        },
        {
          "name": "ZRX/USD",
          "proxyAddress": "0x2885d15b8Af22648b98B122b22FDF4D2a56c6023",
          "feedCategory": "medium"
        },
        {
          "name": "MKR/USD",
          "proxyAddress": "0xec1D1B3b0443256cc3860e24a46F108e699484Aa",
          "feedCategory": "low"
        },
        {
          "name": "CRVUSD/USD",
          "proxyAddress": "0xEEf0C605546958c1f899b6fB336C20671f9cD49F",
          "feedCategory": "medium"
        },
        {
          "name": "ARB/USD",
          "proxyAddress": "0x31697852a68433DbCc2Ff612c516d69E3D9bd08F",
          "feedCategory": "low"
        },
        {
          "name": "LDO/ETH",
          "proxyAddress": "0x4e844125952D32AcdF339BE976c98E22F6F318dB",
          "feedCategory": "medium"
        },
        {
          "name": "SGD/USD",
          "proxyAddress": "0xe25277fF4bbF9081C75Ab0EB13B4A13a721f3E13",
          "feedCategory": "low"
        },
        {
          "name": "GHO/USD",
          "proxyAddress": "0x3f12643D3f6f874d39C2a4c9f2Cd6f2DbAC877FC",
          "feedCategory": "medium"
        },
        {
          "name": "TUSD/USD",
          "proxyAddress": "0xec746eCF986E2927Abd291a2A1716c940100f8Ba",
          "feedCategory": "medium"
        }
      ],
    "BINANCE_MAINNET": [
        {
          "name": "DOT/USD",
          "proxyAddress": "0xC333eb0086309a16aa7c8308DfD32c8BBA0a2592",
          "feedCategory": "low"
        },
        {
          "name": "TRX/USD",
          "proxyAddress": "0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be",
          "feedCategory": "low"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0x22Db8397a6E77E41471dE256a7803829fDC8bC57",
          "feedCategory": "low"
        },
        {
          "name": "AXS/USD",
          "proxyAddress": "0x7B49524ee5740c99435f52d731dFC94082fE61Ab",
          "feedCategory": "low"
        },
        {
          "name": "INR/USD",
          "proxyAddress": "0xeF0a3109ce97e0B58557F0e3Ba95eA16Bfa4A89d",
          "feedCategory": "low"
        },
        {
          "name": "LTC/BNB",
          "proxyAddress": "0x4e5a43A79f53c0a8e83489648Ea7e429278f8b2D",
          "feedCategory": "medium"
        },
        {
          "name": "FIL/USD",
          "proxyAddress": "0xE5dbFD9003bFf9dF5feB2f4F445Ca00fb121fb83",
          "feedCategory": "low"
        },
        {
          "name": "WING/USD",
          "proxyAddress": "0xf7E7c0ffCB11dAC6eCA1434C67faB9aE000e10a7",
          "feedCategory": "medium"
        },
        {
          "name": "COIN/USD",
          "proxyAddress": "0x2d1AB79D059e21aE519d88F978cAF39d74E31AEB",
          "feedCategory": "low"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0x2e1C3b6Fcae47b20Dd343D9354F7B1140a1E6B27",
          "feedCategory": "low"
        },
        {
          "name": "BUSD/BNB",
          "proxyAddress": "0x87Ea38c9F24264Ec1Fff41B04ec94a97Caf99941",
          "feedCategory": "medium"
        },
        {
          "name": "UNI/BNB",
          "proxyAddress": "0x25298F020c3CA1392da76Eb7Ac844813b218ccf7",
          "feedCategory": "medium"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0xD7eAa5Bf3013A96e3d515c055Dbd98DbdC8c620D",
          "feedCategory": "medium"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0x3AB0A0d137D4F946fBB19eecc6e92E64660231C8",
          "feedCategory": "low"
        },
        {
          "name": "1INCH/USD",
          "proxyAddress": "0x9a177Bb9f5b6083E962f9e62bD21d4b5660Aeb03",
          "feedCategory": "low"
        },
        {
          "name": "CHR/USD",
          "proxyAddress": "0x1f771B2b1F3c3Db6C7A1d5F38961a49CEcD116dA",
          "feedCategory": "medium"
        },
        {
          "name": "DAI/BNB",
          "proxyAddress": "0x8EC213E7191488C7873cEC6daC8e97cdbAdb7B35",
          "feedCategory": "low"
        },
        {
          "name": "NVDA/USD",
          "proxyAddress": "0xea5c2Cbb5cD57daC24E26180b19a929F3E9699B8",
          "feedCategory": "low"
        },
        {
          "name": "DOT/BNB",
          "proxyAddress": "0xBA8683E9c3B1455bE6e18E7768e8cAD95Eb5eD49",
          "feedCategory": "medium"
        },
        {
          "name": "BAND/BNB",
          "proxyAddress": "0x3334bF7ec892Ca03D1378B51769b7782EAF318C4",
          "feedCategory": "medium"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0x817326922c909b16944817c207562B25C4dF16aD",
          "feedCategory": "low"
        },
        {
          "name": "LINK/BNB",
          "proxyAddress": "0xB38722F6A608646a538E882Ee9972D15c86Fc597",
          "feedCategory": "medium"
        },
        {
          "name": "TSLA/USD",
          "proxyAddress": "0xEEA2ae9c074E87596A85ABE698B2Afebc9B57893",
          "feedCategory": "low"
        },
        {
          "name": "ADA/USD",
          "proxyAddress": "0xa767f745331D267c7751297D982b050c93985627",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x51597f405303C4377E36123cBc172b13269EA163",
          "feedCategory": "low"
        },
        {
          "name": "WIN/USD",
          "proxyAddress": "0x9e7377E194E41d63795907c92c3EB351a2eb0233",
          "feedCategory": "medium"
        },
        {
          "name": "WSTETH/USD",
          "proxyAddress": "0xd97aB9e5bD461eBcD55009791C410294f7B42Cdb",
          "feedCategory": "medium"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0xb57f259E7C24e56a1dA00F66b55A5640d9f9E7e4",
          "feedCategory": "low"
        },
        {
          "name": "EOS/USD",
          "proxyAddress": "0xd5508c8Ffdb8F15cE336e629fD4ca9AdB48f50F0",
          "feedCategory": "low"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x0bf79F617988C472DcA68ff41eFe1338955b9A80",
          "feedCategory": "low"
        },
        {
          "name": "PFE/USD",
          "proxyAddress": "0xe96fFdE2ba50E0e869520475ee1bC73cA2dEE326",
          "feedCategory": "low"
        },
        {
          "name": "XVS/BNB",
          "proxyAddress": "0xf369A13E7f2449E58DdE8302F008eE9131f8d859",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/BNB",
          "proxyAddress": "0xD5c40f5144848Bd4EF08a9605d860e727b991513",
          "feedCategory": "low"
        },
        {
          "name": "KAVA/USD",
          "proxyAddress": "0x12bf0C3f7D5aca9E711930d704dA2774358d9210",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
          "feedCategory": "low"
        },
        {
          "name": "ONT/USD",
          "proxyAddress": "0x887f177CBED2cf555a64e7bF125E1825EB69dB82",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/BNB",
          "proxyAddress": "0x116EeB23384451C78ed366D4f67D5AD44eE771A0",
          "feedCategory": "medium"
        },
        {
          "name": "PAXG/USD",
          "proxyAddress": "0x7F8caD4690A38aC28BDA3D132eF83DB1C17557Df",
          "feedCategory": "low"
        },
        {
          "name": "MXN/USD",
          "proxyAddress": "0x16c0C1f971b1780F952572670A9d5ce4123582a1",
          "feedCategory": "low"
        },
        {
          "name": "BETH/USD",
          "proxyAddress": "0x2A3796273d47c4eD363b361D3AEFb7F7E2A13782",
          "feedCategory": "hidden"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0xF2f8273F6b9Fc22C90891DC802cAf60eeF805cDF",
          "feedCategory": "medium"
        },
        {
          "name": "SPY/USD",
          "proxyAddress": "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e",
          "feedCategory": "low"
        },
        {
          "name": "ATOM/USD",
          "proxyAddress": "0xb056B7C804297279A9a673289264c17E6Dc6055d",
          "feedCategory": "low"
        },
        {
          "name": "SPELL/USD",
          "proxyAddress": "0x47e01580C537Cd47dA339eA3a4aFb5998CCf037C",
          "feedCategory": "medium"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0xa679C72a97B654CFfF58aB704de3BA15Cde89B07",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
          "feedCategory": "low"
        },
        {
          "name": "C98/USD",
          "proxyAddress": "0x889158E39628C0397DC54B84F6b1cbe0AaEb7FFc",
          "feedCategory": "medium"
        },
        {
          "name": "TWT/BNB",
          "proxyAddress": "0x7E728dFA6bCa9023d9aBeE759fDF56BEAb8aC7aD",
          "feedCategory": "medium"
        },
        {
          "name": "SHIB/USD",
          "proxyAddress": "0xA615Be6cb0f3F36A641858dB6F30B9242d0ABeD8",
          "feedCategory": "low"
        },
        {
          "name": "PHP/USD",
          "proxyAddress": "0x1CcaD765D39Aa2060eB4f6dD94e5874db786C16f",
          "feedCategory": "low"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x0E8a53DD9c13589df6382F13dA6B3Ec8F919B323",
          "feedCategory": "low"
        },
        {
          "name": "CAKE/USD",
          "proxyAddress": "0xB6064eD41d4f67e353768aA239cA86f4F73665a1",
          "feedCategory": "low"
        },
        {
          "name": "CFX/USD",
          "proxyAddress": "0xe3cA2f3Bad1D8327820f648C759f17162b5383ae",
          "feedCategory": "medium"
        },
        {
          "name": "INJ/USD",
          "proxyAddress": "0x63A9133cd7c611d6049761038C16f238FddA71d7",
          "feedCategory": "low"
        },
        {
          "name": "GBP/USD",
          "proxyAddress": "0x8FAf16F710003E538189334541F5D4a391Da46a0",
          "feedCategory": "low"
        },
        {
          "name": "BAND/USD",
          "proxyAddress": "0xC78b99Ae87fF43535b0C782128DB3cB49c74A4d3",
          "feedCategory": "medium"
        },
        {
          "name": "ETH/BNB",
          "proxyAddress": "0x63D407F32Aa72E63C7209ce1c2F5dA40b3AaE726",
          "feedCategory": "medium"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0x081195B56674bb87b2B92F6D58F7c5f449aCE19d",
          "feedCategory": "low"
        },
        {
          "name": "DODO/USD",
          "proxyAddress": "0x87701B15C08687341c2a847ca44eCfBc8d7873E1",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/ETH",
          "proxyAddress": "0xf1769eB4D1943AF02ab1096D7893759F6177D6B8",
          "feedCategory": "medium"
        },
        {
          "name": "BUSD/USD",
          "proxyAddress": "0xcBb98864Ef56E9042e7d2efef76141f15731B82f",
          "feedCategory": "medium"
        },
        {
          "name": "THB/USD",
          "proxyAddress": "0x00EdEa5d03E6Cb155662dBF1B00dea5693Be874A",
          "feedCategory": "low"
        },
        {
          "name": "XTZ/BNB",
          "proxyAddress": "0x8264d6983B219be65C4D62f1c82B3A2999944cF2",
          "feedCategory": "medium"
        },
        {
          "name": "NULS/USD",
          "proxyAddress": "0xaCFBE73231d312AC6954496b3f786E892bF0f7e5",
          "feedCategory": "medium"
        },
        {
          "name": "SXP/USD",
          "proxyAddress": "0xE188A9875af525d25334d75F3327863B2b8cd0F1",
          "feedCategory": "medium"
        },
        {
          "name": "FTM/USD",
          "proxyAddress": "0xe2A47e87C0f4134c8D06A41975F6860468b2F925",
          "feedCategory": "high"
        },
        {
          "name": "WOO/USD",
          "proxyAddress": "0x02Bfe714e78E2Ad1bb1C2beE93eC8dc5423B66d4",
          "feedCategory": "medium"
        },
        {
          "name": "MS/USD",
          "proxyAddress": "0x6b25F7f189c3f26d3caC43b754578b67Fc8d952A",
          "feedCategory": "low"
        },
        {
          "name": "XRP/USD",
          "proxyAddress": "0x93A67D414896A280bF8FFB3b389fE3686E014fda",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8",
          "feedCategory": "low"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0xA8357BF572460fC40f4B0aCacbB2a6A61c89f475",
          "feedCategory": "low"
        },
        {
          "name": "AUD/USD",
          "proxyAddress": "0x498F912B09B5dF618c77fcC9E8DA503304Df92bF",
          "feedCategory": "low"
        },
        {
          "name": "ZBU/USD",
          "proxyAddress": "0x4F3CF381c58Bf69b798167Cb537103d2c8ef1A71",
          "feedCategory": "high"
        },
        {
          "name": "FET/USD",
          "proxyAddress": "0x657e700c66C48c135c4A29c4292908DbdA7aa280",
          "feedCategory": "low"
        },
        {
          "name": "VET/USD",
          "proxyAddress": "0x9f1fD2cEf7b226D555A747DA0411F93c5fe74e13",
          "feedCategory": "low"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0x964261740356cB4aaD0C3D2003Ce808A4176a46d",
          "feedCategory": "low"
        },
        {
          "name": "ZAR/USD",
          "proxyAddress": "0xDE1952A1bF53f8E558cc761ad2564884E55B2c6F",
          "feedCategory": "low"
        },
        {
          "name": "GME/USD",
          "proxyAddress": "0x66cD2975d02f5F5cdEF2E05cBca12549B1a5022D",
          "feedCategory": "low"
        },
        {
          "name": "ADA/BNB",
          "proxyAddress": "0x2d5Fc41d1365fFe13d03d91E82e04Ca878D69f4B",
          "feedCategory": "medium"
        },
        {
          "name": "TUSD/USD",
          "proxyAddress": "0xa3334A9762090E827413A7495AfeCE76F41dFc06",
          "feedCategory": "medium"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0x0E9D55932893Fb1308882C7857285B2B0bcc4f4a",
          "feedCategory": "low"
        },
        {
          "name": "XRP/BNB",
          "proxyAddress": "0x798A65D349B2B5E6645695912880b54dfFd79074",
          "feedCategory": "medium"
        },
        {
          "name": "FDUSD/USD",
          "proxyAddress": "0x390180e80058A8499930F0c13963AD3E0d86Bfc9",
          "feedCategory": "medium"
        },
        {
          "name": "MASK/USD",
          "proxyAddress": "0x4978c0abE6899178c1A74838Ee0062280888E2Cf",
          "feedCategory": "medium"
        },
        {
          "name": "XVS/USD",
          "proxyAddress": "0xBF63F430A79D4036A5900C19818aFf1fa710f206",
          "feedCategory": "medium"
        },
        {
          "name": "ONG/USD",
          "proxyAddress": "0xcF95796f3016801A1dA5C518Fc7A59C51dcEf793",
          "feedCategory": "medium"
        },
        {
          "name": "ICP/USD",
          "proxyAddress": "0x84210d9013A30C6ab169e28840A6CC54B60fa042",
          "feedCategory": "low"
        },
        {
          "name": "USDE/USD",
          "proxyAddress": "0x10402B01cD2E6A9ed6DBe683CbC68f78Ff02f8FC",
          "feedCategory": "low"
        },
        {
          "name": "JPM/USD",
          "proxyAddress": "0x8f26ba94180371baA2D2C143f96b6886DCACA250",
          "feedCategory": "low"
        },
        {
          "name": "RDNT/USD",
          "proxyAddress": "0x20123C6ebd45c6496102BeEA86e1a6616Ca547c6",
          "feedCategory": "medium"
        },
        {
          "name": "GOOGL/USD",
          "proxyAddress": "0xeDA73F8acb669274B15A977Cb0cdA57a84F18c2a",
          "feedCategory": "low"
        },
        {
          "name": "WTI/USD",
          "proxyAddress": "0xb1BED6C1fC1adE2A975F54F24851c7F410e27718",
          "feedCategory": "custom"
        },
        {
          "name": "HIGH/USD",
          "proxyAddress": "0xdF4Dd957a84F798acFADd448badd2D8b9bC99047",
          "feedCategory": "medium"
        },
        {
          "name": "BCH/BNB",
          "proxyAddress": "0x2a548935a323Bb7329a5E3F1667B979f16Bc890b",
          "feedCategory": "medium"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x7CA57b0cA6367191c94C8914d7Df09A57655905f",
          "feedCategory": "medium"
        },
        {
          "name": "BSW/USD",
          "proxyAddress": "0x08E70777b982a58D23D05E3D7714f44837c06A21",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
          "feedCategory": "medium"
        },
        {
          "name": "AMZN/USD",
          "proxyAddress": "0x51d08ca89d3e8c12535BA8AEd33cDf2557ab5b2a",
          "feedCategory": "low"
        },
        {
          "name": "LINA/USD",
          "proxyAddress": "0x38393201952f2764E04B290af9df427217D56B41",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0x5974855ce31EE8E1fff2e76591CbF83D7110F151",
          "feedCategory": "low"
        },
        {
          "name": "AAPL/USD",
          "proxyAddress": "0xb7Ed5bE7977d61E83534230f3256C021e0fae0B6",
          "feedCategory": "low"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0x13A9c98b07F098c5319f4FF786eB16E22DC738e1",
          "feedCategory": "medium"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0x0Db8945f9aEf5651fa5bd52314C5aAe78DfDe540",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/BNB",
          "proxyAddress": "0x45f86CA2A8BC9EBD757225B19a1A0D7051bE46Db",
          "feedCategory": "low"
        },
        {
          "name": "XTZ/USD",
          "proxyAddress": "0x9A18137ADCF7b05f033ad26968Ed5a9cf0Bf8E6b",
          "feedCategory": "medium"
        },
        {
          "name": "GMT/USD",
          "proxyAddress": "0x8b0D36ae4CF8e277773A7ba5F35c09Edb144241b",
          "feedCategory": "medium"
        },
        {
          "name": "NEAR/USD",
          "proxyAddress": "0x0Fe4D87883005fCAFaF56B81d09473D9A29dCDC3",
          "feedCategory": "low"
        },
        {
          "name": "MSFT/USD",
          "proxyAddress": "0x5D209cE1fBABeAA8E6f9De4514A74FFB4b34560F",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
          "feedCategory": "low"
        },
        {
          "name": "META/USD",
          "proxyAddress": "0xfc76E9445952A3C31369dFd26edfdfb9713DF5Bb",
          "feedCategory": "low"
        },
        {
          "name": "CAKE/BNB",
          "proxyAddress": "0xcB23da9EA243f53194CBc2380A6d4d9bC046161f",
          "feedCategory": "medium"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA",
          "feedCategory": "low"
        },
        {
          "name": "NFLX/USD",
          "proxyAddress": "0x1fE6c9Bd9B29e5810c2819f37dDa8559739ebeC9",
          "feedCategory": "low"
        },
        {
          "name": "SGD/USD",
          "proxyAddress": "0x3065b2369820f76C829b9BBCAF4B90F9f47d6314",
          "feedCategory": "low"
        },
        {
          "name": "ALPACA/USD",
          "proxyAddress": "0xe0073b60833249ffd1bb2af809112c2fbf221DF6",
          "feedCategory": "medium"
        },
        {
          "name": "BCH/USD",
          "proxyAddress": "0x43d80f616DAf0b0B42a928EeD32147dC59027D41",
          "feedCategory": "low"
        },
        {
          "name": "YFI/BNB",
          "proxyAddress": "0xF841761481DF19831cCC851A54D8350aE6022583",
          "feedCategory": "medium"
        },
        {
          "name": "MRNA/USD",
          "proxyAddress": "0x6101F4DFBb24Cac3D64e28A815255B428b93639f",
          "feedCategory": "low"
        },
        {
          "name": "XLM/USD",
          "proxyAddress": "0x27Cc356A5891A3Fe6f84D0457dE4d108C6078888",
          "feedCategory": "low"
        },
        {
          "name": "QQQ/USD",
          "proxyAddress": "0x9A41B56b2c24683E2f23BdE15c14BC7c4a58c3c4",
          "feedCategory": "low"
        },
        {
          "name": "EOS/BNB",
          "proxyAddress": "0xed93F3764334788f2f6628b30e505fe1fc5d1D7b",
          "feedCategory": "medium"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x86896fEB19D8A607c3b11f2aF50A0f239Bd71CD0",
          "feedCategory": "low"
        },
        {
          "name": "KLAY/USD",
          "proxyAddress": "0xfD07b211044572898cDbcb1435f0a1369Fd15726",
          "feedCategory": "low"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0x5cb1Cb3eA5FB46de1CE1D0F3BaDB3212e8d8eF48",
          "feedCategory": "low"
        },
        {
          "name": "LTC/USD",
          "proxyAddress": "0x74E72F37A8c415c8f1a98Ed42E78Ff997435791D",
          "feedCategory": "low"
        }
      ],
    "POLYGON_MAINNET": [
        {
          "name": "BTC/USD",
          "proxyAddress": "0xc907E116054Ad103354f2D350FD2514433D57F6f",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6",
          "feedCategory": "medium"
        },
        {
          "name": "SGD/USD",
          "proxyAddress": "0x8CE3cAc0E6635ce04783709ca3CC4F5fc5304299",
          "feedCategory": "low"
        },
        {
          "name": "PHP/USD",
          "proxyAddress": "0x218231089Bebb2A31970c3b77E96eCfb3BA006D1",
          "feedCategory": "low"
        },
        {
          "name": "QUICK/USD",
          "proxyAddress": "0x2251169D32E7538652a9a8c86bf0c43bFcd956f1",
          "feedCategory": "medium"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0x461c7B8D370a240DdB46B402748381C3210136b3",
          "feedCategory": "low"
        },
        {
          "name": "CVX/USD",
          "proxyAddress": "0x5ec151834040B4D453A1eA46aA634C1773b36084",
          "feedCategory": "low"
        },
        {
          "name": "MANA/USD",
          "proxyAddress": "0xA1CbF3Fe43BC3501e3Fc4b573e822c70e76A7512",
          "feedCategory": "medium"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x0C466540B2ee1a31b441671eac0ca886e051E410",
          "feedCategory": "low"
        },
        {
          "name": "GHST/ETH",
          "proxyAddress": "0xe638249AF9642CdA55A92245525268482eE4C67b",
          "feedCategory": "medium"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
          "feedCategory": "medium"
        },
        {
          "name": "DODO/USD",
          "proxyAddress": "0x59161117086a4C7A9beDA16C66e40Bdaa1C5a8B6",
          "feedCategory": "medium"
        },
        {
          "name": "UNI/ETH",
          "proxyAddress": "0x162d8c5bF15eB6BEe003a1ffc4049C92114bc931",
          "feedCategory": "medium"
        },
        {
          "name": "WOO/USD",
          "proxyAddress": "0x6a99EC84819FB7007dd5D032068742604E755c56",
          "feedCategory": "medium"
        },
        {
          "name": "MSFT/USD",
          "proxyAddress": "0xC43081d9EA6d1c53f1F0e525504d47Dd60de12da",
          "feedCategory": "low"
        },
        {
          "name": "KRW/USD",
          "proxyAddress": "0x24B820870F726dA9B0D83B0B28a93885061dbF50",
          "feedCategory": "low"
        },
        {
          "name": "OM/USD",
          "proxyAddress": "0xc86105DccF9BD629Cea7Fd41f94c6050bF96D57F",
          "feedCategory": "low"
        },
        {
          "name": "KAVA/USD",
          "proxyAddress": "0x7899dd75C329eFe63e35b02bC7d60D3739FB23c5",
          "feedCategory": "low"
        },
        {
          "name": "TUSD/USD",
          "proxyAddress": "0x7C5D415B64312D38c56B54358449d0a4058339d2",
          "feedCategory": "medium"
        },
        {
          "name": "AMZN/USD",
          "proxyAddress": "0xf9184b8E5da48C19fA4E06f83f77742e748cca96",
          "feedCategory": "low"
        },
        {
          "name": "AGEUR/USD",
          "proxyAddress": "0x9b88d07B2354eF5f4579690356818e07371c7BeD",
          "feedCategory": "hidden"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0xbaf9327b6564454F4a3364C33eFeEf032b4b4444",
          "feedCategory": "low"
        },
        {
          "name": "SUSHI/ETH",
          "proxyAddress": "0x17414Eb5159A082e8d41D243C1601c2944401431",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x82a6c4AF830caa6c97bb504425f6A66165C2c26e",
          "feedCategory": "medium"
        },
        {
          "name": "DAI/ETH",
          "proxyAddress": "0xFC539A559e170f848323e19dfD66007520510085",
          "feedCategory": "low"
        },
        {
          "name": "FIL/USD",
          "proxyAddress": "0xa07703E5C2eD1516107c7c72A494493Dcb99C676",
          "feedCategory": "low"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x10C8264C0935b3B9870013e057f330Ff3e9C56dC",
          "feedCategory": "low"
        },
        {
          "name": "COP/USD",
          "proxyAddress": "0xfAA9147190c2C2cc5B8387B4f49016bDB3380572",
          "feedCategory": "low"
        },
        {
          "name": "NZD/USD",
          "proxyAddress": "0xa302a0B8a499fD0f00449df0a490DedE21105955",
          "feedCategory": "low"
        },
        {
          "name": "CHZ/USD",
          "proxyAddress": "0x2409987e514Ad8B0973C2b90ee1D95051DF0ECB9",
          "feedCategory": "low"
        },
        {
          "name": "MXN/USD",
          "proxyAddress": "0x171b16562EA3476F5C61d1b8dad031DbA0768545",
          "feedCategory": "low"
        },
        {
          "name": "QNT/USD",
          "proxyAddress": "0xF7F291042F6Cbc4deC0Ad75c17786511a530dbe8",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0xd9FFdb71EbE7496cC440152d43986Aae0AB76665",
          "feedCategory": "low"
        },
        {
          "name": "TSLA/USD",
          "proxyAddress": "0x567E67f456c7453c583B6eFA6F18452cDee1F5a8",
          "feedCategory": "low"
        },
        {
          "name": "AAVE/ETH",
          "proxyAddress": "0xbE23a3AA13038CfC28aFd0ECe4FdE379fE7fBfc4",
          "feedCategory": "medium"
        },
        {
          "name": "DPI/USD",
          "proxyAddress": "0x2e48b7924FBe04d575BA229A59b64547d9da16e9",
          "feedCategory": "custom"
        },
        {
          "name": "IDR/USD",
          "proxyAddress": "0x80a5cb83ce268Ed11a6EFC4bBF0beC39dF35Db21",
          "feedCategory": "low"
        },
        {
          "name": "GNS/USD",
          "proxyAddress": "0x9cb43aa3D036Cb035a694Ba0AAa91f8875B16cE1",
          "feedCategory": "high"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x73366Fe0AA0Ded304479862808e02506FE556a98",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0x10f964234cae09cB6a9854B56FF7D4F38Cda5E6a",
          "feedCategory": "medium"
        },
        {
          "name": "USDS/USD",
          "proxyAddress": "0x3B21a277babcB73b5a2325106FC04Df8AA1aC5b6",
          "feedCategory": "medium"
        },
        {
          "name": "ILS/USD",
          "proxyAddress": "0x8d5eB34C509261533235b91350d359EdcB969D33",
          "feedCategory": "low"
        },
        {
          "name": "TRX/USD",
          "proxyAddress": "0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833",
          "feedCategory": "low"
        },
        {
          "name": "GRT/USD",
          "proxyAddress": "0x3FabBfb300B1e2D7c9B84512fe9D30aeDF24C410",
          "feedCategory": "medium"
        },
        {
          "name": "GHST/USD",
          "proxyAddress": "0xDD229Ce42f11D8Ee7fFf29bDB71C7b81352e11be",
          "feedCategory": "medium"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0x10e5f3DFc81B3e5Ef4e648C4454D04e79E1E41E2",
          "feedCategory": "medium"
        },
        {
          "name": "LTC/USD",
          "proxyAddress": "0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa",
          "feedCategory": "low"
        },
        {
          "name": "GOOGL/USD",
          "proxyAddress": "0x1b32682C033b2DD7EFdC615FA82d353e254F39b5",
          "feedCategory": "low"
        },
        {
          "name": "ILV/ETH",
          "proxyAddress": "0x3636B780588328dc3F5df075De5627DBc9A6BA10",
          "feedCategory": "medium"
        },
        {
          "name": "ZAR/USD",
          "proxyAddress": "0xd4a120c26d57B910C56c910CdD13EeBFA3135502",
          "feedCategory": "low"
        },
        {
          "name": "MLN/ETH",
          "proxyAddress": "0xB89D583B72aBF9C3a7e6e093251C2fCad3365312",
          "feedCategory": "medium"
        },
        {
          "name": "CNY/USD",
          "proxyAddress": "0x04bB437Aa63E098236FA47365f0268547f6EAB32",
          "feedCategory": "low"
        },
        {
          "name": "PLN/USD",
          "proxyAddress": "0xB34BCE11040702f71c11529D00179B2959BcE6C0",
          "feedCategory": "low"
        },
        {
          "name": "BAL/ETH",
          "proxyAddress": "0x03CD157746c61F44597dD54C6f6702105258C722",
          "feedCategory": "medium"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0xF9680D99D6C9589e2a93a78A04A279e509205945",
          "feedCategory": "low"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0x2A8758b7257102461BC958279054e372C2b1bDE6",
          "feedCategory": "medium"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0x9d3A43c111E7b2C6601705D9fcF7a70c95b1dc55",
          "feedCategory": "medium"
        },
        {
          "name": "PAXG/USD",
          "proxyAddress": "0x0f6914d8e7e1214CDb3A4C6fbf729b75C69DF608",
          "feedCategory": "low"
        },
        {
          "name": "LINK/MATIC",
          "proxyAddress": "0x5787BefDc0ECd210Dfa948264631CD53E68F7802",
          "feedCategory": "medium"
        },
        {
          "name": "FB/USD",
          "proxyAddress": "0x5b4586C911144A947D7814Fd71fe0872b8334748",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/ETH",
          "proxyAddress": "0xA338e0492B2F944E9F8C0653D3AD1484f2657a37",
          "feedCategory": "medium"
        },
        {
          "name": "AUD/USD",
          "proxyAddress": "0x062Df9C4efd2030e243ffCc398b652e8b8F95C6f",
          "feedCategory": "low"
        },
        {
          "name": "DOT/USD",
          "proxyAddress": "0xacb51F1a83922632ca02B25a8164c10748001BdE",
          "feedCategory": "low"
        },
        {
          "name": "XMR/USD",
          "proxyAddress": "0xBE6FB0AB6302B693368D0E9001fAF77ecc6571db",
          "feedCategory": "low"
        },
        {
          "name": "INR/USD",
          "proxyAddress": "0xDA0F8Df6F5dB15b346f4B8D1156722027E194E60",
          "feedCategory": "low"
        },
        {
          "name": "THB/USD",
          "proxyAddress": "0x5164Ad28fb12a5e55946090Ec3eE1B748AFb3785",
          "feedCategory": "low"
        },
        {
          "name": "FTM/USD",
          "proxyAddress": "0x58326c0F831b2Dbf7234A4204F28Bba79AA06d5f",
          "feedCategory": "high"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x0A6513e40db6EB1b165753AD52E80663aeA50545",
          "feedCategory": "low"
        },
        {
          "name": "BAL/USD",
          "proxyAddress": "0xD106B538F2A868c28Ca1Ec7E298C3325E0251d66",
          "feedCategory": "medium"
        },
        {
          "name": "XTZ/USD",
          "proxyAddress": "0x691e26AB58ff05800E028b0876A41B720b26FC65",
          "feedCategory": "medium"
        },
        {
          "name": "XPT/USD",
          "proxyAddress": "0x76631863c2ae7367aF8f37Cd10d251DA7f1DE186",
          "feedCategory": "low"
        },
        {
          "name": "XRP/USD",
          "proxyAddress": "0x785ba89291f676b5386652eB12b30cF361020694",
          "feedCategory": "low"
        },
        {
          "name": "MKR/USD",
          "proxyAddress": "0xa070427bF5bA5709f70e98b94Cb2F435a242C46C",
          "feedCategory": "low"
        },
        {
          "name": "CAD/USD",
          "proxyAddress": "0xACA44ABb8B04D07D883202F99FA5E3c53ed57Fb5",
          "feedCategory": "low"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0xB90DA3ff54C3ED09115abf6FbA0Ff4645586af2c",
          "feedCategory": "low"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C",
          "feedCategory": "low"
        },
        {
          "name": "EOS/USD",
          "proxyAddress": "0xd6285F06203D938ab713Fa6A315e7d23247DDE95",
          "feedCategory": "low"
        },
        {
          "name": "TRY/USD",
          "proxyAddress": "0xd78325DcA0F90F0FFe53cCeA1B02Bb12E1bf8FdB",
          "feedCategory": "low"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894",
          "feedCategory": "medium"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0x6C0fe985D3cAcbCdE428b84fc9431792694d0f51",
          "feedCategory": "low"
        },
        {
          "name": "APE/USD",
          "proxyAddress": "0x2Ac3F3Bfac8fC9094BC3f0F9041a51375235B992",
          "feedCategory": "low"
        },
        {
          "name": "USDT/ETH",
          "proxyAddress": "0xf9d5AAC6E5572AEFa6bd64108ff86a222F69B64d",
          "feedCategory": "low"
        },
        {
          "name": "BADGER/ETH",
          "proxyAddress": "0x82C9d4E88862f194C2bd874a106a90dDD0D35AAB",
          "feedCategory": "medium"
        },
        {
          "name": "AXS/USD",
          "proxyAddress": "0x9c371aE34509590E10aB98205d2dF5936A1aD875",
          "feedCategory": "low"
        },
        {
          "name": "YFI/ETH",
          "proxyAddress": "0x9896A1eA7A00F5f32Ab131eBbeE07487B0af31D0",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x72484B12719E23115761D5DA1646945632979bB6",
          "feedCategory": "low"
        },
        {
          "name": "SEK/USD",
          "proxyAddress": "0xbd92B4919ae82be8473859295dEF0e778A626302",
          "feedCategory": "low"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0x49B0c695039243BBfEb8EcD054EB70061fd54aa0",
          "feedCategory": "medium"
        },
        {
          "name": "CBETH/ETH",
          "proxyAddress": "0x0a6a03CdF7d0b48d4e4BA8e362A4FfC3aAC4f3c0",
          "feedCategory": "medium"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0x336584C8E6Dc19637A5b36206B1c79923111b405",
          "feedCategory": "low"
        },
        {
          "name": "THETA/USD",
          "proxyAddress": "0x38611b09F8f2D520c14eA973765C225Bf57B9Eac",
          "feedCategory": "medium"
        },
        {
          "name": "MKR/ETH",
          "proxyAddress": "0x807b59d12520830D1864286FA0271c27baa94197",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/ETH",
          "proxyAddress": "0xefb7e6be8356cCc6827799B6A7348eE674A80EaE",
          "feedCategory": "low"
        },
        {
          "name": "OGN/USD",
          "proxyAddress": "0x8Ec0eC2e0F26D8253ABf39Db4B1793D76B49C6D5",
          "feedCategory": "medium"
        },
        {
          "name": "BCH/USD",
          "proxyAddress": "0x327d9822e9932996f55b39F557AEC838313da8b7",
          "feedCategory": "low"
        },
        {
          "name": "FTT/USD",
          "proxyAddress": "0x817A7D43f0277Ca480AE03Ec76Fc63A2EC7114bA",
          "feedCategory": "medium"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0xD647a6fC9BC6402301583C91decC5989d8Bc382D",
          "feedCategory": "low"
        },
        {
          "name": "DASH/USD",
          "proxyAddress": "0xD94427eDee70E4991b4b8DdCc848f2B58ED01C0b",
          "feedCategory": "medium"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0x00DBeB1e45485d53DF7C2F0dF1Aa0b6Dc30311d3",
          "feedCategory": "medium"
        },
        {
          "name": "SLP/USD",
          "proxyAddress": "0xBB3eF70953fC3766bec4Ab7A9BF05B6E4caf89c6",
          "feedCategory": "medium"
        },
        {
          "name": "SHIB/USD",
          "proxyAddress": "0x3710abeb1A0Fc7C2EC59C26c8DAA7a448ff6125A",
          "feedCategory": "low"
        },
        {
          "name": "SAND/USD",
          "proxyAddress": "0x3D49406EDd4D52Fb7FFd25485f32E073b529C924",
          "feedCategory": "low"
        },
        {
          "name": "BTC/ETH",
          "proxyAddress": "0x19b0F0833C78c0848109E3842D34d2fDF2cA69BA",
          "feedCategory": "medium"
        },
        {
          "name": "BAT/USD",
          "proxyAddress": "0x2346Ce62bd732c62618944E51cbFa09D985d86D2",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0xe01eA2fbd8D76ee323FbEd03eB9a8625EC981A10",
          "feedCategory": "low"
        },
        {
          "name": "MATIC/ETH",
          "proxyAddress": "0x327e23A4855b6F663a28c5161541d69Af8973302",
          "feedCategory": "medium"
        },
        {
          "name": "1INCH/USD",
          "proxyAddress": "0x443C5116CdF663Eb387e72C688D276e702135C87",
          "feedCategory": "low"
        },
        {
          "name": "BADGER/USD",
          "proxyAddress": "0xF626964Ba5e81405f47e8004F0b276Bb974742B5",
          "feedCategory": "medium"
        },
        {
          "name": "XLM/USD",
          "proxyAddress": "0x692AE5510cA9070095A496dbcFBCDA99D4024Cd9",
          "feedCategory": "low"
        },
        {
          "name": "ETC/USD",
          "proxyAddress": "0xDf3f72Be10d194b58B1BB56f2c4183e661cB2114",
          "feedCategory": "low"
        },
        {
          "name": "DPI/ETH",
          "proxyAddress": "0xC70aAF9092De3a4E5000956E672cDf5E996B4610",
          "feedCategory": "custom"
        },
        {
          "name": "ALGO/USD",
          "proxyAddress": "0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437",
          "feedCategory": "low"
        },
        {
          "name": "STORJ/USD",
          "proxyAddress": "0x0F1d5Bd7be9B30Fc09E110cd6504Bd450e53cb0E",
          "feedCategory": "medium"
        },
        {
          "name": "HBAR/USD",
          "proxyAddress": "0xC5878bDf8a89FA3bF0DC8389ae8EE6DE601D01bC",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
          "feedCategory": "low"
        },
        {
          "name": "GBP/USD",
          "proxyAddress": "0x099a2540848573e94fb1Ca0Fa420b00acbBc845a",
          "feedCategory": "low"
        },
        {
          "name": "AAPL/USD",
          "proxyAddress": "0x7E7B45b08F68EC69A99AAb12e42FcCB078e10094",
          "feedCategory": "low"
        },
        {
          "name": "ALCX/USD",
          "proxyAddress": "0x5DB6e61B6159B20F068dc15A47dF2E5931b14f29",
          "feedCategory": "medium"
        },
        {
          "name": "ADA/USD",
          "proxyAddress": "0x882554df528115a743c4537828DA8D5B58e52544",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
          "feedCategory": "low"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xb77fa460604b9C6435A235D057F7D319AC83cb53",
          "feedCategory": "medium"
        },
        {
          "name": "DGB/USD",
          "proxyAddress": "0x4205eC5fd179A843caa7B0860a8eC7D980013359",
          "feedCategory": "medium"
        },
        {
          "name": "ZEC/USD",
          "proxyAddress": "0xBC08c639e579a391C4228F20d0C29d0690092DF0",
          "feedCategory": "medium"
        },
        {
          "name": "UMA/USD",
          "proxyAddress": "0x33D9B1BAaDcF4b26ab6F8E83e9cb8a611B2B3956",
          "feedCategory": "medium"
        },
        {
          "name": "CRV/ETH",
          "proxyAddress": "0x1CF68C76803c9A415bE301f50E82e44c64B7F1D4",
          "feedCategory": "medium"
        },
        {
          "name": "ICP/USD",
          "proxyAddress": "0x84227A76a04289473057BEF706646199D7C58c34",
          "feedCategory": "low"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0xc76f762CedF0F78a439727861628E0fdfE1e70c2",
          "feedCategory": "low"
        }
      ],
    "AVALANCHE_MAINNET": [
        {
          "name": "SAND/USD",
          "proxyAddress": "0x6f2A1D4014FED967172FC7caCf7a6e04Cf02752e",
          "feedCategory": "low"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0x01752eAAB988ECb0ceBa2C8FC97c4f1d38Bf246D",
          "feedCategory": "medium"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x1F41EF93dece881Ad0b98082B2d44D3f6F0C515B",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0xCF60B4E089eA1ABA29C01b017b38c2f7D69Eb36B",
          "feedCategory": "medium"
        },
        {
          "name": "ALPHA/USD",
          "proxyAddress": "0x7B0ca9A6D03FE0467A31Ca850f5bcA51e027B3aF",
          "feedCategory": "medium"
        },
        {
          "name": "CVX/USD",
          "proxyAddress": "0x52F8026423B5E04FdD9E4b5725B68230b71D019b",
          "feedCategory": "low"
        },
        {
          "name": "QI/USD",
          "proxyAddress": "0x36E039e6391A5E7A7267650979fdf613f659be5D",
          "feedCategory": "medium"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x192f2DBA961Bb0277520C082d6bfa87D5961333E",
          "feedCategory": "low"
        },
        {
          "name": "BAT/USD",
          "proxyAddress": "0xe89B3CE86D25599D1e615C0f6a353B4572FF868D",
          "feedCategory": "medium"
        },
        {
          "name": "WOO/ETH",
          "proxyAddress": "0xfAa665F5a0e13beea63b6DfF601DD634959690Df",
          "feedCategory": "medium"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0xA418573AB5226711c8564Eeb449c3618ABFaf677",
          "feedCategory": "low"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0x9df2195dc96e6Ef983B1aAC275649F3f28F82Aa1",
          "feedCategory": "medium"
        },
        {
          "name": "SGD/USD",
          "proxyAddress": "0x05950959B6d876ae0fed1BBe5Caa2d74d8659D59",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0x86442E3a98558357d46E6182F4b262f76c4fa26F",
          "feedCategory": "medium"
        },
        {
          "name": "ADA/USD",
          "proxyAddress": "0x69C2703b8F1A85a2EF6aBDd085699a9F909BE053",
          "feedCategory": "low"
        },
        {
          "name": "AUSD/USD",
          "proxyAddress": "0x5C2d58627Fbe746f5ea24Ef6D618f09f8e3f0122",
          "feedCategory": "medium"
        },
        {
          "name": "XAVA/USD",
          "proxyAddress": "0x4Cf57DC9028187b9DAaF773c8ecA941036989238",
          "feedCategory": "high"
        },
        {
          "name": "AXS/USD",
          "proxyAddress": "0x155835C5755205597d62703a5A0b37e57a26Ee5C",
          "feedCategory": "low"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0xbBa56eF1565354217a3353a466edB82E8F25b08e",
          "feedCategory": "medium"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0x12Af94c3716bbf339Aa26BfD927DDdE63B27D50C",
          "feedCategory": "low"
        },
        {
          "name": "JOE/USD",
          "proxyAddress": "0x02D35d3a8aC3e1626d3eE09A78Dd87286F5E8e3a",
          "feedCategory": "medium"
        },
        {
          "name": "FTM/USD",
          "proxyAddress": "0x2dD517B2f9ba49CedB0573131FD97a5AC19ff648",
          "feedCategory": "high"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0xF096872672F44d6EBA71458D74fe67F9a77a23B9",
          "feedCategory": "low"
        },
        {
          "name": "LINK/AVAX",
          "proxyAddress": "0x1b8a25F73c9420dD507406C3A3816A276b62f56a",
          "feedCategory": "medium"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0x449A373A090d8A1e5F74c63Ef831Ceff39E94563",
          "feedCategory": "medium"
        },
        {
          "name": "CZK/USD",
          "proxyAddress": "0x545d17579D0F7b422Cd647B9E6a6FA4b45F6e1C5",
          "feedCategory": "low"
        },
        {
          "name": "BEAM/USD",
          "proxyAddress": "0x3427232b88Ce4e7d62A03289247eE0cA5324f6ba",
          "feedCategory": "low"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0x7B0e7d292d414788B080EfCa58b04B6372789639",
          "feedCategory": "low"
        },
        {
          "name": "SPELL/USD",
          "proxyAddress": "0x4F3ddF9378a4865cf4f28BE51E10AECb83B7daeE",
          "feedCategory": "medium"
        },
        {
          "name": "TRY/USD",
          "proxyAddress": "0xA61bF273688Ea095b5e4c11f1AF5E763F7aEEE91",
          "feedCategory": "low"
        },
        {
          "name": "FIL/USD",
          "proxyAddress": "0x2F194315f122d374a27973e259783d5C864A5bf6",
          "feedCategory": "low"
        },
        {
          "name": "GHO/USD",
          "proxyAddress": "0x076DE3812BDbdAe1330064fc01Adf7f4EAa123f3",
          "feedCategory": "medium"
        },
        {
          "name": "GMX/USD",
          "proxyAddress": "0x3F968A21647d7ca81Fb8A5b69c0A452701d5DCe8",
          "feedCategory": "low"
        },
        {
          "name": "ARB/USD",
          "proxyAddress": "0xd99bcAdbE216D82f4B77eC54a99ea1b6bA96549b",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x51D7180edA2260cc4F6e4EebB82FEF5c3c2B8300",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x49ccd9ca821EfEab2b98c60dC60F518E765EDe9a",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
          "feedCategory": "low"
        },
        {
          "name": "MKR/USD",
          "proxyAddress": "0x3E54eB0475051401D093702A5DB84EFa1Ab77b14",
          "feedCategory": "low"
        },
        {
          "name": "DOT/USD",
          "proxyAddress": "0xD73a74314AcCb53b30cAfDA0cb61c9772B57C4a2",
          "feedCategory": "low"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0x9a1372f9b1B71B3A5a72E092AE67E172dBd7Daaa",
          "feedCategory": "low"
        },
        {
          "name": "NEAR/USD",
          "proxyAddress": "0x7FDE7f51dc2580dd051e17A333E28CDC8176da0A",
          "feedCategory": "low"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0xA771e0D1e9E1eCc07C56CC38240779E54337d682",
          "feedCategory": "low"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x1db18D41E4AD2403d9f52b5624031a2D9932Fd73",
          "feedCategory": "medium"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0xf8B283aD4d969ECFD70005714DD5910160565b94",
          "feedCategory": "low"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0x9D6AA0AC8c4818433bEA7a74F49C73B57BcEC4Ec",
          "feedCategory": "medium"
        },
        {
          "name": "TUSD/USD",
          "proxyAddress": "0x9Cf3Ef104A973b351B2c032AA6793c3A6F76b448",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0xBb92195Ec95DE626346eeC8282D53e261dF95241",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743",
          "feedCategory": "low"
        },
        {
          "name": "UST/USD",
          "proxyAddress": "0xf58B78581c480caFf667C63feDd564eCF01Ef86b",
          "feedCategory": "medium"
        },
        {
          "name": "COQ/USD",
          "proxyAddress": "0x5B4712ce553E94d9b22bA3CfA10CB6F32fb828E0",
          "feedCategory": "high"
        },
        {
          "name": "MANA/USD",
          "proxyAddress": "0x774f067083f23cAB866310489419C884a6Dc00a8",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x3CA13391E9fb38a75330fb28f8cc2eB3D9ceceED",
          "feedCategory": "low"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0x28043B1Ebd41860B93EC1F1eC19560760B6dB556",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0x0A77230d17318075983913bC2145DB16C7366156",
          "feedCategory": "low"
        },
        {
          "name": "EURC/USD",
          "proxyAddress": "0x3368310bC4AeE5D96486A73bae8E6b49FcDE62D3",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a",
          "feedCategory": "low"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0x7CF8A6090A9053B01F3DF4D4e6CfEdd8c90d9027",
          "feedCategory": "low"
        },
        {
          "name": "CHZ/USD",
          "proxyAddress": "0xC4D7270aCc921DE5A17452437257f075C1298eB3",
          "feedCategory": "low"
        }
      ],
    "ARBITRUM_MAINNET": [
        {
          "name": "AAPL/USD",
          "proxyAddress": "0x8d0CC5f38f9E802475f2CFf4F9fc7000C2E1557c",
          "feedCategory": "low"
        },
        {
          "name": "SPY/USD",
          "proxyAddress": "0x46306F3795342117721D8DEd50fbcF6DF2b3cc10",
          "feedCategory": "low"
        },
        {
          "name": "OP/USD",
          "proxyAddress": "0x205aaD468a11fd5D34fA7211bC6Bad5b3deB9b98",
          "feedCategory": "medium"
        },
        {
          "name": "NVDA/USD",
          "proxyAddress": "0x4881A4418b5F2460B21d6F08CD5aA0678a7f262F",
          "feedCategory": "low"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0xC56765f04B248394CF1619D20dB8082Edbfa75b1",
          "feedCategory": "low"
        },
        {
          "name": "HSK/USD",
          "proxyAddress": "0x866fa212dfc5AAf321379874eCe95631F6d12e00",
          "feedCategory": "high"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0xb523AE262D20A936BC152e6023996e46FDC2A95D",
          "feedCategory": "medium"
        },
        {
          "name": "TSLA/USD",
          "proxyAddress": "0x3609baAa0a9b1f0FE4d6CC01884585d0e191C3E3",
          "feedCategory": "low"
        },
        {
          "name": "GOOGL/USD",
          "proxyAddress": "0x1D1a83331e9D255EB1Aaf75026B60dFD00A252ba",
          "feedCategory": "low"
        },
        {
          "name": "RETH/ETH",
          "proxyAddress": "0xD6aB2298946840262FcC278fF31516D39fF611eF",
          "feedCategory": "medium"
        },
        {
          "name": "WBTC/BTC",
          "proxyAddress": "0x0017abAc5b6f291F9164e35B1234CA1D697f9CF4",
          "feedCategory": "medium"
        },
        {
          "name": "STX/USD",
          "proxyAddress": "0x3a9659C071dD3C37a8b1A2363409A8D41B2Feae3",
          "feedCategory": "medium"
        },
        {
          "name": "XRP/USD",
          "proxyAddress": "0xB4AD57B52aB9141de9926a3e0C8dc6264c2ef205",
          "feedCategory": "low"
        },
        {
          "name": "CNY/USD",
          "proxyAddress": "0xcC3370Bde6AFE51e1205a5038947b9836371eCCb",
          "feedCategory": "low"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0xbF539d4c2106dd4D9AB6D56aed3d9023529Db145",
          "feedCategory": "medium"
        },
        {
          "name": "LUSD/USD",
          "proxyAddress": "0x0411D28c94d85A36bC72Cb0f875dfA8371D8fFfF",
          "feedCategory": "high"
        },
        {
          "name": "KRW/USD",
          "proxyAddress": "0x85bb02E0Ae286600d1c68Bb6Ce22Cc998d411916",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
          "feedCategory": "low"
        },
        {
          "name": "APE/USD",
          "proxyAddress": "0x221912ce795669f628c51c69b7d0873eDA9C03bB",
          "feedCategory": "low"
        },
        {
          "name": "DOT/USD",
          "proxyAddress": "0xa6bC5bAF2000424e90434bA7104ee399dEe80DEc",
          "feedCategory": "low"
        },
        {
          "name": "PAXG/USD",
          "proxyAddress": "0x2BA975D4D7922cD264267Af16F3bD177F206FE3c",
          "feedCategory": "low"
        },
        {
          "name": "LTC/USD",
          "proxyAddress": "0x5698690a7B7B84F6aa985ef7690A8A7288FBc9c8",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
          "feedCategory": "low"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0x054296f0D036b95531B4E14aFB578B80CFb41252",
          "feedCategory": "medium"
        },
        {
          "name": "SWETH/ETH",
          "proxyAddress": "0x05Bc6e5Fb110589bb366A3Cd7CdBe143EeBA2168",
          "feedCategory": "hidden"
        },
        {
          "name": "LBTC/BTC",
          "proxyAddress": "0x9fa74925F21ad6C86d8f402EF490cFbA2Fa5e9bE",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0xaD1d5344AaDE45F43E596773Bcc4c423EAbdD034",
          "feedCategory": "low"
        },
        {
          "name": "BTC/ETH",
          "proxyAddress": "0xc5a90A6d7e4Af242dA238FFe279e9f2BA0c64B2e",
          "feedCategory": "medium"
        },
        {
          "name": "CVX/USD",
          "proxyAddress": "0x851175a919f36c8e30197c09a9A49dA932c2CC00",
          "feedCategory": "low"
        },
        {
          "name": "GHO/USD",
          "proxyAddress": "0x3c786e934F23375Ca345C9b8D5aD54838796E8e7",
          "feedCategory": "medium"
        },
        {
          "name": "AUD/USD",
          "proxyAddress": "0x9854e9a850e7C354c1de177eA953a6b1fba8Fc22",
          "feedCategory": "low"
        },
        {
          "name": "RPL/USD",
          "proxyAddress": "0xF0b7159BbFc341Cc41E7Cb182216F62c6d40533D",
          "feedCategory": "medium"
        },
        {
          "name": "ARB/USD",
          "proxyAddress": "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
          "feedCategory": "low"
        },
        {
          "name": "ORDER/USD",
          "proxyAddress": "0xE2A3216D8e4BdFA2Ee78F2e55B995e787e6Ce500",
          "feedCategory": "medium"
        },
        {
          "name": "CAKE/USD",
          "proxyAddress": "0x256654437f1ADA8057684b18d742eFD14034C400",
          "feedCategory": "low"
        },
        {
          "name": "WTI/USD",
          "proxyAddress": "0x594b919AD828e693B935705c3F816221729E7AE8",
          "feedCategory": "custom"
        },
        {
          "name": "STG/USD",
          "proxyAddress": "0xe74d69E233faB0d8F48921f2D93aDfDe44cEb3B7",
          "feedCategory": "medium"
        },
        {
          "name": "PENDLE/USD",
          "proxyAddress": "0x66853E19d73c0F9301fe099c324A1E9726953433",
          "feedCategory": "low"
        },
        {
          "name": "GNS/USD",
          "proxyAddress": "0xE89E98CE4E19071E59Ed4780E0598b541CE76486",
          "feedCategory": "high"
        },
        {
          "name": "CAD/USD",
          "proxyAddress": "0xf6DA27749484843c4F02f5Ad1378ceE723dD61d4",
          "feedCategory": "low"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0xe7C53FFd03Eb6ceF7d208bC4C13446c76d1E5884",
          "feedCategory": "medium"
        },
        {
          "name": "BAL/USD",
          "proxyAddress": "0xBE5eA816870D11239c543F84b71439511D70B94f",
          "feedCategory": "medium"
        },
        {
          "name": "MKR/USD",
          "proxyAddress": "0xdE9f0894670c4EFcacF370426F10C3AD2Cdf147e",
          "feedCategory": "low"
        },
        {
          "name": "AMZN/USD",
          "proxyAddress": "0xd6a77691f071E98Df7217BED98f38ae6d2313EBA",
          "feedCategory": "low"
        },
        {
          "name": "RSR/USD",
          "proxyAddress": "0xcfF9349ec6d027f20fC9360117fef4a1Ad38B488",
          "feedCategory": "medium"
        },
        {
          "name": "MELANIA/USD",
          "proxyAddress": "0xE2CB592D636c500a6e469628054F09d58e4d91BB",
          "feedCategory": "medium"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0x0809E3d38d1B4214958faf06D8b1B1a2b73f2ab8",
          "feedCategory": "medium"
        },
        {
          "name": "PHP/USD",
          "proxyAddress": "0xfF82AAF635645fD0bcc7b619C3F28004cDb58574",
          "feedCategory": "low"
        },
        {
          "name": "MSFT/USD",
          "proxyAddress": "0xDde33fb9F21739602806580bdd73BAd831DcA867",
          "feedCategory": "low"
        },
        {
          "name": "MAGIC/USD",
          "proxyAddress": "0x47E55cCec6582838E173f252D08Afd8116c2202d",
          "feedCategory": "medium"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0x04b7384473A2aDF1903E3a98aCAc5D62ba8C2702",
          "feedCategory": "low"
        },
        {
          "name": "COIN/USD",
          "proxyAddress": "0x950DC95D4E537A14283059bADC2734977C454498",
          "feedCategory": "low"
        },
        {
          "name": "SHIB/USD",
          "proxyAddress": "0x0E278D14B4bf6429dDB0a1B353e2Ae8A4e128C93",
          "feedCategory": "low"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0x745Ab5b69E01E2BE1104Ca84937Bb71f96f5fB21",
          "feedCategory": "medium"
        },
        {
          "name": "PEPE/USD",
          "proxyAddress": "0x02DEd5a7EDDA750E3Eb240b54437a54d57b74dBE",
          "feedCategory": "low"
        },
        {
          "name": "AXL/USD",
          "proxyAddress": "0x84e8237CC1418Ea1B4A1e0C3e7F48c3A5fbC81AF",
          "feedCategory": "medium"
        },
        {
          "name": "IOTX/USD",
          "proxyAddress": "0x484A1b29ED1Ea038dBd75D7c7293714343363122",
          "feedCategory": "medium"
        },
        {
          "name": "WIF/USD",
          "proxyAddress": "0xF7Ee427318d2Bd0EEd3c63382D0d52Ad8A68f90D",
          "feedCategory": "low"
        },
        {
          "name": "FTM/USD",
          "proxyAddress": "0xFeaC1A3936514746e70170c0f539e70b23d36F19",
          "feedCategory": "high"
        },
        {
          "name": "GRT/USD",
          "proxyAddress": "0x0F38D86FceF4955B705F35c9e41d1A16e0637c73",
          "feedCategory": "medium"
        },
        {
          "name": "ATOM/USD",
          "proxyAddress": "0xCDA67618e51762235eacA373894F0C79256768fa",
          "feedCategory": "low"
        },
        {
          "name": "GBP/USD",
          "proxyAddress": "0x9C4424Fd84C6661F97D8d6b3fc3C1aAc2BeDd137",
          "feedCategory": "low"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0xaebDA2c976cfd1eE1977Eac079B4382acb849325",
          "feedCategory": "low"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0xA14d53bC1F1c0F31B4aA3BD109344E5009051a84",
          "feedCategory": "low"
        },
        {
          "name": "SHIB/ETH",
          "proxyAddress": "0x639b7cD102A1c5BaB71c54f88D41E894215c54E2",
          "feedCategory": "medium"
        },
        {
          "name": "TIA/USD",
          "proxyAddress": "0x4096b9bfB4c34497B7a3939D4f629cf65EBf5634",
          "feedCategory": "low"
        },
        {
          "name": "SGD/USD",
          "proxyAddress": "0xF0d38324d1F86a176aC727A4b0c43c9F9d9c5EB1",
          "feedCategory": "low"
        },
        {
          "name": "WOO/USD",
          "proxyAddress": "0x5e2b5C5C07cCA3437c4D724225Bb42c7E55d1597",
          "feedCategory": "medium"
        },
        {
          "name": "TRY/USD",
          "proxyAddress": "0xE8f8AfE4b56c6C421F691bfAc225cE61b2C7CD05",
          "feedCategory": "low"
        },
        {
          "name": "ULTI/USD",
          "proxyAddress": "0x8883045300Eaf3b1Bb1b3b17F9B4d70EfF50212a",
          "feedCategory": "medium"
        },
        {
          "name": "ENA/USD",
          "proxyAddress": "0x9eE96caa9972c801058CAA8E23419fc6516FbF7e",
          "feedCategory": "low"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x24ceA4b8ce57cdA5058b924B9B9987992450590c",
          "feedCategory": "low"
        },
        {
          "name": "XVS/USD",
          "proxyAddress": "0x300b0990Ba191a1AeBef6e5Ed8B5B308C0B2d0c9",
          "feedCategory": "medium"
        },
        {
          "name": "TBTC/BTC",
          "proxyAddress": "0xe4c31C5B118d8aA92433eD1c7EC70afb430cd730",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x6ce185860a4963106506C203335A2910413708e9",
          "feedCategory": "low"
        },
        {
          "name": "RDNT/USD",
          "proxyAddress": "0x20d0Fcab0ECFD078B036b6CAf1FaC69A6453b352",
          "feedCategory": "medium"
        },
        {
          "name": "MLN/USD",
          "proxyAddress": "0xD07de6e37A011CCAfD375d7eb130205E0fa24d69",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x86E53CF1B870786351Da77A57575e79CB55812CB",
          "feedCategory": "low"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x6970460aabF80C5BE983C6b74e5D06dEDCA95D4A",
          "feedCategory": "medium"
        },
        {
          "name": "AXS/USD",
          "proxyAddress": "0x5B58aA6E0651Ae311864876A55411F481aD86080",
          "feedCategory": "low"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x52099D4523531f678Dfc568a7B1e5038aadcE1d6",
          "feedCategory": "medium"
        },
        {
          "name": "ZAR/USD",
          "proxyAddress": "0xA9cC9B5Ea2584239365Ea6b985868D121CB7Aea6",
          "feedCategory": "low"
        },
        {
          "name": "TAO/USD",
          "proxyAddress": "0x6aCcBB82aF71B8a576B4C05D4aF92A83A035B991",
          "feedCategory": "low"
        },
        {
          "name": "META/USD",
          "proxyAddress": "0xcd1bd86fDc33080DCF1b5715B6FCe04eC6F85845",
          "feedCategory": "low"
        },
        {
          "name": "MNT/USD",
          "proxyAddress": "0x37DDEE84dE03d039e1Bf809b7a01EDd2c4665771",
          "feedCategory": "low"
        },
        {
          "name": "STETH/ETH",
          "proxyAddress": "0xded2c52b75B24732e9107377B7Ba93eC1fFa4BAf",
          "feedCategory": "medium"
        },
        {
          "name": "LDO/USD",
          "proxyAddress": "0xA43A34030088E6510FecCFb77E88ee5e7ed0fE64",
          "feedCategory": "low"
        },
        {
          "name": "ZRO/USD",
          "proxyAddress": "0x1940fEd49cDBC397941f2D336eb4994D599e568B",
          "feedCategory": "low"
        },
        {
          "name": "TBTC/USD",
          "proxyAddress": "0xE808488e8627F6531bA79a13A9E0271B39abEb1C",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
          "feedCategory": "low"
        },
        {
          "name": "TRUMP/USD",
          "proxyAddress": "0x373510BDa1ab7e873c731968f4D81B685f520E4B",
          "feedCategory": "low"
        },
        {
          "name": "STETH/USD",
          "proxyAddress": "0x07C5b924399cc23c24a95c8743DE4006a32b7f2a",
          "feedCategory": "medium"
        },
        {
          "name": "TUSD/USD",
          "proxyAddress": "0x6fAbee62266Da6686EE2744C6f15bb8352d2f28D",
          "feedCategory": "medium"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0xe32AccC8c4eC03F6E75bd3621BfC9Fbb234E1FC3",
          "feedCategory": "low"
        },
        {
          "name": "GMX/USD",
          "proxyAddress": "0xDB98056FecFff59D032aB628337A4887110df3dB",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
          "feedCategory": "low"
        },
        {
          "name": "BONE/USD",
          "proxyAddress": "0x8b7C8726F93063b88Db512f34b90291AEB1E884B",
          "feedCategory": "medium"
        },
        {
          "name": "XAI/USD",
          "proxyAddress": "0x806c532D543352e7C344ba6C7F3F00Bfbd309Af1",
          "feedCategory": "medium"
        },
        {
          "name": "CRVUSD/USD",
          "proxyAddress": "0x0a32255dd4BB6177C994bAAc73E0606fDD568f66",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xb7c8Fb1dB45007F98A68Da0588e1AA524C317f27",
          "feedCategory": "medium"
        },
        {
          "name": "JOE/USD",
          "proxyAddress": "0x04180965a782E487d0632013ABa488A472243542",
          "feedCategory": "medium"
        },
        {
          "name": "1INCH/USD",
          "proxyAddress": "0x4bC735Ef24bf286983024CAd5D03f0738865Aaef",
          "feedCategory": "low"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0x3dD6e51CB9caE717d5a8778CF79A04029f9cFDF8",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0xd0C7101eACbB49F3deCcCc166d238410D6D46d57",
          "feedCategory": "medium"
        },
        {
          "name": "NEAR/USD",
          "proxyAddress": "0xBF5C3fB2633e924598A46B9D07a174a9DBcF57C0",
          "feedCategory": "low"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0x9A7FB1b3950837a8D9b40517626E11D4127C098C",
          "feedCategory": "low"
        },
        {
          "name": "CBETH/ETH",
          "proxyAddress": "0xa668682974E3f121185a3cD94f00322beC674275",
          "feedCategory": "medium"
        },
        {
          "name": "RON/USD",
          "proxyAddress": "0x29D57534598BF8Adda2CC2FbDe4B7502387B8177",
          "feedCategory": "medium"
        },
        {
          "name": "DODO/USD",
          "proxyAddress": "0xA33a06c119EC08F92735F9ccA37e07Af08C4f281",
          "feedCategory": "medium"
        },
        {
          "name": "ORDI/USD",
          "proxyAddress": "0x76998C22eEa325A11dc6971Cedcf533E9740F854",
          "feedCategory": "low"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0x8bf61728eeDCE2F32c456454d87B5d6eD6150208",
          "feedCategory": "low"
        },
        {
          "name": "SEK/USD",
          "proxyAddress": "0xdE89a55d04DEd40A410877ab87d4F567ee66a1f0",
          "feedCategory": "low"
        },
        {
          "name": "SEI/USD",
          "proxyAddress": "0xCc9742d77622eE9abBF1Df03530594f9097bDcB3",
          "feedCategory": "low"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x1F954Dc24a49708C26E0C1777f16750B5C6d5a2c",
          "feedCategory": "low"
        },
        {
          "name": "ASTR/USD",
          "proxyAddress": "0x70E48a135F76bA31B47FE944e769E052A8FeB849",
          "feedCategory": "medium"
        },
        {
          "name": "USDD/USD",
          "proxyAddress": "0x4Ee1f9ec1048979930aC832a3C1d18a0b4955a02",
          "feedCategory": "medium"
        },
        {
          "name": "USDM/USD",
          "proxyAddress": "0x24EA2671671c33D66e9854eC06e42E5D3ac1f764",
          "feedCategory": "high"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0x82BA56a2fADF9C14f17D08bc51bDA0bDB83A8934",
          "feedCategory": "low"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0xb2A8BA74cbca38508BA1632761b56C897060147C",
          "feedCategory": "medium"
        },
        {
          "name": "DPI/USD",
          "proxyAddress": "0x1e431E56118bE414bD91f6392414ad3833d21B0D",
          "feedCategory": "custom"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0xb0EA543f9F8d4B818550365d13F66Da747e1476A",
          "feedCategory": "high"
        },
        {
          "name": "ADA/USD",
          "proxyAddress": "0xD9f615A9b820225edbA2d821c4A696a0924051c6",
          "feedCategory": "low"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0x9C917083fDb403ab5ADbEC26Ee294f6EcAda2720",
          "feedCategory": "low"
        },
        {
          "name": "SPELL/USD",
          "proxyAddress": "0x383b3624478124697BEF675F07cA37570b73992f",
          "feedCategory": "medium"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0x36a121448D74Fa81450c992A1a44B9b7377CD3a5",
          "feedCategory": "low"
        },
        {
          "name": "WEMIX/USD",
          "proxyAddress": "0x6FfBc6339DD46a7e0513D4887106349214C05505",
          "feedCategory": "medium"
        },
        {
          "name": "USDV/USD",
          "proxyAddress": "0x7Fa028B87e73deb66DcFf9Fa40f4C7C6Dd2Fd254",
          "feedCategory": "hidden"
        }
      ],
    "OPTIMISM_MAINNET": [
        {
          "name": "ETH/USD",
          "proxyAddress": "0x13e3Ee699D1909E989722E753853AE30b17e08c5",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0x524299Ab0987a7c4B3c8022a35669DdcdC715a10",
          "feedCategory": "medium"
        },
        {
          "name": "FLOW/USD",
          "proxyAddress": "0x2fF1EB7D0ceC35959F0248E9354c3248c6683D9b",
          "feedCategory": "medium"
        },
        {
          "name": "TBTC/USD",
          "proxyAddress": "0x5a61374950D4BFa5a3D4f2CA36FC1d23A92b6f21",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0xD702DD976Fb76Fffc2D3963D037dfDae5b04E593",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/USD",
          "proxyAddress": "0x698B585CbC4407e2D54aa898B2600B53C68958f7",
          "feedCategory": "medium"
        },
        {
          "name": "GMX/USD",
          "proxyAddress": "0x62f42f70ba85De1086476bB6BADE926d0E0b8a4C",
          "feedCategory": "low"
        },
        {
          "name": "UMA/USD",
          "proxyAddress": "0xeEC819b2e155CC8FEae194F5129f767409e2327c",
          "feedCategory": "medium"
        },
        {
          "name": "STETH/USD",
          "proxyAddress": "0x41878779a388585509657CE5Fb95a80050502186",
          "feedCategory": "medium"
        },
        {
          "name": "FTM/USD",
          "proxyAddress": "0xc19d58652d6BfC6Db6FB3691eDA6Aa7f3379E4E9",
          "feedCategory": "high"
        },
        {
          "name": "SUSD/USD",
          "proxyAddress": "0x7f99817d87baD03ea21E05112Ca799d715730efe",
          "feedCategory": "hidden"
        },
        {
          "name": "DYDX/USD",
          "proxyAddress": "0xee35A95c9a064491531493D8b380bC40A4CCd0Da",
          "feedCategory": "low"
        },
        {
          "name": "LUSD/USD",
          "proxyAddress": "0x9dfc79Aaeb5bb0f96C6e9402671981CdFc424052",
          "feedCategory": "hidden"
        },
        {
          "name": "STX/USD",
          "proxyAddress": "0x602eB777BE29Fbe63349A33306bD73Ff333D02bB",
          "feedCategory": "medium"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x0ded608AFc23724f614B76955bbd9dFe7dDdc828",
          "feedCategory": "medium"
        },
        {
          "name": "STETH/ETH",
          "proxyAddress": "0x14d2d3a82AeD4019FddDfe07E8bdc485fb0d2249",
          "feedCategory": "medium"
        },
        {
          "name": "RUNE/USD",
          "proxyAddress": "0x372cc5e685115A56F14fa7e4716F1294e04c278A",
          "feedCategory": "medium"
        },
        {
          "name": "ZRX/USD",
          "proxyAddress": "0xBfbb4fE2fB71022DbFE0D4232c8C528bddf9c57f",
          "feedCategory": "medium"
        },
        {
          "name": "TRX/USD",
          "proxyAddress": "0x0E09921cf7801A5aD47B892C8727593275625a9f",
          "feedCategory": "low"
        },
        {
          "name": "USDM/USD",
          "proxyAddress": "0xA45881b63ff9BE3F9a3439CA0c002686e65a8ED5",
          "feedCategory": "high"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0xD38579f7cBD14c22cF1997575eA8eF7bfe62ca2c",
          "feedCategory": "medium"
        },
        {
          "name": "ORDI/USD",
          "proxyAddress": "0x30795BeACc0f43920EF1288dB6676B5e205AE288",
          "feedCategory": "low"
        },
        {
          "name": "INR/USD",
          "proxyAddress": "0x5535e67d8f99c8ebe961E1Fc1F6DDAE96FEC82C9",
          "feedCategory": "low"
        },
        {
          "name": "ALGO/USD",
          "proxyAddress": "0xBf5384854988939729E8B76b8AeCe7d8D930F9f3",
          "feedCategory": "low"
        },
        {
          "name": "APT/USD",
          "proxyAddress": "0x48f2EcF0Bd180239AEF474a9da945F2e2d41daA3",
          "feedCategory": "low"
        },
        {
          "name": "VELO/USD",
          "proxyAddress": "0x0f2Ed59657e391746C1a097BDa98F2aBb94b1120",
          "feedCategory": "medium"
        },
        {
          "name": "APE/USD",
          "proxyAddress": "0x89178957E9bD07934d7792fFc0CF39f11c8C2B1F",
          "feedCategory": "low"
        },
        {
          "name": "ZIL/USD",
          "proxyAddress": "0x1520874FC216f5F07E03607303Df2Fda6C3Fc203",
          "feedCategory": "medium"
        },
        {
          "name": "FLOKI/USD",
          "proxyAddress": "0x34E0E85CeEc6be6146c4f0115769a29a9539222e",
          "feedCategory": "low"
        },
        {
          "name": "ANKR/USD",
          "proxyAddress": "0xaE2f8ca8d89c3E4521B918D9D5F5bB30e937d68a",
          "feedCategory": "low"
        },
        {
          "name": "GRT/USD",
          "proxyAddress": "0xfa042d5F474d7A39454C594CCfE014Ea011495f2",
          "feedCategory": "medium"
        },
        {
          "name": "BAL/USD",
          "proxyAddress": "0x30D9d31C1ac29Bc2c2c312c1bCa9F8b3D60e2376",
          "feedCategory": "medium"
        },
        {
          "name": "MKR/USD",
          "proxyAddress": "0x607b417DF51e0E1ed3A12fDb7FC0e8307ED250F3",
          "feedCategory": "low"
        },
        {
          "name": "OP/USD",
          "proxyAddress": "0x0D276FC14719f9292D5C1eA2198673d1f4269246",
          "feedCategory": "medium"
        },
        {
          "name": "XLM/USD",
          "proxyAddress": "0x799A346e7dBfa0f66Ad0961259366F93A1ee34C4",
          "feedCategory": "low"
        },
        {
          "name": "ETC/USD",
          "proxyAddress": "0xb7B9A39CC63f856b90B364911CC324dC46aC1770",
          "feedCategory": "low"
        },
        {
          "name": "JUP/USD",
          "proxyAddress": "0x5eb9F7baCd59C886fBD9aa2C0a891223482a1ed4",
          "feedCategory": "low"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0x2FCF37343e916eAEd1f1DdaaF84458a359b53877",
          "feedCategory": "medium"
        },
        {
          "name": "IMX/USD",
          "proxyAddress": "0x26Fce884555FAe5F0E4701cc976FE8D8bB111A38",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0xCc232dcFAAE6354cE191Bd574108c1aD03f86450",
          "feedCategory": "low"
        },
        {
          "name": "SAND/USD",
          "proxyAddress": "0xAE33e077a02071E62d342E449Afd9895b016d541",
          "feedCategory": "low"
        },
        {
          "name": "TIA/USD",
          "proxyAddress": "0xD7bC56BBF8D555936cb5121f38d1d362c586776A",
          "feedCategory": "low"
        },
        {
          "name": "WIF/USD",
          "proxyAddress": "0x75c3bF05EeF2c1966D6d5890Def3DbE640627642",
          "feedCategory": "low"
        },
        {
          "name": "CBETH/ETH",
          "proxyAddress": "0x138b809B8472fF09Cd3E075E6EcbB2e42D41d870",
          "feedCategory": "medium"
        },
        {
          "name": "EOS/USD",
          "proxyAddress": "0x8E8E6C8c4942e4963C682fF54A0d058458393DCC",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F",
          "feedCategory": "medium"
        },
        {
          "name": "RNDR/USD",
          "proxyAddress": "0x53623FD50C5Fd8788746af00F088FD7f06fD4116",
          "feedCategory": "low"
        },
        {
          "name": "ONE/USD",
          "proxyAddress": "0x7CFB4fac1a2FDB1267F8bc17FADc12804AC13CFE",
          "feedCategory": "medium"
        },
        {
          "name": "AUD/USD",
          "proxyAddress": "0x39be70E93D2D285C9E71be7f70FC5a45A7777B14",
          "feedCategory": "low"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0x5cdC797acCBf57EE2363Fed9701262Abc87a232e",
          "feedCategory": "medium"
        },
        {
          "name": "ENJ/USD",
          "proxyAddress": "0x0cD83cC474e69E611d240f0d35D5794361F5e5C2",
          "feedCategory": "medium"
        },
        {
          "name": "XTZ/USD",
          "proxyAddress": "0xeA2aeD0087A620995Bf609D1bCD76Ea099905138",
          "feedCategory": "medium"
        },
        {
          "name": "INJ/USD",
          "proxyAddress": "0x90CC16F5493894eff84a5Fedd1dcE297d174fEEf",
          "feedCategory": "low"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x8F7bFb42Bf7421c2b34AAD619be4654bFa7B3B8B",
          "feedCategory": "low"
        },
        {
          "name": "AXS/USD",
          "proxyAddress": "0x805a61D54bb686e57F02D1EC96A1491C7aF40893",
          "feedCategory": "low"
        },
        {
          "name": "ARB/USD",
          "proxyAddress": "0x8f14546d0B960793180ee355B73fA55041a4a356",
          "feedCategory": "low"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0xbD92C6c284271c227a1e0bF1786F468b539f51D9",
          "feedCategory": "low"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x338ed6787f463394D24813b297401B9F05a8C9d1",
          "feedCategory": "low"
        },
        {
          "name": "ATOM/USD",
          "proxyAddress": "0xEF89db2eA46B4aD4E333466B6A486b809e613F39",
          "feedCategory": "low"
        },
        {
          "name": "RETH/ETH",
          "proxyAddress": "0xb429DE60943a8e6DeD356dca2F93Cd31201D9ed0",
          "feedCategory": "medium"
        },
        {
          "name": "SUSHI/USD",
          "proxyAddress": "0x72155D46FD9f03AF1739637F9E7Db8A87C40A730",
          "feedCategory": "medium"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0x11429eE838cC01071402f21C219870cbAc0a59A0",
          "feedCategory": "low"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0xC6066533917f034Cf610c08e1fe5e9c7eADe0f54",
          "feedCategory": "low"
        },
        {
          "name": "PEPE/USD",
          "proxyAddress": "0x64Ecf089a6594Be781908D5a26FC8fA6CB08A2C7",
          "feedCategory": "low"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0x22Ba046769b584c3B05530F7c50d0E8638bd71F1",
          "feedCategory": "low"
        },
        {
          "name": "ETH/BTC",
          "proxyAddress": "0xe4b9bcD7d0AA917f19019165EB89BdbbF36d2cBe",
          "feedCategory": "medium"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0xC663315f7aF904fbbB0F785c32046dFA03e85270",
          "feedCategory": "low"
        },
        {
          "name": "BCH/USD",
          "proxyAddress": "0x33E047119359161288bcB143e0C15467C7151d4c",
          "feedCategory": "low"
        },
        {
          "name": "FET/USD",
          "proxyAddress": "0xf37c76163b2918bB4533579D449524F8542E64AD",
          "feedCategory": "low"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x3626369857A10CcC6cc3A6e4f5C2f5984a519F20",
          "feedCategory": "low"
        },
        {
          "name": "PENDLE/USD",
          "proxyAddress": "0x58F23F80bF389DB1af9e3aA8c59679806749A8a4",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xECef79E109e997bCA29c1c0897ec9d7b03647F5E",
          "feedCategory": "low"
        },
        {
          "name": "RPL/USD",
          "proxyAddress": "0xADE082c91A6AeCC86fC11704a830e933e1b382eA",
          "feedCategory": "medium"
        },
        {
          "name": "WLD/USD",
          "proxyAddress": "0x4e1C6B168DCFD7758bC2Ab9d2865f1895813D236",
          "feedCategory": "low"
        },
        {
          "name": "FIL/USD",
          "proxyAddress": "0x66F61FEe824c1dF059BccCC5F21ca39e083EefDf",
          "feedCategory": "low"
        },
        {
          "name": "SHIB/USD",
          "proxyAddress": "0xd1e56e7657C0E0d20c0e11C2B6ae0D90932d5665",
          "feedCategory": "low"
        },
        {
          "name": "LDO/USD",
          "proxyAddress": "0x221618871470f78D8a3391d35B77dFb3C0fbc383",
          "feedCategory": "low"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0x03fe94a215E3842deD931769F913d93FF33d0051",
          "feedCategory": "high"
        },
        {
          "name": "ADA/USD",
          "proxyAddress": "0x43dEa17DeE1ca50c6266acb59b32659E44D3ee5D",
          "feedCategory": "low"
        },
        {
          "name": "SATS/USD",
          "proxyAddress": "0x50f8cf458E7334Be143f3c9F1f1577EE37A45653",
          "feedCategory": "medium"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0xB22900D4D0CEa5DB0B3bb08565a9f0f4a831D32C",
          "feedCategory": "low"
        },
        {
          "name": "XMR/USD",
          "proxyAddress": "0x2a8D91686A048E98e6CCF1A89E82f40D14312672",
          "feedCategory": "low"
        },
        {
          "name": "BONK/USD",
          "proxyAddress": "0xec236454209A76a6deCdf5C1183aE2Eb5e82a829",
          "feedCategory": "low"
        },
        {
          "name": "PERP/USD",
          "proxyAddress": "0xA12CDDd8e986AF9288ab31E58C60e65F2987fB13",
          "feedCategory": "medium"
        },
        {
          "name": "NEAR/USD",
          "proxyAddress": "0xca6fa4b8CB365C02cd3Ba70544EFffe78f63ac82",
          "feedCategory": "low"
        },
        {
          "name": "PYTH/USD",
          "proxyAddress": "0x0838cFe6A97C9CE1611a6Ed17252477a3c71eBEb",
          "feedCategory": "low"
        },
        {
          "name": "MAV/USD",
          "proxyAddress": "0x51E06250C8E46c8E5DE41ac8B917a47D706128C2",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0x464A1515ADc20de946f8d0DEB99cead8CEAE310d",
          "feedCategory": "medium"
        },
        {
          "name": "DOT/USD",
          "proxyAddress": "0x28e67BAeEB5dE7A788f3Dde6CF6ee491369Bb3Fa",
          "feedCategory": "low"
        },
        {
          "name": "SEI/USD",
          "proxyAddress": "0x6f6cED6B096708C1276056fdBdb7BbDe07Ca462C",
          "feedCategory": "low"
        },
        {
          "name": "JTO/USD",
          "proxyAddress": "0xFC3b7bd4368b2919f67E437f8c6Ca42C7FD55dd5",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0x5087Dc69Fd3907a016BD42B38022F7f024140727",
          "feedCategory": "low"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0xe1011160d78a80E2eEBD60C228EEf7af4Dfcd4d7",
          "feedCategory": "medium"
        },
        {
          "name": "FRAX/USD",
          "proxyAddress": "0xc7D132BeCAbE7Dcc4204841F33bae45841e41D9C",
          "feedCategory": "medium"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0x536944c3A71FEb7c1E5C66Ee37d1a148d8D8f619",
          "feedCategory": "low"
        },
        {
          "name": "XRP/USD",
          "proxyAddress": "0x8788F0DBDa7678244Ac7FF09d963d7696D56A8a0",
          "feedCategory": "low"
        },
        {
          "name": "ZEC/USD",
          "proxyAddress": "0x2FF8822F371b283604369700d6F06da3fBb31064",
          "feedCategory": "medium"
        },
        {
          "name": "WELL/USD",
          "proxyAddress": "0x7F102e5b4C32e0861293E97DE85e6E0dB3530605",
          "feedCategory": "medium"
        },
        {
          "name": "BLUR/USD",
          "proxyAddress": "0x517C2557c29F7c53Aa5F97a1DAE465E0d5C174AA",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6",
          "feedCategory": "low"
        },
        {
          "name": "1INCH/USD",
          "proxyAddress": "0x9fCe737834500045FB07AD158991BCAC3b05D5A6",
          "feedCategory": "medium"
        },
        {
          "name": "STRK/USD",
          "proxyAddress": "0x8814dEC83E2862A3792A0D6aDFC48CF76Add1890",
          "feedCategory": "low"
        },
        {
          "name": "CELO/USD",
          "proxyAddress": "0x5A9072a995E072fD06D8f1EB95933955FDa53C0a",
          "feedCategory": "low"
        },
        {
          "name": "FXS/USD",
          "proxyAddress": "0xB9B16330671067B1b062B9aC2eFd2dB75F03436E",
          "feedCategory": "low"
        },
        {
          "name": "CVX/USD",
          "proxyAddress": "0x955b05dD4573dDFAfB47cb78db16B1Fa127E6e71",
          "feedCategory": "low"
        },
        {
          "name": "XAG/USD",
          "proxyAddress": "0x290dd71254874f0d4356443607cb8234958DEe49",
          "feedCategory": "low"
        },
        {
          "name": "ICP/USD",
          "proxyAddress": "0xe98290265E4aE3758503a03e937F381A2A7aFB57",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3",
          "feedCategory": "low"
        },
        {
          "name": "SUI/USD",
          "proxyAddress": "0xEaf1a9fe242aa9928faedc6CE7e09aD4875f7133",
          "feedCategory": "low"
        },
        {
          "name": "KNC/USD",
          "proxyAddress": "0xCB24d22aF35986aC1feb8874AdBbDF68f6dC2e96",
          "feedCategory": "medium"
        },
        {
          "name": "MEME/USD",
          "proxyAddress": "0xC6884869673a6960486FE0f6B0E775A53521e433",
          "feedCategory": "low"
        },
        {
          "name": "LTC/USD",
          "proxyAddress": "0x45954efBD01f5A12428A09E4C38b8434C3dD4Ac3",
          "feedCategory": "low"
        },
        {
          "name": "TRB/USD",
          "proxyAddress": "0x3FF5BDB2bB6E3f946d9485De6c591c93B4179ae7",
          "feedCategory": "low"
        }
      ],
    "BASE_MAINNET": [
        {
          "name": "AXL/USD",
          "proxyAddress": "0x676C4C6C31D97A5581D3204C04A8125B350E2F9D",
          "feedCategory": "medium"
        },
        {
          "name": "CBETH/ETH",
          "proxyAddress": "0x806b4Ac04501c29769051e42783cF04dCE41440b",
          "feedCategory": "medium"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0x0b0E64c05083FdF9ED7C5D3d8262c4216eFc9394",
          "feedCategory": "low"
        },
        {
          "name": "TBTC/USD",
          "proxyAddress": "0x6D75BFB5A5885f841b132198C9f0bE8c872057BF",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x7e860098F58bBFC8648a4311b374B1D669a2bc6B",
          "feedCategory": "low"
        },
        {
          "name": "RDNT/USD",
          "proxyAddress": "0xEf2E24ba6def99B5e0b71F6CDeaF294b02163094",
          "feedCategory": "medium"
        },
        {
          "name": "USR/USD",
          "proxyAddress": "0x4a595E0a62E50A2E5eC95A70c8E612F9746af006",
          "feedCategory": "high"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x591e79239a7d679378eC8c847e5038150364C78F",
          "feedCategory": "low"
        },
        {
          "name": "OP/USD",
          "proxyAddress": "0x3E3A6bD129A63564FE7abde85FA67c3950569060",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xc5E65227fe3385B88468F9A01600017cDC9F3A12",
          "feedCategory": "medium"
        },
        {
          "name": "USDS/USD",
          "proxyAddress": "0x2330aaE3bca5F05169d5f4597964D44522F62930",
          "feedCategory": "medium"
        },
        {
          "name": "CBETH/USD",
          "proxyAddress": "0xd7818272B9e248357d13057AAb0B417aF31E817d",
          "feedCategory": "medium"
        },
        {
          "name": "XAU/USD",
          "proxyAddress": "0x5213eBB69743b85644dbB6E25cdF994aFBb8cF31",
          "feedCategory": "low"
        },
        {
          "name": "USDM/USD",
          "proxyAddress": "0xF7742A6f36e9936CeA0E976bF6CD3930C1178775",
          "feedCategory": "high"
        },
        {
          "name": "RETH/ETH",
          "proxyAddress": "0xf397bF97280B488cA19ee3093E81C0a77F02e9a5",
          "feedCategory": "medium"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0xd7221b10FBBC1e1ba95Fd0B4D031C15f7F365296",
          "feedCategory": "high"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0xc91D87E81faB8f93699ECf7Ee9B44D11e1D53F0F",
          "feedCategory": "low"
        },
        {
          "name": "OGN/USD",
          "proxyAddress": "0x91D7AEd72bF772A0DA30199B925aCB866ACD3D9e",
          "feedCategory": "medium"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
          "feedCategory": "low"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0x9DDa783DE64A9d1A60c49ca761EbE528C35BA428",
          "feedCategory": "medium"
        },
        {
          "name": "WIF/USD",
          "proxyAddress": "0x674940e1dBf7FD841b33156DA9A88afbD95AaFBa",
          "feedCategory": "low"
        },
        {
          "name": "STG/USD",
          "proxyAddress": "0x63Af8341b62E683B87bB540896bF283D96B4D385",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x17CAb8FE31E32f08326e5E27412894e49B0f9D65",
          "feedCategory": "low"
        },
        {
          "name": "SNX/USD",
          "proxyAddress": "0xe3971Ed6F1A5903321479Ef3148B5950c0612075",
          "feedCategory": "medium"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0x5E988c11a4f92155C30D9fb69Ed75597f712B113",
          "feedCategory": "low"
        },
        {
          "name": "STETH/ETH",
          "proxyAddress": "0xf586d0728a47229e747d824a939000Cf21dEF5A0",
          "feedCategory": "medium"
        },
        {
          "name": "PEPE/USD",
          "proxyAddress": "0xB48ac6409C0c3718b956089b0fFE295A10ACDdad",
          "feedCategory": "low"
        },
        {
          "name": "MEW/USD",
          "proxyAddress": "0x9FB8b5A4b3FE655564f0c76616ae79DE90Cc7382",
          "feedCategory": "medium"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0xE70f2D34Fd04046aaEC26a198A35dD8F2dF5cd92",
          "feedCategory": "low"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x12129aAC52D6B0f0125677D4E1435633E61fD25f",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F",
          "feedCategory": "low"
        },
        {
          "name": "LBTC/BTC",
          "proxyAddress": "0x1E6c22AAA11F507af12034A5Dc4126A6A25DC8d2",
          "feedCategory": "medium"
        },
        {
          "name": "GHO/USD",
          "proxyAddress": "0x42868EFcee13C0E71af89c04fF7d96f5bec479b0",
          "feedCategory": "medium"
        },
        {
          "name": "SHIB/USD",
          "proxyAddress": "0xC8D5D660bb585b68fa0263EeD7B4224a5FC99669",
          "feedCategory": "low"
        },
        {
          "name": "MAVIA/USD",
          "proxyAddress": "0x979447581b39caCA33EF0CA8208592393D16cc13",
          "feedCategory": "medium"
        },
        {
          "name": "ZRO/USD",
          "proxyAddress": "0xdc31a4CCfCA039BeC6222e20BE7770E12581bfEB",
          "feedCategory": "low"
        },
        {
          "name": "ZBU/USD",
          "proxyAddress": "0x19c6501ee6FF5Faf36346031A92C46AF128807d3",
          "feedCategory": "high"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0x43a5C292A453A3bF3606fa856197f09D7B74251a",
          "feedCategory": "medium"
        },
        {
          "name": "APT/USD",
          "proxyAddress": "0x88a98431C25329AA422B21D147c1518b34dD36F4",
          "feedCategory": "low"
        },
        {
          "name": "MLN/USD",
          "proxyAddress": "0x122b5334A8b55861dBc6729c294451471FbF318D",
          "feedCategory": "medium"
        },
        {
          "name": "AERO/USD",
          "proxyAddress": "0x4EC5970fC728C5f65ba413992CD5fF6FD70fcfF0",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xf19d560eB8d2ADf07BD6D13ed03e1D11215721F9",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0xCCADC697c55bbB68dc5bCdf8d3CBe83CdD4E071E",
          "feedCategory": "medium"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x975043adBb80fc32276CbF9Bbcfd4A601a12462D",
          "feedCategory": "low"
        },
        {
          "name": "TRUMP/USD",
          "proxyAddress": "0x7bAfa1Af54f17cC0775a1Cf813B9fF5dED2C51E5",
          "feedCategory": "low"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0x8422f3d3CAFf15Ca682939310d6A5e619AE08e57",
          "feedCategory": "low"
        },
        {
          "name": "MELANIA/USD",
          "proxyAddress": "0xFAf372CaBc765b63f6fabD436c845D965eDA1CA5",
          "feedCategory": "medium"
        },
        {
          "name": "DEGEN/USD",
          "proxyAddress": "0xE62BcE5D7CB9d16AB8b4D622538bc0A50A5799c2",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x4b7836916781CAAfbb7Bd1E5FDd20ED544B453b1",
          "feedCategory": "medium"
        },
        {
          "name": "EURC/USD",
          "proxyAddress": "0xDAe398520e2B67cd3f27aeF9Cf14D93D927f8250",
          "feedCategory": "medium"
        },
        {
          "name": "WELL/USD",
          "proxyAddress": "0xc15d9944dAefE2dB03e53bef8DDA25a56832C5fe",
          "feedCategory": "medium"
        },
        {
          "name": "YFI/USD",
          "proxyAddress": "0xD40e758b5eC80820B68DFC302fc5Ce1239083548",
          "feedCategory": "medium"
        },
        {
          "name": "MOG/USD",
          "proxyAddress": "0x4aeb6D15769EaD32D0c5Be2940F40c7CFf53801d",
          "feedCategory": "medium"
        },
        {
          "name": "RSR/USD",
          "proxyAddress": "0xAa98aE504658766Dfe11F31c5D95a0bdcABDe0b1",
          "feedCategory": "medium"
        }
      ],
    "STARKNET_MAINNET": [
        {
          "name": "ETH/USD",
          "proxyAddress": "0x6b2ef9b416ad0f996b2a8ac0dd771b1788196f51c96f5b000df2e47ac756d26",
          "feedCategory": "low"
        },
        {
          "name": "STRK/USD",
          "proxyAddress": "0x76a0254cdadb59b86da3b5960bf8d73779cac88edc5ae587cab3cedf03226ec",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0x7ba92ee505a967f56253a5a51d8249c0515577fa9d1dea7f24e233ae3395184",
          "feedCategory": "medium"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x1cafc789a9b48f816fe0969c22667ea2d669e56274c806fc83a85215d42e988",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x5a4930401bbb1d643ca501640e218fec253b33326f47d139bd025c62a1fbc7f",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0x6275040a2913e2fe1a20bead3feb40694920a7fea98e956b042e082b9e1adad",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x15e0e153c086fadab9a9ed23630f79d8e265edf4747ef5b791f6db391e3f6fd",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x72495dbb867dd3c6373820694008f8a8bff7b41f7f7112245d687858b243470",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x55d0eec2f5c766b3b8b696a43751ed4d56715fa26b0c50469d7855388f0c972",
          "feedCategory": "low"
        }
      ],
    "LINEA_MAINNET": [
        {
          "name": "ETH/USD",
          "proxyAddress": "0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x8dF01C2eFed1404872b54a69f40a57FeC1545998",
          "feedCategory": "low"
        },
        {
          "name": "WSTETH/USD",
          "proxyAddress": "0x8eCE1AbA32716FdDe8D6482bfd88E9a0ee01f565",
          "feedCategory": "medium"
        },
        {
          "name": "FOXY/USD",
          "proxyAddress": "0xdE14081b6bd39230EcA7Be1137413b7b87B07C07",
          "feedCategory": "high"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x09B0a8AFD9185500d7C64FC68338b4C50db6df1d",
          "feedCategory": "low"
        },
        {
          "name": "ARB/USD",
          "proxyAddress": "0x28606F10277Cc2e99e57ae2C55D26860E13A1BBD",
          "feedCategory": "low"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xc4194f19E3a0836F6B998394445C6535c50604Ce",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0xAADAa473C1bDF7317ec07c915680Af29DeBfdCb5",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x7A99092816C8BD5ec8ba229e3a6E6Da1E628E1F9",
          "feedCategory": "low"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x637cf12017219Dd3A758818eD63185f7acF7D935",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x5133D67c38AFbdd02997c14Abd8d83676B4e309A",
          "feedCategory": "low"
        },
        {
          "name": "POL/USD",
          "proxyAddress": "0xEF77B4A7D92eBDC89025B8E11916A69BDA6d189c",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xefCA2bbe0EdD0E22b2e0d2F8248E99F4bEf4A7dB",
          "feedCategory": "low"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0x85342bC62aadef58f029ab6d17D643949e6F073e",
          "feedCategory": "high"
        },
        {
          "name": "MATIC/USD",
          "proxyAddress": "0x9ce4473B42a639d010eD741df3CA829E6e480803",
          "feedCategory": "medium"
        }
      ],
    "MANTLE_MAINNET":[
        {
          "name": "ETH/USD",
          "proxyAddress": "0x5bc7Cf88EB131DB18b5d7930e793095140799aD5",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x22b422CECb0D4Bd5afF3EA999b048FA17F5263bD",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x5871AdBEEdAD531C68A8FD32fE86f07d6b4C645d",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x7db2275279F52D0914A481e14c4Ce5a59705A25b",
          "feedCategory": "low"
        },
        {
          "name": "MNT/USD",
          "proxyAddress": "0xD97F20bEbeD74e8144134C4b148fE93417dd0F96",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xd86048D5e4fe96157CE03Ae519A9045bEDaa6551",
          "feedCategory": "low"
        }
      ],
    "SCROLL_MAINNET": [
        {
          "name": "WSTETH/ETH",
          "proxyAddress": "0xe428fbdbd61CC1be6C273dC0E27a1F43124a86F3",
          "feedCategory": "medium"
        },
        {
          "name": "COMP/USD",
          "proxyAddress": "0x6726C678feE07B25BBE67bC720728652E4129369",
          "feedCategory": "medium"
        },
        {
          "name": "STG/USD",
          "proxyAddress": "0x9019Be7Aa8f66551E94d6508EA48856386945E80",
          "feedCategory": "medium"
        },
        {
          "name": "BNB/USD",
          "proxyAddress": "0x1AC823FdC79c30b1aB1787FF5e5766D6f29235E1",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x227a4E5E9239CAc88022DF86B1Ad9B24A7616e60",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x6bF14CB0A831078629D993FDeBcB182b21A8774C",
          "feedCategory": "low"
        },
        {
          "name": "SCR/USD",
          "proxyAddress": "0x26f6F7C468EE309115d19Aa2055db5A74F8cE7A5",
          "feedCategory": "medium"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0xDf3F55B6bd57084DD4a72a41853C0a2487CB757F",
          "feedCategory": "low"
        },
        {
          "name": "AVAX/USD",
          "proxyAddress": "0xB4b121ebE4DdCdFD3378b9519A101678829fE8c6",
          "feedCategory": "low"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x203322e1d15EB3Dff541a5aF0288D951c4a8d3eA",
          "feedCategory": "low"
        },
        {
          "name": "RSETH/ETH",
          "proxyAddress": "0x37f85bbB5366282F9C25e0bdCdbbF8243E594E52",
          "feedCategory": "high"
        },
        {
          "name": "CRV/USD",
          "proxyAddress": "0x8658273E2f7bc06d3F8462703b8a733204312fF2",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/USD",
          "proxyAddress": "0x61C432B58A43516899d8dF33A5F57edb8d57EB77",
          "feedCategory": "medium"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0x78409c5b2dE2aC8ac76f45458FBaDD707e87B98a",
          "feedCategory": "medium"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0x2667de5E58Ae152ce9c5EA6D1a8E051444294B82",
          "feedCategory": "low"
        },
        {
          "name": "STETH/USD",
          "proxyAddress": "0x439a2b573C8Ecd215990Fc25b4F547E89CF67b79",
          "feedCategory": "medium"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0xCaca6BFdeDA537236Ee406437D2F8a400026C589",
          "feedCategory": "low"
        },
        {
          "name": "RETH/ETH",
          "proxyAddress": "0x3fBB86e564fC1303625BA88EaE55740f3A649d36",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x538E0fC727ce4604e25354D082890cdb5553d33B",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xf376A91Ae078927eb3686D6010a6f1482424954E",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x43d12Fb3AfCAd5347fA764EeAB105478337b7200",
          "feedCategory": "low"
        },
        {
          "name": "WBTC/BTC",
          "proxyAddress": "0x7e73693088d88694146ab30f1dA5903a4489e992",
          "feedCategory": "medium"
        }
      ],
    "ZKSYNC_MAINNET": [
        {
          "name": "PEPE/USD",
          "proxyAddress": "0x7a6333CaC589e9B11b1fEC190a5828272A2893B5",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x1b5a683579f53b9E30B538F70544444389633c75",
          "feedCategory": "low"
        },
        {
          "name": "LINK/ETH",
          "proxyAddress": "0xB66325FC0F8aA6dE6FeDFF4e51e54025cEea51eE",
          "feedCategory": "medium"
        },
        {
          "name": "AAVE/USD",
          "proxyAddress": "0x2137c69DCb41f611Cc8f39F8A98047e774d6ED74",
          "feedCategory": "low"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0x1824D297C6d6D311A204495277B63e943C2D376E",
          "feedCategory": "low"
        },
        {
          "name": "UNI/USD",
          "proxyAddress": "0x93A08A9D592101938D4a63c86d0989d7018c00D9",
          "feedCategory": "low"
        },
        {
          "name": "MELANIA/USD",
          "proxyAddress": "0x20Af81052722DbE38792e595De231C41F4D3255B",
          "feedCategory": "medium"
        },
        {
          "name": "DAI/USD",
          "proxyAddress": "0x5d336664b5D7A332Cd256Bf68CbF2270C6202fc6",
          "feedCategory": "low"
        },
        {
          "name": "DOGE/USD",
          "proxyAddress": "0x2cC24D99500a134ea7f78736b5C329C84599fb1B",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x6D41d1dc818112880b40e26BD6FD347E41008eDA",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x4Cba285c15e3B540C474A114a7b135193e4f1EA6",
          "feedCategory": "low"
        },
        {
          "name": "ZK/USD",
          "proxyAddress": "0xD1ce60dc8AE060DDD17cA8716C96f193bC88DD13",
          "feedCategory": "low"
        },
        {
          "name": "TRUMP/USD",
          "proxyAddress": "0x960eA047617cfB29AFcf2Ef6794C76713ff0C20C",
          "feedCategory": "low"
        },
        {
          "name": "USDM/USD",
          "proxyAddress": "0x6Ab6c24f9312a6cB458761143D373A8f11573C4B",
          "feedCategory": "high"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0xB615075979AE1836B476F651f1eB79f0Cd3956a9",
          "feedCategory": "low"
        },
        {
          "name": "SOL/USD",
          "proxyAddress": "0x498232F0a52D4e94A6e0Ea93D63C07Bc63133009",
          "feedCategory": "low"
        }
      ],
    "CELO_MAINNET": [
        {
          "name": "CUSD/USD",
          "proxyAddress": "0xe38A27BE4E7d866327e09736F3C570F256FFd048",
          "feedCategory": "medium"
        },
        {
          "name": "BRL/USD",
          "proxyAddress": "0xe8EcaF727080968Ed5F6DBB595B91e50eEb9F8B3",
          "feedCategory": "low"
        },
        {
          "name": "USDT/USD",
          "proxyAddress": "0x5e37AF40A7A344ec9b03CCD34a250F3dA9a20B02",
          "feedCategory": "low"
        },
        {
          "name": "LINK/USD",
          "proxyAddress": "0x6b6a4c71ec3858A024f3f0Ee44bb0AdcBEd3DcC2",
          "feedCategory": "low"
        },
        {
          "name": "ETH/USD",
          "proxyAddress": "0x1FcD30A73D67639c1cD89ff5746E7585731c083B",
          "feedCategory": "low"
        },
        {
          "name": "CELO/USD",
          "proxyAddress": "0x0568fD19986748cEfF3301e55c0eb1E729E0Ab7e",
          "feedCategory": "medium"
        },
        {
          "name": "USDC/USD",
          "proxyAddress": "0xc7A353BaE210aed958a1A2928b654938EC59DaB2",
          "feedCategory": "low"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0x6312034F70390d09bb03F789F84f00215a444AEa",
          "feedCategory": "low"
        },
        {
          "name": "GHS/USD",
          "proxyAddress": "0x2719B648DB57C5601Bd4cB2ea934Dec6F4262cD8",
          "feedCategory": "low"
        },
        {
          "name": "CHF/USD",
          "proxyAddress": "0xfd49bFcb3dc4aAa713c25e7d23B14BB39C4B8857",
          "feedCategory": "low"
        },
        {
          "name": "EUR/USD",
          "proxyAddress": "0x3D207061Dbe8E2473527611BFecB87Ff12b28dDa",
          "feedCategory": "low"
        },
        {
          "name": "COP/USD",
          "proxyAddress": "0x97b770B0200CCe161907a9cbe0C6B177679f8F7C",
          "feedCategory": "low"
        },
        {
          "name": "BTC/USD",
          "proxyAddress": "0x128fE88eaa22bFFb868Bb3A584A54C96eE24014b",
          "feedCategory": "low"
        },
        {
          "name": "NGN/USD",
          "proxyAddress": "0xc17cBE2dB40e53F4984C46F608DA6DA1fF074c11",
          "feedCategory": "low"
        },
        {
          "name": "INR/USD",
          "proxyAddress": "0x85d4Ec34339478F73c153710B19f2D5C402dce6F",
          "feedCategory": "low"
        },
        {
          "name": "PHP/USD",
          "proxyAddress": "0x4ce8e628Bb82Ea5271908816a6C580A71233a66c",
          "feedCategory": "low"
        },
        {
          "name": "XOF/USD",
          "proxyAddress": "0x1626095f9548291cA67A6Aa743c30A1BB9380c9d",
          "feedCategory": "low"
        },
        {
          "name": "JPY/USD",
          "proxyAddress": "0xf323563241BF8B77a2979e9edC1181788A98EcB2",
          "feedCategory": "low"
        },
        {
          "name": "LINK/CELO",
          "proxyAddress": "0xBa45f0a1a2fa3FB62a4D6dC135741E2aeb1b14e7",
          "feedCategory": "medium"
        },
        {
          "name": "KES/USD",
          "proxyAddress": "0x0826492a24b1dBd1d8fcB4701b38C557CE685e9D",
          "feedCategory": "low"
        },
        {
          "name": "EURC/USD",
          "proxyAddress": "0x9a48d9b0AF457eF040281A9Af3867bc65522Fecd",
          "feedCategory": "medium"
        },
        {
          "name": "NGN/USD",
          "proxyAddress": "0x235e5c8697177931459fA7D19fba7256d29F17DA",
          "feedCategory": "low"
        }
      ]
}


const methods = ['latestRoundData', 'decimals']
const multicallCommands = Object
    .entries(infuraSubDomain)
    .reduce((acc, [blockchain, _]) => {
        acc[blockchain] = methods
            .map((method) => {
                const tools = feeds[blockchain]
                    .map(({ proxyAddress }) => ({
                        target: proxyAddress,
                        allowFailure: true,
                        callData: iface.encodeFunctionData(method)
                    }))
                return tools
            })
        return acc
    }, [] )


const schema = {
    namespace: "chainlinkMulticall",
    name: "Multicall Latest Prices",
    description: "A short description of the schema purpose",
    docs: ["https://docs.chain.link/data-feeds/price-feeds/addresses"],
    tags: [ 'chainlink.getAvailableChains'],
    flowMCP: "1.2.0",
    root: "https://--infura-subdomain--.infura.io/v3/{{INFURA_API_KEY}}",
    requiredServerParams: [ "INFURA_API_KEY" ],
    headers: {},
    routes: {
        getAvailableChains: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAvailableChains" } ]
        },
        getAllLatestPricesEthereum: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "ETHEREUM_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },

        getAllLatestPricesBinance: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "BINANCE_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesPolygon: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "POLYGON_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },

        getAllLatestPricesAvalanche: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "AVALANCHE_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesAribitrum: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "ARBITRUM_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesOptimism: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "OPTIMISM_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesBase: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "BASE_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesLinea: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "LINEA_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesMantle: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "MANTLE_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesScroll: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "SCROLL_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesZksync: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "ZKSYNC_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        },
        getAllLatestPricesCelo: {
            requestMethod: "GET",
            description: "Fetches the latest price for a given pair on a specified chain",
            route: "/",
            parameters: [ 
                { position: { key: "chainName", value: "CELO_MAINNET", location: "insert" } }
            ],
            tests: [ { _description: "Basic test for exampleRoute" } ],
            modifiers: [ { phase: "execute", handlerName: "getAllLatestPrices" } ]
        }
    },
    handlers: {
        getAvailableChains: async( { struct, payload, userParams, phase } ) => {
            struct['data'] = { 'chainNames': Object.keys( feeds ) }
            return { struct, payload }
        },
        getAllLatestPrices: async( { struct, payload, userParams, phase } ) => {
            const { _allParams: { chainName } } = userParams
            const { feedName } = userParams
            let { url } = payload
            url = url.replace( '--infura-subdomain--', infuraSubDomain[ chainName ] )

            const provider = new ethers.JsonRpcProvider( url )
            const multicall = new ethers
                .Contract('0xca11bde05977b3631167028862be2a173976ca11', multicall3Abi, provider)

            const id = chainName
            const allResponse = await Promise.all( [
                ...multicallCommands[id].map(cmd => multicallProviders[ id ].aggregate3( cmd ) )
            ] )

            const [ priceRes, decRes ] = allResponse
            const allPrices = priceRes
                .map((latest, i) => {
                    const decimal = decRes[i]
                    if (!latest.success || !decimal.success) { return }

                    const latestDecoded = iface.decodeFunctionResult('latestRoundData', latest.returnData)
                    const decimalsDecoded = iface.decodeFunctionResult('decimals', decimal.returnData)
                    const decimals = Number(decimalsDecoded[0])

                    const [roundId, answer, , updatedAt] = latestDecoded
                    const price = Number(ethers.formatUnits(answer, decimals))
                    const timestamp = Number(updatedAt) * 1000
                    const timestampISO = new Date(timestamp).toISOString()
                    const { name, proxyAddress } = feeds[id][i]
                    const result = [name, price, decimals, timestampISO, proxyAddress]
                    return result
                } )

            struct['status'] = true
            struct['data'] = allPrices

            return { struct, payload }
        }
    }
}


export { schema }