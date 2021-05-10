# The Linking Of Python Script Directly To NodeJS
https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
Use this link to make the python setup 

### make provisions for heroku
https://devcenter.heroku.com/articles/getting-started-with-python

### add python to buildpack along with heroku/nodejs by below command in terminal(install heroku to terminal first)
heroku buildpacks:add heroku/python --app yourappname


### Change the python in it to python3 when running in localhost and change it to just python when pushing to heroku. 
https://devcenter.heroku.com/articles/python-pip

### Mention python version needed in runtime.txt for heroku to identify which version to use (python 2.7 doesnt support opencv and scikit-image) , ony some
### versions are supported
https://stackoverflow.com/questions/54837820/error-while-pushing-to-heroku-requested-runtime-is-not-available-for-this-stack
https://devcenter.heroku.com/articles/python-support#supported-runtimes

### Make a requirements.txt and mention needed libraries like opencv, numpy and scikit-images

https://pypi.org/project/opencv-python-headless/   use this library:opencv-python-headless, opencv-python gives error in heroku
https://stackoverflow.com/questions/49469764/how-to-use-opencv-with-heroku
opencv-python-headless==4.2.0.32

### after mentioning names of needed libraries enter this in terminal (use pip3 if that is installed in terminal)
pip freeze > requirements.txt


# For Image Upload From Frontend To Backend
https://medium.com/swlh/uploading-images-to-your-node-js-backend-978261eb0724#:~:text=Set%20up%20the%20body%20to,be%20in%20the%20images%20folder
Look up the backend index.js routes file for settings for multre
