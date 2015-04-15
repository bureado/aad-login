# aad-login

Allows Linux user authentication to Azure AD via pam_exec

## Prerequisites

* An Azure AD directory has been created, and some users exist
* Node.js and npm are installed in the Linux VM
* A directory application has been created (native client type) and you have the Client ID

## User provisioning

This utility doesn't provision the user. In other words, you need to ensure the user
you'll be logging in with is visible by NSS. A simple `sudo useradd -m <user>` might
be enough for a handful of users.

## Installing

You can download the tarfile and:

    sudo tar xzf aad-login_0.1.tar.gz
    cd /opt/aad-login
    sudo npm install

## Configuring

First, open `/opt/aad-login/aad-login.js` with your favorite editor and put your directory
and client ID in.

Then, open `/etc/pam.d/common-auth` and add:

    auth sufficient pam_exec.so expose_authtok /usr/local/bin/aad-login





