# settings.py

INSTALLED_APPS = [
    # Autres applications
    'channels',
]

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',  # Utilisation pour les tests, à remplacer pour un déploiement en production
    },
}

ASGI_APPLICATION = 'votre_projet.asgi.application'
