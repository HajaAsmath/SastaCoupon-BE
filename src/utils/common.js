const convertDate = (date) => new Date(date).toISOString().slice(0, 10);

module.exports = { convertDate };
