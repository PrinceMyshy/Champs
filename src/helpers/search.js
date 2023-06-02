//*! search.js v1.0 June 1 2023

const searchBox = document.getElementById('searchBox');

searchBox.addEventListener('input', handleSearch);

function handleSearch(event) {
  const searchTerm = event.target.value;

  const searchResults = searchInDatabase(searchTerm);

  displayResults(searchResults);
}

function searchInDatabase(searchTerm) {
// sorted results (potential: use AJAX?)
  const results = [
    { id: 1, name: 'item 1', category: 'category A',  },
    { id: 2, name: 'item 2', category: 'category B', },
    { id: 3, name: 'item 3', category: 'category A', },
    { id: 4, name: 'item 4', category: 'category C', },
    { id: 5, name: 'item 5', category: 'category B', }
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
