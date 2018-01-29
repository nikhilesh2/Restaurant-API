
const R_CORRECT =  {
        Item:{
            "name": "Pizza Mart",
            "address": "83 Aspen Rd",
            "zip_code": "02067",
            "phone_number": "781-322-4440",
            "email": "pizzaMart@gmail.com",
            "city": "Sharon",
            "state": "MA",
            "delivers": "yes",
            "country": "United States",
            "hours": {
                "Monday": [
                    {
                        "hours_open_start": "10:00",
                        "hours_open_end":  "13:00",
                    },
                    {
                        "hours_open_start": "16:00",
                        "hours_open_end":  "17:00",
                    }
                ],
                "Wednesday": [
                        {
                            "hours_open_start": "10:00",
                            "hours_open_end":  "13:00",
                        }
                    ],
             } 
               
        }
    };
const R_INCORRECT = {
    Item: {
        "name": "Subway"
    }
}

module.exports={
    correct: R_CORRECT,
    incorrect: R_INCORRECT
};