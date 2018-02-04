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
> #### I have created a handful of unit tests for each of the endpoints. Before trying out the API yourself, it would be a good idea to run the unit tests to ensure everything is working smoothly. Make sure no other processes are running on the same port.
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


