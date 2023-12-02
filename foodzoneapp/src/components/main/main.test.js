import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Main from "./Main";


describe("Validate Main Component", () => {
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

    it('Test Article - should fetch all articles for current logged in user', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })

        expect(screen.getAllByTestId("postTestList")).toHaveLength(40);
    });

    it('Test Article - should fetch subset of articles for current logged in user given search keyword', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })

        fireEvent.change(screen.getByTestId("searchField"), { target: { value: "Bret" } });
        fireEvent.click(screen.getByTestId("search-btn"));

        expect(screen.getAllByTestId("postTestList")).toHaveLength(10);
    });

    it('Test Article - should add articles when adding a follower', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })

        // Add invalid new follower
        fireEvent.change(screen.getAllByTestId("newFollow")[0], { target: { value: "Bret" } });
        fireEvent.click(screen.getAllByTestId("addFollow-btn")[0]);

        expect(screen.getAllByTestId("postTestList")).toHaveLength(40);

        // Add valid new follower
        fireEvent.change(screen.getAllByTestId("newFollow")[0], { target: { value: "Kamren" } });
        fireEvent.click(screen.getAllByTestId("addFollow-btn")[0]);

        expect(screen.getAllByTestId("postTestList")).toHaveLength(50);
    });

    it('Test Article - should add new post', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })
        // Simulate the click of button
        fireEvent.change(screen.getAllByTestId("newTitle")[0], { target: { value: "Amazing food" } });
        fireEvent.change(screen.getAllByTestId("newPost")[0], { target: { value: "Really Good food is here!" } });
        fireEvent.click(screen.getAllByTestId("post-btn")[0]);
        expect(screen.getAllByTestId("postTestList")).toHaveLength(41);
    });

    it('Test Article - should not add new post without title', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })
        // Simulate the click of button
        fireEvent.change(screen.getAllByTestId("newTitle")[0], { target: { value: "" } });
        fireEvent.change(screen.getAllByTestId("newPost")[0], { target: { value: "Really Good food is here!" } });
        fireEvent.click(screen.getAllByTestId("post-btn")[0]);
        expect(screen.getAllByTestId("postTestList")).toHaveLength(40);
    });

    it('Test Article - should not add new post without content', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })
        // Simulate the click of button
        fireEvent.change(screen.getAllByTestId("newTitle")[0], { target: { value: "Amazing Food" } });
        fireEvent.change(screen.getAllByTestId("newPost")[0], { target: { value: "" } });
        fireEvent.click(screen.getAllByTestId("post-btn")[0]);
        expect(screen.getAllByTestId("postTestList")).toHaveLength(40);
    });

    it('Test Article - should remove articles when removing a follower', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        await waitFor(() => {
            expect(screen.getAllByTestId("postTestList")).not.toBeNull();
        })

        // Remove follower
        fireEvent.click(screen.getAllByTestId("unfollow-btn-2")[0]);
        expect(screen.getAllByTestId("postTestList")).toHaveLength(30);

        // Remow another follower
        fireEvent.click(screen.getAllByTestId("unfollow-btn-1")[0]);
        expect(screen.getAllByTestId("postTestList")).toHaveLength(20);
    });

    it('Test Update - should update user headline', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        expect(JSON.parse(localStorage.getItem("BretStatus"))).toBe("Multi-layered client-server neural-net");
        fireEvent.change(screen.getAllByTestId("headline")[0], { target: { value: "Hybrid - remote and on-site" } });
        fireEvent.click(screen.getAllByTestId("update-btn")[0]);
        expect(JSON.parse(localStorage.getItem("BretStatus"))).toBe("Hybrid - remote and on-site");
    });


    it('Test Authentication - should log out a user', async () => {
        await act(async () => {
            render(
                <Router>
                    <Main />
                </Router>
            );
        });

        // Simulate the click of log out button
        fireEvent.click(screen.getAllByTestId("logout-btn")[0]);
        expect(JSON.parse(localStorage.getItem("data"))).toBeNull();
    });

});

