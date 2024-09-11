import * as portfinder from "portfinder";
import * as puppeteer from "puppeteer";
import app from "../../meadowlark.js";
import { afterEach, beforeEach, expect, test } from "@jest/globals";

let server = null;
let port = null;

beforeEach(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

test("home page links to about page", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/about`);
    await browser.close();
});

test("home page does not link to another page", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ]);
    expect(page.url()).not.toBe(`http://localhost:${port}/home`);
    await browser.close();
});
