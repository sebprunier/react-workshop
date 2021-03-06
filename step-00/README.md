# Etape 0 - Installation et premier composant

## Pré-requis

### Git

Téléchargez et installez la version de Git correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://git-scm.com/downloads](https://git-scm.com/downloads)  

Vérifiez l'installation en lançant la commande suivantes dans un terminal :

```
$ git --version
git version 2.6.4
```


### Node.js

Téléchargez et installez la version de Node.js correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

Vérifiez l'installation en lançant les commandes suivantes dans un terminal :

```
$ node -v
v4.2.2

$ npm -v
2.14.7
```

### Atom

L'éditeur préconisé pour le workshop est [Atom](https://atom.io).

Téléchargez et installez Atom, puis installez les packages suivants :

* react
* linter-eslint

*Pour savoir comment gérer les packages d'Atom : [https://atom.io/docs/latest/using-atom-atom-packages](https://atom.io/docs/latest/using-atom-atom-packages)*

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
    propTypes: {
        text: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="todo">
                {this.props.text}
            </div>
        );
    }
});

module.exports = Todo;
```

Ce premier composant est volontairement très simple (type "hello world"), il retourne simplement un texte dans un élément HTML `<div>`.
Ce texte est passé au composant grâce à une propriété `text`. Cette propriété est définie comme étant de type `string` et obligatoire (partie `propTypes` du composant).

Afin de pouvoir ajouter du style sur ce componsant, on définit également une classe CSS via l'attribut `className`.

*Remarque : n'oubliez pas que JSX n'est que du "sucre syntaxique" transformé en javascript, ce n'est pas du HTML !
Ce qui explique l'utilisation de `className` et non `class` qui est un mot clé réservé en javascript*

Vous pouvez également utiliser directement la fonction `createElement` de l'API `React` :

```javascript
render: function () {
    return React.createElement(
        'div',
        {className: 'todo'},
        this.props.text
    );
}
```

### index.html

Créez une page HTML basique et ajoutez-y une `<div>` (possédant l'identifiant `main`) dans laquelle nous effectuerons le rendu de notre composant.  

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>React Workshop - Etape 0</title>
    <link rel="stylesheet" href="/css/index.css">
</head>
<body>
<h1>Etape 0 - Installation et premier composant</h1>

<div id="main"></div>

</body>
</html>
```
Cette page référence la feuille de style `css/index.css`. Pensez à la créer afin de donner du style au componsant `Todo`. Par exemple :

```css
.todo {
    border: 1px solid darkblue;
    background: lightblue;
    color: darkblue;
    padding: 5px;
}
```

### app.js

A la racine du répertoire `src`, créez le fichier `app.js` qui contient le code nécessaire au rendu du componsant `Todo` dans la `<div>` créée précédemment :

```javascript
var React = require('react');
var ReactDOM = require('react-dom');

var Todo = require('./components/todo');

ReactDOM.render(
    <Todo text="Ceci est une tâche à réaliser."/>,
    document.getElementById('main')
);
```

Vous pouvez également utiliser directement la fonction `createElement` de l'API `React` :

```javascript
ReactDOM.render(
    React.createElement(
        Todo,
        {text:'Ceci est une tâche à réaliser.'}
    ),
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
    "babel-preset-react": "6.1.18"
}
```

Créez le fichier `webpack.config.js` permettant de configurer Webpack et Babel :

```javascript
var webpack = require('webpack');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
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
    * *Remarque : les plugins babel peuvent également être définis dans le fichier de configuration `.babelrc`*

Vous pouvez ajouter les commandes Webpack sous forme de scripts dans le fichier `package.json`. Par exemple :

```json
"scripts": {
    "bundle": "webpack -p --colors --progress"
}
```

Ainsi, la commande `npm run bundle` permet de construire le fichier `bundle.js`


Enfin, pensez à référencer le script `bundle.js` dans le fichier `index.html` :

```html
<body>
<h1>Etape 0 - Installation et premier composant</h1>

<div id="main"></div>

<script src="/js/bundle.js"></script>
</body>
```

## Exécution avec Webpack Dev Server

Afin de rendre la page `index.html` dans un navigateur, nous utilisons [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html).

Ajoutez la dépendance à `webpack-dev-server` dans le fichier `package.json` :

```json
"devDependencies": {
    "webpack-dev-server": "1.14.0"
}
```
Ajoutez un nouveau script permettant de lancer le serveur Webpack :

```json
"scripts": {
    "start": "webpack-dev-server -d --colors --inline --content-base public"
}
```

Lancez enfin la commande `npm start` et ouvrez la page `http://localhost:8080`.

Modifiez le code du composant `Todo` et observez les modifications en live dans votre navigateur !

## Tests

Les tests unitaires sont primordiaux dans le développement. Ils ne doivent en aucun cas être négligés, c'est pourquoi nous les introduisons dès l'étape 0 du workshop.

L'objectif est de mettre en place le test unitaire du composant `Todo`. Pour cela, nous allons nous appuyer sur les librairies suivantes :

* [react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html) : addon React facilitant les tests de composants React.
* [jsdom](https://github.com/tmpvar/jsdom) : librairie implémentant les standards DOM et HTML, qui permettra de créer un document HTML dans lequel faire le rendu des componsants à tester.
* [Chai](http://chaijs.com/) : librairie d'assertions, orientée BDD/TDD.
* [Mocha](http://mochajs.org/) : framework Javascript de tests unitaires.
* [babel-register](https://babeljs.io/docs/setup/#mocha) : permet d'utiliser Babel lors de l'exécution des tests avec Mocha.

Commencez par ajouter ces librairies au fichier package.json :

```json
"devDependencies": {
    "babel-register": "6.3.13",
    "jsdom": "7.2.0",
    "mocha": "2.3.4",
    "chai": "3.4.1",
    "react-addons-test-utils": "0.14.3"
}
```

Ajoutez la configuration nécessaire à `babel-register` dans le fichier `.babelrc` :

```json
{
  "presets": ["es2015", "react"]
}
```

Ecrivez ensuite le test du composant `Todo`, en utilisant :

* la syntaxe Mocha pour décrire le test,
* ReactTestUtils pour effectuer le rendu et parcourir l'arbre DOM du composant `Todo`,
* Chai pour vérifier le texte affiché.

```javascript
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var expect = chai.expect;

var Todo = require('../../src/components/todo');

describe('Todo', function() {
  it('affiche le texte de la tâche', function() {
    var todo = ReactTestUtils.renderIntoDocument(<Todo text="Un Todo de test..."/>);
    var div = ReactTestUtils.findRenderedDOMComponentWithTag(todo, 'div');
    expect(div.textContent).to.be.equal('Un Todo de test...');
  });
});
```

Regardez également les fichiers suivants :

* `bootstrap.js` : fichier permettant de créer le contexte nécessaire au fonctionnement de ReactTestUtils.
* `index.js` : point d'entrée permettant d'exécuter l'ensemble des tests unitaires.

Ajoutez un nouveau script dans le fichier `package.json` permettant de lancer les tests à l'aide de la commande `npm test` :

```json
"scripts": {
    "test": "mocha --compilers js:babel-register tests/index.js"
}
```

## ESLint

[ESLint](http://eslint.org/) est un outil qui permet d'analyser votre code Javascript selon un certains nombre de règles.

Dans notre cas, nous allons l'utiliser avec le plugin [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) qui propose des règles spécifiques au développement de composants React.

Pour commencer, ajoutez les dépendances nécessaires dans le fichier `package.json` :

```json
"devDependencies": {
    "eslint": "1.10.3",
    "eslint-plugin-react": "3.11.3"
}
```

Créez ensuite le fichier `.eslintrc` qui permet de configurer ESLint :

```json
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "react"
  ],
  "ecmaFeatures": {
    "jsx": true
  },
  "rules": {
    "react/prop-types": 1,
  }
}
```

* L'attribut `extends` permet d'hériter d'une configuration existante. `eslint:recommended` contient les règles recommandée par ESLint.
* La partie `env` permet de définir quelles variables globales sont potentiellement utilisées dans le code. Ici nous ajoutons celles du navigateur et celle de node.
* La partie `plugins` permet d'ajouter des plugins ESLint. Ici nous ajoutons le plugin React.
* La partie `ecmaFeatures` permet de définir les options du langage Javascript supportées lors de l'analyse. Ici nous activons la syntaxe JSX.
* La partie `rules` permet de définir les règles à appliquer lors de l'analyse du code. Pour plus de détails sur les règles disponibles : [https://www.npmjs.com/package/eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

Il est possible d'exclure certains fichiers ou dossiers de l'analyse, grâce au fichier `.eslintignore`. Exemple :

```
node_modules
webpack.config.js
public
```

Enfin, ajoutez un script dans le fichier `package.json` permettant d'exécuter ESLint grâce à la commande `npm run lint` :

```json
"scripts": {
  "lint": "eslint src tests"
}
```
