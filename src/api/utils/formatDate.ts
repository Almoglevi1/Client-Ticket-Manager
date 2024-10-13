// Function to convert the date to dd/mm/yyyy format
const formatDate = (date: string): string => {
    try {
        const [year, month, day] = date.split("T")[0].split("-");
        return `${day}/${month}/${year}`;
    } catch (error) {
        throw new Error(`Failed to format date: ${(error as Error).message}`);
    }
};

export default formatDate;