const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel');
const { readingTime } = require('../utils/utils')



describe('Blov Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ 
            email: 'tobi@gmail.com',
             password: '123456'
            });

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@gmail.com', 
            password: '123456'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return orders', async () => {
        // create order in our db
        await BlogModel.create({
            title:'test1',
            description: 'dfghnjkml,mknjbhgfccgbhjnkl.,kmjnbhgcfxdvfbhnjk',
            tags: "test1",
            body: "sdfghcdijocdfldvljjvdkjvdvdkdkfjdfhcjxccjxdfufuefiuefdfkdfdogjk",
            author: req.user._id,
            state: 'published',
            read_count,
            timestamp:Date.now(),
            reading_time: readingTime(body)
          
        })
        await BlogModel.create({
            title:'test2',
            description: 'dfghnjkmlcvbnm,,mknjbhgfccgbhjnkl.,kmjnbhgcfxdvfbhnjk',
            tags: "test2",
            body: "sdfghsdfghjklcdijocdfldvcvbnljjvdkjvdvdkdkfjdfhcjxccjxdfufuefiuefdfkdfdogjk",
            author: req.user._id,
            state: 'published',
            read_count,
            timestamp:Date.now(),
            reading_time: readingTime(body)
          
        })
        const response = await request(app)
        .get('/blog')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    })
})