const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const LocationsService = require('../services/locationService');

class LocationController {
    async addLocation(req, res) {
        const { name, description, poster, file, maxUsers } = req.body;

        await LocationsService.addLocation(name, description, poster, file, maxUsers);

        res.status(StatusCodes.OK).json(new Response(`Location ${name} has been successfully created`));
    }
    // async deleteLocation(req, res) {
    //     const locationId = req.user.id;
    //     await deleteService.deleteUser(userId);

    //     res.status(StatusCodes.OK).json(new Response(`Your account has been successfully deleted`));
    // }
}

module.exports = new LocationController()