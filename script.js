let tradeType = 'long'; // Standard trade-type er 'long'

// Funktion til at sætte trade-typen baseret på knappen
function setTradeType(type) {
    tradeType = type;
    document.getElementById('longButton').style.backgroundColor = type === 'long' ? '#28a745' : '#ccc';
    document.getElementById('shortButton').style.backgroundColor = type === 'short' ? '#dc3545' : '#ccc';
}

// Beregningsfunktion for TP & SL for både Long og Short
function calculateTPSL() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const usdAmount = parseFloat(document.getElementById('usdAmount').value);
    const leverage = parseFloat(document.getElementById('leverage').value);

    if (isNaN(entryPrice) || entryPrice <= 0 || isNaN(usdAmount) || usdAmount <= 0 || isNaN(leverage) || leverage <= 0) {
        alert("Please enter valid values for entry price, trade size, and leverage.");
        return;
    }

    let sl1, sl2, tpPoints = [], sl1PL, sl2PL, tpProfits = [];

    if (tradeType === 'long') {
        // Long position beregning
        sl1 = entryPrice * 0.9985; // -0.15%
        sl2 = entryPrice * 0.997;  // -0.3%
        sl1PL = ((entryPrice - sl1) / entryPrice) * usdAmount * leverage;
        sl2PL = ((entryPrice - sl2) / entryPrice) * usdAmount * leverage;

        const tpValues = [0.003, 0.006, 0.009, 0.012, 0.015];
        for (let i = 0; i < tpValues.length; i++) {
            let tpPrice = entryPrice * (1 + tpValues[i]);
            let tpPL = ((tpPrice - entryPrice) / entryPrice) * usdAmount * leverage;
            tpPoints.push(tpPrice);
            tpProfits.push(tpPL);
        }
    } else {
        // Short position beregning
        sl1 = entryPrice * 1.0015; // +0.15%
        sl2 = entryPrice * 1.003;  // +0.3%
        sl1PL = ((sl1 - entryPrice) / entryPrice) * usdAmount * leverage;
        sl2PL = ((sl2 - entryPrice) / entryPrice) * usdAmount * leverage;

        const tpValues = [0.003, 0.006, 0.009, 0.012, 0.015];
        for (let i = 0; i < tpValues.length; i++) {
            let tpPrice = entryPrice * (1 - tpValues[i]);
            let tpPL = ((entryPrice - tpPrice) / entryPrice) * usdAmount * leverage;
            tpPoints.push(tpPrice);
            tpProfits.push(tpPL);
        }
    }

    // Vis resultater for TP og SL
    document.getElementById('slPoints').innerHTML = `
        <li class="loss-point">SL 1 (${tradeType === 'long' ? '-0.15%' : '+0.15%'}): ${sl1.toFixed(2)} | P&L: -$${Math.abs(sl1PL.toFixed(2))}</li>
        <li class="loss-point">SL 2 (${tradeType === 'long' ? '-0.3%' : '+0.3%'}): ${sl2.toFixed(2)} | P&L: -$${Math.abs(sl2PL.toFixed(2))}</li>`;

    document.getElementById('tpPoints').innerHTML = tpPoints.reverse().map((tp, index) => 
        `<li>TP ${5 - index} (${tradeType === 'long' ? '+' : '-'}${(tpValues[4 - index] * 100).toFixed(1)}%): ${tp.toFixed(2)} | P&L: +$${tpProfits[4 - index].toFixed(2)}</li>`).join('');
}
