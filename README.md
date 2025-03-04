## my-app

- ReactJS project using Vite.js

```
# .env
#
#   prefixes
#   DEV_: important ONLY in local development environment
#   PROD_: important ONLY in production environment stage
#   TEST_: important ONLY for testing environment
#   VITE_: needs to start with this to be used in the vitejs
#   CYPRESS_: cypress related envs
#

## INFO
# test | development | production
VITE_STAGE="production"

## BACKEND
# api
VITE_BACKEND_API_URL="https://myapi.com.br/v1"

## CYPRESS
#
CYPRESS_FRONTEND_URL="http://localhost:3000"
```

```
# .env.development
#
#   prefixes
#   DEV_: important only in local development environment
#   PROD_: important only in production environment stage
#   TEST_: important only for testing environment
#   VITE_: needs to start with this to be used in the vitejs
#   CYPRESS_: cypress related envs
#

## INFO
# test | development | production
VITE_STAGE="development"

## BACKEND
# api
VITE_BACKEND_API_URL="http://localhost:3000"

## CYPRESS
#
CYPRESS_FRONTEND_URL="http://localhost:5173"

```

```
# .env.test
#
#   prefixes
#   DEV_: important only in local development environment
#   PROD_: important only in production environment stage
#   TEST_: important only for testing environment
#   VITE_: needs to start with this to be used in the vitejs
#   CYPRESS_: cypress related envs
#

## INFO
# test | development | production
VITE_STAGE="test"

## BACKEND
# api
VITE_BACKEND_API_URL="http://localhost:3000"

## CYPRESS
#
CYPRESS_FRONTEND_URL="http://localhost:5173"

```

## my-server

- Backend using Nodejs

```
# .env
AUTH_EMAIL=renato@gmail.com
AUTH_PASSWORD=123123
AUTH_TOKEN=token-auth-new

PORT=3000
```
