# Phaser Demos

[https://phaser.io/](https://phaser.io/)


## On Raspbian Server

Make sure php and apache are installed (along with other libs)

```bash
sudo apt install -y php php-sqlite3 apache2 supervisor npm git vim
```
yarn
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

### setup git if needed

```bash
git config --global user.email "your_email@example.com"
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
cat < ~/.ssh/id_rsa.pub
```
##### paste into github at:
[https://github.com/settings/keys](https://github.com/settings/keys)

### checkout the repo
checkout to `/home/pi/Code`

```bash
git clone git@github.com:dethbird/phaserdemo.git
cd phaserdemo
```

### apache mods

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

### apache vhost

```bash
sudo rm /etc/apache2/sites-available/000-default.conf
sudo vim /etc/apache2/sites-available/000-default.conf
```

```bash
<VirtualHost *:80>
        ServerName raspberrypi
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        Alias /home/pi/Code/phaserdemo/public /var/www/html

        <Directory /var/www/html>
            Options FollowSymLinks
            AllowOverride All
            Order allow,deny
            Allow from all
        </Directory>
    
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
Symlink the document root
```bash
sudo rm -rf /var/www/html
sudo ln -s /home/pi/Code/phaserdemo/public /var/www/html
sudo systemctl restart apache2
```
