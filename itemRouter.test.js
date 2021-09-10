process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");
let item1 = { name: "popsicle", price: 1.45 };

beforeEach(() => {
	items.push(item1);
});

describe("GET /items", function () {
	test("Gets a list of item", async function () {
		const resp = await request(app).get(`/api/items`);

		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual([item1]);
	});
});

describe("POST /items", function () {
	test("Posts an item", async function () {
		const resp = await request(app)
			.post(`/api/items`)
			.send({ item: { name: "cheerios", price: 3.4 } });

		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
	});
});

describe("GET /items/:name", function () {
	test("Gets an item by name", async function () {
		const resp = await request(app).get(`/api/items/popsicle`);

		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual(item1);
	});
});

describe("PATCH /items/:name", function () {
	test("Updates an item by name with provided info", async function () {
		const resp = await request(app)
			.patch(`/api/items/popsicle`)
			.send({ item: { name: "popsicle", price: 3.45 } });

		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual({
			updated: { name: "popsicle", price: 3.45 },
		});
	});
});

describe("DELETE /items/:name", function () {
	test("Deletes an item by name", async function () {
		const resp = await request(app).delete(`/api/items/popsicle`);

		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual({
			message: "Deleted",
		});
	});
});

afterEach(() => {
	items.length = 0;
});
