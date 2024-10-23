# Javascript coding challenge - October 2024

- [Javascript coding challenge - October 2024](#javascript-coding-challenge---october-2024)
  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Interface](#interface)
    - [Initialize](#initialize)
    - [Solve](#solve)
  - [Solving a crossword](#solving-a-crossword)
  - [How to tackle this challenge](#how-to-tackle-this-challenge)
  - [Data Encoding](#data-encoding)
  - [Levels](#levels)
  - [Scoring](#scoring)
  - [Winner](#winner)

## Introduction

Your team has been tasked to complete the delivery of the new commercial offering after the previous Engineer Lead mysteriously disappeared. Some says he escaped to Spain and opened a 'chiringuito' (little bar) on the beach, other says he's hiding somewhere in the Lloyds building writing a new library to enforce git commit to be haikus.

In all his wisdom, the previous EL decided to encoded all the critical business logic using encrypted crossword (but he obviously stored the decoding key in clear on a shared network folder).
Did I say 1 crossword ? Sorry, I meant hundreds of crosswords, the previous EL was a very prolific puzzler. We are not even sure if those are all the crossword he created, so you must develop an application to solve them automatically.

You have until 1:30pm today to develop the solver and deliver the journey otherwise we'll have to report to the regulators.

## Requirements

> ℹ️ The following requirements follow [rfc2119](https://datatracker.ietf.org/doc/html/rfc2119) convention.

You **MUST**:

- Submit a single javascript or typescript file containing your solver that must `default export` a class that implements the interface defined in `src/base.ts` (extending the exported `AbstractSolver` if using typescript); This means it must have a static property `teamName` and implement the 2 methods `initialize` and `solve`.
- Submit your solution strictly before 1:30pm UK time.

You **MUST NOT**:

- Store values in global, module, file variables, static properties of the class or filesystem for reuse across different levels. This means that every class creation/initialization must be independent.
- Use any third party libraries.
- Hardcode pre-calculations or complete/partial solution to specific crosswords.
- Access the host system (filesystem or other resources) or try to to execute malicious code.
- Obfuscate your code.
- Request help from any person outside your team.
- Utilise generative AI or similar solutions.

You **MAY**:

- Structure your code as you please as long as you submit a single file at the end.
- Define a constructor and any internal method you might need.
- Reference any component/function/etc from the files provided in the challenge package.
- Submit multiple solutions **BUT ONLY THE LAST ONE** submitted will be evaluated.

You **SHOULD**:

- Have fun!

## Interface

### Initialize

The `initialize` method of your class is called once per level with a object containing:

- `level`: a number specifying the current challenge level. can be used to change behaviour of your code depending on the complexity of the crosswords.
- `dictionary`: a list of all possible words (around 350_000) that the crosswords might contain. Each word is only comprised of UPPERCASE alphabetical letters (A-Z) and is at least 3 character long.

### Solve

The `solve` method of your class is called once per crossword with a object containing:

- `id`: the unique id of the crossword to solve
- `rows`: the number of rows of the crossword to solve
- `cols`: the number of cols of the crossword to solve
- `encrypted`: a matrix of numbers representing the encrypted crossword
- `key`: an array of objects `{letter: Letter; number: number}` representing the decryption key

## Solving a crossword

> ℹ️ What follows is the explanation on how you would solve this MANUALLY. Your code might use different approach. More advanced logic might be required at higher challenge levels.

An encrypted crossword is a crossword where the letters have been replaced with numbers following the rule that same number means same letter (and vice versa).

> ⚠️ IMPORTANT: Different crosswords have different Letter - Number association!

**Original crossword / Solution**

<table class="crossword">
  <tr><td> </td><td> </td><td> </td><td> </td><td>O</td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td>C</td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td>F</td><td> </td><td> </td><td> </td><td>B</td><td> </td><td> </td><td> </td><td> </td><td>O</td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td>F</td><td> </td><td> </td><td> </td><td>A</td><td> </td><td> </td><td> </td><td> </td><td>R</td><td> </td></tr>
  <tr><td> </td><td> </td><td>C</td><td> </td><td>H</td><td> </td><td> </td><td> </td><td>B</td><td> </td><td> </td><td> </td><td> </td><td>P</td><td> </td></tr>
  <tr><td> </td><td> </td><td>O</td><td> </td><td>A</td><td> </td><td> </td><td> </td><td>Y</td><td> </td><td>L</td><td> </td><td> </td><td>U</td><td> </td></tr>
  <tr><td> </td><td>P</td><td>R</td><td>O</td><td>N</td><td>A</td><td>T</td><td>I</td><td>O</td><td>N</td><td>A</td><td>L</td><td>I</td><td>S</td><td>M</td></tr>
  <tr><td> </td><td> </td><td>O</td><td> </td><td>D</td><td> </td><td> </td><td> </td><td>L</td><td> </td><td>U</td><td> </td><td> </td><td>C</td><td> </td></tr>
  <tr><td> </td><td> </td><td>L</td><td> </td><td>E</td><td> </td><td> </td><td> </td><td>A</td><td> </td><td>R</td><td> </td><td> </td><td>U</td><td> </td></tr>
  <tr><td>S</td><td>O</td><td>L</td><td>I</td><td>D</td><td>A</td><td>R</td><td>I</td><td>T</td><td>Y</td><td> </td><td>F</td><td> </td><td>L</td><td> </td></tr>
  <tr><td> </td><td> </td><td>E</td><td> </td><td>N</td><td> </td><td> </td><td> </td><td>R</td><td> </td><td> </td><td>I</td><td> </td><td>E</td><td> </td></tr>
  <tr><td> </td><td> </td><td>T</td><td> </td><td>E</td><td> </td><td> </td><td> </td><td>Y</td><td> </td><td> </td><td>E</td><td> </td><td> </td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td>S</td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td>L</td><td> </td><td> </td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td>S</td><td>A</td><td>D</td><td>D</td><td>E</td><td>N</td><td>E</td><td>D</td><td> </td><td> </td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td>E</td><td> </td><td> </td><td> </td></tr>
  <tr><td> </td><td> </td><td> </td><td> </td><td>G</td><td>A</td><td>N</td><td>G</td><td>L</td><td>A</td><td>N</td><td>D</td><td>E</td><td>R</td><td> </td></tr>
</table>

**Encrypted crossword**

<table class="crossword">
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>15</td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>12</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>17</td><td>  </td><td>  </td><td>  </td><td>16</td><td>  </td><td>  </td><td>  </td><td>  </td><td>15</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>17</td><td>  </td><td>  </td><td>  </td><td>23</td><td>  </td><td>  </td><td>  </td><td>  </td><td>26</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>12</td><td>  </td><td>20</td><td>  </td><td>  </td><td>  </td><td>16</td><td>  </td><td>  </td><td>  </td><td>  </td><td> 8</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>15</td><td>  </td><td>23</td><td>  </td><td>  </td><td>  </td><td> 4</td><td>  </td><td> 2</td><td>  </td><td>  </td><td> 9</td><td>  </td></tr>
  <tr><td>  </td><td> 8</td><td>26</td><td>15</td><td> 6</td><td>23</td><td> 5</td><td> 3</td><td>15</td><td> 6</td><td>23</td><td> 2</td><td> 3</td><td>10</td><td>21</td></tr>
  <tr><td>  </td><td>  </td><td>15</td><td>  </td><td>22</td><td>  </td><td>  </td><td>  </td><td> 2</td><td>  </td><td> 9</td><td>  </td><td>  </td><td>12</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td> 2</td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td><td>23</td><td>  </td><td>26</td><td>  </td><td>  </td><td> 9</td><td>  </td></tr>
  <tr><td>10</td><td>15</td><td> 2</td><td> 3</td><td>22</td><td>23</td><td>26</td><td> 3</td><td> 5</td><td> 4</td><td>  </td><td>17</td><td>  </td><td> 2</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>18</td><td>  </td><td> 6</td><td>  </td><td>  </td><td>  </td><td>26</td><td>  </td><td>  </td><td> 3</td><td>  </td><td>18</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td> 5</td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td><td> 4</td><td>  </td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>10</td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td> 2</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>10</td><td>23</td><td>22</td><td>22</td><td>18</td><td> 6</td><td>18</td><td>22</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>11</td><td>23</td><td> 6</td><td>11</td><td> 2</td><td>23</td><td> 6</td><td>22</td><td>18</td><td>26</td><td>  </td></tr>
</table>

To solve such a crossword you are provided with a decoded 5 letter word (not appearing in the crossword) that act as a entry point key:

**Key**

<table class="crossword">
  <tr><td> P</td><td> A</td><td> S</td><td> T</td><td> A</td></tr>
  <tr><td> 8</td><td>23</td><td>10</td><td> 5</td><td>23</td></tr>
</table>

You can now start replacing the known numbers-letter pairs in the crossword:

<table class="crossword">
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>15</td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>12</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>17</td><td>  </td><td>  </td><td>  </td><td>16</td><td>  </td><td>  </td><td>  </td><td>  </td><td>15</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>17</td><td>  </td><td>  </td><td>  </td><td class="red"> A</td><td>  </td><td>  </td><td>  </td><td>  </td><td>26</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>12</td><td>  </td><td>20</td><td>  </td><td>  </td><td>  </td><td>16</td><td>  </td><td>  </td><td>  </td><td>  </td><td class="red"> P</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>15</td><td>  </td><td class="red"> A</td><td>  </td><td>  </td><td>  </td><td> 4</td><td>  </td><td> 2</td><td>  </td><td>  </td><td> 9</td><td>  </td></tr>
  <tr><td>  </td><td class="red"> P</td><td>26</td><td>15</td><td> 6</td><td class="red"> A</td><td class="red"> T</td><td> 3</td><td>15</td><td> 6</td><td class="red"> A</td><td> 2</td><td> 3</td><td class="red"> S</td><td>21</td></tr>
  <tr><td>  </td><td>  </td><td>15</td><td>  </td><td>22</td><td>  </td><td>  </td><td>  </td><td> 2</td><td>  </td><td> 9</td><td>  </td><td>  </td><td>12</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td> 2</td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td><td class="red"> A</td><td>  </td><td>26</td><td>  </td><td>  </td><td> 9</td><td>  </td></tr>
  <tr><td class="red"> S</td><td>15</td><td> 2</td><td> 3</td><td>22</td><td class="red"> A</td><td>26</td><td> 3</td><td class="red"> T</td><td> 4</td><td>  </td><td>17</td><td>  </td><td> 2</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>18</td><td>  </td><td> 6</td><td>  </td><td>  </td><td>  </td><td>26</td><td>  </td><td>  </td><td> 3</td><td>  </td><td>18</td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td class="red"> T</td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td><td> 4</td><td>  </td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td class="red"> S</td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td> 2</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td class="red"> S</td><td class="red"> A</td><td>22</td><td>22</td><td>18</td><td> 6</td><td>18</td><td>22</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>  </td><td>18</td><td>  </td><td>  </td><td>  </td></tr>
  <tr><td>  </td><td>  </td><td>  </td><td>  </td><td>11</td><td class="red"> A</td><td> 6</td><td>11</td><td> 2</td><td class="red"> A</td><td> 6</td><td>22</td><td>18</td><td>26</td><td>  </td></tr>
</table>

By comparing the incomplete words with the words in the dictionary you should be able to find one word that fit into the schema, decode new numbers, replace, etc, until you have a complete mapping of all numbers and solved the crossword.

## How to tackle this challenge

> There is only one way to eat an elephant: a bite at a time.

> AKA: Any task, no matter how challenging, can be tackled bit by bit

- Write a solver, test it's correctness, find hot spots that take long time to execute.
- Copy the solver and apply some changes that aim to improve correctness, execution time, or improve the solving algorithm
- Have the new solver compete against the old one to validate the solution
- Repeat

## Data Encoding

> ⚠️ Important: the serialisation format used in the `data/crosswords` folder is not the same as the data being sent to the solver class. The serialisation format was defined to make the data readable to humans, but is translated into the 'correct' format when loaded to memory (see `src/data.ts` for details), so please don't consider it when writing your solution.

In the encrypted crossword, empty spaces are defined using the number `0`. In the decrypted crossword they must be defined using the character `.`.
This means that every `0` must be converted to `.`.

Please refer to typescript types in `src/base.ts` for the exact data format used in the code.

## Levels

There are 4 challenge levels:

- Level 1: small sized crosswords (~10 words) - linear solving
- Level 2: medium sized crosswords (~100 words) - linear solving
- Level 3: large sized crosswords (~500 words) - linear solving
- Level 4: medium sized crosswords (~100 words) - intermediate solving (this mean your code requires some 'insight' on how to handle some 'situations')

> ⚠️ Important: You must correctly solve at least 51% of the level crosswords to be eligible to participate to the next level.

## Scoring

Scoring is based on 2 factors: **correctness** and **performance**.

- `Correctness` defined as the number of correctly solved crosswords - the higher the better.
- `Performance` defined as the total execution time of the solver - the lower the better.

The `totalExecutionTime` time is the sum of:

- `initializationTime`: The time it takes to create and initialise the class. For each level, this process is run 4 times: the first execution is discarded (to allow the js interpreter to warm up) and the result is the average of the other 3 executions.
- `solvingTime`: The time it takes the solver instance to solve all the crosswords of the level. As the number of crosswords is relatively high, this step does not need to be run multiple times and averaged.

Each solver has MAXIMUM **1 minutes** to complete a level. Any crossword not complete in this timeframe is considered `failed`.

For each level the competing solutions are run against a common set of crosswords and the results are sorted first based on number of `solved` crossword and, if equals, based on `totalExecutionTime` .

The judge reserves the right to run the scoring multiple times if two or more solution have VERY similar execution time.

For each level the points are assigned as such:

- The best solution is awarded `100 - <failed crossword>` points
- Any subsequent solutions is awarded the points of the previous solution minus a penalty:
  - if number of solved crossword is the same, `minus 1 point for each 5% time difference`, minimum 1 point, and capped to a maximum of -20 points.
  - if number of solved crossword is different, `minus 1 points for each additional failed crossword`, uncapped.

_Example:_

```ts
┌─────────┬───────┬──────────────────┬────────┬────────┬────────┬────────────────────┬────────────────────┬─────────────┐
│ (index) │ level │ teamName         │ points │ solved │ failed │ totalExecutionTime │ initializationTime │ solvingTime │
├─────────┼───────┼──────────────────┼────────┼────────┼────────┼────────────────────┼────────────────────┼─────────────┤
│ 0       │ 1     │ 'TeamA'          │ 100    │ 100    │ 0      │ 10.1234            │ 1.1234             │ 10.000      │
│ 1       │ 1     │ 'TeamB'          │ 80     │ 100    │ 0      │ 20.1234            │ 12.0034            │ 8.1200      │
│ 2       │ 1     │ 'TeamC'          │ 65     │ 85     │ 15     │ 50.4               │ 0.3                │ 50.1        │
│ 3       │ 1     │ 'TeamD'          │ 64     │ 84     │ 16     │ 1.4                │ 0.234              │ 1.166       │
│ 4       │ 1     │ 'TeamE'          │ 0      │ 0      │ 100    │ 0.00351            │ 0.00001            │ 0.0035      │
└─────────┴───────┴──────────────────┴────────┴────────┴────────┴────────────────────┴────────────────────┴─────────────┘
```

## Winner

The winning team is the team with the highest sum of the level points.

<style>
.crossword tr{
  height: 24px !important;
  box-sizing: border-box;
}

.crossword td{
  box-sizing: border-box;
  width: 24px !important;
  padding: 0px !important;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
}

.red {
  color: red;
}
</style>
