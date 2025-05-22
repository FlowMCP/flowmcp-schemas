import { createRequire } from 'module'
const require = createRequire( import.meta.url )
const talib = require( 'talib/build/Release/talib.node' )


function getIndicator( functionName, data, params, routeName ) {
    const name = functionName
    const startIdx = 0
    const endIdx= Object.values( data)[ 0 ].length -1

    const result = talib.execute( {
        name,
        startIdx,
        endIdx,
        ...data,
        ...params
    } )

    return result 
}


const availableIndicators = {
	getAbandonedBaby: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLABANDONEDBABY', data, params, routeName ),
	},
	getAccelerationBands: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outRealUpperBand","outRealMiddleBand","outRealLowerBand"]],
		handler: ( data, params, routeName ) => getIndicator( 'ACCBANDS', data, params, routeName ),
	},
	getAdvanceBlock: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLADVANCEBLOCK', data, params, routeName ),
	},
	getAroon: {
		validate: [["highs","lows"],["optInTimePeriod"],["outAroonDown","outAroonUp"]],
		handler: ( data, params, routeName ) => getIndicator( 'AROON', data, params, routeName ),
	},
	getAroonOscillator: {
		validate: [["highs","lows"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'AROONOSC', data, params, routeName ),
	},
	getAverageDirectionalMovementIndex: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'ADX', data, params, routeName ),
	},
	getAverageDirectionalMovementIndexRating: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'ADXR', data, params, routeName ),
	},
	getAveragePrice: {
		validate: [["openings","highs","lows","closings"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'AVGPRICE', data, params, routeName ),
	},
	getAverageTrueRange: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'ATR', data, params, routeName ),
	},
	getBalanceOfPower: {
		validate: [["openings","highs","lows","closings"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'BOP', data, params, routeName ),
	},
	getBeltHold: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLBELTHOLD', data, params, routeName ),
	},
	getBreakaway: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLBREAKAWAY', data, params, routeName ),
	},
	getChaikinADLine: {
		validate: [["highs","lows","closings","volumes"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'AD', data, params, routeName ),
	},
	getChaikinADOscillator: {
		validate: [["highs","lows","closings","volumes"],["optInFastPeriod","optInSlowPeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'ADOSC', data, params, routeName ),
	},
	getClosingMarubozu: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLCLOSINGMARUBOZU', data, params, routeName ),
	},
	getCommodityChannelIndex: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'CCI', data, params, routeName ),
	},
	getConcealingBabySwallow: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLCONCEALBABYSWALL', data, params, routeName ),
	},
	getCounterattack: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLCOUNTERATTACK', data, params, routeName ),
	},
	getDarkCloudCover: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLDARKCLOUDCOVER', data, params, routeName ),
	},
	getDirectionalMovementIndex: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'DX', data, params, routeName ),
	},
	getDoji: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLDOJI', data, params, routeName ),
	},
	getDojiStar: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLDOJISTAR', data, params, routeName ),
	},
	getDragonflyDoji: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLDRAGONFLYDOJI', data, params, routeName ),
	},
	getEngulfingPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLENGULFING', data, params, routeName ),
	},
	getEveningDojiStar: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLEVENINGDOJISTAR', data, params, routeName ),
	},
	getEveningStar: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLEVENINGSTAR', data, params, routeName ),
	},
	getGravestoneDoji: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLGRAVESTONEDOJI', data, params, routeName ),
	},
	getHammer: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHAMMER', data, params, routeName ),
	},
	getHangingMan: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHANGINGMAN', data, params, routeName ),
	},
	getHaramiCrossPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHARAMICROSS', data, params, routeName ),
	},
	getHaramiPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHARAMI', data, params, routeName ),
	},
	getHighWaveCandle: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHIGHWAVE', data, params, routeName ),
	},
	getHikkakePattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHIKKAKE', data, params, routeName ),
	},
	getHomingPigeon: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHOMINGPIGEON', data, params, routeName ),
	},
	getIdenticalThreeCrows: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLIDENTICAL3CROWS', data, params, routeName ),
	},
	getInNeckPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLINNECK', data, params, routeName ),
	},
	getIntradayMomentumIndex: {
		validate: [["openings","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'IMI', data, params, routeName ),
	},
	getInvertedHammer: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLINVERTEDHAMMER', data, params, routeName ),
	},
	getKicking: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLKICKING', data, params, routeName ),
	},
	getKickingBullBearLongerMarubozu: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLKICKINGBYLENGTH', data, params, routeName ),
	},
	getLadderBottom: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLLADDERBOTTOM', data, params, routeName ),
	},
	getLongLeggedDoji: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLLONGLEGGEDDOJI', data, params, routeName ),
	},
	getLongLineCandle: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLLONGLINE', data, params, routeName ),
	},
	getMarubozu: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLMARUBOZU', data, params, routeName ),
	},
	getMatchingLow: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLMATCHINGLOW', data, params, routeName ),
	},
	getMatHold: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLMATHOLD', data, params, routeName ),
	},
	getMedianPrice: {
		validate: [["highs","lows"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'MEDPRICE', data, params, routeName ),
	},
	getMidpointPriceOverPeriod: {
		validate: [["highs","lows"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'MIDPRICE', data, params, routeName ),
	},
	getMinusDirectionalIndicator: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'MINUS_DI', data, params, routeName ),
	},
	getMinusDirectionalMovement: {
		validate: [["highs","lows"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'MINUS_DM', data, params, routeName ),
	},
	getModifiedHikkakePattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLHIKKAKEMOD', data, params, routeName ),
	},
	getMoneyFlowIndex: {
		validate: [["highs","lows","closings","volumes"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'MFI', data, params, routeName ),
	},
	getMorningDojiStar: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLMORNINGDOJISTAR', data, params, routeName ),
	},
	getMorningStar: {
		validate: [["openings","highs","lows","closings"],["optInPenetration"],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLMORNINGSTAR', data, params, routeName ),
	},
	getNormalizedAverageTrueRange: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'NATR', data, params, routeName ),
	},
	getOnNeckPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLONNECK', data, params, routeName ),
	},
	getParabolicSar: {
		validate: [["highs","lows"],["optInAcceleration","optInMaximum"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'SAR', data, params, routeName ),
	},
	getPiercingPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLPIERCING', data, params, routeName ),
	},
	getPlusDirectionalIndicator: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'PLUS_DI', data, params, routeName ),
	},
	getPlusDirectionalMovement: {
		validate: [["highs","lows"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'PLUS_DM', data, params, routeName ),
	},
	getRickshawMan: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLRICKSHAWMAN', data, params, routeName ),
	},
	getRisingFallingThreeMethods: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLRISEFALL3METHODS', data, params, routeName ),
	},
	getSeparatingLines: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSEPARATINGLINES', data, params, routeName ),
	},
	getShootingStar: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSHOOTINGSTAR', data, params, routeName ),
	},
	getShortLineCandle: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSHORTLINE', data, params, routeName ),
	},
	getSpinningTop: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSPINNINGTOP', data, params, routeName ),
	},
	getStalledPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSTALLEDPATTERN', data, params, routeName ),
	},
	getStickSandwich: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLSTICKSANDWICH', data, params, routeName ),
	},
	getTakuri: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLTAKURI', data, params, routeName ),
	},
	getTasukiGap: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLTASUKIGAP', data, params, routeName ),
	},
	getThreeAdvancingWhiteSoldiers: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3WHITESOLDIERS', data, params, routeName ),
	},
	getThreeBlackCrows: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3BLACKCROWS', data, params, routeName ),
	},
	getThreeInsideUpDown: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3INSIDE', data, params, routeName ),
	},
	getThreeLineStrike: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3LINESTRIKE', data, params, routeName ),
	},
	getThreeOutsideUpDown: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3OUTSIDE', data, params, routeName ),
	},
	getThreeStarsInTheSouth: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL3STARSINSOUTH', data, params, routeName ),
	},
	getThrustingPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLTHRUSTING', data, params, routeName ),
	},
	getTristarPattern: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLTRISTAR', data, params, routeName ),
	},
	getTrueRange: {
		validate: [["highs","lows","closings"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'TRANGE', data, params, routeName ),
	},
	getTwoCrows: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDL2CROWS', data, params, routeName ),
	},
	getTypicalPrice: {
		validate: [["highs","lows","closings"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'TYPPRICE', data, params, routeName ),
	},
	getUltimateOscillator: {
		validate: [["highs","lows","closings"],["optInTimePeriod1","optInTimePeriod2","optInTimePeriod3"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'ULTOSC', data, params, routeName ),
	},
	getUniqueThreeRiver: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLUNIQUE3RIVER', data, params, routeName ),
	},
	getUpDownGapSideBySideWhiteLines: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLGAPSIDESIDEWHITE', data, params, routeName ),
	},
	getUpsideDownsideGapThreeMethods: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLXSIDEGAP3METHODS', data, params, routeName ),
	},
	getUpsideGapTwoCrows: {
		validate: [["openings","highs","lows","closings"],[],["outInteger"]],
		handler: ( data, params, routeName ) => getIndicator( 'CDLUPSIDEGAP2CROWS', data, params, routeName ),
	},
	getWeightedClosePrice: {
		validate: [["highs","lows","closings"],[],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'WCLPRICE', data, params, routeName ),
	},
	getWilliamsPercentR: {
		validate: [["highs","lows","closings"],["optInTimePeriod"],["outReal"]],
		handler: ( data, params, routeName ) => getIndicator( 'WILLR', data, params, routeName ),
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
	namespace: "talib",
	name: "OHLCV Indicators",
	description: "Talib indicators",
	docs: ["https://github.com/oransel/node-talib"],
	tags: [],
	flowMCP: "1.2.0",
	root: "https://...",
	requiredServerParams: [],
	headers: {},
	routes: {
		getAbandonedBaby: {
			description: "Abandoned Baby (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.3)"]}}
			],
			tests: [
				{"_description":"Test for Abandoned Baby ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAccelerationBands: {
			description: "Acceleration Bands (Overlap Studies)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(20)"]}}
			],
			tests: [
				{"_description":"Test for Acceleration Bands ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":20}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAdvanceBlock: {
			description: "Advance Block (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Advance Block ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAroon: {
			description: "Aroon (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Aroon ","highs": asset['highs'],"lows": asset['lows'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAroonOscillator: {
			description: "Aroon Oscillator (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Aroon Oscillator ","highs": asset['highs'],"lows": asset['lows'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAverageDirectionalMovementIndex: {
			description: "Average Directional Movement Index (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Average Directional Movement Index ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAverageDirectionalMovementIndexRating: {
			description: "Average Directional Movement Index Rating (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Average Directional Movement Index Rating ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAveragePrice: {
			description: "Average Price (Price Transform)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Average Price ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getAverageTrueRange: {
			description: "Average True Range (Volatility Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Average True Range ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBalanceOfPower: {
			description: "Balance Of Power (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Balance Of Power ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBeltHold: {
			description: "Belt-hold (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Belt-hold ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getBreakaway: {
			description: "Breakaway (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Breakaway ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChaikinADLine: {
			description: "Chaikin A/D Line (Volume Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Chaikin A/D Line ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getChaikinADOscillator: {
			description: "Chaikin A/D Oscillator (Volume Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInFastPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(3)"]}},
				{"position":{"key":"optInSlowPeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(10)"]}}
			],
			tests: [
				{"_description":"Test for Chaikin A/D Oscillator ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes'],"optInFastPeriod":3,"optInSlowPeriod":10}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getClosingMarubozu: {
			description: "Closing Marubozu (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Closing Marubozu ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getCommodityChannelIndex: {
			description: "Commodity Channel Index (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Commodity Channel Index ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getConcealingBabySwallow: {
			description: "Concealing Baby Swallow (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Concealing Baby Swallow ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getCounterattack: {
			description: "Counterattack (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Counterattack ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDarkCloudCover: {
			description: "Dark Cloud Cover (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.5)"]}}
			],
			tests: [
				{"_description":"Test for Dark Cloud Cover ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.5}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDirectionalMovementIndex: {
			description: "Directional Movement Index (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Directional Movement Index ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDoji: {
			description: "Doji (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Doji ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDojiStar: {
			description: "Doji Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Doji Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getDragonflyDoji: {
			description: "Dragonfly Doji (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Dragonfly Doji ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getEngulfingPattern: {
			description: "Engulfing Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Engulfing Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getEveningDojiStar: {
			description: "Evening Doji Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.3)"]}}
			],
			tests: [
				{"_description":"Test for Evening Doji Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getEveningStar: {
			description: "Evening Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.3)"]}}
			],
			tests: [
				{"_description":"Test for Evening Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getGravestoneDoji: {
			description: "Gravestone Doji (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Gravestone Doji ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHammer: {
			description: "Hammer (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Hammer ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHangingMan: {
			description: "Hanging Man (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Hanging Man ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHaramiCrossPattern: {
			description: "Harami Cross Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Harami Cross Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHaramiPattern: {
			description: "Harami Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Harami Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHighWaveCandle: {
			description: "High-Wave Candle (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for High-Wave Candle ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHikkakePattern: {
			description: "Hikkake Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Hikkake Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getHomingPigeon: {
			description: "Homing Pigeon (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Homing Pigeon ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getIdenticalThreeCrows: {
			description: "Identical Three Crows (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Identical Three Crows ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getInNeckPattern: {
			description: "In-Neck Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for In-Neck Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getIntradayMomentumIndex: {
			description: "Intraday Momentum Index (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Intraday Momentum Index ","openings": asset['openings'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getInvertedHammer: {
			description: "Inverted Hammer (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Inverted Hammer ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getKicking: {
			description: "Kicking (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Kicking ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getKickingBullBearLongerMarubozu: {
			description: "Kicking - bull/bear determined by the longer marubozu (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Kicking - bull/bear determined by the longer marubozu ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getLadderBottom: {
			description: "Ladder Bottom (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Ladder Bottom ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getLongLeggedDoji: {
			description: "Long Legged Doji (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Long Legged Doji ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getLongLineCandle: {
			description: "Long Line Candle (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Long Line Candle ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMarubozu: {
			description: "Marubozu (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Marubozu ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMatchingLow: {
			description: "Matching Low (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Matching Low ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMatHold: {
			description: "Mat Hold (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.5)"]}}
			],
			tests: [
				{"_description":"Test for Mat Hold ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.5}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMedianPrice: {
			description: "Median Price (Price Transform)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Median Price ","highs": asset['highs'],"lows": asset['lows']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMidpointPriceOverPeriod: {
			description: "Midpoint Price over period (Overlap Studies)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Midpoint Price over period ","highs": asset['highs'],"lows": asset['lows'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMinusDirectionalIndicator: {
			description: "Minus Directional Indicator (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Minus Directional Indicator ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMinusDirectionalMovement: {
			description: "Minus Directional Movement (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Minus Directional Movement ","highs": asset['highs'],"lows": asset['lows'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getModifiedHikkakePattern: {
			description: "Modified Hikkake Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Modified Hikkake Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMoneyFlowIndex: {
			description: "Money Flow Index (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"volumes","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Money Flow Index ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"volumes": asset['volumes'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMorningDojiStar: {
			description: "Morning Doji Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.3)"]}}
			],
			tests: [
				{"_description":"Test for Morning Doji Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getMorningStar: {
			description: "Morning Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInPenetration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.3)"]}}
			],
			tests: [
				{"_description":"Test for Morning Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInPenetration":0.3}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getNormalizedAverageTrueRange: {
			description: "Normalized Average True Range (Volatility Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Normalized Average True Range ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getOnNeckPattern: {
			description: "On-Neck Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for On-Neck Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getParabolicSar: {
			description: "Parabolic SAR (Overlap Studies)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInAcceleration","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.02)"]}},
				{"position":{"key":"optInMaximum","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(0.2)"]}}
			],
			tests: [
				{"_description":"Test for Parabolic SAR ","highs": asset['highs'],"lows": asset['lows'],"optInAcceleration":0.02,"optInMaximum":0.2}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPiercingPattern: {
			description: "Piercing Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Piercing Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPlusDirectionalIndicator: {
			description: "Plus Directional Indicator (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Plus Directional Indicator ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getPlusDirectionalMovement: {
			description: "Plus Directional Movement (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Plus Directional Movement ","highs": asset['highs'],"lows": asset['lows'],"optInTimePeriod":14}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRickshawMan: {
			description: "Rickshaw Man (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Rickshaw Man ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getRisingFallingThreeMethods: {
			description: "Rising/Falling Three Methods (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Rising/Falling Three Methods ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getSeparatingLines: {
			description: "Separating Lines (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Separating Lines ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getShootingStar: {
			description: "Shooting Star (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Shooting Star ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getShortLineCandle: {
			description: "Short Line Candle (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Short Line Candle ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getSpinningTop: {
			description: "Spinning Top (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Spinning Top ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getStalledPattern: {
			description: "Stalled Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Stalled Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getStickSandwich: {
			description: "Stick Sandwich (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Stick Sandwich ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTakuri: {
			description: "Takuri (Dragonfly Doji with very long lower shadow) (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Takuri ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTasukiGap: {
			description: "Tasuki Gap (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Tasuki Gap ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeAdvancingWhiteSoldiers: {
			description: "Three Advancing White Soldiers (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three Advancing White Soldiers ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeBlackCrows: {
			description: "Three Black Crows (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three Black Crows ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeInsideUpDown: {
			description: "Three Inside Up/Down (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three Inside Up/Down ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeLineStrike: {
			description: "Three-Line Strike  (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three-Line Strike  ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeOutsideUpDown: {
			description: "Three Outside Up/Down (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three Outside Up/Down ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThreeStarsInTheSouth: {
			description: "Three Stars In The South (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Three Stars In The South ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getThrustingPattern: {
			description: "Thrusting Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Thrusting Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTristarPattern: {
			description: "Tristar Pattern (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Tristar Pattern ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTrueRange: {
			description: "True Range (Volatility Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for True Range ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTwoCrows: {
			description: "Two Crows (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Two Crows ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getTypicalPrice: {
			description: "Typical Price (Price Transform)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Typical Price ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUltimateOscillator: {
			description: "Ultimate Oscillator (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod1","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(7)"]}},
				{"position":{"key":"optInTimePeriod2","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}},
				{"position":{"key":"optInTimePeriod3","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(28)"]}}
			],
			tests: [
				{"_description":"Test for Ultimate Oscillator ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod1":7,"optInTimePeriod2":14,"optInTimePeriod3":28}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUniqueThreeRiver: {
			description: "Unique 3 River (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Unique 3 River ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUpDownGapSideBySideWhiteLines: {
			description: "Up/Down-gap side-by-side white lines (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Up/Down-gap side-by-side white lines ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUpsideDownsideGapThreeMethods: {
			description: "Upside/Downside Gap Three Methods (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Upside/Downside Gap Three Methods ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getUpsideGapTwoCrows: {
			description: "Upside Gap Two Crows (Pattern Recognition)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"openings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Upside Gap Two Crows ","openings": asset['openings'],"highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getWeightedClosePrice: {
			description: "Weighted Close Price (Price Transform)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}}
			],
			tests: [
				{"_description":"Test for Weighted Close Price ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings']}
			],
			modifiers: [
				{"phase":"execute","handlerName":"validateData"},
				{"phase":"execute","handlerName":"applyIndicator"}
			]
		},
		getWilliamsPercentR: {
			description: "Williams' %R (Momentum Indicators)",
			requestMethod: "GET",
			route: "/",
			parameters: [
				{"position":{"key":"highs","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"lows","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"closings","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"string()","options":[]}},
				{"position":{"key":"optInTimePeriod","value":"{{USER_PARAM}}","location":"insert"},"z":{"primitive":"number()","options":["optional()","default(14)"]}}
			],
			tests: [
				{"_description":"Test for Williams' %R ","highs": asset['highs'],"lows": asset['lows'],"closings": asset['closings'],"optInTimePeriod":14}
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

            const convert = {
                'openings': 'open',
                'highs': 'high',
                'lows': 'low',
                'closings': 'close',
                'volumes': 'volume'
            }

            const data = input
                .reduce( ( acc, key ) => { acc[ convert[ key ] ] = userParams[ key ]; return acc }, {} )
            const params = p
                .reduce( ( acc, key ) => { acc[ key ] = userParams[ key ]; return acc }, {} )
            const { handler } = availableIndicators[ routeName ]
            const result = handler( data, params, routeName )

            struct['data'] = outputs
                .reduce( ( acc, key ) => {
                    acc[ key ] = result['result'][ key ]
                    return acc
                }, {} )

            return { struct, payload }
        }
	}
}


export { schema }