async function getNationality() {
    const getCountryNames =  new Intl.DisplayNames(['en'], {type: 'region'});
        document.querySelector('.deduce-btn').addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.getElementById("nameInput").value;
        const resultDiv = document.getElementById("result");

        if (name === "") {
            resultDiv.textContent = "Please provide a name";
            return;
        }

        try {
            const response = await fetch(`https://api.nationalize.io/?name=${name}`);
            const data = await response.json();

            if (data.country.length === 0) {
                resultDiv.textContent = `No data found for "${name}".`;
            }
            else {
                const country = data.country[0];
                const countryName = getCountryNames.of(country.country_id);
                const probability = (country.probability*100).toFixed(2);

                resultDiv.textContent = `${name} is most likely from ${countryName} (${country.country_id}) with ${probability.toFixed(2)}% certainty.`;
            }
        }catch (error) {
            resultDiv.textContent = "An error has occurred. Please try again.";
            console.error(error);
        }
    });
}

getNationality();