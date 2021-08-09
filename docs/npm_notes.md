I'm using the _react-html-parser_ package and it's not currently compatible with React v17. So, when installing packages and it is part of the install, you need to do it this way:

```bash
# if installing just 'react-html-parser'
npm i react-html-parser --legacy-peer-deps

# if installing all packages again... eg: if the node_modules folder and package-lock.json file were both deleted to start anew
npm i --legacy-peer-deps
```
