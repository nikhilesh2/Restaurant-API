# Restaurant API

## Introduction

> API for an online ordering system

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


## The API
## Restaurants
* ID 
* name (required)
* address (required)
* contact (required)
* hours (required)
* menu_ids
* rating
### Method Overview

| Resource | GET | POST | PUT | DELETE
| --- | --- | --- | --- | --- |
| /restaurants | Get List of Restaurants | Create new Restaurant | Not allowed (405) | Delete all Restaurants
| /restaurants/:id | Get a specific Restaurant | Not allowed (405) | Update a specific Restaurant | Delete a specific Restaurant
| /restaurants/search | Search for a specific restaurant | Not allowed (405) | Not allowed (405) | Not allowed (405)

#### ```GET /restaurants```
##### Parameters
###### None


#### ```POST /restaurants```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| name | string| Required. The name of the restaurant |
| street_address | string | Required. The street address of the Restaurant |
| postal_code | string | Required. The postal code of the Restaurant |
| phone number | string | Required. The phone number of the Restaurant |
| email | string | Required. The email of the Restaurant |
| hours | object | Required. The hours and days the restaurant is open. Restaurants will be considered closed during a specific day of the week if not provided. ```"hours": {
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
             }```  |




