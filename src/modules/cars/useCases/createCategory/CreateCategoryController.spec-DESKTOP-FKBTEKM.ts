import { app } from "@shared/infra/http/app"
import request from "supertest"

describe("Create category controller", async () => {

    it("should be able to create a new category", async () => {
        const response = await request(app).get("/categories").send({
            name: "Supertest category",
            description: "Supertest"
        })
        expect(response.status).toBe(201)
    })

})