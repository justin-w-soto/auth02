const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const UserService = require('../lib/middleware/services/UserService.js');


const customer = {
  email: 'banana@fruit.com',
  password: 'fruitlord_420', 
  role: 'CUSTOMER'
}

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

 
// ->>>---------------------------------------------------------------->>

  it('should sign up a new user with a POST', async () => {
    const res = await request(app)
    .post('/api/v1/auth/signup')
    .send(customer);
    
    expect(res.body).toEqual({
      email: 'banana@fruit.com',
      password: 'fruitlord_420', 
      role: 'CUSTOMER'
    })
  });

 
// ->>>---------------------------------------------------------------->>

  it('should throw error if user already exists', async () => {
    await UserService.create({ 
      email: 'banana@fruit.com',
      password: 'fruitlord_420'
    });

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
      email: 'banana@fruit.com',
      password: 'fruitlord_420' 
    });
      
    expect(res.status).toEqual(400);
  
  });

// ->>>---------------------------------------------------------------->>

  it('should log a user in using a POST', async () => {
    await UserService.create({
      email: 'banana@fruit.com',
      password: 'fruitlord_420' 
    })

    const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'banana@fruit.com',
      password: 'fruitlord_420' 
    })
  

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'banana@fruit.com'
      
    })
  })

// ->>>---------------------------------------------------------------->>

  xit('should error 401 if wrong email or password is provided', async () => {
    await UserService.create({

      email: 'banana@fruit.com',
      password: 'fruitlord_420' 

    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({

      email: 'banana@fruit.com',
      password: 'fruitlord_420' 

      });

    expect(res.status).toEqual(401);
  });


// ->>>---------------------------------------------------------------->>

  it('should GET the logged in user info', async () => {
    await UserService.create({

    email: 'banana@fruit.com',
    password: 'fruitlord_420' 

    });

    const agent = request.agent(app);

    await agent
    .post('/api/v1/auth/login')
    .send({

    email: 'banana@fruit.com',
    password: 'fruitlord_420'

    });

    const res = await agent.get('/api/v1/auth/me');

    expect(res.body).toEqual({

      id: expect.any(String), 
      email: 'banana@fruit.com'

    })
  })

  
// ->>>---------------------------------------------------------------->>

  afterAll(() => {
    pool.end();
  });
});


// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>
// ->>>---------------------------------------------------------------->>

/*A route that does not require a JWT (1 point)
A route only accessible to signed in users (3 points)
If the request doesn't have a valid JWT, then return 401 (1 point)
A route to set a User's role that's only accessible for admin users (3 points)
If the request doesn't have a valid JWT, then return 401 (1 point)
If the requesting user isn't an admin, then return 403 (1 point)*/ 