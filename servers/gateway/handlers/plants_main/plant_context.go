package plants_main

import "database/sql"

type Context struct {
	PlantStore *sql.DB
}

type Plant struct {
	PlantID             int64
	PlantName           string
	PlantScientificName string
	Difficulty          int
	ImageLink           string
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

// func NewHandlerContext(signingKey string, sessStore sessions.Store, userStore users.Store) *HandlerContext {
// 	return &HandlerContext{
// 		signingKey,
// 		sessStore,
// 		userStore,
// 	}
// }
