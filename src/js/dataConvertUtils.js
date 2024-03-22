
class DataConvertUtils{
    // Convert date to human-readable format
    static formatDate(inputDate) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dateObj = new Date(inputDate);
        const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
        const dayOfMonth = dateObj.getUTCDate();
        const month = months[dateObj.getUTCMonth()];
        const year = dateObj.getUTCFullYear();

        return `${dayOfWeek} ${dayOfMonth}${this.getOrdinalSuffix(dayOfMonth)} ${month}, ${year}`;
    }

// Helper function to get ordinal suffix for day of the month
    static getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

// Convert date difference to human-readable time ago format
    static timeAgo(inputDate) {
        const currentDate = new Date();
        const targetDate = new Date(inputDate);
        const timeDifference = currentDate - targetDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return "a few seconds ago";
        }
    }
    
    static sumArray(numberArray){
        let sum = 0;
        
        numberArray.forEach(num => {
            if(typeof num === 'number') {
                if(!Number.isNaN(num)) sum += num;
            }
        })
        // var sum = numberArray.reduce((accumulator, currentValue) => {
        //     return accumulator + currentValue
        // },0);
        return sum
    }
    
}

export default DataConvertUtils;
