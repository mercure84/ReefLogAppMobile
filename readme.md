#APPLICATION REEFLOG // Front End en React Native

Pour déployer l'application :

1. Installer un environnement de développement conforme à celui décrit sur le lien https://reactnative.dev/docs/environment-setup
   Utiliser le mode opératoire concernant React Native CLI Quickstart. NE PAS UTILISER EXPO.
   Target : Android
   Rappel des étapes d'installation : installer npm, node.js, Android Studio, créer un émulateur compatible Android 9 ou supérieur. (Emulateur Conseillé : Pixel 3XL)

2. cloner le répository (branche Master)

3. A la racine du projet, lancer la commande npm install (télécharge les dépendances / librairies du projet)

4. Importer le projet dans Android Studio (dossier android) : Graddle va alors importer automatiquement les dépendances nécessaires au fonctionnement de l'application sous Android. Si cette étape est oubliée, l'application ne pourra pas être installée sur l'émulateur.

5. Lancer l'émulateur Android

6. Lancer la commande npm android (va installer l'application sur l'émulateur)

7. si le server node n'a pas démarré : lancer npm start

A noter que l'on peut remplacer npm par yarn (en particulier sous iOS)

##Construire une release (fichier APK):

commande gradlew assembleRelease

à lancer dans le dossier android/

##Déployer l'application dans un émulateur iOS

Pas encore disponible
