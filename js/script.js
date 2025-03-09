document.getElementById('findButton').addEventListener('click', function() {
    const countryName = document.getElementById('countryInput').value.trim();
    const countryDetails = document.getElementById('countryDetails');
    const errorMessage = document.getElementById('errorMessage');

    if (!countryName) {
        errorMessage.textContent = 'Please enter a country name';
        errorMessage.classList.remove('d-none');
        countryDetails.classList.add('d-none');
        return;
    }

    errorMessage.classList.add('d-none'); // Hide error if any
    axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            const country = response.data[0];
            document.getElementById('countryFlag').src = country.flags.png;
            document.getElementById('countryName').textContent = country.name.common;
            document.getElementById('population').textContent = country.population.toLocaleString();
            document.getElementById('borders').textContent = country.borders ? country.borders.join(', ') : 'None';
            document.getElementById('currency').textContent = Object.values(country.currencies)[0].name;
            document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('area').textContent = country.area.toLocaleString();

            countryDetails.classList.remove('d-none');
        })
        .catch(error => {
            errorMessage.textContent = 'Country not found. Please try again.';
            errorMessage.classList.remove('d-none');
            countryDetails.classList.add('d-none');
        });
});