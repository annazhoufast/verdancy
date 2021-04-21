-- CREATE DATABASE verdancydb;

USE verdancydb;

CREATE TABLE if not exists Users (
    UserID INT NOT NULL auto_increment PRIMARY KEY,
    Email VARCHAR(254) NOT NULL UNIQUE,
    UserFname VARCHAR(50) NOT NULL,
    UserLname VARCHAR(50) NOT NULL,
    PassHash BINARY(128) NOT NULL
);

CREATE TABLE if not exists SignIns (
    SignInID INT NOT NULL auto_increment PRIMARY KEY,
    UserID INT NOT NULL,
    SignInDate DATETIME NOT NULL,
    IPAddress VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE if not exists Plants (
    PlantID INT NOT NULL auto_increment PRIMARY KEY,
    PlantName VARCHAR(50) NOT NULL,
    PlantScientificName VARCHAR(200) NOT NULL,
    Difficulty INT NOT NULL,
    Height INT NOT NULL,
    ZoneStart INT NOT NULL,
    ZoneEnd INT NOT NULL,
    CO2PerUnit INT NOT NULL,
    UnitWeight INT NOT NULL,
    UnitDescr VARCHAR(200) NOT NULL,
    Descr VARCHAR(500) NOT NULL,
    ImageLink VARCHAR(250) NOT NULL,
    Soil VARCHAR(250) NOT NULL,
    Sun VARCHAR(250) NOT NULL,
    Considerations VARCHAR(500),
    WhenToPlant VARCHAR(500),
    GrowFromSeeds VARCHAR(500),
    Transplanting VARCHAR(500),
    Spacing VARCHAR(300),
    Watering VARCHAR(300),
    Feeding VARCHAR(300),
    Other VARCHAR(500),
    Harvesting VARCHAR(500),
    Storage VARCHAR(500)
);

CREATE TABLE if not exists UserPlants (
    UserPlantID INT NOT NULL auto_increment PRIMARY KEY,
    UserID INT NOT NULL,
    PlantID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID),
    Quantity INT NOT NULL
);

LOAD DATA LOCAL INFILE'/home/annaz4/data/veggies.csv' INTO TABLE Plants FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS(PlantName, CO2PerUnit, UnitWeight, UnitDescr, PlantScientificName, Height, ZoneStart, ZoneEnd, Difficulty, Descr, Sun, Soil, Considerations, WhenToPlant, GrowFromSeeds, Transplanting, Spacing, Watering, Feeding, Other, Harvesting, Storage);

INSERT INTO Plants(
    PlantName,
    PlantScientificName,
    Difficulty,
    Height,
    ZoneStart,
    ZoneEnd,
    CO2PerUnit,
    UnitWeight,
    UnitDescr,
    Descr,
    ImageLink,
    Soil,
    Sun
) VALUES(
    'Tomatoes',
    'Solanum lycopersicum',
    4,
    24,
    3,
    10,
    357,
    123,
    '1 medium tomato',
    'Tomatoes are America‚Äôs favorite garden vegetable. (Yes, we technically eat the fruit of the tomato plant, but its used as a vegetable in eating and cooking and, thus, usually categorized in vegetables.) This vine plant is fairly easy to grow and will produce a bumper crop with proper care. Its uses are versatile, however, tomatoes are susceptible to a range of pests and diseases.',
    'https://raw.githubusercontent.com/annazhoufast/plantastic/main/data/imgs/tomatoe.png?token=ALLXA2ZUZ2XQN2Q3QZXDUNLAQ6SS6',
    'Loamy, Acidic pH',
    'Full Sun(at least 6 hours a day)'
);