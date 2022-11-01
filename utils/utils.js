const readingTime = (article) => {
    const noOfWords = article.split(' ').length

    const wordPerMinute = noOfWords / 200

    return Math.round(wordPerMinute) === 0 ? 1 : Math.round(wordPerMinute)
}

module.exports = { readingTime}