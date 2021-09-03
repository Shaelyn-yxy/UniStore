var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');

const users = require('../../models/usersModel');


describe('addUser', function() {

    context('check visiting login page', function() {
        it('login page', async function(){
            const res = await supertest(app)
                .get('/users/login');
            expect(res.statusCode).to.equal(200);
            expect(res.type).to.equal('text/html');
        })
    });

    context('check if use could register successfully', function() {
        it('register page', async function(){
            let checkUser = {
                firstName: "matt",
                lastName: "ll",
                email: "matt@student.unimelb.edu.au",
                password: "123456"
            };
            const res = await supertest(app)
                .post('/users/register')
                .send(checkUser);
            expect(res.statusCode).to.equal(302);
            expect(res.type).to.equal('text/plain');
        })
    })
});

module.exports = app;
