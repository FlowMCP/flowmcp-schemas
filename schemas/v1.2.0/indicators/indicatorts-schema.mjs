import * as indicators from 'indicatorts'


function getIndicator( functionName, data, params, routeName ) {
    if( functionName === 'priceRateOfChange' ) {
        data['closings'] = data['closings']
            .reduce( ( acc, n ) => {
                if( n === 0 ) { return acc }
                acc.push( n )
                return acc
            }, [] )
    } else if( functionName === 'parabolicSar' ) {
        functionName = 'psar'
    } else if( functionName === 'bollingerBandsWidth' ) {
        const bbResult = indicators[ 'bollingerBands' ]( ...Object.values( data ) )
        const result = indicators[ functionName ]( bbResult, params ) 
        return result
    }

    const result = indicators[ functionName ]( ...Object.values( data ), params )

    return result 
}


const availableIndicators = {
	getAbsolutePriceOscillator: {
		validate: [["values"],["fast","slow"],["apo"]],
		handler: ( data, params, routeName ) => getIndicator( 'absolutePriceOscillator', data, params, routeName ),
	},
	getAbsolutePriceOscillatorStrategy: {
		validate: [["asset"],["fast","slow"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'absolutePriceOscillatorStrategy', data, params, routeName ),
	},
	getAbsolutePriceOscillatorStrategy: {
		validate: [["asset"],["fast","slow"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'absolutePriceOscillatorStrategy', data, params, routeName ),
	},
	getAccelerationBands: {
		validate: [["highs","lows","closings"],["period","multiplier"],["upper","middle","lower"]],
		handler: ( data, params, routeName ) => getIndicator( 'accelerationBands', data, params, routeName ),
	},
	getAccelerationBandsStrategy: {
		validate: [["asset"],["period","multiplier"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'accelerationBandsStrategy', data, params, routeName ),
	},
	getAccumulationDistribution: {
		validate: [["highs","lows","closings","volumes"],[],["ad"]],
		handler: ( data, params, routeName ) => getIndicator( 'accumulationDistribution', data, params, routeName ),
	},
	getAroon: {
		validate: [["highs","lows"],["period"],["up","down"]],
		handler: ( data, params, routeName ) => getIndicator( 'aroon', data, params, routeName ),
	},
	getAroonStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'aroonStrategy', data, params, routeName ),
	},
	getAroonStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'aroonStrategy', data, params, routeName ),
	},
	getAverageTrueRange: {
		validate: [["highs","lows","closings"],["period"],["trLine","atrLine"]],
		handler: ( data, params, routeName ) => getIndicator( 'averageTrueRange', data, params, routeName ),
	},
	getAwesomeOscillator: {
		validate: [["highs","lows"],["fast","slow"],["ao"]],
		handler: ( data, params, routeName ) => getIndicator( 'awesomeOscillator', data, params, routeName ),
	},
	getAwesomeOscillatorStrategy: {
		validate: [["asset"],["fast","slow"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'awesomeOscillatorStrategy', data, params, routeName ),
	},
	getBalanceOfPower: {
		validate: [["openings","highs","lows","closings"],[],["bop"]],
		handler: ( data, params, routeName ) => getIndicator( 'balanceOfPower', data, params, routeName ),
	},
	getBalanceOfPowerStrategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'balanceOfPowerStrategy', data, params, routeName ),
	},
	getBalanceOfPowerStrategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'balanceOfPowerStrategy', data, params, routeName ),
	},
	getBollingerBands: {
		validate: [["closings"],["period"],["upper","middle","lower"]],
		handler: ( data, params, routeName ) => getIndicator( 'bollingerBands', data, params, routeName ),
	},
	getBollingerBandsStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'bollingerBandsStrategy', data, params, routeName ),
	},
	getBollingerBandsWidth: {
		validate: [["closings"],["period"],["width","widthEma"]],
		handler: ( data, params, routeName ) => getIndicator( 'bollingerBandsWidth', data, params, routeName ),
	},
	getChaikinMoneyFlow: {
		validate: [["highs","lows","closings","volumes"],["period"],["cmf"]],
		handler: ( data, params, routeName ) => getIndicator( 'chaikinMoneyFlow', data, params, routeName ),
	},
	getChaikinMoneyFlowStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'chaikinMoneyFlowStrategy', data, params, routeName ),
	},
	getChaikinOscillator: {
		validate: [["highs","lows","closings","volumes"],["fast","slow"],["adResult","cmoResult"]],
		handler: ( data, params, routeName ) => getIndicator( 'chaikinOscillator', data, params, routeName ),
	},
	getChandeForecastOscillator: {
		validate: [["closings"],[],["cfo"]],
		handler: ( data, params, routeName ) => getIndicator( 'chandeForecastOscillator', data, params, routeName ),
	},
	getChandeForecastOscillatorStrategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'chandeForecastOscillatorStrategy', data, params, routeName ),
	},
	getChandeForecastOscillatorStrategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'chandeForecastOscillatorStrategy', data, params, routeName ),
	},
	getChandelierExit: {
		validate: [["highs","lows","closings"],["period"],["long","short"]],
		handler: ( data, params, routeName ) => getIndicator( 'chandelierExit', data, params, routeName ),
	},
	getCommunityChannelIndex: {
		validate: [["highs","lows","closings"],["period"],["cci"]],
		handler: ( data, params, routeName ) => getIndicator( 'communityChannelIndex', data, params, routeName ),
	},
	getDonchianChannel: {
		validate: [["closings"],["period"],["upper","middle","lower"]],
		handler: ( data, params, routeName ) => getIndicator( 'donchianChannel', data, params, routeName ),
	},
	getDoubleExponentialMovingAverage: {
		validate: [["values"],["period"],["dema"]],
		handler: ( data, params, routeName ) => getIndicator( 'doubleExponentialMovingAverage', data, params, routeName ),
	},
	getEaseOfMovement: {
		validate: [["highs","lows","volumes"],["period"],["emv"]],
		handler: ( data, params, routeName ) => getIndicator( 'easeOfMovement', data, params, routeName ),
	},
	getEaseOfMovementStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'easeOfMovementStrategy', data, params, routeName ),
	},
	getExponentialMovingAverage: {
		validate: [["values"],["period"],["ema"]],
		handler: ( data, params, routeName ) => getIndicator( 'exponentialMovingAverage', data, params, routeName ),
	},
	getForceIndex: {
		validate: [["closings","volumes"],["period"],["fi"]],
		handler: ( data, params, routeName ) => getIndicator( 'forceIndex', data, params, routeName ),
	},
	getForceIndexStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'forceIndexStrategy', data, params, routeName ),
	},
	getIchimokuCloud: {
		validate: [["highs","lows","closings"],["short","medium","long","close"],["tenkan","kijub","ssa","ssb","leadingSpan"]],
		handler: ( data, params, routeName ) => getIndicator( 'ichimokuCloud', data, params, routeName ),
	},
	getIchimokuCloudStrategy: {
		validate: [["asset"],["short","medium","long","close"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'ichimokuCloudStrategy', data, params, routeName ),
	},
	getKdjStrategy: {
		validate: [["asset"],["rPeriod","kPeriod","dPeriod"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'kdjStrategy', data, params, routeName ),
	},
	getKdjStrategy: {
		validate: [["asset"],["rPeriod","kPeriod","dPeriod"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'kdjStrategy', data, params, routeName ),
	},
	getKeltnerChannel: {
		validate: [["highs","lows","closings"],["period"],["upper","middle","lower"]],
		handler: ( data, params, routeName ) => getIndicator( 'keltnerChannel', data, params, routeName ),
	},
	getMassIndex: {
		validate: [["highs","lows"],["emaPeriod","miPeriod"],["mi"]],
		handler: ( data, params, routeName ) => getIndicator( 'massIndex', data, params, routeName ),
	},
	getMoneyFlowIndex: {
		validate: [["highs","lows","closings","volumes"],["period"],["mfi"]],
		handler: ( data, params, routeName ) => getIndicator( 'moneyFlowIndex', data, params, routeName ),
	},
	getMoneyFlowIndexStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'moneyFlowIndexStrategy', data, params, routeName ),
	},
	getMovingAverageConvergenceDivergence: {
		validate: [["closings"],["fast","slow","signal"],["macdLine","signalLine"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingAverageConvergenceDivergence', data, params, routeName ),
	},
	getMovingAverageConvergenceDivergenceStrategy: {
		validate: [["asset"],["fast","slow","signal"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingAverageConvergenceDivergenceStrategy', data, params, routeName ),
	},
	getMovingChandeForecastOscillator: {
		validate: [["closings"],["period"],["mfco"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingChandeForecastOscillator', data, params, routeName ),
	},
	getMovingMax: {
		validate: [["values"],["period"],["mmax"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingMax', data, params, routeName ),
	},
	getMovingMin: {
		validate: [["values"],["period"],["mmin"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingMin', data, params, routeName ),
	},
	getMovingStandardDeviation: {
		validate: [["values"],["period"],["result"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingStandardDeviation', data, params, routeName ),
	},
	getMovingSum: {
		validate: [["values"],["period"],["msum"]],
		handler: ( data, params, routeName ) => getIndicator( 'movingSum', data, params, routeName ),
	},
	getNegativeVolumeIndex: {
		validate: [["closings","volumes"],["start","period"],["nvi"]],
		handler: ( data, params, routeName ) => getIndicator( 'negativeVolumeIndex', data, params, routeName ),
	},
	getNegativeVolumeIndexStrategy: {
		validate: [["asset"],["start","period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'negativeVolumeIndexStrategy', data, params, routeName ),
	},
	getOnBalanceVolume: {
		validate: [["closings","volumes"],[],["obv"]],
		handler: ( data, params, routeName ) => getIndicator( 'onBalanceVolume', data, params, routeName ),
	},
	getParabolicSar: {
		validate: [["highs","lows","closings"],["step","max"],["trends","psarResult"]],
		handler: ( data, params, routeName ) => getIndicator( 'parabolicSar', data, params, routeName ),
	},
	getParabolicSARStrategy: {
		validate: [["asset"],["step","max"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'parabolicSARStrategy', data, params, routeName ),
	},
	getPercentagePriceOscillator: {
		validate: [["prices"],["fast","slow","signal"],["ppoResult","signal","histogram"]],
		handler: ( data, params, routeName ) => getIndicator( 'percentagePriceOscillator', data, params, routeName ),
	},
	getPercentageVolumeOscillator: {
		validate: [["volumes"],["fast","slow","signal"],["pvoResult","signal","histogram"]],
		handler: ( data, params, routeName ) => getIndicator( 'percentageVolumeOscillator', data, params, routeName ),
	},
	getPriceRateOfChange: {
		validate: [["closings"],["period"],["roc"]],
		handler: ( data, params, routeName ) => getIndicator( 'priceRateOfChange', data, params, routeName ),
	},
	getProjectionOscillator: {
		validate: [["highs","lows","closings"],["period","smooth"],["poResult","spoResult"]],
		handler: ( data, params, routeName ) => getIndicator( 'projectionOscillator', data, params, routeName ),
	},
	getProjectionOscillatorStrategy: {
		validate: [["asset"],["period","smooth"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'projectionOscillatorStrategy', data, params, routeName ),
	},
	getQstick: {
		validate: [["openings","closings"],["period"],["qstick"]],
		handler: ( data, params, routeName ) => getIndicator( 'qstick', data, params, routeName ),
	},
	getRandomIndex: {
		validate: [["highs","lows","closings"],["rPeriod","kPeriod","dPeriod"],["k","d","j"]],
		handler: ( data, params, routeName ) => getIndicator( 'randomIndex', data, params, routeName ),
	},
	getRelativeStrengthIndex: {
		validate: [["closings"],["period"],["rsi"]],
		handler: ( data, params, routeName ) => getIndicator( 'relativeStrengthIndex', data, params, routeName ),
	},
	getRollingMovingAverage: {
		validate: [["values"],["period"],["rma"]],
		handler: ( data, params, routeName ) => getIndicator( 'rollingMovingAverage', data, params, routeName ),
	},
	getRsi2Strategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'rsi2Strategy', data, params, routeName ),
	},
	getSimpleMovingAverage: {
		validate: [["values"],["period"],["sma"]],
		handler: ( data, params, routeName ) => getIndicator( 'simpleMovingAverage', data, params, routeName ),
	},
	getSince: {
		validate: [["values"],[],["since"]],
		handler: ( data, params, routeName ) => getIndicator( 'since', data, params, routeName ),
	},
	getStochasticOscillator: {
		validate: [["highs","lows","closings"],["kPeriod","dPeriod"],["k","d"]],
		handler: ( data, params, routeName ) => getIndicator( 'stochasticOscillator', data, params, routeName ),
	},
	getStochasticOscillatorStrategy: {
		validate: [["asset"],["kPeriod","dPeriod"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'stochasticOscillatorStrategy', data, params, routeName ),
	},
	getTriangularMovingAverage: {
		validate: [["values"],["period"],["trima"]],
		handler: ( data, params, routeName ) => getIndicator( 'triangularMovingAverage', data, params, routeName ),
	},
	getTripleExponentialAverage: {
		validate: [["values"],["period"],["trix"]],
		handler: ( data, params, routeName ) => getIndicator( 'tripleExponentialAverage', data, params, routeName ),
	},
	getTripleExponentialMovingAverage: {
		validate: [["values"],["period"],["tema"]],
		handler: ( data, params, routeName ) => getIndicator( 'tripleExponentialMovingAverage', data, params, routeName ),
	},
	getTrueRange: {
		validate: [["highs","lows","closings"],[],["result"]],
		handler: ( data, params, routeName ) => getIndicator( 'trueRange', data, params, routeName ),
	},
	getTypicalPrice: {
		validate: [["highs","lows","closings"],[],["typprice"]],
		handler: ( data, params, routeName ) => getIndicator( 'typicalPrice', data, params, routeName ),
	},
	getTypicalPriceStrategy: {
		validate: [["asset"],[],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'typicalPriceStrategy', data, params, routeName ),
	},
	getUlcerIndex: {
		validate: [["closings"],["period"],["result"]],
		handler: ( data, params, routeName ) => getIndicator( 'ulcerIndex', data, params, routeName ),
	},
	getVolumePriceTrend: {
		validate: [["closings","volumes"],[],["vpt"]],
		handler: ( data, params, routeName ) => getIndicator( 'volumePriceTrend', data, params, routeName ),
	},
	getVolumeWeightedAveragePrice: {
		validate: [["closings","volumes"],["period"],["vwap"]],
		handler: ( data, params, routeName ) => getIndicator( 'volumeWeightedAveragePrice', data, params, routeName ),
	},
	getVolumeWeightedAveragePriceStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'volumeWeightedAveragePriceStrategy', data, params, routeName ),
	},
	getVolumeWeightedMovingAverage: {
		validate: [["closings","volumes"],["period"],["vwma"]],
		handler: ( data, params, routeName ) => getIndicator( 'volumeWeightedMovingAverage', data, params, routeName ),
	},
	getVolumeWeightedMovingAverageStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'volumeWeightedMovingAverageStrategy', data, params, routeName ),
	},
	getVortex: {
		validate: [["highs","lows","closings"],["period"],["plus","minus"]],
		handler: ( data, params, routeName ) => getIndicator( 'vortex', data, params, routeName ),
	},
	getVortexStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'vortexStrategy', data, params, routeName ),
	},
	getWilliamsR: {
		validate: [["highs","lows","closings"],["period"],["willr"]],
		handler: ( data, params, routeName ) => getIndicator( 'williamsR', data, params, routeName ),
	},
	getWilliamsRStrategy: {
		validate: [["asset"],["period"],["actions"]],
		handler: ( data, params, routeName ) => getIndicator( 'williamsRStrategy', data, params, routeName ),
	}
}


const asset = {
    openings: [174060087.38879,174082898.8875936,174100153.56421843,174108592.70029056,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,173826777.1790663,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174344011.26648745,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173745545.74319085,173752908.8941859,173744262.17871326,173733708.32261872,173733332.95199195,173753288.3215156,173751359.30583143,173750456.0907409,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,174025449.1938566,173955454.33147314,173860820.5666938,173850681.85198057,173847999.08108395,174007912.50842893,174007910.7239786,173925165.36047944],
    closings: [174082898.8875936,174100153.56421843,174108592.70029056,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,173826777.1790663,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174344011.26648745,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173745545.74319085,173752908.8941859,173744262.17871326,173733708.32261872,173733332.95199195,173753288.3215156,173751359.30583143,173750456.0907409,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,174025449.1938566,173955454.33147314,173860820.5666938,173850681.85198057,173847999.08108395,174007912.50842893,174007910.7239786,173925165.36047944,174001913.66047117],
    highs:    [174082898.8875936,174100153.56421843,174108592.70029056,174108592.70029056,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174344011.26648745,174344011.26648745,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173752908.8941859,173752908.8941859,173744262.17871326,173733708.32261872,173753288.3215156,173753288.3215156,173751359.30583143,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,174025449.1938566,174025449.1938566,173955454.33147314,173860820.5666938,173850681.85198057,174007912.50842893,174007913.7991547,174007910.7239786,174001913.66047117],
    lows:     [174060087.38879,174082898.8875936,174100153.56421843,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,173826777.1790663,173826777.1790663,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173745545.74319085,173745545.74319085,173744262.17871326,173733708.32261872,173733332.95199195,173733332.95199195,173751359.30583143,173750456.0907409,173750456.0907409,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,173955454.33147314,173860820.5666938,173850681.85198057,173847999.08108395,173847999.08108395,174007910.7239786,173925165.36047944,173925165.36047944],
    volumes:  [1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797,1896454.1787483797],
    prices:   [174082898.8875936,174100153.56421843,174108592.70029056,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,173826777.1790663,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174344011.26648745,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173745545.74319085,173752908.8941859,173744262.17871326,173733708.32261872,173733332.95199195,173753288.3215156,173751359.30583143,173750456.0907409,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,174025449.1938566,173955454.33147314,173860820.5666938,173850681.85198057,173847999.08108395,174007912.50842893,174007910.7239786,173925165.36047944,174001913.66047117],
    values:   [174082898.8875936,174100153.56421843,174108592.70029056,174108073.85755652,173940776.5809026,173855038.04088858,173827303.93736708,173826777.1790663,174029399.594358,174086187.0741313,174170809.98403883,174176745.15932336,174194481.76776877,174258673.24893585,174316607.9053444,174344011.26589838,174344011.26648745,174192938.99197102,173896061.10363784,173873469.088895,173812410.16945913,173804695.39251307,173802489.8931474,173784622.98496273,173772265.04479375,173771037.48695257,173762313.21057478,173756232.131773,173751783.5620917,173745545.74319085,173752908.8941859,173744262.17871326,173733708.32261872,173733332.95199195,173753288.3215156,173751359.30583143,173750456.0907409,173855510.3958166,173855510.39640403,173910666.20618278,173924303.85632855,174025449.1938566,173955454.33147314,173860820.5666938,173850681.85198057,173847999.08108395,174007912.50842893,174007910.7239786,173925165.36047944,174001913.66047117],
    dates:    ['2025-05-15T20:40:42.148Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z','2025-05-15T20:40:42.149Z']
}


const schema = {
	namespace: "indicatorts",
	name: "OHLCV Indicators",
	description: "Compute 80+ technical analysis indicators from OHLCV data using the indicatorts library. Covers momentum (RSI, MACD, Stochastic), trend (SMA, EMA, Bollinger Bands, Ichimoku), volume (OBV, VWAP, MFI) indicators and their BUY/SELL/HOLD trading strategies. No external API — all computation is local.",
	docs: ["https://github.com/cinar/indicatorts"],
	tags: ["trading", "indicators", "analysis"],
	flowMCP: "1.2.0",
	root: "https://...",
	requiredServerParams: [],
	headers: {},
	routes: {
		getAbsolutePriceOscillator: {
			description: "Absolute Price Oscillator (APO): The absolutePriceOscillator function calculates a technical indicator that is used to follow trends. APO crossing above zero indicates bullish, while crossing below zero indicates bearish. Positive value is upward trend, while negative value is downward trend. Technical Description: Fast = Ema(fastPeriod, values); Slow = Ema(slowPeriod, values); APO = Fast - Slow",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(30)"]}}
			],
			tests: [
				{"_description":"Test for Absolute Price Oscillator (APO)","values": asset['values'],"fast":14,"slow":30}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAbsolutePriceOscillatorStrategy: {
			description: "Absolute Price Oscillator Strategy: The absolutePriceOscillatorStrategy uses the values that are generated by the Absolute Price Oscillator (APO) indicator to provide a BUY action when the AO is greather than zero, and SELL action when AO is less than zero, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(30)"]}}
			],
			tests: [
				{"_description":"Test for Absolute Price Oscillator Strategy","asset": asset,"fast":14,"slow":30}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAbsolutePriceOscillatorStrategy: {
			description: "Absolute Price Oscillator Strategy: The absolutePriceOscillatorStrategy uses the values that are generated by the Absolute Price Oscillator (APO) indicator to provide a BUY action when the AO is greather than zero, and SELL action when AO is less than zero, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(30)"]}}
			],
			tests: [
				{"_description":"Test for Absolute Price Oscillator Strategy","asset": asset,"fast":14,"slow":30}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAccelerationBands: {
			description: "Acceleration Bands (AB): The accelerationBands plots upper and lower envelope bands around a simple moving average. Technical Description: Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low))); Middle Band = SMA(Closing); Lower Band = SMA(Low * (1 + 4 * (High - Low) / (High + Low)))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}},
				{"position":{"key":"multiplier","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Acceleration Bands (AB)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":20,"multiplier":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAccelerationBandsStrategy: {
			description: "Acceleration Bands Strategy: The accelerationBandsStrategy uses the upperBand, and lowerBand values that are generated by the Acceleration Bands indicator function to provide a BUY action when closing is greather than or equals to upperBand, a SELL action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}},
				{"position":{"key":"multiplier","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Acceleration Bands Strategy","asset": asset,"period":20,"multiplier":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAccumulationDistribution: {
			description: "Accumulation/Distribution (A/D): The accumulationDistribution is a cumulative indicator that uses volume and price to assess whether a stock is being accumulated or distributed. The Accumulation/Distribution seeks to identify divergences between the stock price and the volume flow. Technical Description: MFM = ((Closing - Low) - (High - Closing)) / (High - Low); MFV = MFM * Period Volume; AD = Previous AD + CMFV",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Accumulation/Distribution (A/D)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAroon: {
			description: "Aroon: The Aroon function calculates a technical indicator that is used to identify trend changes in the price of a stock, as well as the strength of that trend. It consists of two lines, Aroon Up, and Aroon Down. The Aroon Up line measures measures the strength of the uptrend, and the Aroon Down measures the strength of the downtrend. When Aroon Up is above Aroon Down, it indicates bullish price, and when Aroon Down is above Aroon Up, it indicates bearish price. Technical Description: Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100; Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(25)"]}}
			],
			tests: [
				{"_description":"Test for Aroon","highs": asset['highs'],"lows": asset['lows'],"period":25}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAroonStrategy: {
			description: "Aroon Strategy: The aroonStrategy uses the values that are generated by the Aroon Indicator to provide a BUY action when the up is greather than down, and SELL action when up is less than down, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(25)"]}}
			],
			tests: [
				{"_description":"Test for Aroon Strategy","asset": asset,"period":25}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAroonStrategy: {
			description: "Aroon Strategy: The aroonStrategy uses the values that are generated by the Aroon Indicator to provide a BUY action when the up is greather than down, and SELL action when up is less than down, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(25)"]}}
			],
			tests: [
				{"_description":"Test for Aroon Strategy","asset": asset,"period":25}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAverageTrueRange: {
			description: "Average True Range (ATR): The atr function calculates a technical analysis indicator that measures market volatility by decomposing the entire range of stock prices for that period. Technical Description: TR = Max((High - Low), (High - Closing), (Closing - Low)); ATR = 14-Period SMA TR",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Average True Range (ATR)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAwesomeOscillator: {
			description: "Awesome Oscillator (AO): The awesomeOscillator function calculates the awesome oscillator based on low and high daily prices for a given stock. It is an indicator used to measure market momentum. Technical Description: Median Price = ((Low + High) / 2); AO = 5-Period SMA - 34-Period SMA.",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(5)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(34)"]}}
			],
			tests: [
				{"_description":"Test for Awesome Oscillator (AO)","highs": asset['highs'],"lows": asset['lows'],"fast":5,"slow":34}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAwesomeOscillatorStrategy: {
			description: "Awesome Oscillator Strategy: The awesomeOscillatorStrategy uses the _ao_ values that are generated by the Awesome Oscillator indicator function to provide a SELL action when the _ao_ is below zero, and a BUY action when _ao_ is above zero. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(5)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(34)"]}}
			],
			tests: [
				{"_description":"Test for Awesome Oscillator Strategy","asset": asset,"fast":5,"slow":34}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBalanceOfPower: {
			description: "Balance of Power (BOP): The BalanceOfPower function calculates the strength of buying and selling pressure. Positive value indicates an upward trend, and negative value indicates a downward trend. Zero indicates a balance between the two. Technical Description: BOP = (Closing - Opening) / (High - Low)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Balance of Power (BOP)","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBalanceOfPowerStrategy: {
			description: "Balance of Power Strategy: The balanceOfPowerStrategy uses the values that are generated by the Balance of Power (BOP) indicator to provide a BUY action when the BOP is greather than zero, and SELL action when BOP is less than zero, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Balance of Power Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBalanceOfPowerStrategy: {
			description: "Balance of Power Strategy: The balanceOfPowerStrategy uses the values that are generated by the Balance of Power (BOP) indicator to provide a BUY action when the BOP is greather than zero, and SELL action when BOP is less than zero, otherwise HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Balance of Power Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBollingerBands: {
			description: "Bollinger Bands (BB): The bollingerBands function calculates the bollinger bands, middle band, upper band, lower band, provides identification of when a stock is oversold or overbought. Technical Description: Middle Band = 20-Period SMA.; Upper Band = 20-Period SMA + 2 (20-Period Std); Lower Band = 20-Period SMA - 2 (20-Period Std)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Bollinger Bands (BB)","closings": asset['closings'],"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBollingerBandsStrategy: {
			description: "Bollinger Bands Strategy: The bollingerBandsStrategy uses the upperBand, and lowerBand values that are generated by the Bollinger Bands indicator function to provide a SELL action when the asset's closing is above the upperBand, and a BUY action when the asset's closing is below the lowerBand values, a HOLD action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Bollinger Bands Strategy","asset": asset,"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBollingerBandsWidth: {
			description: "Bollinger Band Width (BBW): The bollingerBandsWidth function measures the percentage difference between the upper band and the lower band. It decreases as Bollinger Bands narrows and increases as Bollinger Bands widens. Technical Description: Band Width = (Upper Band - Lower Band) / Middle Band",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(90)"]}}
			],
			tests: [
				{"_description":"Test for Bollinger Band Width (BBW)","closings": asset['closings'],"period":90}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChaikinMoneyFlow: {
			description: "Chaikin Money Flow (CMF): The chaikinMoneyFlow measures the amount of money flow volume over a given period. Technical Description: Money Flow Multiplier = ((Closing - Low) - (High - Closing)) / (High - Low); Money Flow Volume = Money Flow Multiplier * Volume; Chaikin Money Flow = Sum(20, Money Flow Volume) / Sum(20, Volume)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Chaikin Money Flow (CMF)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes'],"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChaikinMoneyFlowStrategy: {
			description: "Chaikin Money Flow Strategy: The chaikinMoneyFlowStrategy uses the cmf values that are generated by the Chaikin Money Flow (CMF) indicator function to provide a BUY action when cmf is less than zero, a SELL action when cmf is greather than zero, a HOLD action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Chaikin Money Flow Strategy","asset": asset,"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChaikinOscillator: {
			description: "Chaikin Oscillator (CMO): The chaikinOscillator function measures the momentum of the Accumulation/Distribution (A/D) using the Moving Average Convergence Divergence (MACD) formula. It takes the difference between fast and slow periods EMA of the A/D. Cross above the A/D line indicates bullish. Technical Description: CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(10)"]}}
			],
			tests: [
				{"_description":"Test for Chaikin Oscillator (CMO)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes'],"fast":3,"slow":10}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChandeForecastOscillator: {
			description: "Chande Forecast Oscillator (CFO): The chandeForecastOscillator developed by Tushar Chande The Forecast Oscillator plots the percentage difference between the closing price and the n-period linear regression forecasted price. The oscillator is above zero when the forecast price is greater than the closing price and less than zero if it is below. Technical Description: R = Linreg(Closing); CFO = ((Closing - R) / Closing) * 100",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Chande Forecast Oscillator (CFO)","closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChandeForecastOscillatorStrategy: {
			description: "Chande Forecast Oscillator Strategy: The chandeForecastOscillatorStrategy uses cfo values that are generated by the Chande Forecast Oscillator (CFO) indicator function to provide a BUY action when cfo is below zero, and SELL action when cfo is above zero. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Chande Forecast Oscillator Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChandeForecastOscillatorStrategy: {
			description: "Chande Forecast Oscillator Strategy: The chandeForecastOscillatorStrategy uses cfo values that are generated by the Chande Forecast Oscillator (CFO) indicator function to provide a BUY action when cfo is below zero, and SELL action when cfo is above zero. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Chande Forecast Oscillator Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChandelierExit: {
			description: "Chandelier Exit (CE): The chandelierExit function sets a trailing stop-loss based on the Average True Value (ATR). Technical Description: Chandelier Exit Long = 22-Period SMA High - ATR(22) * 3; Chandelier Exit Short = 22-Period SMA Low + ATR(22) * 3",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(22)"]}}
			],
			tests: [
				{"_description":"Test for Chandelier Exit (CE)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":22}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getCommunityChannelIndex: {
			description: "Community Channel Index (CCI): The communityChannelIndex is a momentum-based oscillator used to help determine when an investment vehicle is reaching a condition of being overbought or oversold. Technical Description: Moving Average = Sma(Period, Typical Price); Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average)); CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Community Channel Index (CCI)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDonchianChannel: {
			description: "Donchian Channel (DC): The donchianChannel calculates three lines generated by moving average calculations that comprise an indicator formed by upper and lower bands around a midrange or median band. Technical Description: Upper Channel = Mmax(closings, { period }); Lower Channel = Mmin(closings, { period }); Middle Channel = (Upper Channel + Lower Channel) / 2",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Donchian Channel (DC)","closings": asset['closings'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDoubleExponentialMovingAverage: {
			description: "Double Exponential Moving Average (DEMA): The dema function calculates the Double Exponential Moving Average (DEMA) for a given period. The double exponential moving average (DEMA) is a technical indicator introduced by Patrick Mulloy. The purpose is to reduce the amount of noise present in price charts used by technical traders. The DEMA uses two exponential moving averages (EMAs) to eliminate lag. It helps confirm uptrends when the price is above the average, and helps confirm downtrends when the price is below the average. When the price crosses the average that may signal a trend change. Technical Description: DEMA = (2 * EMA(values)) - EMA(EMA(values))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}}
			],
			tests: [
				{"_description":"Test for Double Exponential Moving Average (DEMA)","values": asset['values'],"period":12}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getEaseOfMovement: {
			description: "Ease of Movement (EMV): The easeOfMovement is a volume based oscillator measuring the ease of price movement. Technical Description: Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2); Box Ratio = ((Volume / 100000000) / (High - Low)); EMV(1) = Distance Moved / Box Ratio; EMV(14) = SMA(14, EMV(1))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Ease of Movement (EMV)","highs": asset['highs'],"lows": asset['lows'],"volumes": asset['volumes'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getEaseOfMovementStrategy: {
			description: "Ease of Movement Strategy: The easeOfMovementStrategy uses the emv values that are generated by the Ease of Movement (EMV) indicator function to provide a BUY action when emv is greather than zero, and a SELL action when emv is less than zero, a HOLD action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Ease of Movement Strategy","asset": asset,"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getExponentialMovingAverage: {
			description: "Exponential Moving Average (EMA): The ema function calculates the exponential moving average for a given period. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}}
			],
			tests: [
				{"_description":"Test for Exponential Moving Average (EMA)","values": asset['values'],"period":12}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getForceIndex: {
			description: "Force Index (FI): The forceIndex uses the closing price and the volume to assess the power behind a move and identify turning points. Technical Description: Force Index = EMA(period, (Current - Previous) * Volume)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(13)"]}}
			],
			tests: [
				{"_description":"Test for Force Index (FI)","closings": asset['closings'],"volumes": asset['volumes'],"period":13}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getForceIndexStrategy: {
			description: "Force Index Strategy: The forceIndexStrategy uses the fi values that are generated by the Force Index (FI) indicator function to provide a BUY action when fi is greather than zero, and a SELL action when fi is less than zero, a HOLD action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(13)"]}}
			],
			tests: [
				{"_description":"Test for Force Index Strategy","asset": asset,"period":13}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getIchimokuCloud: {
			description: "Ichimoku Cloud: The ichimokuCloud, also known as Ichimoku Kinko Hyo, calculates a versatile indicator that defines support and resistence, identifies trend direction, gauges momentum, and provides trading signals. Technical Description: Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2; Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2; Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2 projected 26 periods in the future; Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2 projected 26 periods in the future; Chikou Span (Lagging Span) = Closing plotted 26 periods in the past.",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"short","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"medium","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"long","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(52)"]}},
				{"position":{"key":"close","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}}
			],
			tests: [
				{"_description":"Test for Ichimoku Cloud","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"short":9,"medium":26,"long":52,"close":26}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getIchimokuCloudStrategy: {
			description: "Ichimoku Cloud Strategy: The ichimokuCloudStrategy uses the _ao_ values that are generated by the Ichimoku Cloud indicator function to provide a _BUY_ action when the _leadingSpanA_ is greather than _leadingSpanB_, and a _SELL_ action when the _leadingSpanA_ is less than _leadingSpanB_, and a _HOLD_ action when _leadingSpanA_ is equal to _leadingSpanB_. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"short","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"medium","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"long","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(52)"]}},
				{"position":{"key":"close","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}}
			],
			tests: [
				{"_description":"Test for Ichimoku Cloud Strategy","asset": asset,"short":9,"medium":26,"long":52,"close":26}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getKdjStrategy: {
			description: "KDJ Strategy: The kdjStrategy function uses the k, d, j values that are generated by the Random Index (KDJ) indicator function to provide a BUY action when k crosses above d and j. It is stronger when below 20%. Also the SELL action is when k crosses below d and j. It is strong when above 80%. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"rPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"kPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}},
				{"position":{"key":"dPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for KDJ Strategy","asset": asset,"rPeriod":9,"kPeriod":3,"dPeriod":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getKdjStrategy: {
			description: "KDJ Strategy: The kdjStrategy function uses the k, d, j values that are generated by the Random Index (KDJ) indicator function to provide a BUY action when k crosses above d and j. It is stronger when below 20%. Also the SELL action is when k crosses below d and j. It is strong when above 80%. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"rPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"kPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}},
				{"position":{"key":"dPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for KDJ Strategy","asset": asset,"rPeriod":9,"kPeriod":3,"dPeriod":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getKeltnerChannel: {
			description: "Keltner Channel (KC): The keltnerChannel provides volatility-based bands that are placed on either side of an asset's price and can aid in determining the direction of a trend. Technical Description: Middle Line = EMA(period, closings); Upper Band = EMA(period, closings) + 2 * ATR(period, highs, lows, closings); Lower Band = EMA(period, closings) - 2 * ATR(period, highs, lows, closings)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Keltner Channel (KC)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMassIndex: {
			description: "Mass Index (MI): The massIndex uses the high-low range to identify trend reversals based on range expansions. Technical Description: Singe EMA = EMA(9, Highs - Lows); Double EMA = EMA(9, Single EMA); Ratio = Single EMA / Double EMA; MI = Sum(25, Ratio)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"emaPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"miPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(25)"]}}
			],
			tests: [
				{"_description":"Test for Mass Index (MI)","highs": asset['highs'],"lows": asset['lows'],"emaPeriod":9,"miPeriod":25}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMoneyFlowIndex: {
			description: "Money Flow Index (MFI): The moneyFlowIndex function analyzes both the closing price and the volume to measure to identify overbought and oversold states. It is similar to the Relative Strength Index (RSI), but it also uses the volume. Technical Description: Raw Money Flow = Typical Price * Volume; Money Ratio = Positive Money Flow / Negative Money Flow; Money Flow Index = 100 - (100 / (1 + Money Ratio))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Money Flow Index (MFI)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMoneyFlowIndexStrategy: {
			description: "Money Flow Index Strategy: The moneyFlowIndexStrategy uses the mfi values that are generated by the Money Flow Index (MFI) indicator function to provide a SELL action when mfi is greather than or equal to 80, and a BUY action when mfi is less than or equal to 20. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Money Flow Index Strategy","asset": asset,"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingAverageConvergenceDivergence: {
			description: "Moving Average Convergence Divergence (MACD): The macd function calculates a trend-following momentum indicator that shows the relationship between two moving averages of price. Technical Description: MACD = 12-Period EMA - 26-Period EMA.; Signal = 9-Period EMA of MACD.",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"signal","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}}
			],
			tests: [
				{"_description":"Test for Moving Average Convergence Divergence (MACD)","closings": asset['closings'],"fast":12,"slow":26,"signal":9}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingAverageConvergenceDivergenceStrategy: {
			description: "MACD Strategy: The macdStrategy uses the macd, and signal values that are generated by the Moving Average Convergence Divergence (MACD) indicator function to provide a BUY action when macd crosses above signal, and SELL action when macd crosses below signal. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"signal","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}}
			],
			tests: [
				{"_description":"Test for MACD Strategy","asset": asset,"fast":12,"slow":26,"signal":9}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingChandeForecastOscillator: {
			description: "Moving Chande Forecast Oscillator (MFCO): An oscillator that calculates the moving Chande Forecast Oscillator. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Moving Chande Forecast Oscillator (MFCO)","closings": asset['closings'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingMax: {
			description: "Moving Max (MMAX): The mmax function gives the maximum value within the given moving period. It can be used to get the moving maximum closing price and other values. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Moving Max (MMAX)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingMin: {
			description: "Moving Min (MMIN): The mmin function gives the minimum value within the given moving period. It can be used to get the moving minimum closing price and other values. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Moving Min (MMIN)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingStandardDeviation: {
			description: "Moving Standard Deviation (MSTD): The mstd function calculates the moving standard deviation for a given period. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Moving Standard Deviation (MSTD)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMovingSum: {
			description: "Moving Sum (MSUM): The msum function gives the sum value within the given moving period. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Moving Sum (MSUM)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getNegativeVolumeIndex: {
			description: "Negative Volume Index (NVI): The negativeVolumeIndex function calculates a cumulative indicator using the change in volume to decide when the smart money is active. Technical Description: If Volume is greather than Previous Volume: NVI = Previous NVI; Otherwise: NVI = Previous NVI + (((Closing - Previous Closing) / Previous Closing) * Previous NVI)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"start","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(1000)"]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(255)"]}}
			],
			tests: [
				{"_description":"Test for Negative Volume Index (NVI)","closings": asset['closings'],"volumes": asset['volumes'],"start":1000,"period":255}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getNegativeVolumeIndexStrategy: {
			description: "Negative Volume Index Strategy: The negativeVolumeIndexStrategy uses the nvi values that are generated by the Negative Volume Index (NVI) indicator function to provide a BUY action when nvi is less than its 255-period EMA, and a SELL action when it is greather than its 255-period EMA, otherwise a HOLD action. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"start","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(1000)"]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(255)"]}}
			],
			tests: [
				{"_description":"Test for Negative Volume Index Strategy","asset": asset,"start":1000,"period":255}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getOnBalanceVolume: {
			description: "On-Balance Volume (OBV): The onBalanceVolume function calculates a technical trading momentum indicator that uses volume flow to predict changes in stock price. Technical Description: OBV = OBV-Prev + volume, if Closing > Closing-Prev; 0 if Closing = Closing-Prev; -volume if Closing < Closing-Prev",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for On-Balance Volume (OBV)","closings": asset['closings'],"volumes": asset['volumes']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getParabolicSar: {
			description: "Parabolic SAR (PSAR): The parabolicSar function calculates an identifier for the trend and the trailing stop. Technical Description: PSAR = PSAR[i - 1] - ((PSAR[i - 1] - EP) * AF)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"step","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.02)"]}},
				{"position":{"key":"max","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.2)"]}}
			],
			tests: [
				{"_description":"Test for Parabolic SAR (PSAR)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"step":0.02,"max":0.2}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getParabolicSARStrategy: {
			description: "Parabolic SAR Strategy: The parabolicSARStrategy uses the values that are generated by the Parabolic SAR indicator function to provide a BUY action when the trend is FALLING, and SELL action when the trend is RISING, and HOLD action when the trend is STABLE. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"step","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.02)"]}},
				{"position":{"key":"max","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.2)"]}}
			],
			tests: [
				{"_description":"Test for Parabolic SAR Strategy","asset": asset,"step":0.02,"max":0.2}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPercentagePriceOscillator: {
			description: "Percentage Price Oscillator (PPO): The percentagePriceOscillator function calculates a momentum oscillator for the price It is used to indicate the ups and downs based on the price. A breakout is confirmed when PPO is positive. Technical Description: PPO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100; Signal = EMA(9, PPO); Histogram = PPO - Signal",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"prices","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"signal","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}}
			],
			tests: [
				{"_description":"Test for Percentage Price Oscillator (PPO)","prices": asset['prices'],"fast":12,"slow":26,"signal":9}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPercentageVolumeOscillator: {
			description: "Percentage Volume Oscillator (PVO): The percentageVolumeOscillator function calculates a momentum oscillator for the volume It is used to indicate the ups and downs based on the volume. A breakout is confirmed when PVO is positive. Technical Description: PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100; Signal = EMA(9, PVO); Histogram = PVO - Signal",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"fast","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(12)"]}},
				{"position":{"key":"slow","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(26)"]}},
				{"position":{"key":"signal","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}}
			],
			tests: [
				{"_description":"Test for Percentage Volume Oscillator (PVO)","volumes": asset['volumes'],"fast":12,"slow":26,"signal":9}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPriceRateOfChange: {
			description: "Price Rate of Change (ROC): The roc function calculates a unbounded momentum indicator for the closing prices. A rising ROC above zero typically indicates an uptrend whereas a falling ROC below zero indicates a downtrend. Technical Description: ROC[i] = 0 when i < period; ROC[i] = (close[i] / close[i-period] - 1) * 100 when i >= period",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Price Rate of Change (ROC)","closings": asset['closings'],"period":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getProjectionOscillator: {
			description: "Projection Oscillator (PO): The projectionOscillator calculates the Projection Oscillator (PO). The PO uses the linear regression slope, along with highs and lows. Technical Description: PL = Min(period, (high + MLS(period, x, high))); PU = Max(period, (low + MLS(period, x, low))); PO = 100 * (Closing - PL) / (PU - PL); SPO = EMA(smooth, PO)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"smooth","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Projection Oscillator (PO)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":14,"smooth":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getProjectionOscillatorStrategy: {
			description: "Projection Oscillator Strategy: The projectionOscillatorStrategy uses po and spo values that are generated by the Projection Oscillator (PO) indicator function to provide a BUY action when po is above spo, and SELL action when po is below spo. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"smooth","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Projection Oscillator Strategy","asset": asset,"period":14,"smooth":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getQstick: {
			description: "Qstick: The qstick function calculates the ratio of recent up and down bars. Technical Description: QS = Sma(Closing - Opening)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Qstick","openings": asset['openings'],"closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRandomIndex: {
			description: "Random Index (KDJ): The kdj function calculates the KDJ indicator, also known as the Random Index. KDJ is calculated similar to the Stochastic Oscillator with the difference of having the J line. It is used to analyze the trend and entry points. Technical Description: RSV = ((Closing - Min(Low, rPeriod)) / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100; K = Sma(RSV, kPeriod); D = Sma(K, dPeriod); J = (3 * K) - (2 * D)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"rPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(9)"]}},
				{"position":{"key":"kPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}},
				{"position":{"key":"dPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Random Index (KDJ)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"rPeriod":9,"kPeriod":3,"dPeriod":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRelativeStrengthIndex: {
			description: "Relative Strength Index (RSI): The rsi function calculates a momentum indicator that measures the magnitude of recent price changes to evaluate overbought and oversold conditions using a window period. Technical Description: RS = Average Gain / Average Loss; RSI = 100 - (100 / (1 + RS))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Relative Strength Index (RSI)","closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRollingMovingAverage: {
			description: "Rolling Moving Average (RMA): The rma function calculates the rolling moving average for a given period. Technical Description: R[0] to R[p-1] is SMA(values); R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Rolling Moving Average (RMA)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRsi2Strategy: {
			description: "RSI 2 Strategy: The rsi2Strategy uses the _rsi_ values that are generated by the RSI 2 indicator function to provide a _BUY_ action when 2-period RSI moves below 10, and a _SELL_ action when the 2-period RSI moved above 90, and a _HOLD_ action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for RSI 2 Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getSimpleMovingAverage: {
			description: "Simple Moving Average (SMA): The sma function calculates the simple moving average for a given period. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(2)"]}}
			],
			tests: [
				{"_description":"Test for Simple Moving Average (SMA)","values": asset['values'],"period":2}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getSince: {
			description: "Since Change: The since function provides the number values since the last change. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Since Change","values": asset['values']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getStochasticOscillator: {
			description: "Stochastic Oscillator (STOCH): The stochasticOscillator function calculates a momentum indicator that shows the location of the closing relative to high-low range over a set number of periods. Technical Description: K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100; D = 3-Period SMA of K",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"kPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"dPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Stochastic Oscillator (STOCH)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"kPeriod":14,"dPeriod":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getStochasticOscillatorStrategy: {
			description: "Stochastic Oscillator Strategy: The stochasticOscillatorStrategy uses the _ao_ values that are generated by the Stochastic Oscillator indicator function to provide a _BUY_ action when _k_ and _d_ are less than 20, a _SELL_ action when the _k_ and _d_ are greather than 80, a _HOLD_ action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"kPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"dPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}}
			],
			tests: [
				{"_description":"Test for Stochastic Oscillator Strategy","asset": asset,"kPeriod":14,"dPeriod":3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTriangularMovingAverage: {
			description: "Triangular Moving Average (TRIMA): The trima function calculates the Triangular Moving Average (TRIMA) for a given period. It is a weighted moving average putting more weight to the middle values. Technical Description: If period is even: TRIMA = SMA(period / 2, SMA((period / 2) + 1, values)); If period is odd: TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Triangular Moving Average (TRIMA)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTripleExponentialAverage: {
			description: "Triple Exponential Average (TRIX): The trix indicator is an oscillator used to identify oversold and overbought markets, and it can also be used as a momentum indicator. Technical Description: EMA1 = EMA(period, values); EMA2 = EMA(period, EMA1); EMA3 = EMA(period, EMA2); TRIX = (EMA3 - Previous EMA3) / Previous EMA3",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(4)"]}}
			],
			tests: [
				{"_description":"Test for Triple Exponential Average (TRIX)","values": asset['values'],"period":4}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTripleExponentialMovingAverage: {
			description: "Triple Exponential Moving Average (TEMA): The tema function calculates the Triple Exponential Moving Average (TEMA) for a given period. It reduces lag by taking multiple EMAs of the original EMA and subtracting out some of the lag. Technical Description: TEMA = (3 * EMA1) - (3 * EMA2) + EMA3; EMA1 = EMA(values); EMA2 = EMA(EMA1); EMA3 = EMA(EMA2)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"values","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(2)"]}}
			],
			tests: [
				{"_description":"Test for Triple Exponential Moving Average (TEMA)","values": asset['values'],"period":2}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTrueRange: {
			description: "True Range (TR): The trueRange function calculates the True Range (TR) for a given period. Technical Description: TR = Max((High - Low), Abs(High - Closing[-1]), Abs(Low - Closing[-1]))",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for True Range (TR)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTypicalPrice: {
			description: "Typical Price: The typicalPrice function calculates another approximation of average price for each period and can be used as a filter for moving average systems. Technical Description: Typical Price = (High + Low + Closing) / 3",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Typical Price","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTypicalPriceStrategy: {
			description: "Typical Price Strategy: The typicalPriceStrategy uses the values that are generated by the Typical Price indicator function to provide a BUY action when the value is greather than the previous value, and SELL action when the value is less than the previous value, and HOLD action when value is equal to the previous value. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Typical Price Strategy","asset": asset}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUlcerIndex: {
			description: "Ulcer Index (UI): The ulcerIndex measures downside risk. The index increases in value as the price moves farther away from a recent high and falls as the price rises to new highs. Technical Description: High Closings = Max(period, Closings); Percentage Drawdown = 100 * ((Closings - High Closings) / High Closings); Squared Average = Sma(period, Percent Drawdown * Percent Drawdown); Ulcer Index = Sqrt(Squared Average)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Ulcer Index (UI)","closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVolumePriceTrend: {
			description: "Volume Price Trend (VPT): The volumePriceTrend provides a correlation between the volume and the price. Technical Description: VPT = Previous VPT + (Volume * (Current Closing - Previous Closing) / Previous Closing)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Volume Price Trend (VPT)","closings": asset['closings'],"volumes": asset['volumes']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVolumeWeightedAveragePrice: {
			description: "Volume Weighted Average Price (VWAP): The volumeWeightedAveragePrice provides the average price the asset has traded. Technical Description: VWAP = Sum(Closing * Volume) / Sum(Volume)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Volume Weighted Average Price (VWAP)","closings": asset['closings'],"volumes": asset['volumes'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVolumeWeightedAveragePriceStrategy: {
			description: "Volume Weighted Average Price Strategy: The volumeWeightedAveragePriceStrategy uses the values that are generated by the Volume Weighted Average Price (VWAP) indicator function to provide a BUY action when the closing is below the VWAP, and a SELL action when the closing is below the VWAP, a HOLD action otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Volume Weighted Average Price Strategy","asset": asset,"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVolumeWeightedMovingAverage: {
			description: "Volume Weighted Moving Average (VWMA): The vwma function calculates the Volume Weighted Moving Average (VWMA) averaging the price data with an emphasis on volume, meaning areas with higher volume will have a greater weight. Technical Description: VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Volume Weighted Moving Average (VWMA)","closings": asset['closings'],"volumes": asset['volumes'],"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVolumeWeightedMovingAverageStrategy: {
			description: "Volume Weighted Moving Average (VWMA) Strategy: The vwmaStrategy function uses SMA and VWMA indicators to provide a BUY action when VWMA is above SMA, and a SELL signal when VWMA is below SMA, a HOLD signal otherwise. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Volume Weighted Moving Average (VWMA) Strategy","asset": asset,"period":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVortex: {
			description: "Vortex Indicator: The vortex function provides two oscillators that capture positive and negative trend movement. Technical Description: +VM = Abs(Current High - Prior Low); -VM = Abs(Current Low - Prior High); +VM14 = 14-Period Sum of +VM; -VM14 = 14-Period Sum of -VM; TR = Max((High[i]-Low[i]), Abs(High[i]-Closing[i-1]), Abs(Low[i]-Closing[i-1])); TR14 = 14-Period Sum of TR; +VI14 = +VM14 / TR14; -VI14 = -VM14 / TR14",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Vortex Indicator","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getVortexStrategy: {
			description: "Vortex Strategy: The vortexStrategy uses the values that are generated by the Vortex Indicator indicator function to provide a BUY action when the plusVi is greather than the minusVi, and SELL action when the plusVi is less than the minusVi, and HOLD action when the plusVi is equal to the minusVi. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Vortex Strategy","asset": asset,"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getWilliamsR: {
			description: "Williams R (WILLR): The williamsR function calculates the Williams R based on low, high, and closing prices. It is a type of momentum indicator that moves between 0 and -100 and measures overbought and oversold levels. Technical Description: WR = (Highest High - Closing) / (Highest High - Lowest Low)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Williams R (WILLR)","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getWilliamsRStrategy: {
			description: "Williams R Strategy: The williamsRStrategy uses the _wr_ values that are generated by the Williams R indicator function to provide a SELL action when the _wr_ is below -20, and a BUY action when _wr_ is above -80. Technical Description: null",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"asset","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"period","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Williams R Strategy","asset": asset,"period":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		}	
	},
	handlers: {
		validateData: ( { struct, payload, userParams, routeName } ) => {
            const [ input, params ] = availableIndicators[ routeName ]['validate']
            const all = [ ...input, ...params ]
                .forEach( ( key ) => {
                    if( !userParams[ key ] ) {
                        const msg = key + ' is required'
                        struct['messages'].push( msg )
                    }
                } )
            struct['status'] = struct['messages'].length === 0
        
            return { struct, payload } 
        },
		applyIndicator: ( { struct, payload, userParams, routeName } ) => {
            const [ input, p, outputs ] = availableIndicators[ routeName ]['validate']

            const data = input
                .reduce( ( acc, key ) => { acc[ key ] = userParams[ key ]; return acc }, {} )
            const params = p
                .reduce( ( acc, key ) => { acc[ key ] = userParams[ key ]; return acc }, {} )
            const { handler } = availableIndicators[ routeName ]
            struct['data'] = handler( data, params, routeName )

            return { struct, payload }
        }
	}
}


export { schema }