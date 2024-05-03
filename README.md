to run this app successfully
ensure that nodejs in stalled on yout laptop
then 
You have first to clone this repo:

git clone https://github.com/talk2mat2/blogbackend.


then when the repository has been cloned:

run the following
cd BlogBackend
npm install # installing the dependencies
npm start # or 'node index'

you will get the response that "server running on port 8080"

after the server is running on your localhost

you can test the api endpoints on postman url

https://documenter.getpostman.com/view/19230952/2sA3JFCkE4


to run unit test on the app

run the script:  npm test

the backend api uses morgan logger for ling activities tofile called access.log


