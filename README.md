# aad-login

Allows Linux user authentication to Azure AD via pam_exec

## Prerequisites

* An Azure AD directory has been created, and some users exist
* Node.js and npm are installed in the Linux VM
* A directory application has been created (native client type) and you have the Client ID
* Your PAM distribution has pam_exec.so

## User provisioning

This utility doesn't provision the user. In other words, you need to ensure the user
you'll be logging in with is visible by NSS. A simple `sudo useradd -m <user>` might
be enough for a handful of users.

An exception of this would be the `aad-login-self-provisioning` script which attempts
to create the user upon a failed `getent`. This is experimental. Ideally you are doing
this to delegate management of your Linux VMs and therefore will be using groups (like
`sudo`) to delegate requiring you to provision the user beforehand.

## Installing

You can download the tarfile and:

    sudo tar xzf aad-login_0.1.tar.gz -C /
    cd /opt/aad-login
    sudo npm install

## Configuring

First, open `/opt/aad-login/aad-login.js` with your favorite editor and put your directory
and client ID in.

Then, open `/etc/pam.d/common-auth` and add:

    auth sufficient pam_exec.so expose_authtok /usr/local/bin/aad-login

ideally at the beginning of your ruleset. Other rules might need to use `try_firstpass` for
convenience.

CentOS doesn't have `common-auth` so you need to include this rule in the relevant PAM file,
such as `/etc/pam.d/sshd` or `/etc/pam.d/system-auth`.

## Caveats

A freshly created user will have a temporary password that has to be changed via the portal. A
convenient way to get this done is to visit portal.azure.com (even if you don't have an Azure
account) with those credentials and change them before attempting to SSH.

In CentOS 7.x (and other SELinux-enabled distros) you need to disable the policy:

    sudo setenforce 0

The self-provisioning beta doesn't guarantee UID consistency across VMs, nor delegates access
to groups like sudo. Therefore, an important TODO is to detect group membership.

## Warning

Tested in Ubuntu 14.04. Any changes to common-auth might result in unexpected behaviour in
authentication including multiple password prompts and inability to join with local credentials.
