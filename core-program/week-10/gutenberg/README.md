# Project Gutenberg Example

## Introduction

This folder contains examples that use synchronous and asynchronous file I/O. For the latter, various implementations are provided for comparison:

- callbacks
- promise chains
- async/await

For the examples we will be using book text files obtained from Project Gutenberg.

> Project Gutenberg is a library of over 75,000 free eBooks.
>
> It can be found here: <https://www.gutenberg.org/>
>
> From its main page:
>
> Choose among free epub and Kindle eBooks, download them or read them online. You will find the world's great literature here, with focus on older works for which U.S. copyright has expired. Thousands of volunteers digitized and diligently proofread the eBooks, for you to enjoy.

For our purposes, a ready-to-use and convenient subset of 523 files from the Gutenberg Project were obtained from [kaggle.com](https://www.kaggle.com/): <https://www.kaggle.com/datasets/nayakazna/project-gutenbergs-book-cover-and-content>

## Functionality of the examples

What will we do in the examples? The objective is to analyze the text files and to extract a top ten of "words of interest" and how often they occur in a text.

We consider a word to be of interest if it starts with an uppercase letter, has a minimum length of three letters, and does not occur in a predefined list of common words. The latter is important because as sentences start with a capital letter, some common words could sneak in. Therefore, we filter those out.

The list thus obtained is assumed to represent the names of the most important characters or topics in the book.

The results of the analysis are reported as a JavaScript or JSON object. Here is, for instance, the result for the title _Alice's Adventures in Wonderland_:

```plaintext
{
  contentLength: 148018,
  wordCount: 2498,
  topWords: {
    Alice: 398,
    Queen: 75,
    Turtle: 59,
    Mock: 57,
    Hatter: 55,
    Gryphon: 55,
    Rabbit: 45,
    Duchess: 42,
    Dormouse: 40,
    March: 34
  }
}
```

The list of common words was obtained from <https://github.com/dariusk/corpora/blob/master/data/words/common.json>. We added some missing words to that list.

## Project Structure

```plaintext
gutenberg/          The main example directory
  data/             Contains all data input files
    txt/            Contains all book files
    common.json     A JSON file with the list of common words
    mapper.json     A JSON file containing meta information about each book
  results/
    stats.json      The results of the text analysis for the examples in the
                    'many' folder
  src/
    many/           Contains JavaScript examples that analyze all books
    lib/
      analyze.js    A JavaScript function that performs the actual text
                    analysis and is shared by all examples
    single/         Contains JavaScript examples that analyze a single book
```

As we discuss each example below, we recommend that you read the code and explanations carefully. Ask Copilot to explain the code to you if you have any questions.

## Folder: `single`

In this folder you will find examples that analyze a single text file. All examples call the same `analyze()` function but differ in how the reading of the text file is handled.

### File: `synchronous.js`

We will start with the simplest of all examples, one that analyzes a single file using synchronous file I/O. We'll give the code here and discuss it:

```javascript
import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

function loadJsonFile(filePath) {
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
}

function main() {
  try {
    const dataDir = path.join(__dirname, '../../data');
    const { commonWords } = loadJsonFile(path.join(dataDir, 'common.json'));

    const filePath = path.join(dataDir, 'txt/11.txt');
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = analyze(content, commonWords);
    console.log(stats);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
```

The `loadJsonFile()` function loads a JSON text file from the specified path and returns a parsed JavaScript object.

The `main()` function reads a book text (`11.txt`) and passes it to the imported `analyze()` function, along with the list of common words.

The results are logged to the console.

### File: `async-await.js`

This file is almost identical to `synchronous.js`, with the following differences:

- We now import `fs` from `fs/promises`.
- We have replaced `readFileSync()` with `readFile()` and call them with `await`.
- Because we are using `await` we needed to add `async` to the functions.

### File: `promise.js`

This file uses a promise chain with `.then()` and `.catch()` methods. Handling a rejected promise is no longer through a `try` and `catch()` block, but by means of the `.catch()` method at the end of the promise chain.

This example shows how promises were handled before `async/await` was added to the JavaScript language in 2017.

### File: `callbacks.js`

Promises were added as a built-in facility to JavaScript in 2015. Prior to that, developers sometimes used external libraries offering promise-like features, but without them the only other option for handling asynchronicity was to use callbacks.

This example demonstrates the use of callbacks for handling the asynchronous reading of the text file. The callbacks in this example use an error-first callback pattern, commonly used in NodeJS. It looks like this:

```javascript
const callback = (err, data) => {
  if (err) {
    // handle error
  } else {
    // handle data
  }
}
```

If an error occurs, the first argument (`err`) will be non-null, and the second argument (`data`) will be `undefined`. If no error occurs, `err` will be `null`, and `data` will contain the expected data. The `fs.readFile()` function is called with such a callback function to handle the asynchronous reading of the text file.

```javascript
fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        process.exit(1);
      }

      const stats = analyze(content, commonWords);
      console.log(stats);
    });
```

## Folder: `many`

In this folder you will find examples that analyze all (523) book text files in the `data/txt` folder. All examples call the same `analyze()` function but differ in how the reading of the text files is handled. Each example dumps the collected results as a large JSON array to the `results/stats.json` file. Additionally, each example logs the total execution time to the console so that we can compare the performance of the different implementations.

When you run each example multiple times in quick succession, you might notice that the first time it runs, it takes longer than subsequent runs. This is because the operating system caches file data in memory after the first read, making subsequent reads faster. To get a fair comparison, we will use the execution times from the second run for all implementations.

It turns out that all examples, except the one using worker threads, have very similar execution times (approximately 1200 milliseconds on a Mac Mini M4 Pro). This is because the text analysis itself is CPU-bound and the JavaScript engine in Node.js is single-threaded. Therefore, even when using asynchronous file I/O, the analysis of the text files is effectively done sequentially.

### File: `synchronous.js`

This example uses synchronous file I/O to read and analyze all text files one at a time. This is the simplest implementation and as we will see, quite an adequate one in terms of performance for our use case.

### File: `async-await.js`

This example uses `async/await` to read and analyze the text files one at a time, i.e., sequentially. Each file is read asynchronously, and the results are collected and dumped as a large JSON array to a file once all analyses are complete.

### File: `promise-all.js`

In this example we create an array of promises, one for each file read operation, and then use `Promise.all()` to wait for all of them to complete. While one might think this is the fastest approach, it can actually overwhelm the system with too many concurrent file read operations, especially when dealing with a large number of files as we are doing here. Furthermore, since the JavaScript engine is single-threaded, the analysis of the text files is effectively still done sequentially, meaning that the performance gain from concurrent file reads is minimal or non-existent.

### File: `callback.js`

This example uses callbacks to read and analyze the text files one at a time, i.e., sequentially. Each file is read asynchronously using the `fs.readFile()` function with an error-first callback.

The term _callback hell_ is often used to describe situations where multiple nested callbacks make the code difficult to read and maintain, as is the case here.

### File: `worker-threads.js`

> This is an advanced topic and is included for educational purposes only. You can safely skip this example.

This example implements a multi-threaded approach using the `worker_threads` module available in Node.js. Worker threads are not commonly used in typical Node.js applications and we do not recommend that you use them. We have included this example (generated with VSCode Copilot, see Author's note below) for educational purposes to demonstrate how multi-threading can take advantage of multiple CPU cores.

JavaScript in Node.js is single-threaded by default, meaning that all code execution happens on a single thread. When using worker threads, each worker is gets its own JavaScript engine, running its own event loop and executing code independently. This allows us to distribute CPU-bound tasks, such as our text analysis, across multiple threads, thereby utilizing multiple CPU cores and improving performance.

The execution time for this example is significantly lower than the other examples, approximately 350 milliseconds on a Mac Mini M4 Pro.

<details>

<summary>Author's note: Not having used worker threads myself before, I asked GitHub Copilot to generate this example on the basis of the `promise-all.js` implementation. Expand this section to see the prompt I used.</summary>

<br>

![copilot-prompt](../assets/worker-threads.png)
</details>
