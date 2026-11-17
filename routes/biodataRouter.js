import express from 'express';
import { biodatas } from '../data.js';
import { getRandomElement } from '../utils.js';

const biodataRouter = express.Router();

// GET : Randomized Biodata
biodataRouter.get ('/random', (req, res, next) => {
    const randomBiodata = getRandomElement(biodatas);

    res.status(200).json({
        biodata: randomBiodata
    });
});

//GET : All Biodata or Based on Person
biodataRouter.get('/', (req, res, next) => {
    if (!req.query.person) {
        res.status(200).json({
            biodatas: biodatas
        });
    } else {
        const biodataByPerson = biodatas.filter((biodata) => biodata.person === req.query.person);

        if (biodataByPerson.length > 0) {
            res.status(200).json({
                biodatas: biodataByPerson
            });
        } else {
            res.status(200).json({
                biodatas: []
            });
        }
    }
});

// POST : Create New Biodata
biodataRouter.post('/', (req, res, next) => {
    if (req.query.person && req.query.born && req.query.blurb && req.query.knownFor) {
        const newBiodata = {
            person: req.query.person,
            born: req.query.born,
            blurb: req.query.blurb,
            knownFor: req.query.knownFor
        };
        biodatas.push(newBiodata);
        res.status(201).json({
            biodata: newBiodata
        });
    } else {
        res.status(400).send();
    }
});

// PUT : Update Biodata in the data
biodataRouter.put('/:id', (req, res, next) => {
    const index = req.params.id - 1;

    if (index >= 0 && index < biodatas.length) {
        const updatedBiodata = {
            person: req.query.person || biodatas[index].person,
            born: req.query.born || biodatas[index].born,
            blurb: req.query.blurb || biodatas[index].blurb,
            knownFor: req.query.knownFor || biodatas[index].knownFor
        };

        biodatas[index] = updatedBiodata;
        res.status(200).json({
            biodata: updatedBiodata
        });
    } else {
        res.status(404).send();
    }
});

// DELETE : Remove Biodata from the data
biodataRouter.delete('/:id', (req, res, next) => {
    const index = req.params.id - 1;

    if (index >= 0 && index < biodatas.length) {
        biodatas.splice(index, 1);
        res.status(200).json({
            message: 'Biodata deleted successfully'
        });
    } else {
        res.status(404).send();
    }
});

export default biodataRouter;