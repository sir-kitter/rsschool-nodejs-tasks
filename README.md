<<<<<<< HEAD
# Description

## Task 1. Caesar's cipher CLI tool
**Usage**
* **-s, --shift**: a shift. This option is mandatory. Only 0...25 shifts are allowed.
* **-i, --input**: an input file. If this option is missing, then stdin is used as an input source.
* **-o, --output**: an output file. If this option is missing, then stdout is used as an output destination.
* **-a, --action**: an action encode/decode. This option is mandatory.

**Usage example:**
```bash
$ node caesar-cipher -a encode -s 7 -i "./plain.txt" -o "./encoded.txt"
```

```bash
$ node caesar-cipher --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node caesar-cipher --action decode --shift 7 --input encoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
=======
# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
>>>>>>> 36cd7a38f912c0b34325e5835c391a3dd7b375a6
