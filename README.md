# Installation 

To run the backend you will need a docker. 

You can find a how to install guide at https://docs.docker.com/docker-for-mac/install/

# Run backend and caching server

1) `cd docker`
2) `docker-compose -p fe_testing build`
3) `docker-compose -p fe_testing up -d`
4) `cd ..`

# Run frontend

1) `cd frontend`
2) `npm install -g @angular/cli && npm i`
3) `ng serve`

After that you should be up and running. Frontend can be accessed at http://localhost:4200

# Question answers

A) Describe the strategy used to consume the API endpoints and the data management.

Frontend sends a request to the backend, backend asks if redis contains such entrie if not it fetches the remote of yes returns the stored value. Done in a really simple way.

B) Explain which library was used for the routing and why. Would you use the same for a consumer facing app targeting thousands of users? Why?

Routing on the backend is done on express it's the proven solution that provides error fallbacks and all the required tools out of the box. It can stand under a normal usage conditions as any other solution if you want high availalbility it's a point of another topic and router implementation is not a primary point there it's more related to software architechture and highload.

C) Have you used any strategy to optimize the performance of the list generated for the first feature?

Bot backend and frontend have several optimiztions: backend has stored fetch results and frontend is performance optimized for a large amount of data with a virtual scroll. All is done in the simpliest way due to a time shortage.

D) Would you like to add any further comments or observations?

Nothing to add