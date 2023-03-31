const { response } = require('express');
var Userdb = require('../model/model.js');

// create and save new user

exports.create = (request, response) => {
    if (!request.body) {
        response.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    const user = new Userdb({
        name: request.body.name,
        email: request.body.email,
        gender: request.body.gender,
        status: request.body.status
    });

    user
        .save(user)
        .then(data => {
            // response.send(data)
            response.redirect('/add-user');
        })
        .catch(err => {
            response.status(500).send({
                message: err.message || "some error occured while creating the new user"
            });
        });
}

//read user

exports.find = (request, response) => {
    const id = request.query.id
    if (id) {
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    response.status(404).send({
                        message: "Cannot find the user with id " + id
                    })
                }
                else {
                    response.send(data)
                }
            })
            .catch(err => {
                response.status(500).send({
                    message: `Error finding user with ${id}`
                });
            })
    }
    else {
        Userdb.find()
            .then(user => {
                response.send(user)
            })
            .catch(err => {
                response.status(500).send({ message: err.message || "Error occured while retrieving the data" })
            })
    }

}

// update user

exports.update = (request, response) => {
    if (!request.body) {
        return response
            .status(400)
            .send({ message: "Data to be updated cannot be empty" })
    }
    const id = request.params.id;
    Userdb.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                response.status(404).send({ message: `cannot update the user with ${id}. Maybe not found` })
            } else {
                response.send(data)
            }
        })
        .catch(err => {
            response.status(500).send({ message: "Error Update user information" })
        })
}
//delete user

exports.delete = (request, response) => {
    const id = request.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                response.status(404).send({ message: `cannot delete user with ${id} Maybe something is wrong` })
            }
            else {
                response.send({
                    message: "User was deleted successfully"
                })
            }
        })
        .catch(err => {
            response.send(500).send({
                message: "Couldnot delete user with id" + id
            });
        });
}