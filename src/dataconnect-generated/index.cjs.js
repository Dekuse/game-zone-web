const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'web-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewStation', inputVars);
}
addNewStationRef.operationName = 'AddNewStation';
exports.addNewStationRef = addNewStationRef;

exports.addNewStation = function addNewStation(dcOrVars, vars) {
  return executeMutation(addNewStationRef(dcOrVars, vars));
};

const getGamesByGenreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamesByGenre', inputVars);
}
getGamesByGenreRef.operationName = 'GetGamesByGenre';
exports.getGamesByGenreRef = getGamesByGenreRef;

exports.getGamesByGenre = function getGamesByGenre(dcOrVars, vars) {
  return executeQuery(getGamesByGenreRef(dcOrVars, vars));
};

const updateBookingCheckInTimeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBookingCheckInTime', inputVars);
}
updateBookingCheckInTimeRef.operationName = 'UpdateBookingCheckInTime';
exports.updateBookingCheckInTimeRef = updateBookingCheckInTimeRef;

exports.updateBookingCheckInTime = function updateBookingCheckInTime(dcOrVars, vars) {
  return executeMutation(updateBookingCheckInTimeRef(dcOrVars, vars));
};

const listAvailableStationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableStations');
}
listAvailableStationsRef.operationName = 'ListAvailableStations';
exports.listAvailableStationsRef = listAvailableStationsRef;

exports.listAvailableStations = function listAvailableStations(dc) {
  return executeQuery(listAvailableStationsRef(dc));
};
