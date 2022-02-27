const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const locationsService = require('../services/locationService');
const { query } = require('express');

class LocationController {
    async addLocation(req, res) {
        const { name, description, poster, file, max_users } = req.body;

        await locationsService.addLocation(name, description, poster, file, max_users);

        res.status(StatusCodes.OK).json(new Response(`Location ${name} has been successfully created`));
    }
    async deleteLocation(req, res) {
        const id = req.params.id;
        await locationsService.deleteLocation(id);

        res.status(StatusCodes.OK).json(new Response(`Your location has been successfully deleted`));
    }
    async getLocations(req, res) {
        const { page, amount } = req.query;

        const locations = await locationsService.getLocations({ page, amount });

        res.status(StatusCodes.OK).json(locations);
    }
    async endoind(req, res) {
        const yearAndMonth = req.body;

        const location = await locationsService.endpoind(yearAndMonth);

        res.status(StatusCodes.OK).json(location);
    }
}

module.exports = new LocationController()