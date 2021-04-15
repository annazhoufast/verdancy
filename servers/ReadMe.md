# Hi This is the Server ReadMe File

| Priority | Description |
|----------|-------------|
|P0| As a user, I want to be able to view all the vegetables in the database. |
|P1| As a user, I want to be able to add specific vegetables to my garden. |
|P2| As a user, I want to be able to view the detailed information about a plant. |
|P3| As a user, I want to view my total emissions savings number.|
|P4| As a user, I want to view emissions totals for each specific plant in my garden. |
|P5| As a user, I want to update my total number of plants harvested. |
|P6| As a user, I want to see all my specific plant emissions in one concise visualization. |
|P7| As a user, I want to edit my total number of harvested vegetables for each specific plant. 
|P8| As a user, I want to be able to filter throught the vegetables by different categories. |


## Endpoints
* `GET`: `/plants/`: Gets all the plants in the database to display
    * Inputs: None
    * Outputs: `application/json`
    * Header:
        <!-- * Authentication: bearer token -->
        * N/A
    * Response Codes:
        * `200`: `application/json` success
        * `405`: Wrong Method
* `GET`: `/plants/{filter}`: Gets all the plants based off of the given filter
    * Inputs: Filter ID (int)
    * Outputs: `application/json`
    * Header: 
        * Authentication: bearer token
        * Content-Type: `application/json`
    * Response Codes:
        * `200`: `application/json` success
        * `400`: Filter is not applicable
        * `405`: Wrong Method
* `GET`: `/plants/{plantID}`: get specific plant information
    * Inputs: Plant ID (int)
    * Outputs: `application/json`
    * Header: 
        * Content-Type: `application json`
    * Response Codes:
        * `200`: `application/json`
        * `400`: Plant ID does not exist
        * `405`: Wrong Method
* `POST`: `/plants/{plantID}`: adding new plant to garden
    * Inputs: PlantID, UserID
    * Outputs: `text`: successful add
    * Header:
        * Authentication: bearer token
        * Content-Type: `application/json`
    * Response Codes:
        * `201`: success
        * `401`: User not authenticated
        * `405`: Wrong Method
        * `415`: Wrong Content Header

* `PATCH`: `/plants/{plantID}`: edit harvested plants
    * Inputs: PlantID, UserID
    * Outputs: `text`: successful edits made
    * Header:
        * Authentication: bearer token
        * Content-Type `application/json`
    * Response Codes:
        * `201`: Success
        * `400`: Plant ID does not exist
        * `401`: User not authenticated
        * `405`: Wrong Method

* `GET`: `/emissions/`: get sum of total emissions for specific user
    * Inputs: UserID
    * Outputs: `application/json`
    * Header:
        * Authentication: bearer token
    * Response Codes:
        * `200`: `application/json` success
        * `401`: User not authenticated
        * `405`: Wrong Method
* `POST`: `/user/{plantID}`: harvesting specific plants in garden
    * Inputs: PlantID, UserID
    * Outputs: `application/json`
    * Header:
        * Authentication: bearer token
        * Content-Type: `application/json`
    * Response Codes:
        * `200`: `application/json` success
        * `400`: PlantID does not exist
        * `401`: User not authenticated
        * `405`: Wrong Method
* `DELETE`: `/user/{plantID}`: remove plant from garden
    * Inputs: PlantID, UserID
    * Outputs: `text`: successful delete
    * Header:
        * Authentication: bearer token
        * Content-Type: `application/json`
    * Response Codes:
        * `201`: Successful delete
        * `400`: PlantID does not exist
        * `401`: User not authenticated
        * `405`: Wrong Method
* `GET`: `/user/`: get plants in garden
    * Inputs: UserID
    * Output: `application/json`
    * Header:
        * Authentication: bearer token
        * Content-Type: `application/json`
    * Response Codes:
        * `200`: `application/json` success
        * `401`: User not authenticated
        * `405`: Wrong Method



