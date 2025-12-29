import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'web-app',
  location: 'us-east4'
};

export const addNewStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewStation', inputVars);
}
addNewStationRef.operationName = 'AddNewStation';

export function addNewStation(dcOrVars, vars) {
  return executeMutation(addNewStationRef(dcOrVars, vars));
}

export const getGamesByGenreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamesByGenre', inputVars);
}
getGamesByGenreRef.operationName = 'GetGamesByGenre';

export function getGamesByGenre(dcOrVars, vars) {
  return executeQuery(getGamesByGenreRef(dcOrVars, vars));
}

export const updateBookingCheckInTimeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBookingCheckInTime', inputVars);
}
updateBookingCheckInTimeRef.operationName = 'UpdateBookingCheckInTime';

export function updateBookingCheckInTime(dcOrVars, vars) {
  return executeMutation(updateBookingCheckInTimeRef(dcOrVars, vars));
}

export const listAvailableStationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableStations');
}
listAvailableStationsRef.operationName = 'ListAvailableStations';

export function listAvailableStations(dc) {
  return executeQuery(listAvailableStationsRef(dc));
}

