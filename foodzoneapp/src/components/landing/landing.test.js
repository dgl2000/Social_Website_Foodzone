import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Landing from './Landing';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';



describe("Validate Landing Component", () => {

    it('Test Authentication - should log in a previously registered user', async () => {
        await act(async () => {
            render(
                <Router>
                    <Landing />
                </Router>
            );
        });

        fireEvent.change(screen.getByTestId('username'), { target: { value: "Bret" } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: "Kulas Light" } });

        await waitFor(() => {
            fireEvent.click(screen.getByTestId('signin-btn'));
            expect(JSON.parse(localStorage.getItem("data"))).not.toBeNull();
        })

        let data = JSON.parse(localStorage.getItem("data") || null);
        expect(Object.keys(data).length).toBe(4);
        expect(data["username"]).toBe("Bret");
        expect(data["password"]).toBe("***********");

        expect(localStorage.getItem("BretStatus")).not.toBeNull();
    });

    it('Test Authentication - should not log in an invalid user', async () => {
        localStorage.clear();
        await act(async () => {
            render(
                <Router>
                    <Landing />
                </Router>
            );
        });

        fireEvent.change(screen.getByTestId('username'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: "2123414123" } });

        await waitFor(() => {
            fireEvent.click(screen.getByTestId('signin-btn'));
            expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
        })

        // Test the localStorage is not set
        let data = JSON.parse(localStorage.getItem("data") || null);
        expect(data).toBeNull();
        // Test error state
        expect(screen.getByTestId('alert')).toHaveTextContent('Incorrect username or password. Try again!');
    });

    it('Test Registration - should register user', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );


        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25@rice.edu" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "123456" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });


        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).not.toBeNull();

    });

    it('Test Registration - should not register with invalid username', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );


        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "1sdfa" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25@rice.edu" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "123456" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

    it('Test Registration - should not register with invalid email address', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );

        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "123456" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

    it('Test Registration - should not register with invalid phone number', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );

        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "3442-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "123456" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

    it('Test Registration - should not register with invalid zipcode', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );

        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "1235545" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "123456" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

    it('Test Registration - should not register with unmatched password', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );

        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25@rice.edu" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: "10-10-2002" } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "12345699" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

    it('Test Registration - should not register with invalid birth date', async () => {
        localStorage.clear();
        render(
            <Router>
                <Landing />
            </Router>
        );

        fireEvent.change(screen.getByTestId('registerUsername'), { target: { value: "asdfa1" } });
        fireEvent.change(screen.getByTestId('displayName'), { target: { value: "hello" } });
        fireEvent.change(screen.getByTestId('emailAddress'), { target: { value: "gd25@rice.edu" } });
        fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: "346-542-2386" } });
        fireEvent.change(screen.getByTestId('zipcode'), { target: { value: "12345" } });
        fireEvent.change(screen.getByTestId('birthDate'), { target: { value: new Date(2020, 12, 1) } });
        fireEvent.change(screen.getByTestId('registerPassword'), { target: { value: "12345699" } });
        fireEvent.change(screen.getByTestId('registerConfirmedPassword'), { target: { value: "123456" } });

        fireEvent.click(screen.getByTestId('signup-btn'));
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

});

