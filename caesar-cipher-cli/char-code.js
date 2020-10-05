const char_to_code = (base, char) => char.toUpperCase().charCodeAt(0) - base.charCodeAt(0)
const code_to_char = (base, code) => String.fromCharCode(code + base.charCodeAt(0))

module.exports = {
    char_to_code: char_to_code,
    code_to_char: code_to_char,
}