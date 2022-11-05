<a name="readme-top"></a>
<br />

<div align="center">
  <h1 align="center">Développez un algorithme de recherche en JavaScript</h1>

  <p align="center">
    Open-Classroom, P7/14, Formation Développeur Front-End, Javascript React mars2022/mai2023
    <br />
  </p>
</div>

<details>
  <summary>Table des matières</summary>
  <ol>
    <li><a href="#P7-:-Les-Petits-Plats"> P7 : Les Petits Plats</a>
    <ul>
      <li><a href="#Résultat">Résultat</a></li>
      <li><a href="#Scénario">Scénario</a></li>
      <li><a href="#Objectif">Objectif</a></li>
      <ul>
        <li><a href="#Description-des-fonctionnalités-de-recherche">Description des fonctionnalités de recherche</a></li>
        <li><a href="#Etapes">Etapes</a></li>
        <li><a href="#Les-conditions-supplémentaires">Les conditions supplémentaires</a></li>
        <li><a href="#Etapes">Etapes</a></li>
      </ul>
      <li><a href="#Built-With">Built With</a></li>
    </ul>
  </li>
  </ol>
</details>

## P7 : Les Petits Plats

### Résultat

<a href="https://supersandrine.github.io/P-7-Les-petits-plats/search.html">Le résultat du projet "Les Petits Plats"</a>

### Scénario

Vous êtes missionnés par l’entreprise “Les petits plats” en temps que Développeur Front-end.
L'entreprise, éditrice de livre de cuisine, veut réaliser son propre site de recettes de cuisine à l’instar de Marmiton ou 750g.

La différenciation de ce produit est basée sur la fluidité du moteur de recherche.

Votre première mission sera donc d’implémenter la fonctionnalité de recherche, avec comme ressource :

- <a href="https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=1%3A2">Les maquettes sur Figma</a>
- <a href="./readmeAssets/Cas+d’utilisation+Filtrer+les+recettes+dans+l’interface+utilisateur.pdf">La descrtiption du cas d'utilisation de recherche</a>
- <a href="./data/recipes.js">Un fichier contenant une base de 50 recettes</a>

<img src="readmeAssets/maquette.png" alt="apperçu de la maquette">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Objectif

Faire deux implémentations différentes de la fonctionalité recherche pour pouvoir comparer leurs performances et choisir la meilleure.

#### Description des fonctionnalités de recherche

L'utilisateur du site peut faire une recherche selon deux champs:

- le champs de recherche principal
- les champs de recherches avancées

Le champs de recherche principal est une barre de recherche qui va retrouver la chaîne de 3 caractères minimums, si elle est présente et renvoyer une liste de recettes contenant cette chaîne, sinon, afficher un message d'erreur.

Les champs de recherches avancées, va chercher par mots-clefs sélectionnés les recettes correspondant à l'intersections de ces mots-clefs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Etapes

- Implémenter l'interface, avec un code qui passe le validateur de W3C

- L'algorithmique en 3 étapes:
  - Planifier les 2 versions de la fonctionalité du champs de recherche principal(en boucles natives et l'autre en code fonctionnel), remplir une fiche d'investigation, avec algorigramme
  - Implémenter ces 2 versions sur 2 branches : branche master et branche NativeLoops
  - Tester les performances des 2 versions sur jsben.ch : <a href="https://jsben.ch/gUW10">voici le lien de ce test.</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Les conditions supplémentaires

En suivant <a href="./readmeAssets/Cas+d’utilisation+Filtrer+les+recettes+dans+l’interface+utilisateur.pdf">les cas d'utilisation de recherche</a>, on réponds à la majorité des contitions.
En complément les règles de gestion sont également à suivre:

1. La recherche doit pouvoir se faire via le champ principal ou via les tags (ingrédients,
   ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la
   barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients , ustensiles et appareil de la recherche avancée proposent
   seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les
   tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la
   fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface (avec ou sans
   Bootstrap) devra passer avec succès le validateur W3C.
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche

### Built With

- GitHub
- VSCode
- DrawIo
- Figma

<p align="right">(<a href="#readme-top">back to top</a>)</p>
