# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetGamesByGenre*](#getgamesbygenre)
  - [*ListAvailableStations*](#listavailablestations)
- [**Mutations**](#mutations)
  - [*AddNewStation*](#addnewstation)
  - [*UpdateBookingCheckInTime*](#updatebookingcheckintime)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetGamesByGenre
You can execute the `GetGamesByGenre` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGamesByGenre(vars: GetGamesByGenreVariables): QueryPromise<GetGamesByGenreData, GetGamesByGenreVariables>;

interface GetGamesByGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamesByGenreVariables): QueryRef<GetGamesByGenreData, GetGamesByGenreVariables>;
}
export const getGamesByGenreRef: GetGamesByGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGamesByGenre(dc: DataConnect, vars: GetGamesByGenreVariables): QueryPromise<GetGamesByGenreData, GetGamesByGenreVariables>;

interface GetGamesByGenreRef {
  ...
  (dc: DataConnect, vars: GetGamesByGenreVariables): QueryRef<GetGamesByGenreData, GetGamesByGenreVariables>;
}
export const getGamesByGenreRef: GetGamesByGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGamesByGenreRef:
```typescript
const name = getGamesByGenreRef.operationName;
console.log(name);
```

### Variables
The `GetGamesByGenre` query requires an argument of type `GetGamesByGenreVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGamesByGenreVariables {
  genre: string;
}
```
### Return Type
Recall that executing the `GetGamesByGenre` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGamesByGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGamesByGenreData {
  games: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    platform: string;
    releaseYear?: number | null;
  } & Game_Key)[];
}
```
### Using `GetGamesByGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGamesByGenre, GetGamesByGenreVariables } from '@dataconnect/generated';

// The `GetGamesByGenre` query requires an argument of type `GetGamesByGenreVariables`:
const getGamesByGenreVars: GetGamesByGenreVariables = {
  genre: ..., 
};

// Call the `getGamesByGenre()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGamesByGenre(getGamesByGenreVars);
// Variables can be defined inline as well.
const { data } = await getGamesByGenre({ genre: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGamesByGenre(dataConnect, getGamesByGenreVars);

console.log(data.games);

// Or, you can use the `Promise` API.
getGamesByGenre(getGamesByGenreVars).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

### Using `GetGamesByGenre`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGamesByGenreRef, GetGamesByGenreVariables } from '@dataconnect/generated';

// The `GetGamesByGenre` query requires an argument of type `GetGamesByGenreVariables`:
const getGamesByGenreVars: GetGamesByGenreVariables = {
  genre: ..., 
};

// Call the `getGamesByGenreRef()` function to get a reference to the query.
const ref = getGamesByGenreRef(getGamesByGenreVars);
// Variables can be defined inline as well.
const ref = getGamesByGenreRef({ genre: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGamesByGenreRef(dataConnect, getGamesByGenreVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.games);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

## ListAvailableStations
You can execute the `ListAvailableStations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableStations(): QueryPromise<ListAvailableStationsData, undefined>;

interface ListAvailableStationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableStationsData, undefined>;
}
export const listAvailableStationsRef: ListAvailableStationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableStations(dc: DataConnect): QueryPromise<ListAvailableStationsData, undefined>;

interface ListAvailableStationsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableStationsData, undefined>;
}
export const listAvailableStationsRef: ListAvailableStationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableStationsRef:
```typescript
const name = listAvailableStationsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableStations` query has no variables.
### Return Type
Recall that executing the `ListAvailableStations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableStationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableStationsData {
  stations: ({
    id: UUIDString;
    name: string;
    capacity: number;
    description?: string | null;
    hourlyRate?: number | null;
    stationType: string;
  } & Station_Key)[];
}
```
### Using `ListAvailableStations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableStations } from '@dataconnect/generated';


// Call the `listAvailableStations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableStations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableStations(dataConnect);

console.log(data.stations);

// Or, you can use the `Promise` API.
listAvailableStations().then((response) => {
  const data = response.data;
  console.log(data.stations);
});
```

### Using `ListAvailableStations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableStationsRef } from '@dataconnect/generated';


// Call the `listAvailableStationsRef()` function to get a reference to the query.
const ref = listAvailableStationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableStationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.stations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.stations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewStation
You can execute the `AddNewStation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewStation(vars: AddNewStationVariables): MutationPromise<AddNewStationData, AddNewStationVariables>;

interface AddNewStationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewStationVariables): MutationRef<AddNewStationData, AddNewStationVariables>;
}
export const addNewStationRef: AddNewStationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewStation(dc: DataConnect, vars: AddNewStationVariables): MutationPromise<AddNewStationData, AddNewStationVariables>;

interface AddNewStationRef {
  ...
  (dc: DataConnect, vars: AddNewStationVariables): MutationRef<AddNewStationData, AddNewStationVariables>;
}
export const addNewStationRef: AddNewStationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewStationRef:
```typescript
const name = addNewStationRef.operationName;
console.log(name);
```

### Variables
The `AddNewStation` mutation requires an argument of type `AddNewStationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewStationVariables {
  capacity: number;
  description?: string | null;
  hourlyRate: number;
  name: string;
  stationType: string;
  status?: string | null;
}
```
### Return Type
Recall that executing the `AddNewStation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewStationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewStationData {
  station_insert: Station_Key;
}
```
### Using `AddNewStation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewStation, AddNewStationVariables } from '@dataconnect/generated';

// The `AddNewStation` mutation requires an argument of type `AddNewStationVariables`:
const addNewStationVars: AddNewStationVariables = {
  capacity: ..., 
  description: ..., // optional
  hourlyRate: ..., 
  name: ..., 
  stationType: ..., 
  status: ..., // optional
};

// Call the `addNewStation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewStation(addNewStationVars);
// Variables can be defined inline as well.
const { data } = await addNewStation({ capacity: ..., description: ..., hourlyRate: ..., name: ..., stationType: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewStation(dataConnect, addNewStationVars);

console.log(data.station_insert);

// Or, you can use the `Promise` API.
addNewStation(addNewStationVars).then((response) => {
  const data = response.data;
  console.log(data.station_insert);
});
```

### Using `AddNewStation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewStationRef, AddNewStationVariables } from '@dataconnect/generated';

// The `AddNewStation` mutation requires an argument of type `AddNewStationVariables`:
const addNewStationVars: AddNewStationVariables = {
  capacity: ..., 
  description: ..., // optional
  hourlyRate: ..., 
  name: ..., 
  stationType: ..., 
  status: ..., // optional
};

// Call the `addNewStationRef()` function to get a reference to the mutation.
const ref = addNewStationRef(addNewStationVars);
// Variables can be defined inline as well.
const ref = addNewStationRef({ capacity: ..., description: ..., hourlyRate: ..., name: ..., stationType: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewStationRef(dataConnect, addNewStationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.station_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.station_insert);
});
```

## UpdateBookingCheckInTime
You can execute the `UpdateBookingCheckInTime` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateBookingCheckInTime(vars: UpdateBookingCheckInTimeVariables): MutationPromise<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;

interface UpdateBookingCheckInTimeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookingCheckInTimeVariables): MutationRef<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;
}
export const updateBookingCheckInTimeRef: UpdateBookingCheckInTimeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBookingCheckInTime(dc: DataConnect, vars: UpdateBookingCheckInTimeVariables): MutationPromise<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;

interface UpdateBookingCheckInTimeRef {
  ...
  (dc: DataConnect, vars: UpdateBookingCheckInTimeVariables): MutationRef<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;
}
export const updateBookingCheckInTimeRef: UpdateBookingCheckInTimeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBookingCheckInTimeRef:
```typescript
const name = updateBookingCheckInTimeRef.operationName;
console.log(name);
```

### Variables
The `UpdateBookingCheckInTime` mutation requires an argument of type `UpdateBookingCheckInTimeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBookingCheckInTimeVariables {
  id: UUIDString;
  actualCheckInTime?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateBookingCheckInTime` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBookingCheckInTimeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBookingCheckInTimeData {
  booking_update?: Booking_Key | null;
}
```
### Using `UpdateBookingCheckInTime`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBookingCheckInTime, UpdateBookingCheckInTimeVariables } from '@dataconnect/generated';

// The `UpdateBookingCheckInTime` mutation requires an argument of type `UpdateBookingCheckInTimeVariables`:
const updateBookingCheckInTimeVars: UpdateBookingCheckInTimeVariables = {
  id: ..., 
  actualCheckInTime: ..., // optional
};

// Call the `updateBookingCheckInTime()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBookingCheckInTime(updateBookingCheckInTimeVars);
// Variables can be defined inline as well.
const { data } = await updateBookingCheckInTime({ id: ..., actualCheckInTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBookingCheckInTime(dataConnect, updateBookingCheckInTimeVars);

console.log(data.booking_update);

// Or, you can use the `Promise` API.
updateBookingCheckInTime(updateBookingCheckInTimeVars).then((response) => {
  const data = response.data;
  console.log(data.booking_update);
});
```

### Using `UpdateBookingCheckInTime`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBookingCheckInTimeRef, UpdateBookingCheckInTimeVariables } from '@dataconnect/generated';

// The `UpdateBookingCheckInTime` mutation requires an argument of type `UpdateBookingCheckInTimeVariables`:
const updateBookingCheckInTimeVars: UpdateBookingCheckInTimeVariables = {
  id: ..., 
  actualCheckInTime: ..., // optional
};

// Call the `updateBookingCheckInTimeRef()` function to get a reference to the mutation.
const ref = updateBookingCheckInTimeRef(updateBookingCheckInTimeVars);
// Variables can be defined inline as well.
const ref = updateBookingCheckInTimeRef({ id: ..., actualCheckInTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBookingCheckInTimeRef(dataConnect, updateBookingCheckInTimeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.booking_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.booking_update);
});
```

