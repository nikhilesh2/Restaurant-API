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
### Methods

| Resource | GET | POST | PUT | DELETE
| --- | --- | --- | --- | --- |
| /restaurants | Get List of Restaurants | Create new Restaurant | Not allowed (405) | Delete all Restaurants
| /restaurants/:id | Get a specific Restaurant | Not allowed (405) | Update a specific Restaurant | Delete a specific Restaurant
| /restaurants/search | Search for a specific restaurant | Not allowed (405) | Not allowed (405) | Not allowed (405)


