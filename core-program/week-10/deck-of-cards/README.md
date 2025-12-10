# Deck of Cards Application

This is an interactive web application that demonstrates API integration using the **Deck of Cards** API at <https://deckofcardsapi.com>. The application allows users to create, shuffle, and draw cards from a virtual deck.

The application as delivered in the repository is incomplete, therefore you cannot use it yourself until you have completed the assignment. However, this is how you can use it once you are done.

After you load the `index.html`, click on the **New Deck** button to create a new deck of cards.

![new-deck](../assets/new-deck.gif)

Once the deck has been created, the other buttons are enabled. The functions of these buttons are self-explanatory. For instance, here is the result of clicking **Draw 5 Cards**:

![draw-5](../assets/draw-5.png)
Notice that the number of cards remaining is now 47 (52 - 5). You can (re-)shuffle the existing deck or create a new one to start over.

That's it!

## Application Structure

The application consists of the following files:

| File | Description |
| ---- | ----------- |
| index.html | The main HTML file that provides the HTML structure for the application. |
| styles.css | Contains all the styling for the application. |
| ui.js | Handles all UI-related functionality. |
| index.js | The main application logic that handles API interactions. |

Your job will be to make modifications to the `index.js` file. The other files should remain untouched.

Before you start tinkering with the code, it is essential that you build an understanding of the application's functionality and structure. Here, VS Code Copilot can be of great help.

## Using VS Code Copilot

For the following, we assume that you have cloned this repository and have access to Copilot in VS Code. Follow these steps:

1. If not open already, open the Copilot Chat window by clicking on the button in the VS Code title bar.

    ![copilot-1](../assets/copilot-1.png)

2. From the VS Code Explorer View, drag the `deck-of-cards` folder into the Copilot input area.

    ![copilot-2](../assets/copilot-2.png)

3. We will be asking Copilot to explain the code in this folder. Ensure that the dropdown below the input field is set to **Ask**. We don't want Copilot to make changes to our code.

4. Now ask Copilot to explain the code in the `deck-of-cards` folder (if you like, you can start with 'Please', but Copilot won't mind if you don't):

    `Explain the code in the deck-of-cards folder`

5. After some thinking, Copilot is likely to come back with a pretty good explanation of the code. Although we are not covering HTML and CSS in the Core track of the curriculum, you should be able to get a reasonable feel of what's happening in the `index.html` and `style.css` files.

6. With the Copilot explanation now at hand, go through all files and try to make sense of the code, and in particular `ui.js` and `index.js`. If you want, you can ask follow-up questions to Copilot to explain particular code fragments in more detail.

## Assignment

The `index.js` contains a number of functions that call the browser's built-in `fetch()` function to issue GET requests to the **Deck of Cards** API. These functions are:

- `createNewDeck()`
- `drawCards()`
- `shuffleDeck()`

The one thing that is missing from these function is the exact URL to get the required data. You must examine the API documentation at <https://deckofcardsapi.com> to determine how to complete those URLs.

Once you have successfully completed the URLs and tested the application in the browser, your next task is to do some refactoring.

You will notice that there is some repeated code in this application. Each of the functions that call `fetch()` contains repeated code (the code is not DRY). Refactor the code as follows:

1. Create a new function called `fetchData()`.
2. It is to be called with a single argument containing a URL.
3. It should call `fetch()` to fetch the data from the URL.
4. It should check for HTTP errors and throw an error if needed.
5. It should obtain the JSON object and return it to the caller.
6. It should use `async/await` syntax.

With this function now created, remove the code repetition in the three functions that originally called `fetch()` directly and replace it with calls to the newly created `fetchData()` function.

That completes this assignment.
