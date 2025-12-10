// Words of interest start with a capital letter
// followed by at least 2 more letters
const pattern = /\b[A-Z][-a-zA-Z]{2,}\b/g;

export function analyze(content, commonWords) {
  // Create a set for faster lookup (O(1) time complexity)
  // as compared to O(n) for arrays
  const commonSet = new Set(commonWords);

  // Extract all words matching the pattern
  const words = content.match(pattern) || [];

  const wordCount = words.length;
  const contentLength = content.length;

  // Create a map to hold all words of interest and their counts
  const wordMap = {};

  words
    // Exclude selected commonly used words. We are interested
    // in words that start with a capital letter but as sentences
    // start with a capital letter, some common words could
    // sneak in. We filter those out here.
    .filter((word) => !commonSet.has(word.toLowerCase()))
    // What's left over, we count
    .forEach((word) => {
      // Increment the count for this word in the map
      // If the word is not already in the map, initialize its count to 0
      wordMap[word] = (wordMap[word] ?? 0) + 1;
    });

  // Sort by descending count: the most frequent words first
  const wordCounts = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);

  // Create an object to hold the top words and their counts
  const topWords = {};

  // Take the top 10 words and put them in the result object
  for (const [word, count] of wordCounts.slice(0, 10)) {
    topWords[word] = count;
  }

  return {
    contentLength,
    wordCount,
    topWords,
  };
}
