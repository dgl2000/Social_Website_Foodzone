/*
 * Test suite for login
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate Registration and Login functionality', () => {

    let cookie;
    it('register new user', (done) => {
        let regUser = { username: 'testUser', password: '123', email: 'testUser@gmail.com', dob: '12/06/2002', zipcode: '77005' };
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('log in user', (done) => {
        let loginUser = { username: 'testUser', password: '123' };
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('log out', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            expect(res.ok).toBeTruthy();
            done();
        });
    });

});