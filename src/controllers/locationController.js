const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const LocationsService = require('../services/locationService');


class LocationController {
    async addLocation(req, res) {
        //при создании poster и file записывать не нужно
        const { name, description, poster, file, max_users } = req.body;

        await LocationsService.addLocation(name, description, poster, file, max_users);

        res.status(StatusCodes.OK).json(new Response(`Location ${name} has been successfully created`));
    }
    async deleteLocation(req, res) {
        const { name } = req.body;
        await LocationsService.deleteLocation(name);

        res.status(StatusCodes.OK).json(new Response(`Your location has been successfully deleted`));
    }
    async setPoster(req, res) {
        const file = req.file;
        const locationId = req.params.id;
        const locationData = {
            poster: req.file.filename
        };

        await LocationsService.setFile(file, locationId, locationData);

        res.status(StatusCodes.OK).json(new Response("Poster added succsesful"));
    }
    async setFile(req, res) {
        const file = req.file;
        const locationId = req.params.id;
        const locationData = {
            file: req.file.filename
        };

        await LocationsService.setFile(file, locationId, locationData);

        res.status(StatusCodes.OK).json(new Response("File added succsesful"));
    }
}

module.exports = new LocationController()