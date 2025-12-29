# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewStation, getGamesByGenre, updateBookingCheckInTime, listAvailableStations } from '@dataconnect/generated';


// Operation AddNewStation:  For variables, look at type AddNewStationVars in ../index.d.ts
const { data } = await AddNewStation(dataConnect, addNewStationVars);

// Operation GetGamesByGenre:  For variables, look at type GetGamesByGenreVars in ../index.d.ts
const { data } = await GetGamesByGenre(dataConnect, getGamesByGenreVars);

// Operation UpdateBookingCheckInTime:  For variables, look at type UpdateBookingCheckInTimeVars in ../index.d.ts
const { data } = await UpdateBookingCheckInTime(dataConnect, updateBookingCheckInTimeVars);

// Operation ListAvailableStations: 
const { data } = await ListAvailableStations(dataConnect);


```