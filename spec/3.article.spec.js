/*
 * Test suite for article
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate article functionality', () => {
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

    it('post articles', (done) => {
        let articleLen;
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            articleLen = res.article.length;
        });

        let article = { text: "Hello, this is a test article!" };
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
            body: JSON.stringify(article)
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res instanceof Array) {
                expect(res.author).toEqual('testUser');
                expect(res.test).toEqual('Hello, this is a test article!');
                expect(res.length).toBe(articleLen + 1);
            }
            done();
        });
    });

    it('returns articles of logged in user', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            expect(res.article.length).toBeGreaterThan(0);
            done();
        });
    });

    it('returns articles with given id', (done) => {
        fetch(url('/articles/0'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            expect(res.article[0].text).toBe('Hello, this is a test article!');
            done();
        });
    });

    it('returns articles with given username', (done) => {
        fetch(url('/articles/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            expect(res.article.length).toBeGreaterThan(0);
            expect(res.article[0].author).toBe('testUser');
            done();
        });
    });
});