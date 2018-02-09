
const R_CORRECT =  {
            "name": "Pizza Mart",
            "address": "83 Aspen Rd",
            "zip_code": "02067",
            "phone_number": "781-322-4440",
            "email": "pizzaMart@gmail.com",
            "image_url": 'https://google.com',
            "city": "Sharon",
            "state": "MA",
            "delivers": "yes",
            "country": "United States",
            "menus": "4,2,1,42",
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
               
    };
    const R_CORRECT_NO_URL =  {
            "name": "Pizza Mart",
            "address": "83 Aspen Rd",
            "zip_code": "02067",
            "phone_number": "781-322-4440",
            "email": "pizzaMart@gmail.com",
            "city": "Sharon",
            "state": "MA",
            "delivers": "yes",
            "country": "United States",
            "menus": "9,1,5,20,10",
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
               
    };

const restaurant_list = [
    {
        "id": "a322ce50-0860-11e8-8ccd-3b24d794a9b3",
        "name": "Thai Hana",
        "description": "Classic Thai & Japanese mains & clever sushi rolls presented in contemporary, colorful digs.",
        "image_url": " ",
        "website": "http://thaihana99.com/",
        "delivers": "yes",
        "address": "3608 Fifth Ave",
        "city": "Pittsburgh",
        "state": "PA",
        "zip_code": "15213",
        "country": "United States",
        "phone_number": "412-621-1100",
        "email": "thaihana99@gmail.com",
        "menu_ids" : ['ea33e70e-1207-499e-bbe9-b9ed2323f932', '41bdd3ce-4b21-4408-adc5-8fbee6484b36'],
        "hours": {
            "Monday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Tuesday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Tuesday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Wednesday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                }
            ],
            "Thursday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Friday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Saturday": [
                {
                    "hours_open_start": "12:00",
                    "hours_open_end": "21:00"
                }
            ]

        },

    },
    {
        "id": "a867d5e0-0860-11e8-8038-898b27a33038",
        "name": "Stack'd",
        "description": "Build your own burger",
        "image_url": " ",
        "website": "http://stack'd.com/",
        "delivers": "yes",
        "address": "200 Fifth Ave",
        "city": "Pittsburgh",
        "state": "PA",
        "zip_code": "15213",
        "country": "United States",
        "phone_number": "412-621-1100",
        "email": "stackd@gmail.com",
        "menu_ids" : [ ],
        "hours": {
            "Monday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Tuesday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Tuesday": [
                {
                    "hours_open_start": "11:00",
                    "hours_open_end": "21:00"
                }
            ],
            "Wednesday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                }
            ],
        },

    },
    {
        "id": "a86cdef0-0860-11e8-8038-898b27a33038",
        "name": "Subway",
        "image_url": " ",
        "delivers": "no",
        "address": "2930 W Colorado Ave",
        "city": "Colorado Springs",
        "state": "CO",
        "zip_code": "80904",
        "country": "United States",
        "phone_number": "719-475-7402",
        "email": "subway@gmail.com",
        "hours": {
            "Monday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                },
                {
                    "hours_open_start": "16:00",
                    "hours_open_end": "17:00"
                }
            ],
            "Wednesday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                }
            ]
        }
    },
    {
        "id": "a31cdae0-0860-11e8-8ccd-3b24d794a9b3",
        "name": "Pizza Mart",
        "image_url": "https://google.com",
        "delivers": "yes",
        "address": "831 Fairmount road",
        "city": "Peabody",
        "state": "MA",
        "zip_code": "01242",
        "country": "United States",
        "phone_number": "719-548-1991",
        "email": "pizzaMart@gmail.com",
        "hours": {
            "Monday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                },
                {
                    "hours_open_start": "16:00",
                    "hours_open_end": "17:00"
                }
            ],
            "Wednesday": [
                {
                    "hours_open_start": "10:00",
                    "hours_open_end": "13:00"
                }
            ]
        }
    }
];

const R_INCORRECT = {
    "name": "Subway"
}

module.exports={
    correct: R_CORRECT,
    correct_no_url: R_CORRECT_NO_URL,
    incorrect: R_INCORRECT,
    data: restaurant_list,
};