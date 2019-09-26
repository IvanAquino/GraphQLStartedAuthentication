# Graphql server starter with apollo-server and authentication with jwt

## Usage

### Compile for production

`npm run build`

`npm start`

### Querys for playground

### Enable playgroud

Set DEBUG=true in default.env file

### Create user

```
mutation {
  createUser (input: {
    name: "my name"
    email: "myemail@mail.com"
    password: "mySuperPassword_XD"
  }) {
    name
    email
  }
}
```

### Authenticate

```
mutation {
  authenticate(input :{
    email: "myemail@mail.com",
    password: "mySuperPassword_XD"
  }) {
    token
    expiresIn
  }
}
```

### Get info of my authenticated user
#### Require authorization header with jwt token
```
query {
  myUser {
    name 
    email
  }
}
```