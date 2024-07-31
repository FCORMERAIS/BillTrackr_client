# BillTrackr Application - README

## Introduction
BillTrackr est une application complète conçue pour gérer et suivre vos factures efficacement. Ce guide vous expliquera les étapes nécessaires pour configurer et exécuter l'application sur votre machine locale.

## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants :
- WAMP 
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (fourni avec Node.js)

## Installation et Configuration

### Étape 1 : Démarrer le serveur WAMP
Assurez-vous que votre serveur WAMP est en cours d'exécution. Cela est crucial car BillTrackr nécessite un environnement de serveur local pour fonctionner.

### Étape 2 : Cloner les dépôts
Clonez les dépôt BillTrackr (FRONT et BACK) depuis GitHub vers votre machine locale.

FRONT : 

```sh
git clone https://github.com/FCORMERAIS/BillTrackr_client.git
```

BACK : 

```sh
git clone https://github.com/FCORMERAIS/BillTrackr_server.git
```

### Étape 3 : Installer les dépendances

Naviguez dans le répertoire du projet et installez les dépendances nécessaires.

Ouvrez le premier terminal et naviguez dans le répertoire billTrackr_client :

```sh
cd BillTrackr_client
```

Installez les packages requis :

```sh
npm i
```

Ouvrez le deuxième terminal et naviguez dans le répertoire billTrackr_server :
```sh
cd billTrackr_server
```

Installez les packages requis :

```sh
npm i
```

### Étape 4 : Exécuter l'application

Dans le premier terminal (à l'intérieur de billTrackr_client), démarrez l'application client :

```sh
npm start
```

Dans le deuxième terminal (à l'intérieur de billTrackr_server), démarrez l'application serveur :


```sh
npm run dev
```

## Utilisation

Une fois que le client et le serveur sont en cours d'exécution, vous pouvez accéder à l'application BillTrackr en naviguant à http://localhost:3000 dans votre navigateur web.

