import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewStationData {
  station_insert: Station_Key;
}

export interface AddNewStationVariables {
  capacity: number;
  description?: string | null;
  hourlyRate: number;
  name: string;
  stationType: string;
  status?: string | null;
}

export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

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

export interface GetGamesByGenreVariables {
  genre: string;
}

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

export interface StationGame_Key {
  stationId: UUIDString;
  gameId: UUIDString;
  __typename?: 'StationGame_Key';
}

export interface Station_Key {
  id: UUIDString;
  __typename?: 'Station_Key';
}

export interface UpdateBookingCheckInTimeData {
  booking_update?: Booking_Key | null;
}

export interface UpdateBookingCheckInTimeVariables {
  id: UUIDString;
  actualCheckInTime?: TimestampString | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewStationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewStationVariables): MutationRef<AddNewStationData, AddNewStationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewStationVariables): MutationRef<AddNewStationData, AddNewStationVariables>;
  operationName: string;
}
export const addNewStationRef: AddNewStationRef;

export function addNewStation(vars: AddNewStationVariables): MutationPromise<AddNewStationData, AddNewStationVariables>;
export function addNewStation(dc: DataConnect, vars: AddNewStationVariables): MutationPromise<AddNewStationData, AddNewStationVariables>;

interface GetGamesByGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamesByGenreVariables): QueryRef<GetGamesByGenreData, GetGamesByGenreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGamesByGenreVariables): QueryRef<GetGamesByGenreData, GetGamesByGenreVariables>;
  operationName: string;
}
export const getGamesByGenreRef: GetGamesByGenreRef;

export function getGamesByGenre(vars: GetGamesByGenreVariables): QueryPromise<GetGamesByGenreData, GetGamesByGenreVariables>;
export function getGamesByGenre(dc: DataConnect, vars: GetGamesByGenreVariables): QueryPromise<GetGamesByGenreData, GetGamesByGenreVariables>;

interface UpdateBookingCheckInTimeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookingCheckInTimeVariables): MutationRef<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBookingCheckInTimeVariables): MutationRef<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;
  operationName: string;
}
export const updateBookingCheckInTimeRef: UpdateBookingCheckInTimeRef;

export function updateBookingCheckInTime(vars: UpdateBookingCheckInTimeVariables): MutationPromise<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;
export function updateBookingCheckInTime(dc: DataConnect, vars: UpdateBookingCheckInTimeVariables): MutationPromise<UpdateBookingCheckInTimeData, UpdateBookingCheckInTimeVariables>;

interface ListAvailableStationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableStationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableStationsData, undefined>;
  operationName: string;
}
export const listAvailableStationsRef: ListAvailableStationsRef;

export function listAvailableStations(): QueryPromise<ListAvailableStationsData, undefined>;
export function listAvailableStations(dc: DataConnect): QueryPromise<ListAvailableStationsData, undefined>;

