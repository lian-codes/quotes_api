const submitBiodataButton = document.getElementById('submit-biodata');
const newBiodataContainer = document.getElementById('new-biodata');

submitBiodataButton.addEventListener('click', () => {
    const person = document.getElementById('person').value;
    const born = document.getElementById('born').value;
    const blurb = document.getElementById('blurb').value;
    const knownFor = document.getElementById('knownFor').value;

    fetch(`/api/biodata?person=${person}&born=${born}&blurb=${blurb}&knownFor=${knownFor}`, { 
        method: 'POST',
    })
    .then(response => response.json())
    .then(({biodata}) => {
        const newBiodata = document.createElement('div');
        newBiodata.innerHTML = `
            <h3>${biodata.person} <span>(b. ${biodata.born})</span></h3>

             <div class="biodata-text"><strong>Notable Work:</strong> ${biodata.knownFor}</div>
  
            <div class="attribution"><em>${biodata.blurb}</em></div>
           
            <p>Go to the <a href="index.html">home page</a> to request and view all biodatas.</p>
        `;
        newBiodataContainer.appendChild(newBiodata);
    });
});