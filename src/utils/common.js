const convertDate = (date) => {
    return new Date(date).toISOString().slice(0,10);
}

module.exports = {convertDate}