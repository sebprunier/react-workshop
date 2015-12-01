# Etape 0 - Installation et premier composant

## Pré-requis

### Node.js

Téléchargez et installez la version de Node.js correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

Vérifiez l'installation en lançant les commandes suivantes dans un terminal : 

```
$ node -v
v4.2.2

$ npm -v
2.14.7
```

### React Developer Tools

Afin de disposer d'outils spécifiques à React dans votre navigateur web, installez **React Developer Tools** : 

* [React Developer Tools pour Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [React Developer Tools pour Mozilla Firefox](https://addons.mozilla.org/fr/firefox/addon/react-devtools/) 


## Installation

Créez un fichier `package.json`, en déclarant les dépendances React : 

```json
{
    "name": "react-workshop",
    "description": "React Workshop",
    "version": "0.0.0",
    "dependencies": {
        "react": "0.14.3",
        "react-dom": "0.14.3"
    }
}
```

Lancez ensuite la commande `npm install` afin de télécharger localement les dépendances (elles se trouvent dans le répertoire `node_modules`)


## Premier componsant

### todo.js

Dans le répertoire `src/components`, créez le fichier `todo.js` qui contient le code de notre premier componsant, nommé `Todo` :  

```javascript
var React = require('react');

var Todo = React.createClass({
    render: function () {
        return (
            <div className="todo">
                Ceci est une tâche à réaliser.
            </div>
        );
    }
});

module.exports = Todo;
```

Ce premier composant est volontairement très simple (type "hello world"), il retourne simplement un texte statique dans un élément HTML `<div>`.
Afin de pouvoir ajouter du style sur ce componsant, on définit également une classe CSS via l'attribut `className`.

*Remarque : n'oubliez pas que JSX n'est que du "sucre syntaxique" transformé en javascript, ce n'est pas du HTML !
Ce qui explique l'utilisation de `className` et non `class` qui est un mot clé réservé en javascript* 

### index.html

Créez une page HTML basique et ajoutez-y une `<div>` (possédant l'identifiant `main`) dans laquelle nous effectuerons le rendu de notre composant.  

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>React Workshop - Etape 0</title>
</head>
<body>
<h1>Etape 0 - Installation et premier composant</h1>

<div id="main"></div>

</body>
</html>
```

### app.js

A la racine du répertoire `src`, créez le fichier `app.js` qui contient le code nécessaire au rendu du componsant `Todo` dans la `<div>` créée précédemment : 

```javascript
var React = require('react');
var ReactDOM = require('react-dom');

var Todo = require('./components/todo');

ReactDOM.render(
    <Todo />,
    document.getElementById('main')
);
```

## Build avec Webpack

Nous utilisons l'outil [Webpack](https://webpack.github.io/) afin de construire notre application.

En complément de Webpack, nous utilisons [Babel](https://babeljs.io/), un compilateur Javascript qui permet d'utiliser les dernières nouveautés du langage.
Dans notre cas, nous utilisons les plugins `react` et `es2015`.

Dans le fichier `package.json`, ajoutez les dépendances de développement nécessaires au build Webpack : 

```json
"devDependencies": {
    "webpack": "1.12.9",
    "babel-loader": "6.2.0",
    "babel-preset-es2015": "6.1.18",
    "babel-preset-react": "6.1.18",
}
```

Créez le fichier `webpack.config.js` permettant de configurer Webpack et Babel : 

```javascript
var webpack = require('webpack');

module.exports = {
    output: {
        path: './public/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./src/app.js']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
```

La configuration de Webpack est simple : 

* Le point d'entrée est le fichier `src/app.js`
* Le fichier `bundle.js` est généré dans le répertoire `public/js`
* Le build exécute le lanceur `babel` avec les plugins `react` et `es2015`

Vous pouvez ajouter les commandes Webpack sous forme de scripts dans le fichier `package.json` : 

```json
"scripts": {
    "build": "webpack -p --colors",
    "watch": "webpack --watch --colors -d",
}
```

Ainsi, la commande `npm run build` construit le `bundle.js` et la commande `npm run watch` lance le build lorsque des modifications du code ont lieu.


Enfin, pensez à référencer le script `bundle.js` dans le fichier `index.html` : 

```html
<body>
<h1>Etape 0 - Installation et premier composant</h1>

<div id="main"></div>

<script src="js/bundle.js"></script>
</body>
```

## Exécution avec Webpack Dev Server

Afin de rendre la page `index.html` dans un navigateur, nous utilisons [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html).

Ajoutez la dépendance à `webpack-dev-server` dans le fichier `package.json` : 

```json
"devDependencies": {
    ...
    "webpack-dev-server": "1.14.0"
}
```

Ajoutez un nouveau script permettant de lancer le serveur Webpack : 

```json
"scripts": {
    ...
    "dev": "webpack-dev-server --colors --content-base public"
}
```

Lancez enfin la commande `npm run dev` et ouvrez la page `http://localhost:8080` !


## Pour aller plus loin ...

TODO : 

* Sans JSX
* Code en ES2015
* Style CSS inline