const searchBox = document.getElementById('searchBox');

searchBox.addEventListener('input', handleSearch);

function handleSearch(event) {
  const searchTerm = event.target.value;

  const searchResults = searchInDatabase(searchTerm);

  displayResults(searchResults);
}

function searchInDatabase(searchTerm) {
// sorted results (potential: AJAX?)
  const results = [
    { id: 1, name: 'Item 1', category: 'Category A',  },
    { id: 2, name: 'Item 2', category: 'Category B', },
    { id: 3, name: 'Item 3', category: 'Category A', },
    { id: 4, name: 'Item 4', category: 'Category C', },
    { id: 5, name: 'Item 5', category: 'Category B', }
  ];

  const sortedResults = results.sort((a, b) => a.category - b.category);

  let low = 0;
  let high = sortedResults.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const currentItem = sortedResults[mid];

    if (currentItem.category === searchTerm) {
      // found
      return [currentItem];
    }

    if (currentItem.category < searchTerm) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // not found
  return [];
}

function displayResults(results) {
// display
    console.log(results);
}
