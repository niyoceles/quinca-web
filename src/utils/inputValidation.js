import React from 'react';

export default class Validator {
  static validateStarName(info) {
    const fields = Object.keys(info);
    let starNameError;
    for (const key of fields) {
      if (info[key].length < 3) {
        return (starNameError = (
          <ul>
            <li>Star name is required and must be more than 3 characters</li>
          </ul>
        ));
      }
    }
    return starNameError;
  }

  static validateStarCoordinates(info) {
    const fields = Object.keys(info);
    let starCoordinatesError;
    for (const key of fields) {
      if (info[key].length < 5) {
        return (starCoordinatesError = (
          <ul>
            <li>Star Coordinates are required must be more than 5 characters</li>
          </ul>
        ));
      }
    }
    return starCoordinatesError;
  }

  static validateStarIdConstellation(info) {
    const fields = Object.keys(info);
    let starIdConstellationError;
    for (const key of fields) {
      if (info[key].length < 4) {
        return (starIdConstellationError = (
          <ul>
            <li>Star Id Cconstellation are required and must be more than 4 characters</li>
          </ul>
        ));
      }
    }
    return starIdConstellationError;
  }

}