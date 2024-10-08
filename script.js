document.addEventListener("DOMContentLoaded", () => {
    const assetSelect = document.getElementById('assetSelect');
    let currentSymbol = assetSelect.value;

    // Initialiser widgets
    loadTradingViewWidgets(currentSymbol);

    // Skift widget-data ved valg af aktiv
    assetSelect.addEventListener('change', () => {
        currentSymbol = assetSelect.value;
        loadTradingViewWidgets(currentSymbol);
    });
});

function loadTradingViewWidgets(symbol) {
    // Fjern eksisterende widgets
    document.getElementById('tradingview_chart').innerHTML = "";
    document.getElementById('tradingview-widget').innerHTML = "";
    document.getElementById('technical-analysis-widget').innerHTML = "";

    // Candlestick Chart Widget
    new TradingView.widget({
        "container_id": "tradingview_chart",
        "symbol": `BINANCE:${symbol}`,
        "interval": "60",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#222",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "studies": ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
        "height": "400",
        "width": "100%"
    });

    // Market Overview Widget
    new TradingView.MediumWidget({
        "container_id": "tradingview-widget",
        "symbols": [
            [`BINANCE:${symbol}`]
        ],
        "greyText": "Quotes by TradingView",
        "gridLineColor": "#444",
        "fontColor": "#ddd",
        "underLineColor": "#dbeffb",
        "trendLineColor": "#4fa3ff",
        "width": "100%",
        "height": "300",
        "locale": "en"
    });

    // Technical Analysis Widget
    new TradingView.widget({
        "container_id": "technical-analysis-widget",
        "autosize": true,
        "symbol": `BINANCE:${symbol}`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#222",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "studies": ["StochasticRSI@tv-basicstudies", "BollingerBands@tv-basicstudies"],
        "width": "100%",
        "height": "300",
        "allow_symbol_change": true
    });
}
