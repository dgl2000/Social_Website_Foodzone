/*
 * Test suite for profile
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate profile functionality', () => {
    let cookie;

    it('log in user', (done) => {
        let loginUser = { username: 'testUser', password: '123' };
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            return res.json()
        }).then(() => {
            done();
        });
    });

    it('update headline for logged in user', (done) => {
        let newHeadline = { headline: "Happy" };
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
            body: JSON.stringify(newHeadline)
        }).then(res => res.json()).then(res => {
            console.log(res);
            expect(res.headline).toBe("Happy");
            done();
        });
    });

    it('return headline for logged in user', (done) => {
        fetch(url('/headline'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            console.log(res);
            expect(res.headline).toBe("Happy");
            done();
        });
    });
});