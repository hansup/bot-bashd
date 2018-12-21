#!/bin/bash

# Install script for bot-bashd

if [[ $(id -u) -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# deploy files
cp -dR system/etc/* /etc/
cp -dR system/usr/* /usr/

# set network interface
sed -i "s/eth1/${NI}/g" /etc/init.d/bot-bashd

# make bot-bash
cd /usr/local/src/bot-bash
npm install
cd - > /dev/null 2>&1

# fix permissions
chown root:staff    /etc/init.d/bot-bashd
chown root:staff    /etc/init.d/loadlogd
chown root:staff    /etc/logrotate.d/bot-bashd
chown root:staff    /etc/logrotate.d/urlsnarf
chown root:staff    /etc/logrotate.d/loadlogd
chown root:staff    /usr/sbin/bot-bashd
chown root:staff    /usr/sbin/loadlogd
chown root:staff    /usr/local/bin/bot-bash
chown -R root:staff /usr/local/src/bot-bash

#install/update bot-bash service
update-rc.d bot-bashd defaults 97 03
update-rc.d loadlogd defaults 97 03
