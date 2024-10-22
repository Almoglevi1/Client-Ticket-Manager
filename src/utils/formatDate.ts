// Function to convert the date to dd/mm/yyyy format and return as Date object
const formatDate = (date: Date): string => {
    try {
        const [year, month, day] = date.toString().split("T")[0].split("-");
        return `${day}/${month}/${year}`;
    } catch (error) {
        throw new Error(`Failed to format date: ${(error as Error).message}`);
    }
};

export default formatDate;