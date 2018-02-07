# Restaurant API

## Introduction

> API for an online ordering system

## Table of Contents:
* [Getting Setup](#setup)
* [The API](#TheAPI) <br />
	* [Restaurants](#restaurants)
        * [/](#restaurants-1)
        * [/:id](#restaurantsid)
        * [/search](#restaurantssearch)
        * [/:id/menus](#restaurantsidmenus)
	* [Menu](#menu)
        * [/](#menus-1)
        * [/:id](#menusid)
        * [/:id/menu-items](#menusidmenu-items)
	* [MenuItem (TODO)](#menuitem)
* [Unit Tests](#unit-tests)
* [Future work](#future-work)


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


> #### Get and run DynamoDBLocal
>	* [Download here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning) <br />
>	* Navigate to the directory where it is located and run it with the following command: <br />
> ```java -jar dynamodb_local_latest/DynamoDBLocal.jar```

> #### Setting up the database
> Create and populate the tables with the following commands: <br />
> ```npm run build-tables``` <br />
> <br />
> Here are some additional commands: <br />
>   * ```npm run delete-tables``` - deletes all tables
>   * ```npm run create-tables``` - creates the necessary tables
>   * ```npm run populate-tables``` - populates tables with sample data

> #### All Done!
> Just run ```npm run start``` to try out the API <br />
> <br />
> NOTE: Before trying out the API, it would be a good idea to run the unit tests to ensure everything is running smoothly with the following command: <br />
>  ```npm run tests```


<a name="TheAPI" />

## The API
## Restaurants

### Method Overview

| Resource | GET | POST | DELETE
| --- | --- | --- | --- |
| /restaurants | Get List of Restaurants | Create new Restaurant | Delete all Restaurants
| /restaurants/:id | Get a Restaurant | Not allowed (405) | Delete a Restaurant
| /restaurants/search | Search for restaurant(s) |  Not allowed (405) | Not allowed (405)
| /restaurants/:id/menus | Get all menus for a restaurant |  Not allowed (405) | Delete all menus for a restaurant
| (TODO) /restaurants/:id/reviews | Get all reviews for a restaurant |  Create a new review for a restaurant | Delete all reviews for a restaurant

### ```/restaurants```

### GET
##### Parameters
###### NONE
##### Response Body


### POST
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

##### Response Body
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
### DELETE
##### Parameters
###### NONE
##### Response Body



### ```/restaurants/:id```

### GET
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |
##### Response Body




### DELETE
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body


### ```/restaurants/search```
### GET
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


### ```/restaurants/:id/menus```
### GET
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the restaurant |

##### Response Body


### DELETE
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
| /menus/:id | Get a menu | Not allowed (405) | Delete a menu
| menus/:id/menu-items | Get all menu items for a specific menu |  Not allowed (405) | Delete all menu items for a specific menu

### ```/menus```

### GET
##### Parameters
###### NONE

##### Response Body


### DELETE
##### Parameters
###### NONE

##### Response Body


### ```/menus/:id```

### GET
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu |

##### Response Body


### DELETE
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu |

##### Response Body


### ```/menus/:id/menu-items```

### GET
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu |

##### Response Body


### DELETE
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu |

##### Response Body




## Menu Items

### Method Overview

| Resource | GET | POST | DELETE
| --- | --- | --- | --- |
| /menu-items | Get all menu items | Create new menu item | Delete all menu items
| /menus/:id | Get a specific menu item | Not allowed (405) | Delete a specific menu item
| menus/:id/menu-items | Get all menu items for a menu |  Not allowed (405) | Delete all menu items from a menu
| (TODO) menus/:id/reviews | Get all reviews for menu item |  Create a new review for a specific menu item | Delete all reviews for menu item

### ```/menu-items```

### GET
##### Parameters
###### NONE

##### Response Body

### POST
#### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| menu_id | string | Required | The id of the menu that the menu item will be added to|
| name | string | Required| The name of the menu item |
| price | number | Required | The price of the menu item |
| section | string | Required | The section of the menu that the menu item is listed under |
| description | string | Required | A description of the menu item |
| isVegan | boolean | Required | Whether or not the menu item is vegan |
| isVegetarian | boolean | Required| Whether or not the menu item is vegetarian |
| spicy | number | Required | A number ranging from 1 to 10 of how spicy the food is |
| allergies | array | Required | List of all potential allergens |

### DELETE
##### Parameters
###### NONE

##### Response Body


### ```/menu-items/:id```

### GET
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu item|

##### Response Body


### DELETE
##### Parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Required | The id of the menu item |

##### Response Body



## Unit Tests
> #### I have created a handful of unit tests for each of the endpoints. Make sure no other processes are running on the same port.
> #### Type in the following command to run the unit tests
>  ```npm run tests```


## Future Work


