#!/bin/sh
echo "Running rpm setup script"
dnf install -y rpmdevtools rpmlint 
rpmdev-setuptree

docker cp rpm/twilio.spec /root/rpmbuild/SCPEC