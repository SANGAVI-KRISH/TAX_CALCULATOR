document.getElementById('calculate-button').addEventListener('click', function() {
    // Validate inputs
    const salary = parseFloat(document.getElementById('salary').value);
    const otherIncome = parseFloat(document.getElementById('other-income').value);
    const section80c = parseFloat(document.getElementById('section80c').value);
    const section80d = parseFloat(document.getElementById('section80d').value);

    if (isNaN(salary) || isNaN(otherIncome) || isNaN(section80c) || isNaN(section80d)) {
        alert('Please enter valid numeric values for all fields.');
        return;
    }

    // Calculate total income and deductions
    const totalIncome = salary + otherIncome;
    const totalDeductions = section80c + section80d;

    // Calculate taxable income
    const taxableIncome = totalIncome - totalDeductions;

    // Tax calculation (assuming old tax regime for simplicity)
    let taxLiability = 0;

    if (taxableIncome <= 250000) {
        taxLiability = 0;
    } else if (taxableIncome <= 500000) {
        taxLiability = (taxableIncome - 250000) * 0.05; // 5%
    } else if (taxableIncome <= 1000000) {
        taxLiability = 12500 + (taxableIncome - 500000) * 0.1; // 10%
    } else {
        taxLiability = 12500 + 50000 + (taxableIncome - 1000000) * 0.3; // 30%
    }

    // Display results
    document.getElementById('total-income').innerText = `₹${totalIncome.toFixed(2)}`;
    document.getElementById('total-deductions').innerText = `₹${totalDeductions.toFixed(2)}`;
    document.getElementById('result-income').innerText = `₹${totalIncome.toFixed(2)}`;
    document.getElementById('result-deductions').innerText = `₹${totalDeductions.toFixed(2)}`;
    document.getElementById('result-taxable-income').innerText = `₹${taxableIncome.toFixed(2)}`;
    document.getElementById('result-tax-liability').innerText = `₹${taxLiability.toFixed(2)}`;

    // Tax breakdown
    const breakdown = `
        <h3>Tax Liability Breakdown</h3>
        <p>Income up to ₹2,50,000: ₹0</p>
        <p>5% on income from ₹2,50,001 to ₹5,00,000: ₹${taxableIncome > 250000 ? (Math.min(taxableIncome, 500000) - 250000) * 0.05 : 0}</p>
        <p>10% on income from ₹5,00,001 to ₹10,00,000: ₹${taxableIncome > 500000 ? (Math.min(taxableIncome, 1000000) - 500000) * 0.1 : 0}</p>
        <p>30% on income above ₹10,00,000: ₹${taxableIncome > 1000000 ? (taxableIncome - 1000000) * 0.3 : 0}</p>
    `;
    document.getElementById('breakdown').innerHTML = breakdown;

    // Educational insights
    const insights = `
        <h3>Educational Insights</h3>
        <p><strong>Tax Slabs:</strong> The Indian tax system has different slabs. Income up to ₹2,50,000 is not taxed. Income from ₹2,50,001 to ₹5,00,000 is taxed at 5%, and so on.</p>
        <p><strong>Deductions:</strong> Deductions like those under Section 80C (up to ₹1.5 lakh) can significantly reduce your taxable income.</p>
    `;
    document.getElementById('educational-insights').innerHTML = insights;

    // Savings suggestions
    const suggestions = `
        <h3>Potential Savings Suggestions</h3>
        <p>1. <strong>Invest in ELSS:</strong> Investments in Equity Linked Savings Schemes can qualify for Section 80C deductions.</p>
        <p>2. <strong>Health Insurance:</strong> Premiums paid for health insurance can be claimed under Section 80D.</p>
        <p>3. <strong>Home Loan Interest:</strong> Claim deductions on home loan interest under Section 24(b).</p>
    `;
    document.getElementById('savings-suggestions').innerHTML = suggestions;

    // Show results
    document.getElementById('results').classList.remove('hidden');
});

// Reset button functionality
document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('salary').value = '';
    document.getElementById('other-income').value = '';
    document.getElementById('section80c').value = '';
    document.getElementById('section80d').value = '';
    document.getElementById('results').classList.add('hidden');
});
