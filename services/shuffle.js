function shuffle(array) {
  var random = array.map(Math.random);
  array.sort(function (a, b) {
    return random[array.indexOf(a)] - random[array.indexOf(b)];
  });
}

export default shuffle;
