import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from "./Profile";


describe("Validate Profile Component", () => {
    localStorage.setItem('data', JSON.stringify({
        username: 'Bret',
        password: '***********',
        id: 1,
        follow: {
            follow: ['Antonette', 'Samantha', 'Karianne'],
            followId: [1, 2, 3],
            followStatus: [
                'Proactive didactic contingency',
                'Face to face bifurcated interface',
                'Multi-tiered zero tolerance productivity'
            ]
        }
    }))

    localStorage.setItem('BretStatus', JSON.stringify("Multi-layered client-server neural-net"));

    it('Test Profile - should fetch the logged in user profile username', async () => {

        render(
            <Router>
                <Profile />
            </Router>
        );
        expect(screen.getByTestId("profileUsername").textContent).toBe("Bret");
    });

    it('Test Profile - test update of email on profile', async () => {

        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(screen.getByTestId("profileEmail").textContent).toBe("goodScore@pls.com");
        fireEvent.change(screen.getByTestId('inputProfileEmailAddress'), { target: { value: "thankyou@gmail.com" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profileEmail").textContent).toBe("thankyou@gmail.com");
    });

    it('Test Profile - test update of zipcode on profile', async () => {

        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(screen.getByTestId("profileZipcode").textContent).toBe("77005");
        fireEvent.change(screen.getByTestId('inputProfileZipcode'), { target: { value: "770056" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profileZipcode").textContent).toBe("77005");

        fireEvent.change(screen.getByTestId('inputProfileZipcode'), { target: { value: "12345" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profileZipcode").textContent).toBe("12345");
    });

    it('Test Profile - test update of phone number on profile', async () => {

        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(screen.getByTestId("profilePhone").textContent).toBe("346-542-2386");
        fireEvent.change(screen.getByTestId('inputProfilePhoneNumber'), { target: { value: "346-542-23868" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profilePhone").textContent).toBe("346-542-2386");

        fireEvent.change(screen.getByTestId('inputProfilePhoneNumber'), { target: { value: "123-542-2386" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profilePhone").textContent).toBe("123-542-2386");
    });

    it('Test Profile - test update of password on profile', async () => {

        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(screen.getByTestId("profilePassword").textContent).toBe("***********");
        fireEvent.change(screen.getByTestId('inputProfilePassword'), { target: { value: "1232" } });
        fireEvent.click(screen.getByTestId("update-btn"));
        expect(screen.getByTestId("profilePassword").textContent).toBe("****");

    });

});

