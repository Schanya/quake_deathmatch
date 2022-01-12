const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const LocationsService = require('../services/locationService');

class LocationController {
    async addLocation(req, res) {
        const { name, description, poster, file, max_users } = req.body;

        await LocationsService.addLocation(name, description, poster, file, max_users);

        res.status(StatusCodes.OK).json(new Response(`Location ${name} has been successfully created`));
    }
    async deleteLocation(req, res) {
        const { name } = req.body;
        await LocationsService.deleteLocation(name);

        res.status(StatusCodes.OK).json(new Response(`Your location has been successfully deleted`));
    }
}

module.exports = new LocationController()