#!/bin/bash

aws s3 cp --region=us-west-2 s3://mcc-code-school-build-artifacts/matt-ryan-ng-latest.tar.gz app.tar.gz 
aws s3 cp --region=us-west-2 s3://mcc-code-school-build-artifacts/matt-ryan-ng-Dockerfile-latest Dockerfile 
tar -xzf app.tar.gz

docker build -t matt-ryan-ng:latest  .

if [[ $(docker container ls -q --filter name=matt-ryan-ng) ]];
then
            echo "found running container, killing thing"
            docker stop matt-ryan-ng
    else
            echo "no running container, starting new one"
fi
docker run -p 8082:80 --rm --name matt-ryan-ng --detach matt-ryan-ng:latest