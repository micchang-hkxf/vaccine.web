cd .. & dotnet build --configuration Debug & cd clientapps & npm run build & cd .. & dotnet build --configuration Debug /p:DeployOnBuild=True /p:PublishProfile=Properties/PublishProfiles/Debug.pubxml & cd builds