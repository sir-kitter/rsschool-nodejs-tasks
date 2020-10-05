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