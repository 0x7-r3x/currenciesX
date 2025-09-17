const fromAmountInput = document.getElementById("from-amount");
const toAmount = document.getElementById("to-amount");
const swapBtn = document.getElementById("swap");
const rateInfo = document.getElementById("rate-info");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

// Static fake conversion rates
const rates = {
    "USDINR": 88.27,
    "INRUSD": 0.011,
    "USDEUR": 0.92,
    "EURUSD": 1.09,
    "EURINR": 95.12,
    "INREUR": 0.010
};

// Auto focus on page load
fromAmountInput.focus();

// Refocus on any key press
document.addEventListener("keydown", (e) => {
    if (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") {
        fromAmountInput.focus();
    }
});

// Allow only numbers and dot
fromAmountInput.addEventListener("input", () => {
    fromAmountInput.value = fromAmountInput.value.replace(/[^0-9.]/g, "");
    convert(); // trigger conversion instantly
});

function animateAmount(target) {
    if (typeof anime === "function") {
        anime({
            targets: target,
            scale: [1.2, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .5)'
        });
    }
}

function convert() {
    const key = fromCurrency.value + toCurrency.value;
    const rate = rates[key] || 1;

    // Parse safely
    const baseValue = parseFloat(fromAmountInput.value.replace(/[^0-9.]/g, "")) || 0;
    const result = (baseValue * rate).toFixed(2);

    toAmount.textContent =
        (toCurrency.value === "USD" ? "$ " : toCurrency.value === "INR" ? "₹ " : "€ ") + result;

    rateInfo.innerHTML = `1 ${fromCurrency.value} ≈ ${rate} ${toCurrency.value}`;
    animateAmount("#to-amount");
}

swapBtn.addEventListener("click", () => {
    if (typeof anime === "function") {
        anime({
            targets: "#swap",
            rotate: '1turn',
            duration: 600,
            easing: 'easeInOutSine'
        });
    }

    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convert();
});

fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);

// UI animations on load
if (typeof anime === "function") {
    anime({
        targets: '.row',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        delay: anime.stagger(120),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '#swap',
        scale: [1, 1.05],
        duration: 1200,
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: true
    });

    anime({
        targets: '#rate-info',
        opacity: [0, 1],
        duration: 800,
        delay: 500,
        easing: 'easeOutQuad'
    });
}

// Init conversion
convert();
