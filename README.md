# Trello

L'objectif de ce projet était de développer un mini Trello avec quelques fonctionnalités incontournables.

L'application a été développée avec MeteorJS, React.js et MongoDB.

Ce prototype donne accès à une gestion basique de tableaux, de listes et de cartes.

Ces quelques fonctionnalités sont les fondamentaux de ce que propose Trello.

## La base de données

La base MongoDB permet de stocker les données saisies au sain de l'application.

Les tableaux, les listes et les cartes sont stockées dans des collections séparées, afin de permettre une plus grande modularité.

Pour améliorer les performances, il serait tout à fait envisageable de dupliquer les données au sein des documents afin de rendre les requêtes de recherche plus rapides. Cela implique évidemment la mise en place de règles de gestion, et de contrôles, afin de garantir la synchronisation permanente des données.

## Côté serveur : L'API MeteorJS

J'ai découvert MeteorJS en développant cette application. J'ai créé un modèle par collection, permettant d'y associer un schéma et des méthodes d'ajout/modification/suppression.

MeteorJS fait alors le lien entre MongoDB et l'application cliente développée avec React.js

## Côté client : l'application React.js

L'application est composée de deux pages :

- La liste des tableaux (Homepage)
- L'affichage d'un tableau

Chacune de ces pages importe ensuite les contenus sous forme de composants.

Chaque dossier de composant possède un fichier JSX. On y retrouve le composant de présentation. Celui-ci ne fait que retourner un composant en fonction des props qui lui sont passées. Il ne gère aucun contexte, et peut être partagé entre plusieurs applications React.js

Certains dossiers de composant possèdent un fichier JavaScript portant le nom de "Container". Ce fichier permet d'interroger la base de données, d'effectuer des traitements liés à l'application. Une fois ces traitements terminés, ce container retourne le composant de présentation associé en lui passant les bonnes props.

Redux.js n'a pas été utilisé, mais il pourrait servir à stocker, si nécessaire, le contexte utilisateur. Le prototype développé ici ne le nécessitait pas.

## Tests unitaires

Je n'ai pas pris le temps ici de faire des tests unitaires, par souci de rapidité. Mais j'ai pour habitude d'utiliser Jest, en le couplant avec Enzyme afin de tester mes composants React.js en profondeur.
