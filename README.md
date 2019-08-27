# Graphql server starter with apollo-server and authentication with jwt

## Usage

### Querys for playground

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
  }
}
```

### Get info of my authenticated user

```
query {
  myUser {
    name 
    email
  }
}
```