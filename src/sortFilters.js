// Common sorting methods used to filter a List of User Objects

// pre: Takes an array of Users
// post: Returns an array of Users sorted in alphabetical order
export function sortAlphabetically(users) {
  return users.sort(function(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

// pre: Takes an array of Users
// post: Returns an array of Users sorted by Age
export function sortByAge(users) {
  return users.sort(function(a, b) {
    if (a.age < b.age) {
      return -1;
    }
    if (a.age > b.age) {
      return 1;
    }
    if (a.age === b.age) {
      // Alphabetical order breaks tie
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    }
    return 0;
  });
}
