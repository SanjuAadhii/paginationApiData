let jsonData = [];

    const rowsPerPage = 5;
    let currentPage = 1;

    async function fetchData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
        jsonData = await response.json();
        updateTable();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function displayTable(startIndex, endIndex) {
      const tableContainer = document.getElementById('table-container');
      tableContainer.innerHTML = '';

      const table = document.createElement('table');
      table.className = 'table table-bordered';
      const headerRow = table.insertRow();
      const headers = ['ID', 'Name', 'Email'];

      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });

      for (let i = startIndex; i < endIndex; i++) {
        const data = jsonData[i];
        if (!data) break;

        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = data.id;
        cell2.textContent = data.name;
        cell3.textContent = data.email;
      }

      tableContainer.appendChild(table);
    }

    function displayPagination() {
      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = '';

      const totalPages = Math.ceil(jsonData.length / rowsPerPage);

      for (let i = 1; i <= 5; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', () => {
          currentPage = i;
          updateTable();
        });
        if (i === currentPage) {
          listItem.style.backgroundColor = '#2980b9';
        }
        paginationContainer.appendChild(listItem);
      }

      if (currentPage < totalPages) {
        const nextArrow = document.createElement('li');
        nextArrow.innerHTML = '&raquo;'; // Bootstrap right arrow
        nextArrow.className = 'pagination-arrow';
        nextArrow.addEventListener('click', () => {
          currentPage++;
          updateTable();
        });
        paginationContainer.appendChild(nextArrow);
      }
    }

    function updateTable() {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, jsonData.length);
      displayTable(startIndex, endIndex);
      displayPagination();
    }

    // Fetch data and initialize the table
    fetchData();