function isValidUUID (string) {
  const regex = /^[0-9A-F]{8}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{12}$/gi

  return regex.test(string)
}

module.exports = isValidUUID
