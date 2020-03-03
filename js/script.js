const covidUrlData = "https://spreadsheets.google.com/feeds/list/1lwnfa-GlNRykWBL5y7tWpLxDoCfs8BvzWxFjeOZ1YJk/1/public/values?alt=json";
const subTitle = document.querySelector('h5');

const covidData = () => {
    fetch(covidUrlData)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            console.log("Eroare apelare API.");
        })
        .then(data => {
            let responseData = data.feed;

            subTitle.innerText = new Date(responseData.updated.$t).toLocaleString('ro-RO');
            let countryLists = responseData.entry;
            countryLists.forEach((country, index) => {
                let countryName = country.title.$t;
                let confirmedCases = country.gsx$confirmedcases.$t;
                let reportedDeaths = country.gsx$reporteddeaths.$t || 0;

                const tbody = document.querySelector('tbody');
                const row = document.createElement('tr');
                const cellId = document.createElement('th');
                const cellCountryName = document.createElement('td');
                const cellCC = document.createElement('td');
                const cellRD = document.createElement('td');

                const fontColor = parseInt(reportedDeaths) > 0 ? 'text-danger' : 'text-success';

                cellCC.setAttribute('class', 'text-warning font-weight-bold');
                cellRD.setAttribute('class', fontColor + ' font-weight-bold');

                cellId.appendChild(document.createTextNode(index + 1));
                cellCountryName.appendChild(document.createTextNode(countryName));
                cellCC.appendChild(document.createTextNode(confirmedCases));
                cellRD.appendChild(document.createTextNode(reportedDeaths));

                row.appendChild(cellId);
                row.appendChild(cellCountryName);
                row.appendChild(cellCC);
                row.appendChild(cellRD);

                tbody.appendChild(row);
            });
        })
};

covidData();