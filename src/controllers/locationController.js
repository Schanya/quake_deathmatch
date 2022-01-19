const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const LocationsService = require('../services/locationService');
const { NotAcceptableError } = require('../errors');
const fileHandler = require('../helpers/fileHandler');

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
        //вынести на уровень сервисов?
        if (!req.file) {
            throw new NotAcceptableError("Poster was not loaded");
        }

        const locationId = req.params.id;
        const locationData = {
            poster: req.file.filename
        };


        const location = await LocationsService.getLocationById(locationId);
        const oldFileName = location.file;

        if (oldFileName && oldFileName !== "no_url") {
            fileHandler.delete(oldFileName);
        }

        await LocationsService.updateLocation(locationId, locationData);

        res.json(new Response("Poster added succsesful", 200));
    }
    async setFile(req, res) {
        //вынести на уровень сервисов?
        if (!req.file) {
            throw new NotAcceptableError("File was not loaded");
        }

        const locationId = req.params.id;
        const locationData = {
            file: req.file.filename
        };


        const location = await LocationsService.getLocationById(locationId);
        const oldFileName = location.file;

        if (oldFileName && oldFileName !== "no_url") {
            fileHandler.delete(oldFileName);
        }

        await LocationsService.updateLocation(locationId, locationData);

        res.json(new Response("File added succsesful", 200));
    }
}

module.exports = new LocationController()