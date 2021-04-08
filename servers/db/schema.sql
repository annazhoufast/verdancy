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

CREATE TABLE if not exists Soil (
    SoilID INT NOT NULL auto_increment PRIMARY KEY,
    SoilName VARCHAR(250) NOT NULL
);

CREATE TABLE if not exists SunLevel (
    SunLevelID INT NOT NULL auto_increment PRIMARY KEY,
    SunLevelName VARCHAR(250) NOT NULL
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

CREATE TABLE if not exists PlantSoil (
    PlantSoilID INT NOT NULL auto_increment PRIMARY KEY,
    FOREIGN KEY (SoilID) REFERENCES Soil(SoilID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

CREATE TABLE if not exists PlantSun (
    PlantSunID INT NOT NULL auto_increment PRIMARY KEY,
    FOREIGN KEY (SunID) REFERENCES SunLevel(SunLevelID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

CREATE TABLE if not exists UserPlants (
    UserPlantID INT NOT NULL auto_increment PRIMARY KEY,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID),
    Quantity INT NOT NULL
);


