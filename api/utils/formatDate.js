// Function to convert the date to dd/mm/yyyy format
const formatDate = (date) => {
    try {
        const [year, month, day] = date.split("T")[0].split("-");
        return `${day}/${month}/${year}`;
    } catch (error) {
        throw new Error(`Failed to format date ${date}: ${error.message}`);
    }
};

module.exports = formatDate;