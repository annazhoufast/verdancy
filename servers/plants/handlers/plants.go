package plants

// Plants Handler
// plants db
//   - GET: "/plants/" get all plants
// filtered
//   - GET: "/plants/{filter}" get plants by filter

// Specific Plants Handler
// Individual Plant Display
// Plants in Garden
//   - GET: "/plants/{plantID}" get specific plant info
//   - POST: /plants/{plantID} adding new plant to garden

// Specific User Handler
// Plants in Garden
//   - POST: "/user/{plantID}" harvesting specific plants in garden
//   - PATCH : /user/{plantID} : edit harvested plants
//	 - DELETE: /user/{plantID} remove plant from garden

// UserHandler
//   - GET: /user/ get plants in garden
// 		SELECT UP.UserID, UP.PlantID, P.PlantName, SUM(UP.Quantity) as total, (SUM(UP.Quanity) * P.CO2PerUnit)
// 			as totCO2
// 		FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID
// 		WHERE U.UserID = ?
// 		GROUP BY P.PlantID, UP.UserID, P.PlantName, P.CO2PerUnit

// Total Emissions
//   - GET: /emissions/ get sum of total emissions for specific user
//		SELECT UP.UserID, SUM(UP.Quantity * P.CO2PerUnit) as tot
//  	FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID
//		WHERE UP.UserID = ?
