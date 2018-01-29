# Restaurant API

## Introduction

> API for an online ordering system

## Table of Contents:
* [Getting Setup](#setup)
* [The API](#TheAPI) <br />
	* [Restaurants](#restaurants)
	* [Menu (TODO)](#menu)
	* [MenuItem (TODO)](#menuitem)
* [Unit Tests](#unittests)


<a name="setup" />

## Getting Setup

> #### Clone Repository 
>  ```git clone https://github.com/nikhilesh2/Restaurant-API.git```


> #### Install node modules
> ```npm install```

> #### Replace access key id and secret key id
> 	* navigate to ``config.json`` in the root directory <br />
> 	* replace ``"accessKeyId"`` and ``"secretAccessKey"`` with your own. <br />
> 	* Access keys can be found under IAM users in the AWS console <br />


> #### Get downloadable version of DynamoDB
>	* [Download here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning) <br />
>	* Navigate to directory where it is located and run it with the following command: <br />
> ```java -jar dynamodb_local_latest/DynamoDBLocal.jar```

> #### Creating the tables
> Create the required tables with the following tables:
> ```npm run create-tables```
> Alternatively, to delete all tables run the following:
> ```npm run delete-tables```


<a name="TheAPI" />

## The API
## Restaurants

### Method Overview

| Resource | GET | POST | PUT | DELETE
| --- | --- | --- | --- | --- |
| /restaurants | Get List of Restaurants | Create new Restaurant | Not allowed (405) | Delete all Restaurants
| /restaurants/:id | Get a specific Restaurant | Not allowed (405) | Update a specific Restaurant | Delete a specific Restaurant
| /restaurants/search | Search for a specific restaurant | Not allowed (405) | Not allowed (405) | Not allowed (405)

#### ```GET /restaurants```
##### Parameters
###### NONE

##### Response Body


#### ```POST /restaurants```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | Required | The name of the restaurant |
| address | string | Required| The street address of the Restaurant |
| city | string | Required | The city the Restaurant is located in |
| zip_code | string | Required | The zip code of the Restaurant |
| country | string | Required | The country the Restaurant is located in |
| phone number | string | Required | The phone number of the Restaurant |
| email | string | Required | The email of the Restaurant |
| hours | object | Required | The hours in 24-hour time and days the restaurant is open. Restaurants will be considered closed during a specific day of the week if not provided. Below is an example of how to construct the object  |
| image_url | string | Optional | An image of the Restaurant |

##### Example of hours object
```
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
        ...
}
```
##### Response Body
```
[
    {
        "id": "072e3e40-0486-11e8-8e37-57222499c229",
        "name": "Pizza Mart",
        "location": {
            "address": "331 Fairwood Road",
            "city": "Denver",
            "state": "CO",
            "zip_code": 12527,
            "country": "United States"
        },
        "contact": {
            "phone_number": "781-322-4440",
            "email": "pizzaMart@gmail.com"
        },
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
    ...
]
```

<a name="unittests" />

## Unit Tests

> #### Type in the following command to run the unit tests
>  ```mocha```

