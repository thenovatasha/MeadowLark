import { expect, jest, test } from "@jest/globals";
import * as handlers from "../handlers.js";

test("home page renders", () => {
    const req = {};
    const res = { render: jest.fn() };
    // render: jest.fn() is a spy, which comes back and can report on what was
    // done to it
    handlers.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("home");
});

test("about page renders with fortune", () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.about(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("about");
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({
            fortune: expect.stringMatching(/\W/),
        })
    );
});

test("404 handler renders", () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.notFound(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("404");
});

test("500 handler renders", () => {
    const err = new Error("some error");
    const req = {};
    const res = { render: jest.fn() };
    const next = jest.fn();
    handlers.serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("500");
});
