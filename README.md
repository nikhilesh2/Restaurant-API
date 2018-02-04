# Restaurant API

## Introduction

> API for an online ordering system

## Table of Contents:
* [Getting Setup](#setup)
* [The API](#TheAPI) <br />
* [Unit Tests](#unit-tests)
	* [Restaurants](#restaurants)
        * [/](#get-restaurants)
        * [/:id](#get-restaurantsid)
        * [/search](#get-restaurantssearch)
        * [/:id/menus](#get-restaurantsidmenus)
	* [Menu (TODO)](#menu)
	* [MenuItem (TODO)](#menuitem)


<a name="setup" />

## Getting Setup

> #### Clone Repository 
>  ```git clone https://github.com/nikhilesh2/Restaurant-API.git```


> #### Install node modules
> ```npm install```

> #### (OPTIONAL) Replace access key id and secret key id
> 	* navigate to ``config.json`` in the root directory <br />
> 	* replace ``"accessKeyId"`` and ``"secretAccessKey"`` with your own. <br />
> 	* Access keys can be found under IAM users in the AWS console <br />


> #### Get downloadable version of DynamoDB
>	* [Download here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning) <br />
>	* Navigate to directory where it is located and run it with the following command: <br />
> ```java -jar dynamodb_local_latest/DynamoDBLocal.jar```

> #### Creating the tables
> Create the required tables with the following command: <br />
> ```npm run create-tables``` <br />
> <br />
> Alternatively, to delete all tables run the following: <br />
> ```npm run delete-tables```

> #### All Done!
> Just run ```npm run start``` to try out the API

## Unit Tests
> #### I have created a handful of unit tests for each of the endpoints. Make sure no other processes are running on the same port.
> #### Type in the following command to run the unit tests
>  ```npm run tests```


<a name="TheAPI" />

## The API
## Restaurants

### Method Overview

| Resource | GET | POST | DELETE
| --- | --- | --- | --- |
| /restaurants | Get List of Restaurants | Create new Restaurant | Delete all Restaurants
| /restaurants/:id | Get a specific Restaurant | Not allowed (405) | Delete a specific Restaurant
| /restaurants/search | Search for a specific restaurant |  Not allowed (405) | Not allowed (405)
| /restaurants/:id/menus | Get all menus for a restaurant |  Not allowed (405) | Delete all menus for a restaurant

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


#### ```DELETE /restaurants```
##### Parameters
###### NONE

##### Response Body
```
[
    {
        "statusCode": 200,
        "message": "Deleted item successfully",
        "Item": {
            "country": "United States",
            "website": "http://thaihana99.com/",
            "hours": {
                "Tuesday": [
                    {
                        "hours_open_start": "11:00",
                        "hours_open_end": "21:00"
                    }
                ],
                "Monday": [
                    {
                        "hours_open_start": "11:00",
                        "hours_open_end": "21:00"
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
                "Wednesday": [
                    {
                        "hours_open_start": "10:00",
                        "hours_open_end": "13:00"
                    }
                ],
                "Saturday": [
                    {
                        "hours_open_start": "12:00",
                        "hours_open_end": "21:00"
                    }
                ]
            },
            "address": "3608 Fifth Ave",
            "city": "Pittsburgh",
            "image_url": " ",
            "description": "Classic Thai & Japanese mains & clever sushi rolls presented in contemporary, colorful digs.",
            "zip_code": "15213",
            "menu_ids": [
                "ea33e70e-1207-499e-bbe9-b9ed2323f932",
                "41bdd3ce-4b21-4408-adc5-8fbee6484b36"
            ],
            "name": "Thai Hana",
            "phone_number": "412-621-1100",
            "id": "a322ce50-0860-11e8-8ccd-3b24d794a9b3",
            "delivers": "yes",
            "state": "PA",
            "email": "thaihana99@gmail.com"
        }
    },
    {
        "statusCode": 200,
        "message": "Deleted item successfully",
        "Item": {
            "country": "United States",
            "website": "http://stack'd.com/",
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
                "Wednesday": [
                    {
                        "hours_open_start": "10:00",
                        "hours_open_end": "13:00"
                    }
                ]
            },
            "address": "200 Fifth Ave",
            "city": "Pittsburgh",
            "image_url": " ",
            "description": "Build your own burger",
            "zip_code": "15213",
            "menu_ids": [],
            "name": "Stack'd",
            "phone_number": "412-621-1100",
            "id": "a867d5e0-0860-11e8-8038-898b27a33038",
            "delivers": "yes",
            "state": "PA",
            "email": "stackd@gmail.com"
        }
    }
]
```

#### ```GET /restaurants/:id```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body

#### ```DELETE /restaurants/:id```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body


#### ```GET /restaurants/search```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | Optional | The name of the restaurant |
| address | string | Optional| The street address of the Restaurant |
| city | string | Optional | The city the Restaurant is located in |
| zip_code | string | Optional | The zip code of the Restaurant |
| country | string | Optional | The country the Restaurant is located in |
| phone number | string | Optional | The phone number of the Restaurant |
| email | string | Optional| The email of the Restaurant |
| image_url | string | Optional | An image of the Restaurant |

##### Response Body


#### ```GET /restaurants/:id/menus```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body



#### ```DELETE /restaurants/:id/menus```
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body



## Menus

### Method Overview

| Resource | GET | POST | DELETE
| --- | --- | --- | --- |
| /menus | Get all menus | Create new menu | Delete all menus
| /menus/:id | Get a specific menu | Not allowed (405) | Delete a specific menu
| menus/:id/menu-items | Get all menu items for a specific menu |  Not allowed (405) | Delete all menu items for a specific menu


