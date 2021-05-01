package plants

import "database/sql"

type Context struct {
	UserID     int64
	PlantStore *sql.DB
}

type User struct {
	UserID    int64
	FirstName string
	LastName  string
	Plants    []UserPlants
}

type Plant struct {
	PlantID             int64
	PlantName           string
	PlantScientificName string
	Difficulty          int
	ImageLink           string
}

type UserPlants struct {
	UserID     int64
	PlantID    int64
	PlantName  string
	Total      int
	TotalCO2   int
	ImageLink  string
	CO2PerUnit int
}

type Quantity struct {
	Quantity int
}

type Emissions struct {
	UserID    int64
	Emissions int
}

type EntirePlant struct {
	PlantID             int64
	PlantName           string
	PlantScientificName string
	Difficulty          int
	Height              int
	ZoneStart           int
	ZoneEnd             int
	CO2PerUnit          int
	UnitWeight          int
	UnitDescr           string
	Descr               string
	ImageLink           string
	Soil                string
	Sun                 string
	Considerations      string
	WhenToPlant         string
	GrowFromSeeds       string
	Transplanting       string
	Spacing             string
	Watering            string
	Feeding             string
	Other               string
	Harvesting          string
	Storage             string
}
