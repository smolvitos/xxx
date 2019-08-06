module.exports = func => (filepath, charset) => {
    return new Promise((resolve, reject) => {
        func(filepath, charset, (err, content) => {
            if (err) reject(err)
            resolve(content)
        })
    })
}